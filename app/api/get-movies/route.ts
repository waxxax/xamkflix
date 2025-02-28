import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
    try {
        const { ids } = await req.json(); // Haetaan elokuvien ID:t pyynnöstä
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: "Virheelliset tiedot" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("xamkflix");

        // Muunnetaan id:t ObjectId-muotoon
        const objectIds = ids.map(id => new ObjectId(id));

        const movies = await db.collection("movies")
            .find({ _id: { $in: objectIds } })
            .toArray();

        // Muutetaan `_id` merkkijonoksi
        const formattedMovies = movies.map(movie => ({
            ...movie,
            _id: movie._id.toString()
        }));

        return NextResponse.json({ movies: formattedMovies });
    } catch (error) {
        console.error("Virhe elokuvien haussa:", error);
        return NextResponse.json({ error: "Palvelinvirhe" }, { status: 500 });
    }
}
