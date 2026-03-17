module.exports = {
    apps: [
        {
            name: "kancelaria-abw",
            script: "./dist/server/entry.mjs",
            cwd: "/var/www/strona-prawnicza",
            env: {
                NODE_ENV: "production",
                PORT: 4321,
                HOST: "0.0.0.0",
            },
            max_restarts: 10,
            restart_delay: 5000,
        },
    ],
};
