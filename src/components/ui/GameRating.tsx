"use client";
import { PopularGame } from "@/types/types";
import { CirclePlus, Pencil, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { updateGameRating } from "@/utils/saveGame";
import { useRouter } from "next/navigation";

const RATING_COLOR = {
    colors: {
        0: "text-[#FF0000]",
        1: "text-[#FF3300]",
        2: "text-[#FF6600]",
        3: "text-[#FF9900]",
        4: "text-[#FFCC00]",
        5: "text-[#FFFF00]",
        6: "text-[#CCFF00]",
        7: "text-[#99FF00]",
        8: "text-[#66FF00]",
        9: "text-[#33FF00]",
        10: "text-[#00FF00]",
    },
    getColor: function (rating: number) {
        return this.colors[rating as keyof typeof this.colors];
    },
};

interface GameRatingProps {
    gameData: PopularGame;
    userRating?: number;
    isDashboard?: boolean;
    isEditing: boolean;
}

const GameRating: React.FC<GameRatingProps> = ({
    gameData,
    userRating,
    isDashboard,
    isEditing,
}) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState<number>(
        userRating !== undefined ? userRating : -1
    );
    const [hoverRating, setHoverRating] = useState<number>(0);

    useEffect(() => {
        if (userRating !== undefined) {
            setSelectedRating(userRating);
        }
    }, [userRating]);

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
    };
    const handleMouseEnter = (rating: number) => {
        setHoverRating(rating);
    };
    const handleMouseLeave = () => {
        setHoverRating(0);
    };
    return (
        <div className="flex flex-col items-center mt-2">
            {gameData.rating && gameData.rating_count && !isDashboard && (
                <div className="glass flex flex-col rounded-lg px-4 py-2">
                    <div className="flex justify-center items-center gap-2">
                        <div className="flex flex-col items-center">
                            <span className={`text-2xl leading-none ${RATING_COLOR.getColor(Number((gameData.rating / 10).toPrecision(1)))}`}>
                                {Number(gameData.rating.toFixed(0)) / 10}
                                /10
                            </span>
                            <span className="h-auto">
                                {gameData.rating_count > 1000
                                    ? `${(gameData.rating_count / 1000).toFixed(
                                          0
                                      )}k+`
                                    : gameData.rating_count}{" "}
                                total ratings
                            </span>
                        </div>
                    </div>
                </div>
            )}
            {isDashboard &&
                gameData.rating &&
                gameData.rating_count &&
                selectedRating !== undefined &&
                selectedRating !== -1 && (
                    <div className="flex flex-col items-center">
                        <div className="glass flex flex-col rounded-lg px-4 py-2">
                            <div className="flex justify-center items-center gap-2 pb-2">
                                <div className="flex flex-col items-center">
                                    <span
                                        className={`text-2xl leading-none ${RATING_COLOR.getColor(selectedRating)}`}
                                    >
                                        {selectedRating}
                                        /10
                                    </span>
                                    <div className="flex items-center justify-center min-w-[73px]">
                                        <span className="h-auto">
                                            My Rating
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr className="text-gray-600" />
                            <div className="text-gray-400">
                                {Number(gameData.rating.toFixed(0)) / 10}
                                /10 -{" "}
                                {gameData.rating_count > 1000
                                    ? `${(gameData.rating_count / 1000).toFixed(
                                          0
                                      )}k+`
                                    : gameData.rating_count}{" "}
                                total
                            </div>
                            <button
                                onClick={openModal}
                                className={`${
                                    isEditing ? "flex" : "hidden"
                                } border border-green-600 mt-2 justify-center items-center gap-2 cursor-pointer py-1.5 px-2 rounded-lg`}
                                aria-label="Edit Rating"
                            >
                                <Pencil className="w-4 h-4 text-green-600" />
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
                )}
            {isDashboard &&
                gameData.rating &&
                gameData.rating_count &&
                selectedRating === -1 && (
                    <div className="glass flex flex-col rounded-lg px-4 py-2">
                        <div className="flex justify-center items-center gap-2 pb-2">
                            <div className="flex flex-col items-center">
                                <span className="text-red-400">
                                    Not rated yet
                                </span>
                            </div>
                        </div>
                        <hr className="text-gray-600" />
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-gray-400">
                                {Number(gameData.rating.toFixed(0)) / 10}
                                /10 -{" "}
                                {gameData.rating_count > 1000
                                    ? `${(gameData.rating_count / 1000).toFixed(
                                          0
                                      )}k+`
                                    : gameData.rating_count}{" "}
                                total
                            </div>
                            <button
                                onClick={openModal}
                                className="btn-ghost flex items-center justify-center gap-2 text-gray-200 cursor-pointer"
                                aria-label="Add Rating"
                                data-theme="dark"
                            >
                                <CirclePlus className="w-4 h-4" />
                                <span>Add Rating</span>
                            </button>
                        </div>
                    </div>
                )}
            {isModalOpen && (
                <RatingModal
                    closeModal={closeModal}
                    gameData={gameData}
                    selectedRating={selectedRating}
                    handleRatingSelect={handleRatingSelect}
                    hoverRating={hoverRating}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    router={router}
                />
            )}
        </div>
    );
};

export default GameRating;

interface RatingModalProps {
    closeModal: () => void;
    gameData: PopularGame;
    selectedRating: number;
    handleRatingSelect: (rating: number) => void;
    hoverRating: number;
    handleMouseEnter: (rating: number) => void;
    handleMouseLeave: () => void;
    router: ReturnType<typeof useRouter>;
}
const RatingModal: React.FC<RatingModalProps> = ({
    closeModal,
    gameData,
    selectedRating,
    handleRatingSelect,
    hoverRating,
    handleMouseEnter,
    handleMouseLeave,
    router,
}) => {
    const ratingRef = useRef(selectedRating);
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center rounded-lg p-6 w-60 max-w-md glass-dark gap-2">
                <h2 className="text-xl font-bold text-center">
                    Rate {gameData.name}
                </h2>
                <div className={`text-4xl ${RATING_COLOR.getColor(selectedRating)}`}>
                    {selectedRating === -1 ? "0" : selectedRating}/10
                </div>
                <div className="flex justify-center">
                    {[...Array(10)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <Star
                                key={ratingValue}
                                className={`w-5 h-5 cursor-pointer ${
                                    (hoverRating || selectedRating) >=
                                    ratingValue
                                        ? RATING_COLOR.getColor(ratingValue)
                                        : "text-gray-300"
                                }`}
                                onClick={() => handleRatingSelect(ratingValue)}
                                onMouseEnter={() =>
                                    handleMouseEnter(ratingValue)
                                }
                                onMouseLeave={handleMouseLeave}
                                aria-label={`Rate ${ratingValue} out of 10`}
                            />
                        );
                    })}
                </div>
                <div
                    className="btn-secondary"
                    data-theme="dark"
                    onClick={() => handleRatingSelect(0)}
                >
                    Give it a 0! Terrible!
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => {
                            handleRatingSelect(ratingRef.current);
                            closeModal();
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                        aria-label="Cancel Rating"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            await updateGameRating(
                                gameData.id.toString(),
                                selectedRating
                            );
                            closeModal();
                            router.refresh();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        aria-label="Save Rating"
                        disabled={selectedRating === -1}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
