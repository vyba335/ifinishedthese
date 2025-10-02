import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        userKindeId: Number,
        game: {
            id: Number,
            myRating: Number,
            myReview: String,
            finishDate: String,
            numberOfReplays: Number,
            additionalReplays: [String],
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;