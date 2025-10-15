"use client";
import React, { useEffect } from "react";
import type { PopularGame, UserGameEntry } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import GameRating from "./GameRating";
import GameReview from "./GameReview";

interface GameCardProps {
    gameData: PopularGame;
    userGameData?: null | UserGameEntry;
    isDashboard: boolean;
    isEditing: boolean
}

export const GameCard: React.FC<GameCardProps> = ({
    gameData,
    userGameData,
    isDashboard,
    isEditing
}) => {
    const router = useRouter();

    const handleGameCardClick = () => {
        router.push(`/game/id/${gameData.id}`);
    };
    useEffect(() => {
        console.log("Game Data:", gameData);
        console.log("User Game Data:", userGameData);
    }, [gameData, userGameData]);

    return (
        <div className="group">
            <div
                className={`h-full max-w-[300px] card glass ${
                    !isDashboard ? "card-interactive cursor-pointer" : ""
                }`}
                {...(!isDashboard && { onClick: handleGameCardClick })}
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
                    {isDashboard && (
                        <button
                            onClick={handleGameCardClick}
                            className="btn-secondary absolute bottom-5 left-5 z-10 hidden md:visible group-hover:block transition-all"
                            data-theme="dark"
                        >
                            Go to detail
                        </button>
                    )}
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
                                    {gameData.first_release_date
                                        ? new Date(
                                              gameData.first_release_date * 1000
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })
                                        : "TBA"}
                                </span>
                            </div>
                            <GameRating
                                gameData={gameData}
                                userRating={userGameData?.myRating}
                                isDashboard={isDashboard}
                                isEditing={isEditing}
                            />
                            {isDashboard && (
                                <GameReview
                                    review={userGameData?.myReview}
                                    gameId={String(gameData.id)}
                                    isEditing={isEditing}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
