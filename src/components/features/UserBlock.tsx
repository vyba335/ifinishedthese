"use client";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export const UserBlock = () => {
    return (
        <>
            <LoginLink>Sign in</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
        </>
    );
};
