"use client";
import { Shuffle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RandomButton = () => {
    const router = useRouter();
    const handleRandomClick = () => {
        const randomGameId = Math.floor(Math.random() * (Math.floor(371044) - Math.ceil(1) + Math.ceil(1)));
        router.push(`/game/id/${randomGameId}`);
    }

    return (
        <button
        title="Go to a random game"
        type="button"
        className="flex justify-evenly items-center gap-2 btn-primary"
        onClick={handleRandomClick}
        >
            <Shuffle className="w-5 h-5" />
        </button>
    )
}

export default RandomButton;