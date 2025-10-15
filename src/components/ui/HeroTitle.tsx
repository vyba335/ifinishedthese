import {
    getKindeServerSession,
    LoginLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

interface HeroTitleProps {
    title: string;
    subtitle?: string;
    isHome?: boolean;
    isDashboardEmpty?: boolean;
}

const HeroTitle: React.FC<HeroTitleProps> = async ({
    title,
    subtitle,
    isHome,
    isDashboardEmpty,
}) => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    return (
        <div className="flex flex-col justify-center min-h-[300px] text-center">
            <section className="glass relative overflow-hidden transition-all py-16 md:py-24">
                <div className="flex flex-col justify-center items-center items-top max-w-[80vw] mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-100">
                            {subtitle}
                        </p>
                    )}
                    {!isHome || isLoggedIn ? (
                        isDashboardEmpty ? null : (
                        <p className="text-xl text-[#0bedf5] mt-2">
                            Save games by clicking the &quot;Save
                            Game&quot; button on the game page.
                        </p>
                        )
                    ) : (
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <p className="text-xl text-[#0bedf5] mt-2">
                                Start by creating an account, it&apos;s{" "}
                                <span className="underline">free</span> and only
                                takes a minute!
                            </p>
                            <div className="flex flex-row">
                                <RegisterLink>
                                    <div className="rounded text-gray-300 hover:text-white bg-gradient-to-br from-[#141052] to-[#2f053b] hover:from-[#1e1877] hover:to-[#530968] px-4 py-2 cursor-pointer transition-colors">
                                        Register
                                    </div>
                                </RegisterLink>
                                <LoginLink>
                                    <div className="rounded-lg text-gray-500 hover:text-yellow-400 px-4 py-2 cursor-pointer transition-colors">
                                        Login
                                    </div>
                                </LoginLink>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HeroTitle;
