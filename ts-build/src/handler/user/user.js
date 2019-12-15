"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../../plugins/database/user/user"));
var cache_1 = __importDefault(require("../../plugins/cache"));
var mailer_1 = __importDefault(require("../../plugins/mailer"));
var register_1 = require("./register");
var login_1 = require("./login");
var social_1 = require("./social");
var profile_1 = require("./profile");
var callback_1 = require("./callback");
var UserHandler = /** @class */ (function () {
    function UserHandler() {
        this.register = register_1.Register.bind(this);
        this.login = login_1.Login.bind(this);
        this.loginViaFB = social_1.LoginViaFB.bind(this);
        this.loginViaGG = social_1.LoginViaGG.bind(this);
        this.getProfile = profile_1.GetProfile.bind(this);
        this.updateProfile = profile_1.UpdateProfile.bind(this);
        this.updatePassword = profile_1.UpdatePassword.bind(this);
        this.forgotPassword = profile_1.ForgotPassword.bind(this);
        this.updateAvatar = profile_1.UpdateAvatar.bind(this);
        this.activateAccount = callback_1.ActivateAccount.bind(this);
        this.confirmChange = callback_1.ConfirmChange.bind(this);
        this.reclaimPassword = callback_1.ReclaimPassword.bind(this);
        this.userDB = new user_1.default();
        this.cache = new cache_1.default();
        this.mailer = new mailer_1.default();
        this.activePrefix = "active_account";
    }
    return UserHandler;
}());
exports.UserHandler = UserHandler;