import axios, { AxiosInstance } from "axios";
import { parseStringPromise } from "xml2js";
import elasticClient from "../elasticsearch/client";

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

// Response interceptor
netstormingClient.interceptors.response.use(
  async (response) => {
    try {
      // Parse the XML response
      const parsed = await parseStringPromise(response.data, {
        explicitArray: false,
      });

      // Handle controlled errors in the response
      const responseType = parsed?.envelope?.response?.$?.type || null;
      const errorMessage = parsed?.envelope?.response?.message || null;

      if (responseType === "error") {
        console.error(`[Netstorming Error]: ${errorMessage}`);

        elasticClient.logNetstormingError(
          "netstorming",
          response,
          errorMessage
        );

        throw new Error(errorMessage);
      }

      // Log the successful response
      elasticClient.logNetstormingSuccess("netstorming", response);

      return response;
    } catch (err: any) {
      console.error("[Netstorming] Response exception:", err.message);
      elasticClient.logNetstormingError("netstorming", response, err.message);
      throw err;
    }
  },
  (error) => {
    const errorMessage = error.message;
    console.error(`[Netstorming Fetch Error]: ${errorMessage}`);
    elasticClient.logNetstormingError(
      "netstorming",
      error.response || {},
      errorMessage
    );
    return Promise.reject(error);
  }
);

export default netstormingClient;
