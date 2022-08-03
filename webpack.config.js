const path = require("path");

module.exports = (env) => {
    let entry = {};
    // target component doesn't support debug mode because of a bug in webpack
    // both entry points can't be combined because component needs experiments.outputModule, which kills build for browser
    if (env["component"])
        // when using react components and bundler
        entry = {
            component_compare_view: {
                import: "./src/component/compare_view.tsx",
                library: {
                    type: "module",
                },
            },
        }
    else
        // when directly importing from browser without bundler
        entry = {
            browser_compare_view: {
                import: "./src/browser/compare_view.ts",
                // allow browser to access exposed functions
                library: {
                    name: "compare_view",
                    type: "var",
                },
            },
            drag_drop: {
                import: "./src/drag_drop/drag_drop.ts",
                // allow browser to access exposed functions
                library: {
                    name: "drag_drop",
                    type: "var",
                },
            },
        }
    return {
        // can be development or production
        mode: env["production"] ? "production" : "development",
        // eval good for development
        devtool: env["production"] ? false : "eval-source-map",
        // only entry file, include any imported files
        entry: entry,
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
            // only needed to compile component
            outputModule: env["component"],
        },
    };
};
