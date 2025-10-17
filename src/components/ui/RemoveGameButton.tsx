"use client";
import { removeGame } from "@/utils/saveGame";
import { useRouter } from "next/navigation";

const RemoveGameButton = ({ gameId }: { gameId: string }) => {
    const router = useRouter();

    const handleClick = async () => {
        await removeGame(gameId);
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="text-red-600 cursor-pointer max-w-[320px] w-[100vw] md:w-auto"
        >
            Delete Game
        </button>
    );
};

export default RemoveGameButton;
