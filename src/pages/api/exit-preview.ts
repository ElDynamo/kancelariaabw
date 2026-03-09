import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const cookieOptions = [
        'preview=',
        'Path=/',
        'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
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
