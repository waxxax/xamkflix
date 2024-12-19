// lib/tmdb.ts

import axios from 'axios';

interface CastMember {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
}

interface MovieCreditsResponse {
    id: number;
    cast: CastMember[];
}

interface MovieDetailsResponse {
    id: number;
    overview: string;
}

// lib/tmdb.ts

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

export async function getMovieCast(movieId: number): Promise<string> {
    try {
        const response = await axios.get<MovieCreditsResponse>(`${API_URL}/movie/${movieId}/credits`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
            },
        });
        // Määritä cast-tyyppi
        const cast: string[] = response.data.cast.slice(0, 5).map((castMember: CastMember) => castMember.name);
        return cast.join(', ');
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        return '';
    }
}

export async function getMovieDescription(movieId: number, language: string = 'fi'): Promise<string> {
    try {
        const response = await axios.get<MovieDetailsResponse>(`${API_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
                language,
            },
        });
        return response.data.overview || '';
    } catch (error) {
        console.error('Error fetching movie description:', error);
        return '';
    }
}
