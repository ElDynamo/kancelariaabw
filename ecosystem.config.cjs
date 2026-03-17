module.exports = {
    apps: [
        {
            name: "kancelaria-abw",
            script: "npx",
            args: "tinacms dev -c \"astro dev --host 0.0.0.0 --port 4321\"",
            env: {
                NODE_ENV: "development",
                PORT: 4321,
                HOST: "0.0.0.0",
            },
            // Restart on crash, but don't loop
            max_restarts: 10,
            restart_delay: 5000,
        },
    ],
};
