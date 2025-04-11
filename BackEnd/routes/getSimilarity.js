const axios = require("axios");

// Handle the login form submission
function getSimilarProducts() {
  return async function (req, res) {
    console.log("wassup");
    const { text, top_k } = req.body || {
      text: "I want to give 10 year old boy a toy",
      top_k: 10,
    };

    try {
      console.log("trying");
      // Call the FastAPI /search endpoint with axios
      const response = await axios.post("http://127.0.0.1:8000/search", {
        text: text || "I want to give 10 year old boy a toy",
        top_k: top_k || 10,
      });
      console.log(response);

      // Send the response from FastAPI to the client
      res.json(JSON.parse(response.data)); // Parse the JSON response from FastAPI
    } catch (error) {
      console.error("Error calling FastAPI:", error);
      res.status(500).send("Error occurred while searching");
    }
  };
}

module.exports = { getSimilarProducts };
