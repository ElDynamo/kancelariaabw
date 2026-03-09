import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const POST: APIRoute = async ({ request }) => {
    try {
        // Proste zabezpieczenie - tylko żądania POST z odpowiednim Auth (jeśli skonfigurujemy Nginx)
        // lub chociażby sprawdzające pochodzenie z panelu CMS.
        // Aby nie zablokować serwera na czas budowania, używamy procesu w tle 
        // lub czekamy na wynik, jeśli to krótkie. Astro build może zająć 10-20 sekund.

        // Zwracamy od razu odpowiedź 202 Accepted, by nie trzymać przeglądarki klienta
        // na długim timeoutcie, a build puszczamy asynchronicznie.
        const isProduction = process.env.NODE_ENV === 'production';
        if (!isProduction) {
            return new Response(JSON.stringify({ message: "Build trigger ignored in development mode." }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        execAsync('bun run build').catch(error => {
            console.error("[CMS BUILD ERROR]:", error);
        });

        return new Response(JSON.stringify({
            success: true,
            message: "Proces budowania został pomyślnie rozpoczęty w tle. Strona zaktualizuje się w ciągu ok. 15-30 sekund."
        }), {
            status: 202,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Błąd serwera podczas wywoływania przebudowy." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
