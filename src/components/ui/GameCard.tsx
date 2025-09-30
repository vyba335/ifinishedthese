"use client";
import React from "react";
import type { PopularGame } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Star } from "lucide-react";

interface GameCardProps {
    gameData: PopularGame;
}

export const GameCard: React.FC<GameCardProps> = ({ gameData }) => {
    const router = useRouter();

    const handleGameCardClick = () => {
        router.push(`/game/id/${gameData.id}`);
    };

    return (
        <div className="group">
            <div
                className="h-full max-w-[300px] card card-interactive glass"
                onClick={handleGameCardClick}
            >
                <div className="relative">
                    <Image
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.webp`}
                        alt={`${gameData.name} cover`}
                        width={500}
                        height={320}
                        className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                    <div className="mb-3">
                        <h3 className="text-xl text-wrap font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-1">
                            {gameData.name}
                        </h3>
                        <div className="flex flex-col items-start gap-2 mt-1">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <Calendar className="w-3 h-3" />
                                <span>
                                    {gameData.first_release_date ? new Date(gameData.first_release_date * 1000).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }) : (
                                        "TBA"
                                    )}
                                </span>
                            </div>
                            {gameData.rating && gameData.rating_count && (
                                <div className="glass flex flex-col rounded-lg jsutify-center items-center text-center px-4 py-2">
                                    <div className="flex justify-center items-center gap-2 text-2xl leading-none">
                                        <Star className="w-8 h-8 text-yellow-300" />
                                        <span>
                                            {Number(gameData.rating.toFixed(0)) / 10}/10
                                        </span>
                                    </div>
                                    <div className="col-span-2 h-auto">
                                        {gameData.rating_count > 1000
                                            ? `${(
                                                  gameData.rating_count / 1000
                                              ).toFixed(0)}k+`
                                            : gameData.rating_count}{" "}
                                        user ratings
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
