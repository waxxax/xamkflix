'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MovieDetailsProps {
    movie: {
        _id: string;
        nimi: string;
        alkuperainennimi?: string;
        tmdbkuva: string;
        valmistumisvuosi: number;
        kestomin: number;
        genre: string[];
        ohjaaja: string;
    };
    description: string;
    cast: string;
}

export default function MovieDetails({ movie, description, cast }: MovieDetailsProps) {
    const [onWatchlist, setOnWatchlist] = useState(false);

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setOnWatchlist(storedList.includes(movie._id));
    }, [movie._id]);

    const toggleWatchlist = () => {
        let storedList = JSON.parse(localStorage.getItem('watchlist') || '[]');
        if (onWatchlist) {
            storedList = storedList.filter((id: string) => id !== movie._id);
        } else {
            storedList.push(movie._id);
        }
        localStorage.setItem('watchlist', JSON.stringify(storedList));
        setOnWatchlist(!onWatchlist);
    };

    return (
        <main className="p-4 max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-4 lg:flex-row">
                {movie.tmdbkuva && (
                    <div className="w-full lg:w-1/2">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.tmdbkuva}`} alt={`${movie.nimi} poster`} className="w-full rounded-md" />
                    </div>
                )}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl font-bold">{movie.nimi}</h1>
                    {movie.alkuperainennimi && movie.alkuperainennimi !== movie.nimi && (
                        <h2 className="text-lg text-gray-600">({movie.alkuperainennimi})</h2>
                    )}
                    <p>{description}</p>
                    <ul>
                        <li><strong>Genre:</strong> {movie.genre.join(', ')}</li>
                        <li><strong>Valmistumisvuosi:</strong> {movie.valmistumisvuosi}</li>
                        <li><strong>Kesto:</strong> {movie.kestomin} min</li>
                        <li><strong>Näyttelijät:</strong> {cast}</li>
                        <li><strong>Ohjaaja:</strong> {movie.ohjaaja}</li>
                    </ul>
                    <button
                        onClick={toggleWatchlist}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {onWatchlist ? 'Poista katselulistasta ❌' : 'Lisää katselulistaan ➕'}
                    </button>
                    <div className="mt-4">
                        <Link href="/" className="text-blue-500 hover:underline">Palaa listaukseen</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
