"use strict";

const endpoint = process.env.TRANSLATOR_ENDPOINT || "https://api.cognitive.microsofttranslator.com";
const key = process.env.TRANSLATOR_KEY;
const region = process.env.TRANSLATOR_REGION;

module.exports = async function translate(context, req) {
  if (!key || !region) {
    context.res = {
      status: 500,
      body: { error: "Translator is not configured." }
    };
    return;
  }

  const texts = Array.isArray(req.body?.texts)
    ? req.body.texts.filter((text) => typeof text === "string" && text.trim()).slice(0, 100)
    : [];

  if (!texts.length) {
    context.res = { status: 200, body: { translations: {} } };
    return;
  }

  try {
    const response = await fetch(`${endpoint}/translate?api-version=3.0&to=es`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region
      },
      body: JSON.stringify(texts.map((text) => ({ Text: text })))
    });

    if (!response.ok) {
      context.res = {
        status: response.status,
        body: { error: "Translator request failed." }
      };
      return;
    }

    const translated = await response.json();
    const translations = {};
    texts.forEach((text, index) => {
      translations[text] = translated[index]?.translations?.[0]?.text || text;
    });

    context.res = {
      status: 200,
      headers: { "Cache-Control": "public, max-age=86400" },
      body: { translations }
    };
  } catch (error) {
    context.log(error);
    context.res = {
      status: 500,
      body: { error: "Translator request failed." }
    };
  }
};
