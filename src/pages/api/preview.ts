import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');

    if (secret !== 'abw-admin-preview') {
        return new Response('Brak uprawnień do trybu podglądu', { status: 401 });
    }

    // Ustawiamy ciasteczko i przekierowujemy do /admin
    const cookieOptions = [
        'preview=true',
        'Path=/',
        'Max-Age=7200',
        'SameSite=Lax'
    ].join('; ');

    return new Response(null, {
        status: 302,
        headers: {
            'Set-Cookie': cookieOptions,
            'Location': '/admin'
        }
    });
};
