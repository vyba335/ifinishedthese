"use client";
import React, { useState, useDeferredValue, useEffect, useRef } from "react";
import { CalendarDays, Delete, Gamepad2, Search } from "lucide-react";
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
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!deferredQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);

        const fetchResults = async () => {
            try {
                const searchResults = await fetchGamesBySearch(deferredQuery);
                setResults(searchResults.reverse());
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [deferredQuery]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            } else if (
                searchRef.current &&
                inputRef.current &&
                searchRef.current.contains(event.target as Node)
            ) {
                inputRef.current.blur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

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
                className="flex items-center gap-3 p-3 cursor-pointer transition-colors bg-gray-800/50 md:bg-inherit hover:bg-gray-800/50"
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
                        <div className="w-12 h-18 flex justify-center items-center">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{result.name}</p>
                    </div>
                    <div className="flex justify-start items-center gap-1 text-sm text-gray-300">
                        <CalendarDays className="w-4 h-4" />
                        {result.published_at
                            ? new Date(
                                  result.published_at * 1000
                              ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                              })
                            : "TBA"}
                    </div>
                </div>
            </div>
        );
    };

    const currentResults = results;
    const hasResults = currentResults.length > 0;

    return (
        <div className="relative w-full" ref={searchRef}>
            <div className="flex justify-center">
                <div className="relative group/search w-[95vw] md:w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search className="w-5 h-5 text-[#54ff48] transition-all" />
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        type="text"
                        className="w-full px-4 py-3 text-white bg-transparent rounded-sm border border-[#54ff48] focus-visible:outline-none focus:ring-2 focus:ring-[#54ff48] placeholder:text-gray-300 transition-colors duration-200 pl-10 caret-[#54ff48]"
                        placeholder="Search games..."
                        suppressHydrationWarning
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer group/delete" onClick={() => setQuery("")}>
                        <Delete className="w-4 h-4 text-red-600 md:text-gray-400 transition-all group-hover/delete:text-red-600" />
                        <span className="sr-only">Delete text icon</span>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="glass absolute top-full left-1/2 -translate-x-1/2 right-0 mt-2 w-full md:w-[360px] max-w-[95vw] z-50">
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
