import React from "react";
import Image from "next/image";
import PlatformGrid from "./PlatformGrid";
import { Star } from "lucide-react";

interface GameHeaderData {
    backgroundId: string | null | undefined;
    image_id: string | null | undefined;
    height: number | null | undefined;
    width: number | null | undefined;
    released: number | null | undefined;
    platforms: {
            id: number;
            name: string;
            platform_logo: {
                id: number;
                image_id: string;
                width: number;
                height: number;
            };
    }[] | null | undefined;
    rating: number | 0;
}

interface GameHeaderProps {
    title: string;
    subtitle?: string;
    gameHeaderData?: GameHeaderData | null;
}

const GameHeader: React.FC<GameHeaderProps> = ({ title, subtitle, gameHeaderData }) => {
    return (
        <div className="min-h-screen w-screen mt-4 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            <section className="glass relative overflow-hidden transition-all py-16 md:py-24">
                {gameHeaderData?.backgroundId && (
                    <div className="absolute inset-0">
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_720p/${gameHeaderData.backgroundId}.webp`}
                            alt={`${title}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/50 to-gray-900/30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60" />
                    </div>
                )}
                <div className="flex justify-center items-top max-w-[80vw] mx-auto">
                    <div className="flex-none z-10">
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameHeaderData?.image_id}.webp`}
                            className="max-w-[280px] rounded-lg glass"
                            alt={`${title}`}
                            width={gameHeaderData?.width ? gameHeaderData.width : 48}
                            height={gameHeaderData?.height ? gameHeaderData.height : 48}
                        />
                    </div>
                    <div className="flex-1 relative z-10 container mx-auto px-4">
                        <div className="glass py-4 px-6 rounded-lg mb-4">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white pt-2">
                            {title} {gameHeaderData?.released && (
                                <span className="text-base text-gray-300/80">
                                    {gameHeaderData?.released ? `(${new Date(gameHeaderData.released).toLocaleDateString("en-US", { 
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })})` : ""}
                                </span>
                            )}
                        </h1>
                        {subtitle && (
                            <p className="my-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-100">
                                {subtitle}
                            </p>
                        )}
                        </div>
                        <div className="flex justify-start gap-4">
                        {gameHeaderData?.platforms && (
                            <PlatformGrid platforms={gameHeaderData.platforms} />
                        )}
                        {gameHeaderData?.rating && (
                            <span className="glass flex items-center gap-2 text-3xl px-4 py-4 rounded-lg"><Star className="w-8 h-8 text-yellow-300" /> 
                            {Number(gameHeaderData?.rating?.toFixed(0)) / 10}</span>  
                        )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GameHeader;
