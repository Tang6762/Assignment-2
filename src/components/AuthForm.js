import { useState } from "react";

function AuthForm({ type, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const isSignup = type === "signup";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full mb-4 text-left">

            {isSignup && (
                <>
                    <label htmlFor="name" className="text-sm mt-2 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="py-2 px-3 border-none rounded mb-4 text-sm outline-none bg-gray-700 text-white"
                    />
                </>
            )}

            <label htmlFor="email" className="text-sm mt-2 mb-1">Email</label>
            <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="py-2 px-3 border-none rounded mb-4 text-sm outline-none bg-gray-700 text-white"
            />

            <label htmlFor="password" className="text-sm mt-2 mb-1">Password</label>
            <input
                type="password"
                id="password"
                placeholder={isSignup ? "At least 6 characters" : "••••••••"}
                required
                minLength="6"
                value={formData.password}
                onChange={handleChange}
                className="py-2 px-3 border-none rounded mb-4 text-sm outline-none bg-gray-700 text-white"
            />

            <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white border-none py-3 rounded-full text-base font-bold cursor-pointer hover:opacity-85 transition-opacity duration-300"
            >
                {isSignup ? "Sign Up" : "Log In"}
            </button>
        </form>
    );
}

export default AuthForm;
