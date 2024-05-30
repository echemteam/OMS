import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const aesKey = process.env.REACT_APP_AESKEY;
const aesIVKey = process.env.REACT_APP_AESIVKEY;

const Key = CryptoJS.enc.Base64.parse(aesKey);
const IV = CryptoJS.enc.Base64.parse(aesIVKey);

function encryptSotrageData(data) {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
  return encryptedData.toString();
}

function decryptStorageData(encryptedData) {

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const encryptAES = (data) => {
  const input = typeof data === 'object' ? JSON.stringify(data) : data.toString();
  const encrypted = CryptoJS.AES.encrypt(input, Key, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const decryptAES = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, Key, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  try {
    // Attempt to parse decrypted data as JSON
    const parsedData = JSON.parse(decryptedText);
    return parsedData;
  } catch (error) {
    // If parsing as JSON fails, return the decrypted data as is
    return decryptedText;
  }
};

const encryptUrlData = (data) => {
  const encrypted = encryptAES(data).replaceAll('/', 's2e0s21').replaceAll('+', 's2e0s22');;
  return encrypted;
}

const decryptUrlData = (data) => {
  data = data.replaceAll('s2e0s21', '/').replaceAll('s2e0s22', '+');
  const decrypted = decryptAES(data);
  return decrypted;
}

export { encryptSotrageData, decryptStorageData, encryptAES, decryptAES, encryptUrlData, decryptUrlData };
