var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

const publicPath = Encore.isProduction() ? '/build' : '/devs/coming-soon/public/build';

Encore
    .setManifestKeyPrefix('')
    .setPublicPath(publicPath)
    .setOutputPath('public/build/')

    .addEntry('app', './assets/js/app.js')

    .enableSassLoader()
    .autoProvidejQuery()

    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableVersioning(Encore.isProduction())
    .enableSourceMaps(!Encore.isProduction())
    .enableIntegrityHashes(Encore.isProduction())

    .configureFilenames({
        js: 'js/[name].[chunkhash].js',
        css: 'css/[name].[contenthash].css',
        images: 'img/[name].[hash:8].[ext]',
        fonts: 'fonts/[name].[hash:8].[ext]'
    })

    .copyFiles([
        {
            'from': './assets/videos',
            'to': 'videos/[path][name].[hash:8].[ext]',
            'pattern': /\.(mp4)$/
        },
        {
            'from': './assets/fonts',
            'to': 'fonts/[path][name].[hash:8].[ext]',
            'pattern': /\.(svg|eot|woff|woff2|ttf)$/
        },
        {
            'from': './assets/images',
            'to': 'images/[path][name].[hash:8].[ext]',
            'pattern': /\.(png|jpg|jpeg|gif|svg|ico)$/
        }
    ])
;

module.exports = Encore.getWebpackConfig();
