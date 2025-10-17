import { fetchGameData } from "@/utils/dataHelper";
import { notFound } from "next/navigation";
import GameHeader from "@/components/ui/GameHeader";
import { Suspense, use } from "react";
import { GameHeaderSkeleton } from "@/components/features/LoadingStates";
import { ImageGrid } from "@/components/ui/ImageGrid";

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

interface GamePageProps {
    params: Promise<{
        id: string;
    }>;
}

function GameContent({ id }: { id: string }) {
    const game = use(fetchGameData(id));

    if (!game) {
        notFound();
    }

    const gameHeaderData = {
        backgroundId: game?.artworks ? game.artworks[0].image_id : "",
        gameUrl: game.url,
        image_id: game?.cover?.image_id,
        width: game?.cover?.width,
        height: game?.cover?.height,
        released: game.first_release_date,
        platforms: game.platforms,
        rating: game.rating,
        ratingCount: game.rating_count,
    } as GameHeaderData;

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <GameHeader
                title={game.name}
                subtitle={game.summary}
                gameHeaderData={gameHeaderData}
                gameId={id}
            />
            {game.artworks && (
                <section className="flex flex-col justify-center items-center py-4 max-w-[1400px]">
                    <div className="glass w-full text-center py-6 rounded">
                        <h2 className="text-2xl">Artworks</h2>
                    </div>
                    <ImageGrid images={game.artworks} name="Artwork" />
                </section>
            )}
        </div>
    );
}

export default function GamePage({ params }: GamePageProps) {
    const resolvedParams = use(params);

    return (
        <main className="flex items-center justify-center">
            <Suspense fallback={<GameHeaderSkeleton />}>
                <GameContent id={resolvedParams.id} />
            </Suspense>
        </main>
    );
}
