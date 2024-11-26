import axios, { AxiosInstance } from "axios";
import { parseStringPromise } from "xml2js";

// Configuración de logging según las variables de entorno
const LOG_REQUESTS = process.env.NETSTORMING_LOG_REQUESTS === "true"; // Log requests
const LOG_RESPONSES = process.env.NETSTORMING_LOG_RESPONSES === "true"; // Log responses
const NETSTORMING_TIMEOUT = parseInt(
  process.env.NETSTORMING_TIMEOUT || "10000",
  10
);

const netstormingClient: AxiosInstance = axios.create({
  baseURL: process.env.NETSTORMING_URL,
  headers: {
    "Content-Type": "application/xml",
  },
  timeout: NETSTORMING_TIMEOUT,
});

/**
 * Interceptor for requests to optionally log request details.
 */
netstormingClient.interceptors.request.use(
  (config) => {
    if (LOG_REQUESTS) {
      console.log("Netstorming Request:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    const errorMessage = `Failed to send request: ${error.message}`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * Interceptor for responses to optionally log response details
 * and handle controlled Netstorming errors centrally.
 */
netstormingClient.interceptors.response.use(
  async (response) => {
    if (LOG_RESPONSES) {
      console.log("Netstorming Response:", {
        status: response.status,
        data: response.data,
      });
    }

    // Parse the XML response
    const parsed = await parseStringPromise(response.data, {
      explicitArray: false,
    });

    // Handle controlled errors
    const responseType = parsed?.envelope?.response?.$?.type || null;
    const errorMessage = parsed?.envelope?.response?.message || null;

    if (responseType === "error") {
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Return the parsed response if no errors
    return response;
  },
  (error) => {
    const errorMessage = `Failed to fetch response: ${error.message}`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default netstormingClient;
