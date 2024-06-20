const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Bell = require("@hapi/bell");
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const foodsRoutes = require("./routes/foodRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { validate } = require("./validators/jwtValidator");
const tipsRoutes = require("./routes/tipsRoutes");
const InputError = require("./exceptions/InputError");
const loadModel = require("./config/loadModel");
const predictRoute = require("./routes/predictRoute");

require("dotenv").config();

const start = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  await server.register([Jwt, Bell]);

  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 43200,
      timeSkewSec: 15,
    },
    validate,
  });

  server.auth.strategy("google", "bell", {
    provider: "google",
    password: process.env.GOOGLE_PASSWORD,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    isSecure: process.env.NODE_ENV === "production",
  });

  server.auth.default("jwt");

  server.route([
    ...authRoutes,
    ...googleAuthRoutes,
    ...foodsRoutes,
    ...profileRoutes,
    ...tipsRoutes,
    ...predictRoute,
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof InputError) {
      return h
        .response({
          status: "fail",
          message:
            "Terjadi kesalahan dalam melakukan prediksi, silahkan coba lagi dengan gambar yang berbeda",
        })
        .code(400);
    }

    if (response.isBoom && response.output.statusCode === 401) {
      const { message } = response.output.payload;
      if (message === "Token maximum age exceeded") {
        response.output.payload.message = "Session ended, please login again";
      }
    }

    if (response.isBoom && response.output.statusCode === 503) {
      const { message } = response.output.payload;
      if (message === "Network timeout") {
        response.output.payload.message = "Network timeout, please try again";
      } else if (message === "Network error") {
        response.output.payload.message = "Network error, please try again";
      } else if (message === "fetch") {
        response.output.payload.message = "Error when fetching data";
      } else {
        response.output.payload.message =
          "Service unavailable, please try again later";
      }
    }

    if (response.isBoom && response.output.statusCode === 413) {
      return h
        .response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        })
        .code(413);
    }

    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start();
