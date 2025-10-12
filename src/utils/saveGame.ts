"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectToMongoDB from "@/utils/db";
import User from "@/lib/models/userModel";

export async function checkIfGameSaved(gameId: string) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id) {
            return { isSaved: false };
        }

        const userKindeId = user.id as string;
        await connectToMongoDB();

        const userData = await User.findOne({ userKindeId });

        if (!userData) {
            return { isSaved: false };
        }

        const gameExists = userData.game.some(
            (game: { id: string }) => game.id === gameId
        );

        return { isSaved: gameExists };
    } catch (error) {
        console.error("Error checking if game is saved:", error);
        return { isSaved: false };
    }
}

export async function saveGame(gameId: string) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id) {
            return { success: false, message: "User not authenticated" };
        }

        const userKindeId = user.id as string;
        await connectToMongoDB();

        const userData = await User.findOne({ userKindeId });

        if (!userData) {
            const newUser = new User({
                userKindeId,
                game: [
                    { 
                        id: gameId,
                        myRating: 0,
                        myReview: "",
                        finishDate: "",
                        numberOfReplays: 0,
                        additionalReplays: [],
                    }
                ],
            });
            await newUser.save();

            return { success: true, message: "New user created and game saved." };
        } else {
            const gameExists = userData.game.some(
                (game: { id: number }) => game.id === parseInt(gameId)
            );

            if (gameExists) {
                return { success: true, message: "Game already saved." };
            } else {
                userData.game.push(
                    { 
                        id: gameId,
                        myRating: 0,
                        myReview: "",
                        finishDate: "",
                        numberOfReplays: 0,
                        additionalReplays: [],
                    }
                );
                await userData.save();
                return { success: true, message: "Game saved to existing user." };
            }
        }
    } catch (error) {
        console.error("Error saving game:", error);
        return { success: false, message: "Failed to save game." };
    }
}