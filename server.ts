import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily or safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Ensure it is configured in active environments.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Recommendation endpoint
app.post("/api/recommendations", async (req, res) => {
  const { purpose, budget, category, preferences, dietary, additional } = req.body;

  try {
    const client = getGeminiClient();
    
    // Construct user input summary for the prompt
    let userInput = `Purpose: ${purpose || "Not specified"}\n`;
    if (budget) userInput += `Budget: ${budget}\n`;
    if (category) userInput += `Category: ${category}\n`;
    if (preferences) userInput += `Preferences: ${preferences}\n`;
    if (dietary) userInput += `Dietary Requirements: ${dietary}\n`;
    if (additional) userInput += `Additional Requirements/Context: ${additional}\n`;

    const promptText = `You are an expert retail product recommendation assistant.

Customer Requirement:
${userInput}

Analyze the customer's needs and recommend exactly 5 to 8 products. Choose the absolute best matches that fulfill the criteria mentioned.

For each product provide:
* Product Name
* Category
* Price Range (estimate, in currency suitable or matching user request, or in INR/USD accordingly)
* Key Benefits (array of 2-3 short benefits)
* Why Recommended
* Rating (estimated rating out of 5 based on user and community sentiment, e.g. 4.7)
* Suggested Alternatives (array of 1-2 product names)

Also provide custom AI insights:
* Best Overall Choice (productName and why)
* Budget-Friendly Choice (productName, price range, and why)
* Premium Choice (productName, price range, and why)
* Healthiest Choice (if food or lifestyle related, productName and why)
* Final Shopping Advice (practical guidelines for shopping)

Return clean JSON format conforming to the requested schema.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["products", "insights", "finalShoppingAdvice"],
          properties: {
            products: {
              type: Type.ARRAY,
              description: "List of 5 to 8 recommended products",
              items: {
                type: Type.OBJECT,
                required: ["productName", "category", "priceRange", "keyBenefits", "whyRecommended", "rating", "alternatives"],
                properties: {
                  productName: { type: Type.STRING },
                  category: { type: Type.STRING },
                  priceRange: { type: Type.STRING },
                  keyBenefits: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  whyRecommended: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  alternatives: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            },
            insights: {
              type: Type.OBJECT,
              required: ["bestOverall", "budgetFriendly", "premium"],
              properties: {
                bestOverall: {
                  type: Type.OBJECT,
                  required: ["productName", "reason"],
                  properties: {
                    productName: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                budgetFriendly: {
                  type: Type.OBJECT,
                  required: ["productName", "priceRange", "reason"],
                  properties: {
                    productName: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                premium: {
                  type: Type.OBJECT,
                  required: ["productName", "priceRange", "reason"],
                  properties: {
                    productName: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                healthiest: {
                  type: Type.OBJECT,
                  required: ["productName", "reason"],
                  properties: {
                    productName: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                }
              }
            },
            finalShoppingAdvice: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text returned from Gemini API");
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    res.status(500).json({
      error: "Failed to generate product recommendations.",
      details: error.message || error
    });
  }
});

// Configure Vite middleware in development or static hosting in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
