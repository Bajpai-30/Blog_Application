const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport')
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Strategy } = require('passport-google-oauth20')
const dotenv = require("dotenv");
dotenv.config();

//User
const { createJwe, createJws, decryptJwe, verifyJws } = require('./utils/jsonToken.js');
const { logger } = require('./utils/logger');
const {
  registerUser, checkUserByMail, fetchUserRecord } = require('./service/user');
const blogRouter = require("./routes/index");

const {
  successResponse,
  errorResponse,
  errorHandler,
} = require("./utils/response");

const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} = require("./utils/constants");

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
mongoose.set('strictQuery', false);
app.use('/',blogRouter)

/**
 * Establish a connection to database
 */
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex:true
    });
  } catch (error) {
    console.log(error.toString());
  }
};

/**
 * Connection status
 *
 */
const connectionDBStatus = async () => {
  try {
    var db = mongoose.connection;
    db.on("error", (error) => {
      throw new Error(ERROR_MESSAGE.PG_DB_CONNECTION_ERROR);
    });
    db.once("open", function (callback) {
      console.log(SUCCESS_MESSAGE.MONGO_CONNECTION_SUCCESS);
    });
  } catch (error) {
    console.log(error.toString());
    throw new Error(ERROR_MESSAGE.PG_DB_CONNECTION_ERROR);
  }
};

connectDatabase();
connectionDBStatus();


/*  PASSPORT SETUP  */
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new Strategy({
  clientID: '992932797218-jroajt0dutjv0kq6nle184h6vibcriu7.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile)

  }))

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

//Success
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }), async (request, response, next) => {
  if (!request.user) {
    response.redirect('/auth/failure');
  } else {
    try {
      response.send("Welcome " + request.user._json.email)
      const data = {
        username: request.user._json.name,
        email: request.user._json.email
      }
      // Check user does exist or not inside DB
      const email = request.user._json.email;
      const checkUserResponse = await checkUserByMail(email);
      console.log("checkuserResponse", checkUserResponse)
      if (!checkUserResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
      }
      // if (checkUserResponse.data) {
      //   return response
      //     .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      //     .json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
      // }

      const result = await registerUser(data);
      console.log("result", result)
      if (!result.isSuccess) {
        return response.json(errorResponse(result.data.message));
      }

      // 1. Creating JWE
      const jweResponse = await createJwe({
        email: result.data.email
      });
      if (!jweResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
      }

      const jwe = jweResponse.data;
      // 2. Signing JWE
      const token = createJws(jwe);
      console.log("token :", token)
      //response.status(200).send("token" + token)
      logger.info(SUCCESS_MESSAGE.LOGIN);
    } catch (err) {
      errorHandler(err, response);
    }

  }
})

//Failure
app.get('/auth/fail', (request, response, next) => {
  response.send('User Log In Failed')
})

app.get('/logout', (request, response, next) => {
  request.logOut()
  console.log(request.user, request.isAuthenticated())
  response.send('User logged out')
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));