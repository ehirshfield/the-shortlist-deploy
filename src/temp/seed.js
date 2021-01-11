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
require('dotenv').config();
const mongodb_1 = require("mongodb");
const database_1 = require("../src/database");
const types_1 = require("../src/lib/types");
const users = [
    {
        _id: '5d378db94e84753160e08b55',
        token: 'token_************',
        name: 'Eric H.',
        avatar: 'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg',
        contact: 'eric@money.com',
        reviews: [
            new mongodb_1.ObjectId('5d378db94e84753160e08b31'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b4b'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b4c'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b4f'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b5c'),
        ],
    },
    {
        _id: '5d378db94e84753160e08b56',
        token: 'token_************',
        name: 'Tom F.',
        avatar: 'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg',
        contact: 'tom@folker.com',
        reviews: [
            new mongodb_1.ObjectId('5d378db94e84753160e08b37'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b38'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b31'),
            new mongodb_1.ObjectId('5d378db94e84753160e08b4b'),
            new mongodb_1.ObjectId('5ff78ea88f8362ad6b64e564'),
        ],
    },
    {
        _id: '5d378db94e84753160e08b57',
        token: 'token_************',
        name: 'Spenser B.',
        avatar: 'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg',
        contact: 'spenser@yeti.com',
        reviews: [new mongodb_1.ObjectId('5d378db94e84753160e08b3a')],
    },
];
const reviews = [
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b31'),
        title: 'Chana Masala by J. Kenji Lopez-Alt',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
        body: 'A sample paragraph Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 7,
        author: '5d378db94e84753160e08b55',
        type: types_1.ReviewType.Recipe,
        url: 'https://www.seriouseats.com/recipes/2016/04/channa-masala-recipe.html',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b4b'),
        title: 'Shakshuka from NYT Cooking',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
        body: 'new post about nothing',
        rating: 9,
        author: '5d378db94e84753160e08b55',
        type: types_1.ReviewType.Recipe,
        url: 'https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b37'),
        title: 'McDonalds on 3rd Street',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645375/mock/Los%20Angeles/los-angeles-listing-5_rll8i2.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 5,
        author: '5d378db94e84753160e08b56',
        type: types_1.ReviewType.Restaurant,
        city: 'San Diego',
        address: '123 Fake Street',
        country: 'United States',
        admin: 'California',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b38'),
        title: 'The Combination Taco Bell and Pizza Hut',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645377/mock/Los%20Angeles/los-angeles-listing-6_unhtji.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 10,
        author: '5d378db94e84753160e08b56',
        type: types_1.ReviewType.Restaurant,
        city: 'San Diego',
        address: '1234 Fake Street',
        country: 'United States',
        admin: 'California',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b4c'),
        title: 'Great China',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560646430/mock/Cancun/cancun-listing-1_zihihs.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 9,
        author: '5d378db94e84753160e08b55',
        type: types_1.ReviewType.Restaurant,
        city: 'Berkeley',
        address: '123 Uni Street',
        country: 'United States',
        admin: 'California',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b3a'),
        title: 'Golden Corral',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560646289/mock/Cancun/cancun-listing-2_bsocu5.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 8,
        author: '5d378db94e84753160e08b57',
        type: types_1.ReviewType.Restaurant,
        city: 'New York',
        address: '123 Pizza Street',
        country: 'United States',
        admin: 'New York',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b4f'),
        title: 'Dim Sum Bistro',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-8_q01xt6.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 10,
        author: '5d378db94e84753160e08b55',
        type: types_1.ReviewType.Restaurant,
        city: 'San Francisco',
        address: '675 Broadway St',
        country: 'United States',
        admin: 'California',
    },
    {
        _id: new mongodb_1.ObjectId('5ff78ea88f8362ad6b64e564'),
        title: 'Lucha Libre',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645410/mock/London/london-listing-3_hbqxs1.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 8,
        author: '5d378db94e84753160e08b56',
        type: types_1.ReviewType.Restaurant,
        city: 'San Diego',
        address: '12123 Tom St',
        country: 'United States',
        admin: 'California',
    },
    {
        _id: new mongodb_1.ObjectId('5d378db94e84753160e08b5c'),
        title: 'Primos Donuts',
        image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560645408/mock/London/london-listing-1_yedylx.jpg',
        body: 'Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.',
        rating: 9,
        author: '5d378db94e84753160e08b55',
        type: types_1.ReviewType.Restaurant,
        city: 'Los Angeles',
        address: '999 Pico St',
        country: 'United States',
        admin: 'California',
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('[seed] : running...');
        const db = yield database_1.connectDatabase();
        for (const review of reviews) {
            yield db.reviews.insertOne(review);
        }
        for (const user of users) {
            yield db.users.insertOne(user);
        }
        console.log('[seed] : success');
        process.exit();
    }
    catch (err) {
        console.error(err);
        throw new Error('failed to seed database');
    }
});
seed();
