"use client";
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

const RandomButton = () => {
    const router = useRouter();
    const handleRandomClick = () => {
        const randomGameId = Math.floor(
            Math.random() * (Math.floor(371044) - Math.ceil(1) + Math.ceil(1))
        );
        router.push(`/game/id/${randomGameId}`);
    };

    return (
        <button
            title="Go to a random game"
            type="button"
            className="md:btn-primary group/random px-1 hover:px-0.5"
            onClick={handleRandomClick}
        >
            <Shuffle className="w-5 h-5 group-hover/random:text-[#54ff48] group-hover/random:h-6 group-hover/random:w-6 group-hover/random:cursor-pointer" />
        </button>
    );
};

export default RandomButton;
