namespace Common.Helper.Utility
{
    public class CommonUtils
    {
        public static string GenerateBase64ImageData(string base64, string extension)
        {
            // Create the base64 image data URL
            return $"data:image/{extension};base64,{base64}";
        }
    }
}
