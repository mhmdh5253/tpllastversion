using System.Net.Http.Headers;
using System.Text;

namespace TPLWeb.Tools
{
    public interface ISmsSender
    {
        Task<string> SendSmsAsync(string message, string phoneNumber);
    }

    public class SmsSender : ISmsSender
    {

        public async Task<string> SendSmsAsync(string message, string phoneNumber)
        {
            try
            {
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri("https://s.api.ir/api/sw1/SmsOTP"),
                    Content = new StringContent($"{{\"code\": \"{message}\", \"mobile\": \"{phoneNumber}\"}}", Encoding.UTF8, "application/json")
                };
                // اضافه کردن توکن Bearer به هدر Authorization
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "woKUqb4hQBBnQZHsv35mORIpHN4JbqKLIRaNrFpNeXz2WBTwx5gk/EZJN1bnEGe8H+b1WLBubjeta5EqwwJgUWBNM5aaBlI8+um6j+4jrMs=");
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await new HttpClient().SendAsync(request);
                response.EnsureSuccessStatusCode();

                var responseBody = await response.Content.ReadAsStringAsync();
                return $"Success: {responseBody}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
    }
}