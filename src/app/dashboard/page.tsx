import HeroTitle from "@/components/ui/HeroTitle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        redirect("/api/auth/login?redirect_uri=/dashboard");
    }
    return (
    
    <HeroTitle title="My Dashboard" subtitle="My saved games." />

    );
};

export default DashboardPage;
