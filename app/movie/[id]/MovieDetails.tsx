'use client'; // Tämä tarvitaan Client Componentille

import { useState } from 'react';  // Hook tilan hallintaan (modalin avaaminen/sulkeminen)
import Link from 'next/link';

interface MovieDetailsProps {
    movie: {
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="p-4 max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-4 lg:flex-row max-h-screen">
                {/* Elokuvan poster-kuva, joka on ennen muita sisältöjä pienellä näytöllä */}
                {movie.tmdbkuva && (
                    <div className="w-full h-auto lg:w-1/2 lg:max-h-full overflow-hidden rounded-md">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.tmdbkuva}`}
                            alt={`${movie.nimi} poster`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Elokuvan tiedot */}
                <div className="w-full flex flex-col justify-between lg:w-1/2 overflow-hidden">
                    <div>
                        {/* Otsikko ja alkuperäinen nimi */}
                        <h1 className="text-accent text-2xl lg:text-3xl font-bold mb-1">{movie.nimi}</h1>
                        {movie.alkuperainennimi && movie.alkuperainennimi !== movie.nimi && (
                            <h2 className="text-lg lg:text-xl text-gray-600 mb-3">({movie.alkuperainennimi})</h2>
                        )}

                        {/* Esittelyteksti katkaistuna */}
                        <div className="mb-3 max-h-[100px] overflow-hidden">
                            <p className="line-clamp-3">
                                {description}
                            </p>
                            {/* "Lue lisää" -painike, joka avaa modaalin */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-blue-500 hover:underline"
                            >
                                Lue lisää...
                            </button>
                        </div>

                        {/* Genre, valmistumisvuosi, kesto, näyttelijät ja ohjaaja */}
                        <ul className="mb-3 text-sm lg:text-base space-y-1">
                            <li><strong>Genre:</strong> {movie.genre.join(', ')}</li>
                            <li><strong>Valmistumisvuosi:</strong> {movie.valmistumisvuosi}</li>
                            <li><strong>Kesto:</strong> {movie.kestomin} min</li>
                            <li><strong>Näyttelijät:</strong> {cast}</li>
                            <li><strong>Ohjaaja(t):</strong> {movie.ohjaaja}</li>
                        </ul>
                    </div>

                    {/* Palaa listaukseen -linkki */}
                    <div>
                        <Link href="/" className="bg-primary text-white p-4 rounded hover:bg-secondary py-2 px-4 inline-block text-center">
                            Palaa listaukseen
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal-ikkuna DaisyUI:lla */}
            <input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(false)} />
            <div className="modal">
                <div className="modal-box max-w-lg max-h-[80vh] overflow-auto">
                    <h3 className="font-bold text-lg">{movie.nimi} - Esittely</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setIsModalOpen(false)}>Sulje</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
