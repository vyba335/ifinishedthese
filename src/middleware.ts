import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
    async function middleware(req: { kindeAuth: unknown; }) {
        console.log(req.kindeAuth);
    },
    {
        isReturnToCurrentPage: true,
        loginPage: "/api/auth/login",
        publicPaths: ["/"]
    }
);

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    ],
};
