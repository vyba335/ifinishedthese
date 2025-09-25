import React from "react";
import Image from "next/image";

interface HeroTitle {
    title: string;
    subtitle?: string;
    backgroundId?: string | null;
}

const HeroTitle: React.FC<HeroTitle> = ({ title, subtitle, backgroundId }) => {
    return (
        <div className="min-h-screen w-screen mt-4 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            <section className="glass relative overflow-hidden transition-all">    
                    {backgroundId && (
                        <div className="absolute inset-0">
                            <Image
                                src={`https://images.igdb.com/igdb/image/upload/t_720p/${backgroundId}.webp`}
                                alt={`${title}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/90" />
                        </div>
                    )}
                    <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
                                {subtitle}
                            </p>
                        )}
                    </div>
            </section>
        </div>
    );
};

export default HeroTitle;
