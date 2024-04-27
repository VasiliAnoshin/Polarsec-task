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
exports.getSignature = exports.getSignatureVerify = exports.generateKeyPair = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateKeyPair() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            crypto_1.default.generateKeyPair('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                },
            }, (err, publicKey, privateKey) => {
                if (err) {
                    return reject(err);
                }
                resolve({ privateKey: privateKey.toString(), publicKey: publicKey.toString() });
            });
        });
    });
}
exports.generateKeyPair = generateKeyPair;
function getSignature(input, private_key) {
    return __awaiter(this, void 0, void 0, function* () {
        const signer = crypto_1.default.createSign('RSA-SHA256');
        signer.update(input);
        return signer.sign(private_key).toString('base64');
    });
}
exports.getSignature = getSignature;
function getSignatureVerify(input, signature, public_key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verifier = crypto_1.default.createVerify('RSA-SHA256');
            verifier.update(input);
            return verifier.verify(public_key, signature, 'base64');
        }
        catch (error) {
            return false;
        }
    });
}
exports.getSignatureVerify = getSignatureVerify;
