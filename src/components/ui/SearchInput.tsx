"use client";
import React, { useState, useDeferredValue, useEffect } from "react";
import { CalendarDays, Gamepad2, Search } from "lucide-react";
import { fetchGamesBySearch } from "@/utils/dataHelper";
import { SearchSkeleton } from "../features/LoadingStates";
import { SearchResult } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SearchInput = () => {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!deferredQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);

        const fetchResults = async () => {
            try {
                const searchResults = await fetchGamesBySearch(deferredQuery);
                setResults(searchResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [deferredQuery]);

    const handleResultSelect = (result: SearchResult) => {
        if (!result) return;
        setIsOpen(false);
        setQuery("");

        router.push(`/game/id/${result.game.id}`);
    };

    const renderResultItem = (result: SearchResult) => {
        return (
            <div
                key={`${result.id}`}
                className="flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-gray-800/50"
                onClick={() => handleResultSelect(result)}
            >
                <div className="w-16 h-22 bg-gray-800 rounded-lg flex items-center justify-center">
                    {result.game?.cover?.image_id ? (
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${result.game.cover.image_id}.webp`}
                            className="w-[320px] glass"
                            alt={`${result.name} cover`}
                            width={
                                result.game.cover.width
                                    ? result.game.cover.width
                                    : 12
                            }
                            height={
                                result.game.cover.height
                                    ? result.game.cover.height
                                    : 18
                            }
                        />
                    ) : (
                        <div className="w-12 h-18 flex justify-center items-center"><Gamepad2 className="w-6 h-6" /></div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{result.name}</p>
                    </div>
                    <div className="flex justify-start items-center gap-1 text-sm text-gray-300">
                        <CalendarDays className="w-4 h-4" />
                        {result.published_at ? 
                            new Date(result.published_at * 1000).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                         : 
                            "TBA"
                        }
                    </div>
                </div>
            </div>
        );
    };

    const currentResults = results;
    const hasResults = currentResults.length > 0;

    return (
        <div className="relative">
            <div className="flex">
                <button
                    type="button"
                    data-collapse-toggle="navbar-search"
                    aria-controls="navbar-search"
                    aria-expanded="false"
                    className="md:hidden focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-[#40c137] rounded-lg text-sm p-2.5 me-1"
                >
                    <Search className="w-5 h-5" />
                    <span className="sr-only">Search</span>
                </button>
                <div className="relative hidden md:block group/searchinput">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search className="w-5 h-5 transition-all group-hover/searchinput:w-6 group-hover/searchinput:h-6 group-hover/searchinput:text-[#54ff48]" />
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        type="text"
                        className="w-full px-4 py-3 text-white bg-transparent rounded-sm border border-[#54ff48] focus-visible:outline-none focus:ring-2 focus:ring-[#54ff48] placeholder:text-gray-300 transition-colors duration-200 pl-12 caret-[#54ff48]"
                        placeholder="Search games..."
                        suppressHydrationWarning
                    />
                </div>
            </div>

            {/* Results dropdown */}
            {isOpen && (
                <div className="glass absolute top-full left-0 right-0 mt-2 w-[360px] max-w-[100vw] z-50">
                    {loading && <SearchSkeleton />}
                    {!loading && hasResults && (
                        <div>
                            <div className="max-h-100 overflow-y-auto">
                                {currentResults.map((result) =>
                                    renderResultItem(result)
                                )}
                            </div>
                        </div>
                    )}

                    {!loading && !hasResults && deferredQuery.trim() && (
                        <div className="p-6 text-center text-gray-400">
                            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>
                                No results found for &quot;{deferredQuery}&quot;
                            </p>
                            <p className="text-sm mt-1">
                                Try different keywords
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-700/50 bg-gray-800/30">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>
                                Search • {currentResults.length} result
                                {currentResults.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
