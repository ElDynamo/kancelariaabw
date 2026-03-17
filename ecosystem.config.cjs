module.exports = {
    apps: [
        {
            name: "kancelaria-abw",
            script: "npm",
            args: "run dev",
            cwd: "/var/www/strona-prawnicza",
            env: {
                NODE_ENV: "development",
                PORT: 4321,
                HOST: "0.0.0.0",
            },
            // Restart on crash, but don't loop
            max_restarts: 10,
            restart_delay: 5000,
            // Important: don't watch files (TinaCMS writes to them)
            watch: false,
        },
    ],
};
