"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email, password,
            redirect: false,
        });

        if (res?.error) {
            toast.error(res.error);
        }
        console.log("res =>", res);

        toast.success("Login successful", {
            onClose: () => router.push("/")
        });
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <div>
                {/* <button onClick={() => signIn("google")}>Login with Google</button>
                <button onClick={() => signIn("github")}>Login with Github</button> */}
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    )
}

export default LoginPage