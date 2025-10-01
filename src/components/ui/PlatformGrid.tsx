//import Image from "next/image";

interface Platform {
    id: number;
    name: string;
    url: string;
    platform_logo: {
        id: number;
        image_id: string;
        width: number;
        height: number;
    };
}

const PLATFORM_LIMIT = 3;

const PlatformGrid = ({ platforms, gameUrl }: { platforms: Platform[], gameUrl: string }) => {
    const platformsLength = platforms.length;
    return (
        <div className="flex flex-wrap justify-center py-2 rounded-lg items-center gap-2">
            {platforms.slice(0, PLATFORM_LIMIT).map((platform) => (
                <span key={platform.id} className="platform-grid mb-5 md:mb-0"><a className="btn-secondary" href={platform.url} target="_blank" data-theme="dark">{platform.name}</a> </span>
            ))}
            {platformsLength <= PLATFORM_LIMIT ? (
                null
            ) : (
                <span className="platform-grid"><a className="btn-ghost" href={gameUrl} target="_blank" data-theme="dark">More on IGDB</a> </span>
            )}
        </div>
    );
};

export default PlatformGrid;

{
    /* <Image
            alt={platform.name}
            key={platform.id}
            src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`}
            width={platform.platform_logo.width}
            height={platform.platform_logo.height}
            className="h-[30px] w-auto px-4"
        /> */
}
