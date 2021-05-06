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
                publish: ['github'],
                win: {
                    target: [{
                        target: "NSIS",
                        arch: ["x64", "arm64"]
                    }],
                    icon: "src/assets/icons/win/icon.ico"
                },
                mac: {
                    target: [{
                        target: "ZIP",
                        arch: ["x64", "arm64"]
                    }],
                    icon: "src/assets/icons/mac/icon.icns",
                    darkModeSupport: true
                },
                linux: {
                    target: [{
                        target: "AppImage",
                        arch: ["x64", "armv7l", "arm64"]
                    }],
                    icon: "src/assets/icons/png/",
                    category: "Utility"
                }
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