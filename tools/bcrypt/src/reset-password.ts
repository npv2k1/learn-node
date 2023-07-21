import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import moment from 'moment';
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//     console.log(hash);
//   });
// });
// bcrypt.compare(
//   myPlaintextPassword,
//   '$2b$05$pwgXwr8Z4aLLaIhnzKk1/uuz1l79HbTZTw2TRhtV1XuGk7y0ArgfO',
//   function(err, result) {
//     console.log(result)
//   },
// );
type User = {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  updatedAt: string;
};
const user1: User = {
  id: '1',
  email: 'pvn10092001vn@gmail.com',
  password: 'password',
  firstname: 'nguyen',
  lastname: 'pham',
  updatedAt: '2020-01-01',
};
// console.log(crypto.randomBytes(32).toString('hex'));
function encryptToken(stringToEncrypt: string): string {
  const key = crypto
    .createHash('sha256')
    .update('popcorn')
    .digest();

  const IV_LENGTH = 16;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(stringToEncrypt);

  const result = Buffer.concat([encrypted, cipher.final()]);

  // formatted string [iv]:[token]
  return iv.toString('hex') + ':' + result.toString('hex');
}
export function generateResetToken(user: User): string {
  // Date now - will use it for expiration
  const now = new Date();

  // Convert to Base64
  const timeBase64 = Buffer.from(now.toISOString()).toString('base64');

  //Convert to Base64 user UUID - will use for retrieve user
  const userUUIDBase64 = Buffer.from(user.id).toString('base64');

  // User info string - will use it for sign and use token once
  const userString = `${user.id}${user.email}${user.password}${user.updatedAt}`;
  const userStringHash = crypto
    .createHash('md5')
    .update(userString)
    .digest('hex');

  // Generate a formatted string [time]-[userSign]-[userUUID]
  const tokenize = `${timeBase64}-${userStringHash}-${userUUIDBase64}`;

  // encrypt token
  return encryptToken(tokenize);
}
const token = generateResetToken(user1);
console.log(token);

type Token = string | null;

function decryptToken(stringToDecrypt: string): Token {
  try {
    const key = crypto
      .createHash('sha256')
      .update('popcorn')
      .digest();

    const textParts = stringToDecrypt.split(':');
    const iv = Buffer.from(textParts.shift() as string, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = decipher.update(encryptedText);

    const result = Buffer.concat([decrypted, decipher.final()]);

    return result.toString();
  } catch (error) {
    console.log('decrypted token error', error);
    return null;
  }
}

function getUserUUIDFromToken(token: string): string {
  try {
    const userUUIDHash = token.split('-')[2];
    return Buffer.from(userUUIDHash, 'base64').toString('ascii');
  } catch (error) {
    console.log('getUserUUIDFromToken', error);
    return '';
  }
}
function validateResetToken(user: User, token: string): boolean {
  console.log('token', token);
  // Split token string and retrieve timeInfo and userInfoHash
  const [timeHBase64, reqUserStringHash] = token.split('-');

  console.log('validateResetToken', timeHBase64, reqUserStringHash);

  const timestamp = Buffer.from(timeHBase64, 'base64').toString('ascii');

  // Using moment.diff method for retrieve dates difference in hours
  const tokenTimestampDate = moment(timestamp);
  const now = moment();

  // Fail if more then 24 hours
  const diff = now.diff(tokenTimestampDate, 'hours');
  if (Math.abs(diff) > 24) return false;

  const userString = `${user.id}${user.email}${user.password}${user.updatedAt}`;
  const userStringHash = crypto
    .createHash('md5')
    .update(userString)
    .digest('hex');

  // Check if userInfoHash is the same - this guarantee the token used once
  return reqUserStringHash === userStringHash;
}
const hashToken =
  'ff8a919637ba5e20e14519ae19d528c1:4aa934aeb185c3ab2d5ad26cd3257968a664c78e31806d8171ee921a751961be2b24162efcbc05a1ac55f3c64ab0a01996ceba5d1b467d9b49c52b96d241f17381e7c4f32e4753f9fbcb78469b0d19e8';
const decryptedToken = decryptToken(hashToken);
console.log('result', decryptedToken);
//@ts-ignore
const userUUID = getUserUUIDFromToken(decryptedToken);
console.log('userUUID', userUUID);
//@ts-ignore
const isTokenValid = validateResetToken(user1, decryptedToken);
console.log('isTokenValid', isTokenValid);
