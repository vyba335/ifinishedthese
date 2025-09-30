import RandomButton from "@/components/ui/RandomButton";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center">
            <div className="flex flex-col justify-center min-h-[400px] w-screen">
                <section className="glass relative overflow-hidden transition-all py-16 md:py-24">
                    <div className="flex flex-col justify-center items-center items-top max-w-[80vw] mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white pt-2">
                            Not Found
                        </h1>
                        <p className="my-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-100">
                            Game with this ID is not in the IGDB database. 
                            Try again: 
                        </p>
                        <RandomButton />
                    </div>
                </section>
            </div>
        </main>
    );
}
