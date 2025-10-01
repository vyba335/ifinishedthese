import type { ArtworkData } from "@/types/types";
import Image from "next/image";

interface ImageGridProps {
    artworks: ArtworkData[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ artworks }) => {
    return (
        <section className="flex flex-col justify-center items-center py-4 max-w-[1400px]">
            <div className="glass w-full text-center py-6 rounded-lg"><h2 className="text-2xl">{artworks ? "Artworks" : "No artworks"}</h2></div>
            <div className="columns-1 md:columns-2 py-6">
                {artworks ? (
                    artworks.map((artwork) => (
                        <div key={artwork.id} className="w-full">
                            <Image
                                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${artwork.image_id}.webp`}
                                placeholder="blur"
                                blurDataURL={`https://images.igdb.com/igdb/image/upload/t_720p/${artwork.image_id}.webp`}
                                width={1920}
                                height={1080}
                                className="glass w-screen rounded-lg mb-4"
                                alt={artwork.artwork_type.name}
                                loading="lazy"
                            />
                        </div>
                    ))
                ) : (
                    <h2>No artworks</h2>
                )}
            </div>
        </section>
    );
};
