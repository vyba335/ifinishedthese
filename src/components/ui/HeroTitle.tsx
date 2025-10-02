import React from "react";

interface HeroTitleProps {
    title: string;
    subtitle?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col justify-center min-h-[300px] w-screen text-center">
            <section className="glass relative overflow-hidden transition-all py-16 md:py-24">
                <div className="flex flex-col justify-center items-center items-top max-w-[80vw] mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-100">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HeroTitle;
