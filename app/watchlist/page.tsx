'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Movie {
    _id: string;
    nimi: string;
    valmistumisvuosi: number;
    tmdbkuva: string;
}

export default function WatchlistPage() {
    const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const updateWatchlist = async () => {
            const storedList: string[] = JSON.parse(localStorage.getItem('watchlist') || '[]');
            if (storedList.length > 0) {
                try {
                    const movies = await fetchMovies(storedList);
                    setWatchlistMovies(movies);
                } catch (error) {
                    console.error("Virhe elokuvien haussa:", error);
                }
            } else {
                setWatchlistMovies([]);
            }
        };

        updateWatchlist();
        window.addEventListener('storage', updateWatchlist);

        return () => {
            window.removeEventListener('storage', updateWatchlist);
        };
    }, []);

    const fetchMovies = async (movieIds: string[]) => {
        const response = await fetch('/api/get-movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: movieIds }),
        });

        if (!response.ok) {
            throw new Error("Elokuvien haku epäonnistui");
        }

        const data = await response.json();
        return data.movies;
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-black">Katselulista</h2>

            {watchlistMovies.length === 0 ? (
                <p className="text-gray-400">Ei elokuvia katselulistalla.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {watchlistMovies.map(movie => (
                        <li key={movie._id} className="bg-gray-700 p-4 rounded-md shadow-md">
                            {movie.tmdbkuva && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${movie.tmdbkuva}`}
                                    alt={`${movie.nimi} poster`}
                                    className="w-full rounded-md"
                                />
                            )}
                            <Link href={`/movie/${movie._id}`}
                                className="block text-lg font-bold text-white text-center mt-2 hover:underline">
                                {movie.nimi} <span className="text-gray-300">({movie.valmistumisvuosi})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 flex justify-center">
                <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Palaa aloitusnäkymään
                </Link>
            </div>
        </div>
    );
}
