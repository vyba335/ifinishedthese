export interface Game {
    id: number;
    name: string;
    rating?: number;
    rating_count?: number;
    summary?: string;
    storyline?: string;
    slug: string;
    url: string;
    first_release_date?: number;
    cover?: {
        id: number;
        image_id: string;
        height: number;
        width: number;
    };
    artworks?: Array<{
        id: number;
        image_id: string;
    }>;
    screenshots?: Array<{
        id: number;
        image_id: string;
    }>;
    videos?: Array<{
        id: number;
        video_id: string;
    }>;
    genres?: Array<{
        id: number;
        name: string;
    }>;
    game_engines?: Array<{
        id: number;
        name: string;
    }>;
    expansions?: Array<{
        id: number;
        name: string;
        cover?: {
            id: number;
            image_id: string;
        };
    }>;
    involved_companies?: Array<{
        id: number;
        developer: boolean;
        publisher: boolean;
        porting: boolean;
        supporting: boolean;
        company: {
            id: number;
            name: string;
        };
    }>;
    platforms?: Array<{
            id: number;
            name: string;
            url: string;
            platform_logo: Array<{
                id: number;
                image_id: string;
                width: number;
                height: number;
            }>
    }>
}
