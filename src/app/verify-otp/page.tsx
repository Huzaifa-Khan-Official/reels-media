"use client"
import React, { useState } from 'react'
import OTPInput from 'react-otp-input';

const Input = ({ ...props }) => {
    return (
        <input
            type="text"
            {...props}
            className="w-16! ml-6 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
    )
}

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(otp);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
                    <p className="text-[15px] text-slate-500">
                        Enter the 4-digit verification code that was sent to your phone number.
                    </p>
                </header>
                <form id="otp-form" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-3">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderInput={(props) => <Input {...props} />}
                        />
                    </div>
                    <div className="max-w-[260px] mx-auto mt-4">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary-950/10 hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors duration-150"
                        >
                            Verify Account
                        </button>
                    </div>
                </form>
                <div className="text-sm text-slate-500 mt-4">
                    Didn't receive code?{" "}
                    <a className="font-medium text-primary-500 hover:text-primary-600" href="#0" aria-disabled>
                        Resend
                    </a>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtpPage