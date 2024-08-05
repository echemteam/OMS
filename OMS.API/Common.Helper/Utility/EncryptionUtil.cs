using System.Security.Cryptography;
using System.Text;

namespace Common.Helper.Utility
{
    public static class EncryptionUtil
    {
        public static string AesEncryptData(string post)
        {
            string ciphertext;
            UTF8Encoding utf8 = new();
            AesCryptoServiceProvider aes = new();
            using (ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
            {
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
                byte[] bytes = utf8.GetBytes(post);
                cs.Write(bytes, 0, bytes.Length);
                cs.FlushFinalBlock();
                ms.Position = 0;
                bytes = new byte[ms.Length];
                ms.Read(bytes, 0, bytes.Length);
                ciphertext = Convert.ToBase64String(bytes);
            }
            return ciphertext;
        }

        public static byte[] HexStringToByteArray(string hex)
        {
            int hexLen = hex.Length;
            byte[] ret = new byte[hexLen / 2];
            for (int i = 0; i < hexLen; i += 2)
                ret[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            return ret;
        }

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
                    using (MemoryStream msDecrypt = new MemoryStream(decrypted))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
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

        public static string AesEncrypt(string post, string key, string iv)
        {   // Encrypt post data with AES 
            byte[] encrypted;
            using (Aes alg = Aes.Create())
            {
                // Create a decrytor to perform the stream transform.
                ICryptoTransform encryptor = alg.CreateEncryptor(Convert.FromBase64String(key), Convert.FromBase64String(iv));
                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.
                            swEncrypt.Write(post);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }
            // Return the encrypted bytes from the memory stream.
            return Convert.ToBase64String(encrypted);
        }

        public static string Base64StringToHexString(string str)
        {
            byte[] bytes = Convert.FromBase64String(str);
            string hex = BitConverter.ToString(bytes);
            return hex.Replace("-", "");
        }

        public static string HexStringToBase64String(string hex)
        {
            return Convert.ToBase64String(Enumerable.Range(0, hex.Length)
                             .Where(x => x % 2 == 0)
                             .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                             .ToArray());
        }

        public static string EncryptString(string strToEncrypt)
        {
            try
            {
                return Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(strToEncrypt));
            }
            catch (Exception ex)
            {
                return "Wrong Input. " + ex.Message;
            }
        }

        public static string DescryptString(string strToDecrypt)
        {
            try
            {
                return ASCIIEncoding.ASCII.GetString(Convert.FromBase64String(strToDecrypt));
            }
            catch (Exception ex)
            {
                return "Wrong Input. " + ex.Message;
            }
        }

        public static int GetRandomNumber()
        {
            Random r = new Random();
            int genRand = r.Next(10, 100);
            return genRand;
        }

        public static string GenerateSalt(int length)
        {
            var rng = new RNGCryptoServiceProvider();
            var buffer = new byte[length];
            rng.GetBytes(buffer);
            return Convert.ToBase64String(buffer);
        }

        public static string GenerateHashKeyUsingSalt(string value, string saltKey, string passwordFormat = "SHA1")
        {
            if (String.IsNullOrEmpty(passwordFormat))
                _ = "SHA1";
            string saltAndPassword = String.Concat(value, saltKey);
            string hashedPassword = Sha1Hash1(saltAndPassword).ToUpper();
            return hashedPassword;
        }

        internal static string Sha1Hash1(string value)
        {
            return string.Join("", SHA1CryptoServiceProvider.Create().ComputeHash(Encoding.UTF8.GetBytes(value)).Select(x => x.ToString("X2"))).ToLower();
        }

        public static string GetRandomLetters()
        {

            Random ran = new();

            String b = "abcdefghijklmnopqrstuvwxyz0123456789";
            String sc = "123456789";

            int length = 6;

            StringBuilder random = new();
            for (int i = 0; i < length; i++)
            {
                int a = ran.Next(b.Length);
                random.Append(b.ElementAt(a));
            }
            for (int j = 0; j < 2; j++)
            {
                int sz = ran.Next(sc.Length);
                random.Append(sc.ElementAt(sz));
            }
            return random.ToString();
        }

        public static string GenerateAesKeyAndAesIV()
        {
            try
            {
                byte[] aesKey = GenerateRandomBytes(32);
                // Generate AES IV (16 bytes)
                byte[] aesIV = GenerateRandomBytes(16);

                // Encode the key and IV in Base64
                string encodedAesKey = Convert.ToBase64String(aesKey);
                string encodedAesIV = Convert.ToBase64String(aesIV);
                return encodedAesKey + ":::" + encodedAesIV;
            }
            catch (Exception ex)
            {
                return "Wrong Input. " + ex.Message;
            }
        }

        public static byte[] GenerateRandomBytes(int length)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] randomBytes = new byte[length];
                rng.GetBytes(randomBytes);
                return randomBytes;
            }
        }

        public static class JwtSecretKeyGenerator
        {
            private static readonly char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+?".ToCharArray();

            public static string GenerateSecretKey(int length)
            {
                byte[] data = new byte[length];
                using (var rng = new RNGCryptoServiceProvider())
                {
                    rng.GetBytes(data);
                }

                var stringBuilder = new StringBuilder(length);
                foreach (var byteValue in data)
                {
                    stringBuilder.Append(chars[byteValue % chars.Length]);
                }

                return stringBuilder.ToString();
            }
        }

        public static string GenerateReferenceCode()
        {
            Random random = new();
            int code = random.Next(10000, 100000);
            return code.ToString();
        }


        public static string GenerateListCode(string taxid, string name)
        {
            string last4Digits = taxid.Length >= 4 ? taxid[^4..] : taxid;
            string cleanedName = name.Trim();
            string first5Chars = cleanedName.Length >= 5 ? cleanedName[..5] : cleanedName;
            string combinedString = last4Digits + "_" + first5Chars;
            return combinedString.Length <= 10 ? combinedString : combinedString[..10];
        }
    }
}
