import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Auth, withSSRContext } from "aws-amplify";
import { Formik } from "formik";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { ISignInData } from "@/types";
import { CREATE_TOKEN } from "@/lib/constants/actions";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const signIn = async (data: ISignInData) => {
    try {
      let res = await Auth.signIn({
        username: data.email,
        password: data.password,
      });
      dispatch({
        type: CREATE_TOKEN,
        payload: {
          id: res.attributes.sub,
          username: res.attributes.preferred_username,
        },
      });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
        <div className="text-center p-6 bg-slate-900 rounded-t">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              width={56}
              height={56}
              alt=""
              className="mx-auto mb-2"
            />
          </Link>
          <h3 className="font-semibold text-white text-xl mb-1">Sign In</h3>
          {/* <p className="text-xs text-slate-400">Sign in to continue to T-Wind.</p> */}
        </div>

        <Formik initialValues={{ email: "", password: "" }} onSubmit={signIn}>
          {({ values, handleChange, handleSubmit }) => (
            <form className="p-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                  placeholder="Your Email"
                  required
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="label">
                  Your password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {/* <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a> */}
              {/* <div className="block mt-3">
								<label className="custom-label">
									<div className="bg-white dark:bg-slate-700 dark:border-slate-600 border border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
										<input type="checkbox" className="hidden peer" />
										<FaCheck className="hidden peer-checked:inline-block text-xs text-slate-700 dark:text-slate-300" />
									</div>
									<span className="text-sm text-slate-500 font-medium">Remember me</span>
								</label>
							</div> */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
        <p className="mb-5 text-sm font-medium text-center text-slate-500">
          {" "}
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { Auth } = withSSRContext(ctx);

  try {
    await Auth.currentAuthenticatedUser();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch {}

  return {
    props: {},
  };
};

export default Login;
