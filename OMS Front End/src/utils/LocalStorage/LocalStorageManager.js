import { encryptSotrageData,decryptStorageData } from "../../services/CryptoService";


function saveData(key, data) {
      const encryptedData = encryptSotrageData(data);
      localStorage.setItem(key, encryptedData);
}

  
  function getData(key) {
    
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      return decryptStorageData(encryptedData);
    }
    return null;
  }
  
  function removeData(key) {
    localStorage.removeItem(key);
  }
  
  export { saveData, getData, removeData };
  