import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Formik } from 'formik';
import { Auth, withSSRContext } from 'aws-amplify';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ISignUpData } from '@/types';

const Register = () => {
	const router = useRouter();

	const signUp = async (data: ISignUpData) => {
		try {
			await Auth.signUp({
				username: data.email,
				password: data.password,
				attributes: {
					preferred_username: data.username,
					"custom:groupname": "Admins"
				}
			});

			router.push({
				pathname: '/auth/verify',
				query: {
					email: data.email
				}
			});
		} catch(e) {
			console.log(e);
		}
	}

	return (
		<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
			<div className="w-full  m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
				<div className="text-center p-6 bg-slate-900 rounded-t">
					<a href="index.html"><Image src="/assets/logo.svg" width={56} height={56} alt="" className="w-14 h-14 mx-auto mb-2" /></a>
					<h3 className="font-semibold text-white text-xl mb-1">Sign Up</h3>
				</div>

				<Formik
					initialValues={{ email: '', password: '', username: '' }}
					onSubmit={signUp}
				>
					{({
						values,
						handleSubmit,
						handleChange
					}) => (
						<form className="p-6" onSubmit={ handleSubmit } >
							<div>
								<label htmlFor="User_Name" className="label">Username</label>
								<input
									name="username"
									type="text"
									id="User_Name"
									className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
									placeholder="Enter Username"
									required
									value={values.username}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor="email" className="label">Email</label>
								<input
									name="email"
									type="email"
									id="email"
									className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
									placeholder="Enter Email"
									required
									value={values.email}
									onChange={handleChange}
								/>
							</div>
							<div className="mt-4">
								<label htmlFor="password" className="label">Your password</label>
								<input
									name="password"
									type="password"
									id="password"
									className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
									placeholder="Enter Password"
									required
									value={values.password}
									onChange={handleChange}
								/>
							</div>
							<div className="block mt-4">
								<label className="custom-label">
									<div className="bg-white border dark:bg-slate-700 dark:border-slate-600 border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px] mr-1">
										<input required type="checkbox" className="hidden peer" />
										<FaCheck className="hidden peer-checked:inline-block text-xs text-slate-700 dark:text-slate-300" />
									</div>
									<span className="text-sm text-slate-500 font-medium">By registering you agree to the Terms of Use</span>
								</label>
							</div>     
							<div className="mt-6">
								<button
									type="submit"
									className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
									Register
								</button>
							</div>
						</form>
					)}
				</Formik>

				<p className="mb-5 text-sm font-medium text-center text-slate-500"> Already have an account ?  <Link href="/auth/login"
					className="font-medium text-blue-600 hover:underline">Log in</Link>
				</p>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
	const {Auth} = withSSRContext(ctx);

	try {
		await Auth.currentAuthenticatedUser();
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	} catch {
	}

	return {
		props: {}
	}
}

export default Register;