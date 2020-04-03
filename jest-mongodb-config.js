// Taken from official documentation of Jest
// https://jestjs.io/docs/en/mongodb
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest"
    },
    binary: {
      version: "4.0.2",
      skipMD5: true
    },
    autoStart: false
  }
};
