import axios, { AxiosInstance } from "axios";

// Configuración de logging según las variables de entorno
const LOG_REQUESTS = process.env.NETSTORMING_LOG_REQUESTS === "true"; // Log requests
const LOG_RESPONSES = process.env.NETSTORMING_LOG_RESPONSES === "true"; // Log responses
const NETSTORMING_TIMEOUT = parseInt(
  process.env.NETSTORMING_TIMEOUT || "10000",
  10
); // Timeout en ms

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
 * Interceptor for responses to optionally log response details.
 */
netstormingClient.interceptors.response.use(
  async (response) => {
    if (LOG_RESPONSES) {
      console.log("Netstorming Response:", {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    const errorMessage = `Failed to fetch response: ${error.message}`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default netstormingClient;
