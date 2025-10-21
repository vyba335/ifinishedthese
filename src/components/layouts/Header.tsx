import React from "react";
import Link from "next/link";
import Image from "next/image";
import IFTLogo from "../../../public/arcade-machine.png";
import SearchInput from "../ui/SearchInput";
import { UserBlock } from "../ui/UserBlock";
import RandomButton from "../ui/RandomButton";

const Header = () => {
    return (
        <header>
            <div className="flex flex-col items-center py-2 md:py-6">
                <div className="flex items-center justify-evenly md:justify-center h-16 w-full gap-4">
                    <div>
                        <Link href="/">
                            <Image
                                src={IFTLogo}
                                alt="IFinishedThese"
                                width={50}
                                height={50}
                                className="logo hover:scale-115 transition-all hover:drop-shadow-sm hover:drop-shadow-green-400"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:block"><SearchInput /></div>
                    <RandomButton />
                    <UserBlock />
                </div>
                <div className="md:hidden w-full"><SearchInput /></div>
            </div>
        </header>
    );
};

export default Header;
