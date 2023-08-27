import { RefObject, useEffect } from "react";

const useOutsideClick = (ref: RefObject<HTMLDivElement>, callback: { (): void; (): void; }) => {
    const handleClick = (e: { target: any; }) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOutsideClick;