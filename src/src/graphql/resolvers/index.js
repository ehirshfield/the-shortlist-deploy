"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const Review_1 = require("./Review");
const Viewer_1 = require("./Viewer");
const User_1 = require("./User");
exports.resolvers = lodash_merge_1.default(Review_1.reviewResolvers, Viewer_1.viewerResolvers, User_1.userResolvers);
