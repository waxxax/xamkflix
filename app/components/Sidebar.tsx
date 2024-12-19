'use client'; // Tämä tarvitaan Client Componentille

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
    genres: string[];
}

export default function Sidebar({ genres }: SidebarProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Normalisointifunktio genrelle
    const urlGenre = (genre: string): string => {
        return genre
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[\s_-]+/g, '');
    };

    return (
        <div className="lg:w-64">
            {/* Hampurilaispainike, näkyy vain pienellä näytöllä */}
            <button
                className="lg:hidden btn btn-square btn-ghost"
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                {/* SVG Hampurilaisikoni */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Drawer-side, eli genre-valinta */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-base-200 dark:bg-gray-800 text-primary dark:text-darkPrimary p-4 transform transition-transform duration-300 z-20 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
                <h1 className="text-xl font-bold text-primary dark:text-darkPrimary">Xamkflix</h1>
                <nav>
                    <ul className="menu p-0">
                        {genres.map((genre) => {
                            const normalizedGenre = urlGenre(genre);
                            return (
                                <li key={genre}>
                                    <Link href={`/genre/${normalizedGenre}/1`} className="text-lg hover:underline text-primary dark:text-darkPrimary">
                                        {genre}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Drawer-overlay (vain pienelle näytölle) */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" onClick={() => setDrawerOpen(false)}></div>
            )}
        </div>
    );
}
