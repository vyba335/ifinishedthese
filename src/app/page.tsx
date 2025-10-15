import GameCardGrid from "@/components/ui/GameCardGrid";
import HeroTitle from "@/components/ui/HeroTitle";
import { PopularGame } from "@/types/types";
import { fetchPopularGamesData } from "@/utils/dataHelper";

const Home = async () => {
    const popularGameData: PopularGame[] = await fetchPopularGamesData(50);
    console.log(popularGameData);
    return (
        <main>
            <HeroTitle title="I Finished These!" subtitle="Save your finished games, write review for them and share your list!" isHome={true} />
            <GameCardGrid popularGameData={popularGameData} isDashboard={false} />
        </main>
    );
}

export default Home;