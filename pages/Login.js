import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'

const Login = () => {

  const router = useRouter();
  // console.log(localStorage === window.localStorage);
  // if(localStorage.getItem('token')){ //if token is already set then this will redirext my page to home page
    // e.preventDefault()
    // router.push('http://localhost:3000')
  // }
  // else{
  //   console.log('no local');
  // }

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST", // *POST is use bcoz here we are login the user
    headers: {
    "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),

    }); //request end

    const json = await response.json();
    console.log(json);
    if (json.access) {

    // Save the jwt token and redirect to home
    localStorage.setItem("token", json.access);
    
    //redirect to home after 0.5 sec
    setTimeout(() => {
      router.push('http://localhost:3000')
    }, 500);
    // console.log(localStorage.getItem('token'))
  }else{
    //worng credentials

    //run toastify
  }

};

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials);
  }

  return (
    <>
        <div className="min-h-full flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-6 w-auto"
              src="vercel.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/Signup"><a className="font-medium text-indigo-600 hover:text-indigo-500">
                 Sign up
              </a></Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/Forgot"><a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a></Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Login