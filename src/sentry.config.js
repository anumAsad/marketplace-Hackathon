 const moduleExports = {
    //Your existing Next.js config here
 };

 const SentryWebpackPluginOptions ={
    silent: true, //Supresses all logs
 };

 module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);