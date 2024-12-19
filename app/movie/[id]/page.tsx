import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getMovieCast, getMovieDescription } from '../../lib/tmdb';
import MovieDetails from './MovieDetails'; // Tuodaan Client Component

interface Movie {
    _id: ObjectId;
    nimi: string;
    alkuperainennimi: string;
    valmistumisvuosi: number;
    tmdbid: number;
    tmdbkuva: string;
    imdbid: string;
    kestomin: number;
    genre: string[];
    ohjaaja: string;
}

export default async function MoviePage({ params }: { params: { id: string } }) {
    const client = await clientPromise;
    const db = client.db("xamkflix");

    const movie = await db.collection("movies").findOne({ _id: new ObjectId(params.id) }) as Movie;

    if (!movie) {
        return <div>Elokuvaa ei löytynyt</div>;
    }

    // Hae näyttelijät ja kuvausteksti TMDb:stä
    const cast = await getMovieCast(movie.tmdbid);
    const description = await getMovieDescription(movie.tmdbid, 'fi') || await getMovieDescription(movie.tmdbid, 'en');

    // Siirretään tiedot MovieDetails-komponentille (Client Component)
    return (
        <MovieDetails movie={movie} description={description || "Esittelyteksti TMDb:stä."} cast={cast} />
    );
}
