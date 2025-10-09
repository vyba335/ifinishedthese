"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import IFTLogo from "../../../public/arcade-machine.png";
import SearchInput from "../ui/SearchInput";
import { UserBlock } from "../features/UserBlock";
import RandomButton from "../ui/RandomButton";

const Header = () => {
    return (
        <header className="custom-header">
            <div className="mx-auto max-w-[80vw] px-4 sm:px-6 lg:px-8 py-2 md:py-6">
                <div className="flex h-16 items-center justify-center gap-3">
                    <div className="flex">
                        <Link href="/">
                            <Image
                                src={IFTLogo}
                                alt="IFinishedThese"
                                width={50}
                                height={50}
                                className="logo"
                            />
                        </Link>
                    </div>
                    <SearchInput />
                    <RandomButton />
                    <UserBlock />
                </div>
            </div>
        </header>
    );
};

export default Header;
