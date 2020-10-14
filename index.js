const proxy = require('redbird')({port: 80});

proxy.register("sslproxy1.videoflow.io", "https://www.google.com");
proxy.register("sslproxy2.videoflow.io", "https://github.com");