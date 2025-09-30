import { fetchPopularGamesData } from "@/utils/dataHelper";
import { Suspense, use } from "react";
import type { PopularGame } from "@/types/types";
import { GameCard } from "./GameCard";
import { GameCardGridSkeleton } from "../features/LoadingStates";

const GridContent = () => {
    const gamesData: PopularGame[] = use(fetchPopularGamesData());

    if (!gamesData) {
        return (
            <h1 className="error-message">
                There was an error fetching the popular games data.
            </h1>
        );
    }

    return (
        <section className="flex flex-col">
            <div className="flex justify-center items-center"><h2 className="text-3xl">Most popular games</h2></div>
            <div className="flex flex-wrap gap-2 justify-center p-5">
            {gamesData.map((gameData) => (
                <GameCard key={gameData.id} gameData={gameData} />
            ))}
            </div>
        </section>
    );
};

const GameCardGrid = () => {
    return (
        <Suspense fallback={<GameCardGridSkeleton />}>
            <GridContent />
        </Suspense>
    );
};

export default GameCardGrid;
