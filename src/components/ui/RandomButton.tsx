"use client";
import { Shuffle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RandomButton = () => {
    const router = useRouter();
    const handleRandomClick = () => {
        const randomGameId = Math.floor(Math.random() * (Math.floor(30000) - Math.ceil(1) + Math.ceil(1)));
        router.replace(`/game/id/${randomGameId}`);
    }

    return (
        <button
        type="button"
        className="flex justify-evenly items-center gap-2 btn-primary rounded-lg transition-colors text-gray-400 hover:text-purple-400"
        onClick={handleRandomClick}
        >
            <Shuffle className="w-4 h-4" />
            Random Game
        </button>
    )
}

export default RandomButton;