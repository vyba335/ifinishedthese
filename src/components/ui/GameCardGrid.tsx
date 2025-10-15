"use client";
import { Suspense, useState } from "react";
import type { PopularGame, UserData } from "@/types/types";
import { GameCard } from "./GameCard";
import { GameCardGridSkeleton } from "../features/LoadingStates";

interface GridContentProps {
    popularGameData?: null | PopularGame[];
    userGameData?: null | PopularGame[];
    userData?: null | UserData;
    isDashboard: boolean;
}

const GridContent = ({
    popularGameData,
    userGameData,
    userData,
    isDashboard,
}: GridContentProps) => {
    let gamesData: PopularGame[];
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    if (isDashboard) {
        gamesData = userGameData ?? [];
        if (!gamesData || gamesData.length === 0) {
            return (
                <h1 className="error-message">
                    There was an error passing user games data.
                </h1>
            );
        }
    } else {
        gamesData = popularGameData ?? [];
        console.log(popularGameData);

        if (!gamesData || gamesData.length === 0) {
            return (
                <h1 className="error-message">
                    There was an error fetching the popular games data.
                </h1>
            );
        }
    }

    if (!gamesData) {
        return (
            <h1 className="error-message">
                There was an error fetching the popular games data.
            </h1>
        );
    }

    return (
        <section className="flex flex-col py-4">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl leading-none mb-2">
                    {isDashboard ? "My saved games" : "Most popular games"}
                </h2>
                {isDashboard && (
                    <button
                        onClick={handleEditClick}
                        className={`${
                            isEditing
                                ? "text-green-700 hover:text-red-700"
                                : "text-gray-500 hover:text-green-600"
                        } text-xl cursor-pointer transition-all`}
                        data-theme="dark"
                    >
                        (Edit mode{isEditing ? " ON" : ""})
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center p-5">
                {gamesData.map((gameData) => {
                    const userGameData = userData?.game?.find(
                        (userGame) => userGame.id === String(gameData.id)
                    );

                    return (
                        <GameCard
                            key={gameData.id}
                            gameData={gameData}
                            userGameData={userGameData}
                            isDashboard={isDashboard}
                            isEditing={isEditing}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const GameCardGrid = ({
    popularGameData,
    userGameData,
    isDashboard,
    userData,
}: GridContentProps) => {
    return (
        <Suspense fallback={<GameCardGridSkeleton />}>
            <GridContent
                popularGameData={popularGameData}
                userGameData={userGameData}
                isDashboard={isDashboard}
                userData={userData}
            />
        </Suspense>
    );
};

export default GameCardGrid;
