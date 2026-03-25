import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const POST: APIRoute = async ({ request }) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        if (!isProduction) {
            return new Response(JSON.stringify({ message: "Build trigger ignored in development mode." }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Run build + Docker restart in background
        const projectDir = process.env.PROJECT_DIR || '/var/www/strona-prawnicza';
        const buildCmd = [
            `cd ${projectDir}`,
            // Backup content before rebuild (safety net)
            `cp -r src/content /tmp/content-backup-$(date +%Y%m%d_%H%M%S) 2>/dev/null || true`,
            // Rebuild and restart Docker container
            `docker compose up -d --build --force-recreate`
        ].join(' && ');

        execAsync(buildCmd).catch(error => {
            console.error("[CMS BUILD ERROR]:", error);
        });

        return new Response(JSON.stringify({
            success: true,
            message: "Publikacja rozpoczęta! Zmiany pojawią się na stronie w ciągu ok. 30 sekund."
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
