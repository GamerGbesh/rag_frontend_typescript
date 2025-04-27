import { useEffect, useState } from "react";

/**
 * Debounces a value by a delay time.
 * @param value The value to debounce
 * @param delay Delay in milliseconds
 */

export default function useDebounce<T>(value:T, delay: number): T {
    const [debounce, setDebounce] = useState<T>(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay)

        return () => clearTimeout(handler);
    }, [delay, value])

    return debounce;
}