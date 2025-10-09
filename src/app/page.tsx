import GameCardGrid from "@/components/ui/GameCardGrid";
import HeroTitle from "@/components/ui/HeroTitle";

export default function Home() {
    return (
        <main>
            <HeroTitle title="I Finished These!" subtitle="Save your finished games, write review for them and share your list!" />
            <GameCardGrid />
        </main>
    );
}
