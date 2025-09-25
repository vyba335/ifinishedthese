import Game from "@/models/gameModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const deleteGame = async (id: FormData) => {
    const gameId = id.get("id");
    try {
        await Game.deleteOne({_id: gameId});
        revalidatePath("/");
        return ("game deleted");
    } catch (error) {
        console.log(error);
        return {message: "error deleting game"};
    }
}