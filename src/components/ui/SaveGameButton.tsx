"use client";
import { useState, useTransition, useEffect } from "react";
import { saveGame, checkIfGameSaved } from "@/utils/saveGame";
import { Check } from "lucide-react";

const SaveGameButton = ({ gameId }: { gameId: string }) => {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string>("");
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(true);

    useEffect(() => {
        const checkSavedStatus = async () => {
            const result = await checkIfGameSaved(gameId);
            setIsSaved(result.isSaved);
            setIsChecking(false);
        };
        checkSavedStatus();
    }, [gameId]);

    const handleClick = () => {
        if (isSaved) return;

        startTransition(async () => {
            const result = await saveGame(gameId);
            setMessage(result.message);
            if (result.success) {
                setIsSaved(true);
            }
        });
    };

    if (isChecking) {
        return (
            <button
                type="button"
                className="btn-primary"
                disabled
            >
                Loading...
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="btn-primary cursor-default"
            disabled={isPending || isSaved}
        >
            {isPending ? (
                "Saving..."
            ) : isSaved ? (
                <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Saved
                </span>
            ) : (
                "Save Game"
            )}
        </button>
    );
}

export default SaveGameButton;