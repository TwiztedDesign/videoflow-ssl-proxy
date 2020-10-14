const proxy = require('redbird')({port: process.env.PORT || 3003});

proxy.register("sslproxy1.videoflow.io", "https://www.google.com");
proxy.register("sslproxy2.videoflow.io", "https://github.com");