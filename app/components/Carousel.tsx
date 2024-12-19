'use client';

import React from 'react';

export default function MovieCarousel() {
    const movies = [
        {
            nimi: 'Alien',
            genre: 'Horror, Science Fiction',
            kuva: 'https://image.tmdb.org/t/p/original/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
        },
        {
            nimi: 'Interstellar',
            genre: 'Adventure, Drama, Sci-Fi',
            kuva: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
        },
        {
            nimi: 'The Dark Knight',
            genre: 'Action, Crime, Drama',
            kuva: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        },
    ];

    return (
        <div className="carousel w-full relative">
            {movies.map((movie, index) => (
                <div id={`slide${index + 1}`} key={index} className="carousel-item relative w-full">
                    <img src={movie.kuva} className="w-full h-[500px] object-cover" alt={movie.nimi} />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 w-full p-4 z-20">
                        <h2 className="text-white text-2xl font-bold">{movie.nimi}</h2>
                        <p className="text-gray-300">{movie.genre}</p>
                    </div>
                    {/* Indicators inside the carousel */}
                    <div className="absolute flex justify-center w-full bottom-5 space-x-2 z-30">
                        {movies.map((_, index) => (
                            <a
                                key={index}
                                href={`#slide${index + 1}`}
                                className="btn btn-xs btn-circle"
                            >
                                {index + 1}
                            </a>
                        ))}
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
                        <a href={`#slide${index === 0 ? movies.length : index}`} className="btn btn-circle">
                            ❮
                        </a>
                        <a href={`#slide${index === movies.length - 1 ? 1 : index + 2}`} className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            ))}


        </div>
    );
}
