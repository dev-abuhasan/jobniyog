"use client";

import { useEffect } from "react";

export default function SecurityGuard() {
    useEffect(() => {
        // Only enable in production
        if (process.env.NEXT_PUBLIC_IS_PRODUCTION !== "true") {
            return;
        }

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey &&
                    e.shiftKey &&
                    ["I", "J", "C"].includes(e.key.toUpperCase())) ||
                (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null;
}