const path = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

//require('dotenv').config({ path: '.env.development' });

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        entry: ['babel-polyfill', './src/app.tsx'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            }),
            new webpack.EnvironmentPlugin( { 
                ...process.env
             } ),
            new MiniCssExtractPlugin({ 
                filename: 'styles.css'
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
              })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        devServer: {
            static: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
        mode: 'development',
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js",
            publicPath: "/dist/"
          }
    }
};