module.exports = {
    http_port: process.env.HTTP_PORT,
    build_dir: process.env.BUILD_DIR,
    database : {
        host    : process.env.DATABASE_HOST,
        port    : process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    }
};