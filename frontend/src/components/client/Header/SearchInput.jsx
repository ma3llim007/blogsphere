import crudService from "@/services/crudService";
import { capitalizeWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchInput = () => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");

    // Memoize the debounce to avoid recreating it on every render
    const debouncedSearch = useMemo(() => debounce(val => setQuery(val), 500), []);

    const handleInputChange = e => {
        const value = e.target.value;
        setInput(value);
        debouncedSearch(value.trim());
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // React Query for fetching search results
    const { data, isFetching } = useQuery({
        queryKey: ["search", query],
        queryFn: () => crudService.get(`/blog/search?term=${query}`),
        enabled: !!query,
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
    });

    const results = data?.data || [];
    return (
        <div className="relative w-full lg:w-80 xl:w-md 2xl:w-lg">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
            <input
                type="text"
                placeholder="Search..."
                value={input}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-primary outline-none transition duration-300"
            />

            {/* Results Dropdown */}
            {query && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50">
                    {isFetching ? (
                        <div className="px-4 py-2 text-xl font-medium text-gray-900">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map(item => (
                            <Link
                                key={item?._id}
                                to={`/blog-details/${item?.blogSlug}`}
                                onClick={() => {
                                    setInput("");
                                    setQuery("");
                                }}
                                className="block px-4 py-2 hover:bg-gray-100 lg:text-base xl:text-xl font-medium border-b last:border-none"
                            >
                                {capitalizeWords(item?.blogTitle)}
                            </Link>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-xl font-medium text-gray-900">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
