
export const makeApiRequest = async () => {

  // ✅ Step 2: Make the GET request with cookies auto-included
  const response = await fetch(
    "https://dbwsl.smartschool.be/planner/api/v1/planned-elements/user/5291_3679_0?from=2025-06-08T00%3A00%3A00%2B02%3A00&to=2025-07-12T23%3A59%3A59%2B02%3A00&types=planned-assignments,planned-to-dos",
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Referer": "https://dbwsl.smartschool.be/",
        "Content-Type": "application/json",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=4",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "TE": "trailers",
        "Host": "dbwsl.smartschool.be",
      },
      credentials: "include", // 👈 Makes sure the cookie is sent
    }
  );

  const result = await response.json();
  console.log("Status:", response.status);
  console.log("Data:", result);
  return result;
};
