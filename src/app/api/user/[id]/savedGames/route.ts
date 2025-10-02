import { fetchPopularGamesData } from "@/utils/dataHelper";
import { NextRequest } from "next/server";

interface Params {
    id: number;
}
type SavedGames = Record<number, string[]>;

const savedGammes: SavedGames = {
    124: ["1942", "1235"], 
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const urlParams = await params;
    const userId = urlParams.id;
    const userSavedGameIds = fetchUserData();
}