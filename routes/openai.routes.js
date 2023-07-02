const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();
require('dotenv').config();
// Configura la instancia de ChatCompletion con tu API key
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
// const openaiInstance = new ChatCompletion({
//   apiKey: "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", // Reemplaza YOUR_API_KEY por tu API key de OpenAI
// });

// Ruta POST para enviar solicitudes a ChatGPT
router.post("/", async (req, res) => {
    //console.log("apikey = " + configuration.apiKey);
  try {
    const openai = new OpenAIApi(configuration);

    const requestBody = {
      model: req.body.model,
      temperature: req.body.temperature,
      messages: req.body.messages,
      functions: req.body.functions,
    };

    const response = await openai.createChatCompletion(requestBody);

    // Extraer los datos relevantes de la respuesta
    const responseData = {
      config: response.config,
      data: response.data,
      headers: response.headers,
      //request: response.request,
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al realizar la solicitud a ChatGPT" });
  }
});

module.exports = router;
