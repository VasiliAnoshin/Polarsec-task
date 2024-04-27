import crypto from 'crypto';

async function generateKeyPair(): Promise<{ privateKey: string; publicKey: string }> {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair('rsa', {
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
  }

  async function getSignature(input:string, private_key:string): Promise<string>  {
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(input);
    return  signer.sign(private_key).toString('base64');
  }

  async function getSignatureVerify(input:string, signature:string, public_key:string) : Promise<boolean> {
    try {
      const verifier = crypto.createVerify('RSA-SHA256');
      verifier.update(input);
      return verifier.verify(public_key, signature, 'base64');
    } catch (error){
        return false
    }
  }

  export { generateKeyPair, getSignatureVerify, getSignature} 