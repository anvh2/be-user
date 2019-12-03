var express = require("express");
var router = express.Router();
var passport = require("passport");

var handler = require("../handler/users");
var auth = require("../plugins/middlewares/auth");
var upload = require("../plugins/middlewares/upload");

router.get(
  "/profile",
  (req, res, next) => {
    auth.authen(req, res);
    next();
  },
  (req, res) => {
    var payload = res.locals.payload;
    handler.profile(req, res, payload);
  }
);

router.post("/login", (req, res) => {
  handler.login(req, res);
});

router.post("/register", (req, res) => {
  handler.register(req, res);
});

router.post(
  "/updateprofile",
  (req, res, next) => {
    auth.authen(req, res);
    next();
  },
  (req, res) => {
    var payload = res.locals.payload;
    handler.updateProfile(req, res, payload);
  }
);

router.post(
  "/updatepassword",
  (req, res, next) => {
    auth.authen(req, res);
    next();
  },
  (req, res) => {
    var payload = res.locals.payload;
    handler.updatePassword(req, res, payload);
  }
);

router.post(
  "/updateavatar",
  // (req, res, next) => {
  //   auth.authen(req, res);
  //   next();
  // },
  (req, res, next) => {
    upload.uploadImage(req, res);
    next();
  },
  (req, res) => {
    var payload = res.locals.payload;
    // sleep to ensure filename is forwarded
    setTimeout(() => {
      handler.updateAvatar(req, res, payload);
    }, 50);
  }
);

router.get("/activeaccount/:username", (req, res) => {
  handler.activateAccount(req, res);
});

router.get("/confirmchange/:id", (req, res) => {
  handler.confirmChange(req, res);
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", payload => {
    console.log("======CALLBACK PAYLOAD: ", payload);
  }),
  (req, res) => {
    res.status(200).json({
      code: 1,
      message: "OK"
    });
  }
);

module.exports = router;
