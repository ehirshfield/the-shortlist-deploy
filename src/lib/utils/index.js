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
exports.typeQuery = exports.filterSort = exports.authorizeToken = exports.authorize = void 0;
const types_1 = require("../../graphql/resolvers/Review/types");
const authorizedUsers = [
    process.env.USER_TOM,
    process.env.USER_SPENSER,
    process.env.USER_ERIC,
];
exports.authorize = (db, req) => __awaiter(void 0, void 0, void 0, function* () {
    let viewer = null;
    const userArray = authorizedUsers.filter((id) => id === req.signedCookies.viewer);
    if (userArray.length === 1 && userArray[0] === req.signedCookies.viewer) {
        viewer = yield db.users.findOne({
            _id: req.signedCookies.viewer,
        });
    }
    return viewer;
});
exports.authorizeToken = (db, req) => __awaiter(void 0, void 0, void 0, function* () {
    let viewer = null;
    const token = req.get('X-CSRF-TOKEN');
    const userArray = authorizedUsers.filter((id) => id === req.signedCookies.viewer);
    if (userArray.length === 1 && userArray[0] === req.signedCookies.viewer) {
        viewer = yield db.users.findOne({
            _id: req.signedCookies.viewer,
            token,
        });
    }
    return viewer;
});
exports.filterSort = (cursor, filter) => {
    let filterQuery;
    switch (filter) {
        case types_1.ReviewsFilter.RATING_LOW_TO_HIGH:
            filterQuery = { rating: 1 };
            break;
        case types_1.ReviewsFilter.RATING_HIGH_TO_LOW:
            filterQuery = { rating: -1 };
            break;
        case types_1.ReviewsFilter.NEWEST:
            filterQuery = { $natural: -1 };
            break;
        default:
            break;
    }
    const query = Object.assign({}, filterQuery);
    return cursor.sort(query);
};
exports.typeQuery = (typeFilter) => {
    switch (typeFilter) {
        case types_1.TypesFilter.RECIPE:
            return { type: types_1.TypesFilter.RECIPE };
        case types_1.TypesFilter.RESTAURANT:
            return { type: types_1.TypesFilter.RESTAURANT };
        case types_1.TypesFilter.PRODUCT:
            return { type: types_1.TypesFilter.PRODUCT };
        case types_1.TypesFilter.ALL:
            return {};
        default:
            return {};
    }
};
