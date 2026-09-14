import { useEffect, useState } from "react";

/**
 * Generic type for API response data
 * Adjust T to match your specific API response structure
 */
interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching data from an API (TheMealDB or similar)
 * 
 * @template T - The shape of the data being fetched
 * @param url - The URL to fetch from (can be empty string to skip fetching)
 * @returns Object containing { data, loading, error }
 * 
 * @example
 * const { data: meals, loading, error } = useFetch<Meal[]>(
 *   'https://www.themealdb.com/api/json/v1/1/search.php?s=Pasta'
 * );
 */
function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if no URL provided
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true; // Track if component is still mounted

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result: T = await response.json();

        // Only update state if component is still mounted
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        // Only update state if component is still mounted
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setError(errorMessage);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [url]); // Re-fetch when URL changes

  return { data, loading, error };
}

export default useFetch;
