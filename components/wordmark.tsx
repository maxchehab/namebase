"use client";

import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Wordmark() {
    const { theme } = useTheme();
    const [logoSrc, setLogoSrc] = useState(`/${theme === "dark" ? "light" : "dark"}.png`);

    useEffect(() => {
        setLogoSrc(`/${theme === "dark" ? "light" : "dark"}.png`);
    }, [theme]);

    return (
        <div className="flex items-center">
            <Link href="/">
                <img
                    src={logoSrc}
                    alt="namebase"
                    width={196}
                    height={64}
                />
            </Link>
        </div>
    );
}
