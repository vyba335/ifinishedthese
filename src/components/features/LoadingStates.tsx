import React from "react";
import { Skeleton } from "./Skeleton";
import { Star } from "lucide-react";

export const GameHeaderSkeleton: React.FC = () => {
    return (
        <div className="w-screen mt-4 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            <section className="glass relative overflow-hidden transition-all py-16 md:py-24">
                {/* Background skeleton */}
                <div className="absolute inset-0">  
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/50 to-gray-900/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60" />
                </div>

                <div className="flex justify-center items-top max-w-[95vw] md:max-w-[80vw] mx-auto">
                    {/* Cover image skeleton */}
                    <div className="flex-none z-10">
                        <Skeleton 
                            className="w-[280px] h-[373px] rounded-lg" 
                        />
                    </div>

                    <div className="flex-1 relative z-10 container mx-auto px-4">
                        {/* Title and info card skeleton */}
                        <div className="glass py-6 px-8 rounded-lg mb-4">
                            {/* Title skeleton */}
                            <Skeleton 
                                variant="text" 
                                className="h-12 w-3/4 mb-2" 
                            />
                            
                            {/* Release date skeleton */}
                            <Skeleton 
                                variant="text" 
                                className="h-4 w-32 mb-4" 
                            />
                            
                            {/* Subtitle skeleton */}
                            <Skeleton 
                                variant="text" 
                                className="h-4 w-full mb-2" 
                            />
                            <Skeleton 
                                variant="text" 
                                className="h-4 w-5/6 mb-4" 
                            />
                            
                            {/* Link skeleton */}
                            <Skeleton 
                                variant="text" 
                                className="h-4 w-32 ml-auto" 
                            />
                        </div>

                        {/* Rating and platforms skeleton */}
                        <div className="flex justify-start gap-4">
                            {/* Rating skeleton */}
                            <div className="glass flex flex-col rounded-lg justify-center items-center text-center px-4 py-2">
                                <div className="flex justify-center items-center gap-2 text-2xl leading-none mb-2">
                                    <Star className="w-8 h-8 text-gray-600" />
                                    <Skeleton 
                                        variant="text" 
                                        className="h-8 w-12" 
                                    />
                                </div>
                                <Skeleton 
                                    variant="text" 
                                    className="h-4 w-24" 
                                />
                            </div>

                            {/* Platform grid skeleton */}
                            <div className="glass rounded-lg px-4 py-2">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-8 h-8 rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};