import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const config = {
    matcher: [
        '/((?!login|favicon.ico|_next).*)'
    ]
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });

    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";
        return NextResponse.redirect(loginUrl);
    }

    return res;
}
