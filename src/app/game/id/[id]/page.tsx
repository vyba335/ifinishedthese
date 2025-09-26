import { fetchGameData } from "@/utils/dataHelper";
import { notFound } from "next/navigation";
import GameHeader from "@/components/ui/GameHeader";

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

    const gameHeaderData = {
        backgroundId: game?.artworks ? game.artworks[0].image_id :  "",
        image_id: game?.cover?.image_id,
        width: game?.cover?.width,
        height: game?.cover?.height,
        released: game.first_release_date,
        platforms: game.platforms,
        rating: game.rating,
    } as GameHeaderData;

    return (
        <main className="flex items-center justify-center">
            <GameHeader
                title={game.name}
                subtitle={game.summary}
                gameHeaderData={gameHeaderData}
            />
        </main>
    );
}
