"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Google_1 = require("../../../lib/api/Google");
const utils_1 = require("../../../lib/utils");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV !== 'development',
};
const logInViaGoogle = (code, token, db, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = yield Google_1.Google.logIn(code);
    if (!user) {
        throw new Error('Google Log In Error');
    }
    // Name, photo, email list
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList = user.photos && user.photos.length ? user.photos : null;
    const userEmailsList = user.emailAddresses && user.emailAddresses.length
        ? user.emailAddresses
        : null;
    // User Display Name
    const userName = userNamesList ? userNamesList[0].displayName : null;
    // User ID
    const userId = userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
        ? userNamesList[0].metadata.source.id
        : null;
    const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
    const userEmail = userEmailsList && userEmailsList[0].value
        ? userEmailsList[0].value
        : null;
    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error('Google login error');
    }
    const updateRes = yield db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token,
        },
    }, { returnOriginal: false });
    let viewer = updateRes.value;
    if (!viewer) {
        const insertResult = yield db.users.insertOne({
            _id: userId,
            token,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            reviews: [],
        });
        viewer = insertResult.ops[0];
    }
    res.cookie('viewer', userId, Object.assign(Object.assign({}, cookieOptions), { maxAge: 365 * 24 * 60 * 60 * 1000 }));
    return viewer;
});
const logInViaCookie = (token, db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateRes = yield db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } }, { returnOriginal: false });
    const viewer = updateRes.value;
    if (!viewer) {
        res.clearCookie('viewer', cookieOptions);
    }
    return viewer;
});
exports.viewerResolvers = {
    Query: {
        authUrl: () => {
            try {
                return Google_1.Google.authUrl;
            }
            catch (error) {
                throw new Error(`Failed to query Google Auth Url: ${error}`);
            }
        },
    },
    Mutation: {
        logIn: (_root, { input }, { db, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString('hex');
                const viewer = code
                    ? yield logInViaGoogle(code, token, db, res)
                    : yield logInViaCookie(token, db, req, res);
                if (!viewer) {
                    return { didRequest: true, authorized: false };
                }
                const user = yield utils_1.authorize(db, req);
                if (user && user._id === viewer._id) {
                    viewer.authorized = true;
                }
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    didRequest: true,
                    authorized: viewer.authorized || false,
                };
            }
            catch (error) {
                throw new Error(`Failed to log in: ${error}`);
            }
        }),
        logOut: (_root, _args, { res }) => {
            try {
                res.clearCookie('viewer', cookieOptions);
                return { didRequest: true, authorized: false };
            }
            catch (error) {
                throw new Error(`Failed to log out: ${error}`);
            }
        },
    },
    Viewer: {
        id: (viewer) => viewer._id,
    },
};
