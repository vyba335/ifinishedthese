import mongoose, { Document, Model } from "mongoose";

export interface GameInterface {
    // Required fields - present in both examples
    gameId: number;
    name: string;
    slug: string;

    // Fields present in both but could be empty arrays/undefined
    url?: string;
    created_at?: number;
    updated_at?: number;
    checksum?: string;
    game_type?: number;
    alternative_names?: number[];
    artworks?: number[];
    bundles?: number[];
    external_games?: number[];
    game_engines?: number[];
    game_modes?: number[];
    genres?: number[];
    involved_companies?: number[];
    keywords?: number[];
    platforms?: number[];
    player_perspectives?: number[];
    release_dates?: number[];
    screenshots?: number[];
    similar_games?: number[];
    tags?: number[];
    themes?: number[];
    videos?: number[];
    websites?: number[];
    language_supports?: number[];
    collections?: number[];

    // Optional fields - not present in all games
    age_ratings?: number[];
    aggregated_rating?: number;
    aggregated_rating_count?: number;
    cover?: number;
    dlcs?: number[];
    expansions?: number[];
    first_release_date?: number;
    franchises?: number[];
    hypes?: number;
    rating?: number;
    rating_count?: number;
    storyline?: string;
    summary?: string;
    total_rating?: number;
    total_rating_count?: number;
    game_localizations?: number[];
}

export interface GameDocument extends GameInterface, Document {
    createdAt: Date;
    updatedAt: Date;
}

const gameSchema = new mongoose.Schema<GameDocument>({
    id: {
        type: Number,
        required: [true, "Please provide ID"],
    },
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    slug: {
        type: String,
        required: [true, "Please provide slug"],
    },
    url: {
        type: String,
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    },
    checksum: {
        type: String,
    },
    game_type: {
        type: Number,
    },
    alternative_names: {
        type: [Number],
    },
    artworks: {
        type: [Number],
    },
    bundles: {
        type: [Number],
    },
    external_games: {
        type: [Number],
    },
    game_engines: {
        type: [Number],
    },
    game_modes: {
        type: [Number],
    },
    genres: {
        type: [Number],
    },
    involved_companies: {
        type: [Number],
    },
    keywords: {
        type: [Number],
    },
    platforms: {
        type: [Number],
    },
    player_perspectives: {
        type: [Number],
    },
    release_dates: {
        type: [Number],
    },
    screenshots: {
        type: [Number],
    },
    similar_games: {
        type: [Number],
    },
    tags: {
        type: [Number],
    },
    themes: {
        type: [Number],
    },
    videos: {
        type: [Number],
    },
    websites: {
        type: [Number],
    },
    language_supports: {
        type: [Number],
    },
    collections: {
        type: [Number],
    },
    age_ratings: {
        type: [Number],
    },
    aggregated_rating: {
        type: Number,
    },
    aggregated_rating_count: {
        type: Number,
    },
    cover: {
        type: Number,
    },
    dlcs: {
        type: [Number],
    },
    expansions: {
        type: [Number],
    },
    first_release_date: {
        type: Number,
    },
    franchises: {
        type: [Number],
    },
    hypes: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    rating_count: {
        type: Number,
    },
    storyline: {
        type: String,
    },
    summary: {
        type: String,
    },
    total_rating: {
        type: Number,
    },
    total_rating_count: {
        type: Number,
    },
    game_localizations: {
        type: [Number],
    },
}, {
    timestamps: true,
});

const Game: Model<GameDocument> = mongoose.models?.Game || mongoose.model("Game", gameSchema);

export default Game;
