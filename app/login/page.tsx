'use client';

import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

function LoginPage(): React.ReactElement {
    const lomakeRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>("");

    const kirjaudu = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (lomakeRef.current) {
            const supabase = createClientComponentClient();

            const { error } = await supabase.auth.signInWithPassword({
                email: lomakeRef.current.tunnus.value,
                password: lomakeRef.current.salasana.value
            });

            if (!error) {
                router.push("/");
            } else {
                setVirhe("Käyttäjätunnus tai salasana ei kelpaa.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold text-white text-center mb-6">XAMKFLIX</h1>
                <form className="space-y-4" ref={lomakeRef}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="tunnus">Käyttäjätunnus</label>
                        <input
                            type="text"
                            name="tunnus"
                            id="tunnus"
                            placeholder="Käyttäjätunnus"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="salasana">Salasana</label>
                        <input
                            type="password"
                            name="salasana"
                            id="salasana"
                            placeholder="Salasana"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm text-gray-400 hover:text-gray-300">Unohditko salasanan?</a>
                    </div>
                    {virhe && <div className="text-sm text-red-500">{virhe}</div>}
                    <button
                        onClick={kirjaudu}
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                    >
                        Kirjaudu sisään
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded">Rekisteröidy</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
