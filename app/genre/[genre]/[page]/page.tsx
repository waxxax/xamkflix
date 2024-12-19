import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';

interface Movie {
    _id: ObjectId;
    nimi: string;
    valmistumisvuosi: number;
    genre: string[];
}

interface Props {
    params: {
        genre: string;
        page: string; // Sivu URL:stä
    };
    searchParams: {
        sortBy?: string;
        order?: string;
    };
}

const MOVIES_PER_PAGE = 10; // Voit muuttaa tämän halutuksi elokuvamääräksi per sivu

export default async function GenrePage({ params, searchParams }: Props): Promise<React.ReactElement> {
    const client = await clientPromise;
    const db = client.db('xamkflix');

    const { genre, page } = params;
    const currentPage = parseInt(page || '1', 10);

    const sortBy = searchParams.sortBy === 'name' ? 'nimi' : '_id';
    const sortOrder = searchParams.order === 'desc' ? -1 : 1;

    // Hae elokuvat käyttäen skip (sivutus) ja limit
    const movies = await db
        .collection('movies')
        .find({ genre: { $regex: new RegExp(genre, 'i') } })
        .sort({ [sortBy]: sortOrder })
        .skip((currentPage - 1) * MOVIES_PER_PAGE)
        .limit(MOVIES_PER_PAGE)
        .toArray();

    // Laske sivumäärä
    const totalMovies = await db.collection('movies').countDocuments({
        genre: { $regex: new RegExp(genre, 'i') },
    });
    const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6 capitalize">{genre}</h2>

            {/* Järjestysvalinta */}
            <form method="get" className="mb-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2">
                    <label className="font-semibold">Järjestä:</label>
                    <select
                        name="sortBy"
                        defaultValue={searchParams.sortBy || 'name'}
                        className="select select-bordered w-40"
                    >
                        <option value="name">Nimi</option>
                        <option value="id">ID</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <label className="font-semibold">Tila:</label>
                    <select
                        name="order"
                        defaultValue={searchParams.order || 'asc'}
                        className="select select-bordered w-40"
                    >
                        <option value="asc">Nousevasti</option>
                        <option value="desc">Laskevasti</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Järjestä</button>
            </form>

            {/* Elokuvien listaus */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <li key={movie._id.toString()} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
                        <Link href={`/movie/${movie._id.toString()}`} className="text-lg font-semibold hover:underline">
                            {movie.nimi} ({movie.valmistumisvuosi})
                        </Link>
                        <div className="mt-2 text-sm text-gray-500">
                            {movie.genre.join(', ')}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
                <div className="btn-group">
                    <Pagination
                        genre={genre}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="btn btn-secondary">Palaa listaukseen</Link>
            </div>
        </div>
    );
}

// Pagination-komponentti DaisyUI:lla
function Pagination({ genre, currentPage, totalPages }: { genre: string; currentPage: number; totalPages: number }) {
    const pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(
            <Link
                key={i}
                href={`/genre/${genre}/${i}`}
                className={`btn ${i === currentPage ? 'btn-active' : ''}`}
            >
                {i}
            </Link>
        );
    }

    return <>{pageLinks}</>;
}

