import React from "react";
import Image from "next/image";
import PlatformGrid from "./PlatformGrid";
import { BookText, Star } from "lucide-react";

interface GameHeaderData {
    backgroundId: string | null | undefined;
    gameUrl: string;
    image_id: string | null | undefined;
    height: number | null | undefined;
    width: number | null | undefined;
    released: number | null | undefined;
    platforms:
        | {
              id: number;
              name: string;
              url: string;
              platform_logo: {
                  id: number;
                  image_id: string;
                  width: number;
                  height: number;
              };
          }[]
        | null
        | undefined;
    rating: number | 0;
    ratingCount: number | 0;
}

interface GameHeaderProps {
    title: string;
    subtitle?: string;
    gameHeaderData?: GameHeaderData | null;
}

const GameHeader: React.FC<GameHeaderProps> = ({
    title,
    subtitle,
    gameHeaderData,
}) => {
    return (
        <div className="w-screen mt-4 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
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
                <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-2 sm:gap-0 items-top max-w-[95vw] md:max-w-[1400px] mx-auto">
                    <div className="flex-none z-10">
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameHeaderData?.image_id}.webp`}
                            className="w-[280px] rounded-lg glass"
                            alt={`${title}`}
                            width={
                                gameHeaderData?.width
                                    ? gameHeaderData.width
                                    : 48
                            }
                            height={
                                gameHeaderData?.height
                                    ? gameHeaderData.height
                                    : 48
                            }
                        />
                    </div>
                    <div className="flex-1 relative z-10 container mx-auto px-4">
                        <div className="glass py-6 px-8 rounded-lg mb-4">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white pt-2">
                                {title}
                            </h1>
                            {gameHeaderData?.released && (
                                <span className="text-base text-gray-300/80">
                                    {gameHeaderData?.released
                                        ? `(${new Date(
                                              gameHeaderData.released * 1000
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })})`
                                        : `TBA`}
                                </span>
                            )}
                            {subtitle && (
                                <p className="mt-4 mb-6 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-100">
                                    <BookText className="float-left w-6 h-6 mr-2" />{subtitle}
                                </p>
                            )}
                            <a className="absolute bottom-4 right-4 text-right" href={gameHeaderData?.gameUrl} target="_blank">More on IGDB.com</a>
                        </div>
                        <div className="flex justify-start gap-4">
                            {gameHeaderData?.rating && (
                                <div className="glass flex flex-col rounded-lg justify-center items-center text-center px-4 py-2">
                                    <div className="flex justify-center items-center gap-2 text-2xl leading-none">
                                        <Star className="w-8 h-8 text-yellow-300" />
                                        <span>{Number(gameHeaderData?.rating?.toFixed(0)) / 10}/10</span>
                                    </div>
                                    <div className="col-span-2 h-auto">{gameHeaderData.ratingCount > 1000 ? `${(gameHeaderData.ratingCount / 1000).toFixed(0)}k+` : gameHeaderData.ratingCount} user ratings</div>
                                </div>
                            )}
                            {gameHeaderData?.platforms && (
                                <PlatformGrid
                                    platforms={gameHeaderData.platforms}
                                    gameUrl={gameHeaderData.gameUrl}
                                />
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GameHeader;
