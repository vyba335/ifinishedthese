"use client";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

const UserBlockClient = ({ isLoggedIn}: { isLoggedIn: null | boolean }) => {
    return isLoggedIn ? (
        <div className="glass-dark rounded flex justify-center items-center">
            <div className="rounded text-gray-300 hover:text-white bg-gradient-to-br from-[#141052] to-[#2f053b] hover:from-[#1e1877] hover:to-[#530968] px-4 py-2 cursor-pointer transition-colors">
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <div className="rounded-lg text-gray-500 hover:text-red-400 px-4 py-2 cursor-pointer transition-colors">
                <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
            </div>
        </div>
    ) : (
        <div className="glass-dark rounded flex justify-center items-center">
            <div className="rounded text-gray-300 hover:text-white bg-gradient-to-br from-[#141052] to-[#2f053b] hover:from-[#1e1877] hover:to-[#530968] px-4 py-2 cursor-pointer transition-colors">
                <LoginLink>Sign in</LoginLink>
            </div>
            <div className="rounded-lg text-gray-500 hover:text-yellow-400 px-4 py-2 cursor-pointer transition-colors">
                <RegisterLink>Sign up</RegisterLink>
            </div>
        </div>
    );
}

export default UserBlockClient;