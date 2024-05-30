using System.Security.Cryptography;

namespace Common.Helper.Encryption
{
    public static class AesEcnryption
    {
        /// <summary>
        /// aesDecrypt
        /// </summary>
        /// <param name="post">post</param>
        /// <param name="key">key</param>
        /// <param name="iv">iv</param>
        /// <returns></returns>
        public static string AesDecrypt(string post, string key, string iv, bool isDecrypt)
        {   // Encrypt post data with AES 
            if (isDecrypt)
            {
                string? plaintext = null;
                byte[] decrypted = Convert.FromBase64String(post);
                using (Aes alg = Aes.Create())
                {
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = alg.CreateDecryptor(Convert.FromBase64String(key), Convert.FromBase64String(iv));
                    // Create the streams used for encryption.
                    using (MemoryStream msDecrypt = new(decrypted))
                    {
                        using (CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new(csDecrypt))
                            {

                                // Read the decrypted bytes from the decrypting stream
                                // and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                // Return the encrypted bytes from the memory stream.
                return plaintext;
            }
            return post;
        }

        /// <summary>
        /// aesEncrypt
        /// </summary>
        /// <param name="post">post</param>
        /// <param name="key">key</param>
        /// <param name="iv">iv</param>
        /// <returns></returns>
        public static string AesEncrypt(string post, string key, string iv)
        {   // Encrypt post data with AES 
            byte[] encrypted;
            using (Aes alg = Aes.Create())
            {
                // Create a decrytor to perform the stream transform.
                ICryptoTransform encryptor = alg.CreateEncryptor(Convert.FromBase64String(key), Convert.FromBase64String(iv));
                // Create the streams used for encryption.
                using MemoryStream msEncrypt = new();
                using CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write);
                using (StreamWriter swEncrypt = new(csEncrypt))
                {
                    //Write all data to the stream.
                    swEncrypt.Write(post);
                }
                encrypted = msEncrypt.ToArray();
            }
            // Return the encrypted bytes from the memory stream.
            return Convert.ToBase64String(encrypted);
        }

    }
}
