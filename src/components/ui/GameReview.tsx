import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { updateGameReview } from "@/utils/saveGame";
import { useRouter } from "next/navigation";

interface GameReviewProps {
    review?: string;
    gameId: string;
    isEditing: boolean;
}

const GameReview: React.FC<GameReviewProps> = ({
    review,
    gameId,
    isEditing,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">My Review:</h4>
            {review ? (
                <div>
                    <p className="text-gray-300">{review}</p>
                    <button
                        onClick={openModal}
                        className={`${
                            isEditing ? "flex" : "hidden"
                        } border border-green-600 mt-2 justify-center items-center gap-2 cursor-pointer py-1.5 px-2 rounded-lg`}
                        aria-label="Edit Review"
                        data-theme="dark"
                    >
                        <Pencil className="w-4 h-4 text-green-600" />
                        <span>{isEditing ? "Edit" : "Editing"}</span>
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-gray-500 italic">
                        You haven&apos;t added a review yet.
                    </p>
                    <button
                        onClick={openModal}
                        className="btn-ghost flex items-center justify-center gap-2 text-gray-200 cursor-pointer"
                        aria-label="Add Rating"
                        data-theme="dark"
                    >
                        <CirclePlus className="w-4 h-4" />
                        <span>Add Review</span>
                    </button>
                </div>
            )}
            {isModalOpen && (
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    currentReview={review || ""}
                    gameId={gameId}
                    onSave={closeModal}
                    router={router}
                />
            )}
        </div>
    );
};

export default GameReview;

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentReview: string;
    gameId: string;
    onSave: (newReview: string) => void;
    router: ReturnType<typeof useRouter>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    currentReview,
    gameId,
    onSave,
    router,
}) => {
    const [reviewText, setReviewText] = useState(currentReview || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateGameReview(gameId, reviewText);
            onSave(reviewText);
            onClose();
        } catch (error) {
            console.error("Error saving review:", error);
        }
        setIsSaving(false);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
            <div className="glass-dark rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-white">
                    Edit Review
                </h2>
                <textarea
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    rows={10}
                />
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            await handleSave();
                            router.refresh();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};
