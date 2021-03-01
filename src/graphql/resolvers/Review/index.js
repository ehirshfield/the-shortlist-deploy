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
exports.reviewResolvers = void 0;
const mongodb_1 = require("mongodb");
const api_1 = require("../../../lib/api");
const types_1 = require("../../../lib/types");
const utils_1 = require("../../../lib/utils");
const verifyAddReviewInput = ({ title, body, type, rating, subtitle, }) => {
    if (title.length > 100) {
        throw new Error('Review title must be under 100 characters');
    }
    if (subtitle.length > 200) {
        throw new Error('Review title must be under 100 characters');
    }
    if (body.length > 9000) {
        throw new Error('Review body must be under 9000 characters');
    }
    if (type !== types_1.ReviewType.Recipe &&
        type !== types_1.ReviewType.Restaurant &&
        type !== types_1.ReviewType.Product) {
        throw new Error('Review type must be either a recipem, restaurant or product!');
    }
    if (rating < 0 || rating > 10) {
        throw new Error('Review rating must be between 1 and 10');
    }
};
exports.reviewResolvers = {
    Query: {
        review: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const review = yield db.reviews.findOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                if (!review) {
                    throw new Error('review cannot be found!');
                }
                return review;
            }
            catch (error) {
                throw new Error(`Failed to query reviews: ${error}`);
            }
        }),
        reviews: (_root, { location, filter, typesFilter, limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let query = {};
                const data = {
                    region: null,
                    total: 0,
                    result: [],
                };
                if (location) {
                    const { country, admin, city } = yield api_1.Google.geocode(location);
                    if (city)
                        query.city = city;
                    if (admin)
                        query.admin = admin;
                    if (country) {
                        query.country = country;
                    }
                    else {
                        throw new Error('No country found');
                    }
                    const cityText = city ? `${city}, ` : '';
                    const adminText = admin ? `${admin}, ` : '';
                    data.region = `${cityText}${adminText}${country}`;
                }
                if (typesFilter) {
                    const newQuery = utils_1.typeQuery(typesFilter);
                    query = Object.assign(Object.assign({}, query), newQuery);
                }
                let cursor = yield db.reviews.find(query);
                if (filter) {
                    cursor = utils_1.filterSort(cursor, filter);
                }
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query all reviews: ${error}`);
            }
        }),
    },
    Mutation: {
        addReview: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            verifyAddReviewInput(input);
            const viewer = yield utils_1.authorizeToken(db, req);
            if (!viewer) {
                throw new Error('Viewer cannot be found');
            }
            let imageURL;
            try {
                imageURL = yield api_1.Cloudinary.upload(input.image);
            }
            catch (error) {
                throw new Error(`Cloudinary upload failed! ${error}`);
            }
            let insertResult;
            if (input.type === types_1.ReviewType.Restaurant) {
                const { country, admin, city } = yield api_1.Google.geocode(input.address);
                if (!country || !admin || !city) {
                    throw new Error('Invalid address input');
                }
                insertResult = yield db.reviews.insertOne(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId() }, input), { image: imageURL, country,
                    admin,
                    city, author: viewer._id }));
            }
            else {
                insertResult = yield db.reviews.insertOne(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId() }, input), { image: imageURL, author: viewer._id }));
            }
            const insertedReview = insertResult.ops[0];
            yield db.users.updateOne({ _id: viewer._id }, { $push: { reviews: insertedReview._id } });
            return insertedReview;
        }),
    },
    Review: {
        id: (review) => review._id.toString(),
        author: (review, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield db.users.findOne({ _id: review.author });
            if (!author) {
                throw new Error("author can't be found");
            }
            return author;
        }),
    },
};
