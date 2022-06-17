const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getEntries = () => {
    const appsPath = path.resolve(__dirname, 'src');
    const appsFolders = fs.readdirSync(appsPath);

    return appsFolders.reduce((map, af) => {
        map[af] = path.resolve(appsPath, af);

        return map;
    }, {});
}

module.exports = (env = {}, args) => {
    const mode = env.WEBPACK_SERVE ? 'development' : 'production';
    const isProd = mode === 'production';

    return {
        mode,
        cache: false,
        devtool: 'source-map',
        optimization: {
            minimize: isProd,
            splitChunks: {
                name: 'external-apps-vendor',
                chunks: 'all',
                filename: 'external-apps-vendor.js',
                minChunks: 2,
            }
        },
        entry: getEntries(),
        output: {
            path: path.resolve(__dirname, '../dist-apps'),
            filename: '[name].js',
            chunkFilename: '[name].js',
            chunkLoadingGlobal: 'externalAppsJsonp',
            library: ['externalApps', '[name]'],
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
            alias: {
                // this isn't technically needed, since the default `vue` entry for bundlers
                // is a simple `export * from '@vue/runtime-dom`. However having this
                // extra re-export somehow causes webpack to always invalidate the module
                // on the first HMR update and causes the page to reload.
                vue: '@vue/runtime-dom',
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader',
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
                {
                    test: /\.png$/,
                    use: {
                        loader: 'url-loader',
                        options: { limit: 8192 },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {},
                        },
                        'css-loader',
                    ],
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
        devServer: {
            compress: true,
            port: 4201,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
    }
};
