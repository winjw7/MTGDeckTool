const webpack = require('webpack');
const { useBabelRc, override } = require("customize-cra");

/** 
    module.exports = function override(config) {
        const fallback = config.resolve.fallback || {};
        Object.assign(fallback, {
            "assert": require.resolve("assert"),
            "fs": false,
            "path": false,
            "process": false
        })

        config.resolve.fallback = fallback;
        config.plugins = (config.plugins || []).concat([
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer']
            })
        ])

        return config;
}**/

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());