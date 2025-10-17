"use client";
import {
    LoginLink,
    RegisterLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

const UserBlockClient = ({ isLoggedIn }: { isLoggedIn: null | boolean }) => {
    return isLoggedIn ? (
        <div className="glass-dark rounded flex justify-center items-center">
            <Link href="/dashboard">
                <div className="rounded text-gray-200 hover:text-white bg-gradient-to-br from-[#3ab232] to-[#21651c] hover:from-[#3ab232] hover:to-[#3ab232] px-4 py-2 cursor-pointer transition-colors">
                    Dashboard
                </div>
            </Link>
            <LogoutLink postLogoutRedirectURL="/">
                <div className="rounded-lg text-gray-500 hover:text-red-400 px-4 py-2 cursor-pointer transition-colors">
                    Logout
                </div>
            </LogoutLink>
        </div>
    ) : (
        <div className="glass-dark rounded flex justify-center items-center">
            <LoginLink>
                <div className="rounded text-gray-300 hover:text-white bg-gradient-to-br from-[#141052] to-[#2f053b] hover:from-[#1e1877] hover:to-[#530968] px-4 py-2 cursor-pointer transition-colors">
                    Login
                </div>
            </LoginLink>
            <RegisterLink>
                <div className="rounded-lg text-gray-500 hover:text-yellow-400 px-4 py-2 cursor-pointer transition-colors">
                    Sign up
                </div>
            </RegisterLink>
        </div>
    );
};

export default UserBlockClient;
