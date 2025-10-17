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

                <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-2 sm:gap-0 items-top max-w-[95vw] md:max-w-[1400px] mx-auto">
                    {/* Cover image skeleton */}
                    <div className="flex-none z-10">
                        <Skeleton className="w-[280px] h-[373px] rounded-lg glass" />
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
                                <Skeleton variant="text" className="h-4 w-24" />
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

const GameCardSkeleton: React.FC = () => {
    return (
        <div className="group">
            <div className="h-full max-w-[300px] card card-interactive glass">
                {/* Image skeleton */}
                <div className="relative">
                    <Skeleton
                        className="object-contain w-[500px] h-[320px]"
                    />
                    <div className="absolute inset-0" />
                </div>

                {/* Content skeleton */}
                <div className="p-6">
                    <div className="mb-3">
                        {/* Title skeleton */}
                        <Skeleton
                            className="h-7 w-3/4 mb-2"
                            variant="rectangular"
                        />

                        <div className="flex flex-col items-start gap-2 mt-1">
                            {/* Date skeleton */}
                            <div className="flex items-center gap-1">
                                <Skeleton
                                    className="w-3 h-3"
                                    variant="rectangular"
                                />
                                <Skeleton className="h-4 w-24" variant="text" />
                            </div>

                            {/* Rating skeleton */}
                            <div className="glass flex flex-col rounded-lg justify-center items-center text-center px-4 py-2">
                                <div className="flex justify-center items-center gap-2 mb-1">
                                    <Skeleton
                                        className="w-8 h-8"
                                        variant="circular"
                                    />
                                    <Skeleton
                                        className="h-8 w-16"
                                        variant="text"
                                    />
                                </div>
                                <Skeleton className="h-4 w-24" variant="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GameCardGridSkeleton: React.FC = () => {
    return (
        <section className="flex flex-col">
            <div className="flex justify-center items-center">
                <h2 className="text-3xl">Most popular games</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center p-5">
                {Array.from({ length: 15 }).map((_, i) => (
                    <GameCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
};

export const SearchSkeleton: React.FC = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-3 p-3 border-b border-[#54ff4860] last:border-b-0">
        <Skeleton className="w-12 h-18" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-full h-4" />
          </div>
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);