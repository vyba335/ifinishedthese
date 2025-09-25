import React from "react";
import Link from "next/link";
import Image from "next/image";
import IFTLogo from "../../../public/arcade-machine.png";
import SearchInput from "../ui/SearchInput";

const Header = () => {
    return (
        <header className="custom-header">
            <div className="mx-auto max-w-[80vw] px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-center gap-8">
                    <div className="flex">
                        <Link href="/">
                            <Image
                                src={IFTLogo}
                                alt="Music App"
                                width={50}
                                height={50}
                                className="logo"
                            />
                        </Link>
                    </div>
                    <SearchInput />
                </div>
            </div>
        </header>
    );
};

export default Header;
