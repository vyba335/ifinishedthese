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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userKindeId = searchParams.get("userKindeId");
        if (!userKindeId) {
            return NextResponse.json({ error: "Missing userKindeId" }, { status: 400 });
        } 
        await connectToMongoDB();
        const user = await User.findOne({ userKindeId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}