module.exports = {
    apps: [
        {
            name: "kancelaria-abw",
            script: "./dist/server/entry.mjs",
            env: {
                NODE_ENV: "production",
                PORT: 4321,
                HOST: "127.0.0.1",
            },
        },
    ],
};
