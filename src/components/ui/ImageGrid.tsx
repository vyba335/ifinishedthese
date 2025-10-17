import type { ArtworkData } from "@/types/types";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageGridProps {
    images: ArtworkData[];
    name: string;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, name }) => {
    return (
            <div className="columns-1 md:columns-2 py-6">
                {images ? (
                    images.map((image) => (
                        <div key={image.id} className="relative w-full">
                            <Image
                                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${image.image_id}.webp`}
                                placeholder="blur"
                                blurDataURL={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.webp`}
                                width={4000}
                                height={4000}
                                className="glass w-screen rounded mb-4"
                                alt={image.artwork_type.name}
                                loading="lazy"
                            />
                            <Link href={`https://images.igdb.com/igdb/image/upload/t_1080p_2x/${image.image_id}.png`} target="_blank">
                            <div className="absolute top-4 right-4 p-1 bg-gray-700/20 hover:bg-gray-700/60 rounded group/download hover:cursor-pointer hover:drop-shadow-sm hover:drop-shadow-green-400">
                                <Download className="w-8 h-8 opacity-40 group-hover/download:opacity-80 group-hover/download:text-[#54ff48]" />
                            </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <h2>No {name}</h2>
                )}
            </div>
    );
};
