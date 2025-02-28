'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [email, setEmail] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setEmail(data?.user?.email || null);
        };
        getUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image src="/images/logo.png" alt="Xamkflix Logo" width={200} height={50} className="cursor-pointer" />
                </Link>

                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="bg-gray-700 p-2 rounded-full">
                        <span className="sr-only">Avaa valikko</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m0 6v1m0 6v1m0 2v1" />
                        </svg>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-50">
                            <div className="p-4 border-b border-gray-600 text-sm text-gray-300">{email || 'Ei tunnusta'}</div>
                            <Link href="/watchlist" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
                                🎥 Katselulista
                            </Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-600">
                                Kirjaudu ulos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
