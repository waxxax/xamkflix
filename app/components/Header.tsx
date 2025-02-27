'use client'; // Client component, koska käytämme React hookeja

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Header() {
    // Tila teemalle, alustetaan localStoragesta tai selaimen asetuksista
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'light';
    });

    // Tila käyttäjän sähköpostille ja valikon näkyvyydelle
    const [email, setEmail] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

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

    // Haetaan käyttäjän sähköpostiosoite
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setEmail(data?.user?.email || null);
        };
        getUser();
    }, [supabase]);

    // Kirjaudu ulos -toiminto
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // Teeman vaihtaminen
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="bg-gray-800 text-white p-4 z-50 relative">
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

                <div className="flex items-center space-x-4">
                    {/* Teemavaihtopainike */}
                    <button
                        onClick={toggleTheme}
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring"
                    >
                        {theme === 'light' ? '🌙 Tumma tila' : '☀️ Vaalea tila'}
                    </button>

                    {/* Käyttäjävalikko */}
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-gray-700 p-2 rounded-full">
                            <span className="sr-only">Avaa valikko</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v1m0 6v1m0 6v1m0 2v1"
                                />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-50">
                                <div className="p-4 border-b border-gray-600 text-sm text-gray-300">
                                    {email || 'Ei tunnusta'}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-600"
                                >
                                    Kirjaudu ulos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
