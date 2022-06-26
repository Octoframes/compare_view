const path = require("path");

module.exports = (env) => {
    return {
        // can be development or production
        mode: env["production"] ? "production" : "development",
        // eval good for development
        devtool: env["production"] ? false : "eval-source-map",
        // only entry file, include any imported files
        entry: {
            example_use: "./src/example_use.ts",
        },
        module: {
            rules: [
                {
                    // when test passed
                    test: /\.ts$/,
                    // use ts-loader to compile
                    use: "ts-loader",
                    include: [path.resolve(__dirname, "src")],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
        output: {
            // tell dev server where to serve code in memory from
            publicPath: "public",
            // template based on keys in entry
            filename: "[name].js",
            // need absolute path
            path: path.resolve(__dirname, "public"),
        },
        devServer: {
            static: {
                // load uncompiled files (e.g. html files) from public dir
                directory: path.resolve(__dirname, "public"),
                // where to serve them from
                publicPath: "/",
            },
            devMiddleware: {
                // where to serve compiled files from
                publicPath: "/",
            },
            hot: true,
        },
    };
};
