"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = void 0;
var crypto = __importStar(require("crypto"));
var moment_1 = __importDefault(require("moment"));
var saltRounds = 10;
var myPlaintextPassword = 's0//P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
var user1 = {
    id: '1',
    email: 'pvn10092001vn@gmail.com',
    password: 'password',
    firstname: 'nguyen',
    lastname: 'pham',
    updatedAt: '2020-01-01',
};
// console.log(crypto.randomBytes(32).toString('hex'));
function encryptToken(stringToEncrypt) {
    var key = crypto
        .createHash('sha256')
        .update('popcorn')
        .digest();
    var IV_LENGTH = 16;
    var iv = crypto.randomBytes(IV_LENGTH);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var encrypted = cipher.update(stringToEncrypt);
    var result = Buffer.concat([encrypted, cipher.final()]);
    // formatted string [iv]:[token]
    return iv.toString('hex') + ':' + result.toString('hex');
}
function generateResetToken(user) {
    // Date now - will use it for expiration
    var now = new Date();
    // Convert to Base64
    var timeBase64 = Buffer.from(now.toISOString()).toString('base64');
    //Convert to Base64 user UUID - will use for retrieve user
    var userUUIDBase64 = Buffer.from(user.id).toString('base64');
    // User info string - will use it for sign and use token once
    var userString = "".concat(user.id).concat(user.email).concat(user.password).concat(user.updatedAt);
    var userStringHash = crypto
        .createHash('md5')
        .update(userString)
        .digest('hex');
    // Generate a formatted string [time]-[userSign]-[userUUID]
    var tokenize = "".concat(timeBase64, "-").concat(userStringHash, "-").concat(userUUIDBase64);
    // encrypt token
    return encryptToken(tokenize);
}
exports.generateResetToken = generateResetToken;
var token = generateResetToken(user1);
console.log(token);
function decryptToken(stringToDecrypt) {
    try {
        var key = crypto
            .createHash('sha256')
            .update('popcorn')
            .digest();
        var textParts = stringToDecrypt.split(':');
        var iv = Buffer.from(textParts.shift(), 'hex');
        var encryptedText = Buffer.from(textParts.join(':'), 'hex');
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        var decrypted = decipher.update(encryptedText);
        var result = Buffer.concat([decrypted, decipher.final()]);
        return result.toString();
    }
    catch (error) {
        console.log('decrypted token error', error);
        return null;
    }
}
function getUserUUIDFromToken(token) {
    try {
        var userUUIDHash = token.split('-')[2];
        return Buffer.from(userUUIDHash, 'base64').toString('ascii');
    }
    catch (error) {
        console.log('getUserUUIDFromToken', error);
        return '';
    }
}
function validateResetToken(user, token) {
    console.log("token", token);
    // Split token string and retrieve timeInfo and userInfoHash
    var _a = token.split('-'), timeHBase64 = _a[0], reqUserStringHash = _a[1];
    console.log("validateResetToken", timeHBase64, reqUserStringHash);
    var timestamp = Buffer.from(timeHBase64, 'base64').toString('ascii');
    // Using moment.diff method for retrieve dates difference in hours
    var tokenTimestampDate = (0, moment_1.default)(timestamp);
    var now = (0, moment_1.default)();
    // Fail if more then 24 hours
    var diff = now.diff(tokenTimestampDate, 'hours');
    if (Math.abs(diff) > 24)
        return false;
    var userString = "".concat(user.id).concat(user.email).concat(user.password).concat(user.updatedAt);
    var userStringHash = crypto
        .createHash('md5')
        .update(userString)
        .digest('hex');
    // Check if userInfoHash is the same - this guarantee the token used once
    return reqUserStringHash === userStringHash;
}
var hashToken = 'ff8a919637ba5e20e14519ae19d528c1:4aa934aeb185c3ab2d5ad26cd3257968a664c78e31806d8171ee921a751961be2b24162efcbc05a1ac55f3c64ab0a01996ceba5d1b467d9b49c52b96d241f17381e7c4f32e4753f9fbcb78469b0d19e8';
var decryptedToken = decryptToken(hashToken);
console.log('result', decryptedToken);
//@ts-ignore
var userUUID = getUserUUIDFromToken(decryptedToken);
console.log('userUUID', userUUID);
//@ts-ignore
var isTokenValid = validateResetToken(user1, decryptedToken);
console.log('isTokenValid', isTokenValid);
