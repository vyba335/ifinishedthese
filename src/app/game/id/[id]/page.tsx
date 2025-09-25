import { fetchGameData } from "@/utils/dataHelper";
import { notFound } from "next/navigation";
import HeroTitle from "@/components/ui/HeroTitle";

interface GamePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function GamePage({ params }: GamePageProps) {
    const resolvedParams = await params;
    const game = await fetchGameData(resolvedParams.id);

    if (!game) {
        notFound();
    }

    return (
        <main className="flex items-center justify-center">
            <HeroTitle title={game.name} subtitle={game.summary} backgroundId={game.artworks ? game.artworks[0]?.image_id : null} />
        </main>
    )
}