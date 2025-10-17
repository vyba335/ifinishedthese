import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserBlockClient from "./UserBlockClient";

export const UserBlock = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    return <UserBlockClient isLoggedIn={isLoggedIn} />;
};
