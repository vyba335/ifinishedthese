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
                        myRating: -1,
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
                        myRating: -1,
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

export async function removeGame(gameId: string) {
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
            return { success: false, message: "User data not found" };
        }

        const initialGameCount = userData.game.length;
        userData.game = userData.game.filter(
            (game: { id: string }) => game.id !== gameId
        );

        if (userData.game.length === initialGameCount) {
            return { success: false, message: "Game not found in user's saved games" };
        }

        await userData.save();
        return { success: true, message: "Game removed from saved games." };
    } catch (error) {
        console.error("Error removing game:", error);
        return { success: false, message: "Failed to remove game." };
    }
}

export async function updateGameRating(gameId: string, rating: number) {
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
            return { success: false, message: "User data not found" };
        }

        const gameIndex = userData.game.findIndex(
            (game: { id: string }) => game.id === gameId
        );

        if (gameIndex === -1) {
            return { success: false, message: "Game not found in user's saved games" };
        }

        userData.game[gameIndex].myRating = rating;
        await userData.save();
        return { success: true, message: "Game rating updated." };
    } catch (error) {
        console.error("Error updating game rating:", error);
        return { success: false, message: "Failed to update game rating." };
    }
}

export async function updateGameReview(gameId: string, review: string) {
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
            return { success: false, message: "User data not found" };
        }

        const gameIndex = userData.game.findIndex(
            (game: { id: string }) => game.id === gameId
        );

        if (gameIndex === -1) {
            return { success: false, message: "Game not found in user's saved games" };
        }

        userData.game[gameIndex].myReview = review;
        await userData.save();
        return { success: true, message: "Game review updated." };
    } catch (error) {
        console.error("Error updating game review:", error);
        return { success: false, message: "Failed to update game review." };
    }
}

