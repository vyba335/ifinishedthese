import User from "@/lib/models/userModel";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userKindeId, game } = await request.json();
        await connectToMongoDB();
        await User.create({ userKindeId, game });
        return NextResponse.json({ message: "User Created "}, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create user" }, {status: 500 });
    }
}