// /api/proxy.js
export default async function handler(req, res) {
  // Your Google Apps Script Web App URL.
  const url = "https://script.google.com/macros/s/AKfycbyfNe1PtjrZZRrWP7uuqqoM70ICWa0EqDLRlVQnk4EQCOlPwxU40rqmxA8647lPPA7_/exec";

  // Check if the request method is OPTIONS.
  // This is part of the CORS preflight request.
  if (req.method === 'OPTIONS') {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).send('ok');
  }

  try {
    // Forward the POST request to the Google Apps Script.
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // Get the data from the Google Script's response.
    const data = await response.text();

    // Set the CORS headers to allow your site to receive the response.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Send the response from the Google Script back to your site.
    res.status(response.status).send(data);
  } catch (error) {
    // Handle any errors during the request.
    res.status(500).json({ error: "Erro no proxy", detail: error.message });
  }
}