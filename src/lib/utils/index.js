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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorizedUsers = [
    process.env.USER_TOM,
    process.env.USER_SPENSER,
    process.env.USER_ERIC,
];
exports.authorize = (db, req) => __awaiter(void 0, void 0, void 0, function* () {
    let viewer = null;
    const token = req.get('X-CSRF-TOKEN');
    const userArray = authorizedUsers.filter((id) => id === req.signedCookies.viewer);
    console.log('csrf token :>> ', token);
    if (userArray[0] === req.signedCookies.viewer) {
        viewer = yield db.users.findOne({
            _id: req.signedCookies.viewer,
        });
    }
    console.log('viewer :>> ', viewer);
    return viewer;
});
