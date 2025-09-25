export class TwitchTokenManager {
    private tokenCache: {
        access_token: string;
        expires_at: number;
    } | null = null;

    async getAccessToken(): Promise<string> {
        const currentTime = Date.now();

        if (this.tokenCache && currentTime < this.tokenCache.expires_at) {
            console.log("Using cached access token");
            return this.tokenCache.access_token;
        }

        console.log("Fetching new access token");

        const clientId = process.env.TWITCH_ID;
        const clientSecret = process.env.TWITCH_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error("Missing required environment variables: TWITCH_ID and/or TWITCH_SECRET");
        }

        try {
            const response = await fetch(
                `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
                { method: "POST" }
            );

            if (!response.ok) {
                throw new Error(`Failed to get access token: ${response.status}`);
            }

            const result = await response.json();

            this.tokenCache = {
                access_token: result.access_token,
                expires_at: currentTime + (result.expires_in * 1000) - (5 * 60 * 1000)
            };

            return result.access_token;
        } catch (error) {
            console.error("Error fetching access token:", error);
            throw error;
        }
    }

    clearCache(): void {
        this.tokenCache = null;
    }
}