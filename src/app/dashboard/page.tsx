import GameCardGrid from "@/components/ui/GameCardGrid";
import HeroTitle from "@/components/ui/HeroTitle";
import { PopularGame } from "@/types/types";
import { fetchMultipleGamesData } from "@/utils/dataHelper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/lib/models/userModel";
import connectToMongoDB from "@/utils/db";

const DashboardPage = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userKindeId = user?.id as string;

    await connectToMongoDB();
    const userData = await User.findOne({ userKindeId });
    const userGames = userData?.game || [];
    const gameIds = Array.isArray(userGames)
        ? userGames.map((game: { id: string }) => game.id).join(",")
        : "";
    if (!gameIds) {
        return (
            <>
                <HeroTitle title="My Dashboard" subtitle="My saved games." />
                <div className="flex justify-center py-4 glass-dark">
                    <p className="error-message">You have no saved games.</p>
                </div>
            </>
        );
    }

    const gamesData: PopularGame[] = await fetchMultipleGamesData(gameIds.length, gameIds);

    return (
        <>
            <HeroTitle title="My Finished Games" subtitle="My finished games with rating and a review." isDashboardEmpty={gameIds !== ""} />
            <GameCardGrid gameDataAsProp={gamesData} isDashboard={true} />
        </>
    );
};

export default DashboardPage;
