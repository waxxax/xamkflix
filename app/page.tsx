import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Carousel from './components/Carousel';

interface Movie {
  _id: ObjectId;
  nimi: string;
  valmistumisvuosi: number;
  genre: string[];
  tmdbkuva: string;
}

export default async function HomePage(): Promise<React.ReactElement> {
  const client = await clientPromise;
  const db = client.db("xamkflix");

  const genres = await db.collection("movies").distinct("genre");

  const movies = await db.collection("movies")
    .find({})
    .sort({ _id: -1 })
    .limit(40)
    .toArray();

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar genres={genres} />
        <main className="flex-grow p-4 bg-background dark:bg-darkBackground text-primary dark:text-darkPrimary">
          <Carousel />
          <h2 className="text-3xl font-bold mb-4 text-primary dark:text-darkPrimary">Uusimmat elokuvat</h2>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {movies.map(movie => (
              <li key={movie._id.toString()} className="bg-background dark:bg-darkBackground border dark:border-gray-700 p-4 shadow-md rounded-md">
                <div className="flex flex-col items-center">
                  {movie.tmdbkuva && (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.tmdbkuva}`}
                      alt={`${movie.nimi} poster`}
                      className="w-full h-64 object-cover mb-4 rounded-md"
                    />
                  )}
                  <Link href={`/movie/${movie._id.toString()}`} className="text-xl font-bold text-center hover:underline text-primary dark:text-darkPrimary">
                    {movie.nimi}
                  </Link>
                  <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span>{movie.genre.join(', ')}</span>
                    <span>{movie.valmistumisvuosi}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
