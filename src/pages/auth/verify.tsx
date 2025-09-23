import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Auth, withSSRContext, API } from 'aws-amplify';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { IVerifyData } from '@/types';

function Verify() {
	const router = useRouter();
	const email = useSearchParams().get('email');

	const verifyEmail = async (data: IVerifyData) => {
		try {
			await Auth.confirmSignUp( email!, data.code );
			router.push('/auth/login');
		} catch(e) {
			console.log(e);
		}
	}

	const reconfirmEmail: MouseEventHandler<HTMLAnchorElement> = async (e) => {
		e.preventDefault();

		try {
			await Auth.resendSignUp( email! );
		} catch(e) {
			console.log(e);
		}
	}

	return (
		<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
			<div className="w-full  m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
				<div className="text-center p-6 bg-slate-900 rounded-t">
					<Link href="/"><Image src="/assets/logo.svg" width={56} height={56} alt="" className="w-14 h-14 mx-auto mb-2" /></Link>
					<h3 className="font-semibold text-white text-xl mb-1">Sign Up</h3>
				</div>
    
				<Formik
					initialValues={{ code: '' }}
					onSubmit={verifyEmail}
				>
					{({
						values,
						handleChange,
						handleSubmit
					}) => (
						<form className="p-6" onSubmit={ handleSubmit } >
							<div>
								<label htmlFor="User_Name" className="label">Verficiation Code</label>
								<input
									name="code"
									type="text"
									id="User_Name"
									className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
									placeholder="Enter Verification Code"
									required
									value={values.code}
									onChange={handleChange}
								/>
							</div>
							<div className="mt-6">
								<button
									type="submit"
									className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
									Verify Email
								</button>
							</div>
						</form>
					)}
				</Formik>

				<p className="mb-5 text-sm font-medium text-center text-slate-500"> Not received yet ?  <a href="#" onClick={reconfirmEmail}
					className="font-medium text-blue-600 hover:underline">Send Code</a> again or <Link className="font-medium text-blue-600 hover:underline" href="/auth/login">Log in</Link>
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

export default Verify