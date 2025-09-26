import Image from "next/image";

interface Platform {
    id: number;
    name: string;
    platform_logo: {
        id: number;
        image_id: string;
        width: number;
        height: number;
    }
}

const PlatformGrid = ({ platforms }: { platforms: Platform[] }) => {
    return (
        <div className="inline-flex glass justify-center py-4 rounded-lg items-center">
            {platforms.map((platform) => (
                <Image
                    alt={platform.name}
                    key={platform.id}
                    src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`}
                    width={platform.platform_logo.width}
                    height={platform.platform_logo.height}
                    className="h-[30px] w-auto px-4"
                />
            ))}
        </div>
    );
};

export default PlatformGrid;
