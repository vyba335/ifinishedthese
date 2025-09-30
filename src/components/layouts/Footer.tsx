import React from "react";
import Link from "next/link";
import Image from "next/image";
import IFTLogo from "../../../public/arcade-machine.png";
import AccessibilityFeatures from "../features/AccessibilityFeatures";
const Footer = () => {

    return (
        <footer className="fixed bottom-0 w-full p-8 custom-footer">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center">
                <Link href="/">
                    <Image
                        src={IFTLogo}
                        alt="Music App"
                        width={50}
                        height={50}
                        className="logo"
                    />
                </Link>
                <AccessibilityFeatures />
            </div>
            <p className="block mb-4 text-sm text-center text-slate-300 md:mb-0 border-t copyright-block mt-4 pt-4">
                IFinishedThese © 2025
            </p>
        </footer>
    );
};

export default Footer;
