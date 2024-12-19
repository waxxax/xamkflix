'use client'; // Client component, koska käytämme React hookeja

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    // Tila teemalle, alustetaan localStoragesta tai selaimen asetuksista
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'light';
    });

    // Päivitetään teema aina kun tila muuttuu ja tallennetaan localStorageen
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // Teeman vaihtaminen
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/images/logo.png" // Path to the logo image
                        alt="Xamkflix Logo"
                        width={200} // Adjust the width
                        height={50} // Adjust the height
                        className="cursor-pointer"
                    />
                </Link>

                {/* Teemavaihtopainike */}
                <button
                    onClick={toggleTheme}
                    className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring"
                >
                    {theme === 'light' ? '🌙 Tumma tila' : '☀️ Vaalea tila'}
                </button>
            </div>
        </header>
    );
}
