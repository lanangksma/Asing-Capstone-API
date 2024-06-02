const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Bell = require("@hapi/bell");
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const foodsRoutes = require("./routes/foodRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { validate } = require("./validators/jwtValidator");
const InputError = require("./exceptions/InputError");

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

  await server.register([Jwt, Bell]);

  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
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
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof InputError) {
      return h
        .response({
          status: "fail",
          message: "Terjadi kesalahan dalam melakukan prediksi",
        })
        .code(400);
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
