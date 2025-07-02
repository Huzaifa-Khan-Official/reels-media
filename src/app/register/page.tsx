// "use client"
// import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { toast } from 'react-toastify';

// const RegisterPage = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             toast.error("Password and confirm password do not match");
//             return;
//         }

//         try {
//             // TanStack Query

//             const res = await axios.post("/api/auth/register", { email, password });

//             toast.success(res.data.message, {
//                 onClose: () => {
//                     router.push("/login");
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             if (axios.isAxiosError(error) && error.response?.data?.message) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error("Something went wrong");
//             }


//         }
//     }
//     return (
//         <div>
//             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                     {/* <img
//                         alt="Your Company"
//                         src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                         className="mx-auto h-10 w-auto"
//                     /> */}
//                     <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//                         Create an account
//                     </h2>
//                 </div>

//                 <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label htmlFor="username" className='block text-sm/6 font-medium text-gray-900'>
//                                 Username
//                             </label>
//                             <div className="mt-2">
//                                 <input type="text"
//                                     name='username'
//                                     required
//                                     className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6'
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                 />
//                             </div>
//                         </div>


//                         <div>
//                             <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                                 Email address
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     required
//                                     autoComplete="email"
//                                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <div className="flex items-center justify-between">
//                                 <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//                                     Password
//                                 </label>
//                             </div>
//                             <div className="mt-2">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     required
//                                     autoComplete="current-password"
//                                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                         </div>


//                         <div>
//                             <div className="flex items-center justify-between">
//                                 <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
//                                     Confirm Password
//                                 </label>
//                             </div>
//                             <div className="mt-2">
//                                 <input
//                                     id="confirm-password"
//                                     name="confirm-password"
//                                     type="password"
//                                     required
//                                     autoComplete="current-password"
//                                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                 />
//                             </div>
//                         </div>



//                         <div>
//                             <button
//                                 type="submit"
//                                 className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>

//                     <p className="mt-10 text-center text-sm/6 text-gray-500">
//                         Already have an account?{' '}
//                         <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RegisterPage



"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as z from 'zod';
import { registerSchema } from '@/schemas/register.schema';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    const validateForm = () => {
        try {
            registerSchema.parse({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (formData.password !== formData.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: "Passwords do not match"
                }));
                return false;
            }

            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach(err => {
                    const path = err.path[0];
                    if (path) {
                        newErrors[path] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post("/api/auth/register", {
                email: formData.email,
                password: formData.password,
                username: formData.username
            });

            toast.success(res.data.message, {
                onClose: () => {
                    router.push(`/verify-otp`);
                }
            });
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.error) {
                    toast.error(error.response.data.error);
                } else if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Registration failed. Please try again.");
                }
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className='block text-sm/6 font-medium text-gray-900'>
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 ${errors.username ? 'border-red-500' : ''
                                        }`}
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 ${errors.email ? 'border-red-500' : ''
                                        }`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 ${errors.password ? 'border-red-500' : ''
                                        }`}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 ${errors.confirmPassword ? 'border-red-500' : ''
                                        }`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Register'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage