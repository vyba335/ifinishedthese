import type { Game } from "@/types/types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

let tokenCache: {
    access_token: string;
    expires_at: number; // timestamp when token expires
} | null = null;

const getAccessToken = async (): Promise<string> => {
    const currentTime = Date.now();

    // Check if we have a cached token that hasn't expired
    if (tokenCache && currentTime < tokenCache.expires_at) {
        console.log("Using cached access token");
        return tokenCache.access_token;
    }

    console.log("Fetching new access token");

    const clientId = process.env.TWITCH_ID;
    const clientSecret = process.env.TWITCH_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error(
            "Missing required environment variables: TWITCH_ID and/or TWITCH_SECRET"
        );
    }

    const requestOptions = {
        method: "POST",
    };

    try {
        const response = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Failed to get access token: ${response.status}`);
        }

        const result = await response.json();

        // Cache the token with expiration time (subtract 5 minutes for safety buffer)
        tokenCache = {
            access_token: result.access_token,
            expires_at: currentTime + result.expires_in * 1000 - 5 * 60 * 1000, // 5 minutes buffer
        };

        return result.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
};

const _fetchGameData = async (id: string): Promise<Game | null> => {
    const clientId = process.env.TWITCH_ID;
    const accessToken = await getAccessToken();

    if (!clientId || !accessToken) {
        throw new Error(
            "Missing required environment variables: clientId and/or accessToken"
        );
    }
    const myHeaders = new Headers();
    myHeaders.append("Client-ID", clientId);
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "text/plain");

    const raw = `fields id, artworks.image_id, cover.image_id, expansions.name, expansions.cover.image_id, first_release_date, game_engines.name, genres.name, involved_companies, involved_companies.developer, involved_companies.publisher, involved_companies.porting, involved_companies.supporting, involved_companies.company.name, name, rating, screenshots.image_id, slug, storyline, summary, url, videos.video_id;where id = ${id}; `;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch(
            "https://api.igdb.com/v4/games/",
            requestOptions
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }
        const result: Game[] = await response.json();

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error while fetching data:", error);
        throw error;
    }
};

const fetchGameDataRequest = cache(_fetchGameData);

export const fetchGameData = unstable_cache(
    fetchGameDataRequest,
    ["game-data"],
    {
        revalidate: 3600,
        tags: ["games"]
    }
);
