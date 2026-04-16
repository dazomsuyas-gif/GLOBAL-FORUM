'use client'

import { signIn, getProviders, getCsrfToken, literal } from "next-auth/react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const searchParams = useSearchParams()
    const csrfToken = searchParams.get("csrfToken")
    const providers = [
        "google",
        "facebook",
        "apple",
        "credentials"
    ]

    const handleCredentialsSignin = async (e) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
            redirect: false,
        })
        if (result?.error) {
            setError("Invalid email or password")
        } else {
            window.location.href = "/"
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleCredentialsSignin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {providers.slice(0, 3).map((provider) => (
                            <button
                                key={provider}
                                onClick={() => signIn(provider as any)}
                                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <span>Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <a href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create new account
                    </a>
                </div>
            </div>
        </div>
    )
}

