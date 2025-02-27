'use client';

import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

async function LogoutPage(): Promise<React.ReactElement> {
    const supabase = createClientComponentClient();

    await supabase.auth.signOut();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-xl my-2">Olet kirjautunut ulos.</h2>
            <Link href="/login" className="text-blue-400 hover:underline">
                Ok
            </Link>
        </div>
    );
}

export default LogoutPage;