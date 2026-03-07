import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// This endpoint is server-rendered (runs at request time, not build time)
export const prerender = false;


const resend = new Resend(import.meta.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = 'a.jarczynska@kancelariaabw.pl';
const FROM_EMAIL = 'formularz@kancelariaabw.pl';

export const POST: APIRoute = async ({ request }) => {
    const headers = { 'Content-Type': 'application/json' };

    // Parse body
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Nieprawidłowe dane.' }), { status: 400, headers });
    }

    const { name, email, phone, subject, message, consent } = body;

    // Server-side validation
    if (!name || !email || !subject || !message || !consent) {
        return new Response(JSON.stringify({ error: 'Brakuje wymaganych pól.' }), { status: 400, headers });
    }
    if (typeof email !== 'string' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return new Response(JSON.stringify({ error: 'Nieprawidłowy email.' }), { status: 400, headers });
    }

    try {
        await resend.emails.send({
            from: `Formularz ABW <${FROM_EMAIL}>`,
            to: RECIPIENT_EMAIL,
            replyTo: email as string,
            subject: `[Kancelaria ABW] ${subject} — ${name}`,
            html: `
        <h2 style="font-family:serif;color:#1a3a5c;">Nowe zapytanie ze strony kancelariaabw.pl</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;border:1px solid #e2e8f0;color:#64748b;">Imię i nazwisko</td><td style="padding:8px;border:1px solid #e2e8f0;">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e2e8f0;color:#64748b;">Email</td><td style="padding:8px;border:1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #e2e8f0;color:#64748b;">Telefon</td><td style="padding:8px;border:1px solid #e2e8f0;">${phone || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e2e8f0;color:#64748b;">Temat</td><td style="padding:8px;border:1px solid #e2e8f0;">${subject}</td></tr>
        </table>
        <h3 style="font-family:serif;color:#1a3a5c;margin-top:16px;">Wiadomość:</h3>
        <p style="font-family:sans-serif;font-size:14px;color:#1e2a3a;background:#f8fafc;padding:16px;border-radius:8px;">${String(message).replace(/\n/g, '<br/>')}</p>
        <hr style="border:1px solid #e2e8f0;margin:16px 0;"/>
        <p style="font-family:sans-serif;font-size:11px;color:#94a3b8;">Wiadomość przesłana przez formularz na kancelariaabw.pl · ${new Date().toLocaleString('pl-PL')}</p>
      `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    } catch (err) {
        console.error('[contact API] Resend error:', err);
        return new Response(JSON.stringify({ error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' }), { status: 500, headers });
    }
};

// Disable GET
export const GET: APIRoute = () =>
    new Response(JSON.stringify({ error: 'Method not allowed.' }), { status: 405 });
