const WorkerPlugin = require('worker-plugin')

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableLegacy: false,
            runtimeOnly: false,
            compositionOnly: false,
            fullInstall: true
        },
        autoRouting: {
            chunkNamePrefix: 'page-',
            pages: 'src/pages',
            outFile: "src/router/routes.ts",
            nested: false
        },
        electronBuilder: {
            builderOptions: {
                publish: ['github']

            }
        }
    },

    assetsDir: 'src/assets',
    configureWebpack: {
        output: {
            globalObject: "self"
        },
        devtool: 'source-map',
        plugins: [new WorkerPlugin()]
    }
}