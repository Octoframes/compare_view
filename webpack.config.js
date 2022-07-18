const path = require("path");

module.exports = (env) => {
    return {
        // can be development or production
        mode: env["production"] ? "production" : "development",
        // eval good for development
        devtool: env["production"] ? false : "eval-source-map",
        // only entry file, include any imported files
        entry: {
            // when directly importing from browser without bundler
            browser_compare_view: {
                import: "./src/browser/compare_view.ts",
                // allow browser to access exposed functions
                library: {
                    name: "compare_view",
                    type: "var",
                },
            },
            // when using react components and bundler
            component_compare_view: {
                import: "./src/component/compare_view.tsx",
                library: {
                    type: "module",
                },
            },
        },
        // react is already present in component using code
        externals: {
            "react": "react",
        },
        module: {
            rules: [
                {
                    // when test passed
                    test: /\.tsx?$/,
                    // use ts-loader to compile
                    use: "ts-loader",
                    include: [path.resolve(__dirname, "src")],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".js", ".tsx", ".jsx"],
        },
        output: {
            // tell dev server where to serve code in memory from
            publicPath: "public/dist",
            // template based on keys in entry
            filename: "[name].js",
            // need absolute outputpath
            path: path.resolve(__dirname, "public/dist"),
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
                publicPath: "/dist",
            },
            hot: true,
        },
        experiments: {
            outputModule: true,
        },
    };
};
