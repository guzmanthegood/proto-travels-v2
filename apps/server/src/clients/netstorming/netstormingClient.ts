// src/clients/netstorming/netstormingClient.ts
import axios, { AxiosInstance } from "axios";

const netstormingClient: AxiosInstance = axios.create({
  baseURL: "https://netstorming.api/endpoint",
  headers: {
    "Content-Type": "application/xml",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Interceptor for responses to handle errors globally.
 * Logs errors and rethrows them for specific handling in the calling function.
 */
netstormingClient.interceptors.response.use(
  (response) => {
    // Successful response, simply return it
    return response;
  },
  (error) => {
    // Log the error for debugging purposes
    console.error("Netstorming API error:", error.message);

    // Customize the error message for easier debugging
    throw new Error(`Netstorming API request failed: ${error.message}`);
  }
);

export default netstormingClient;
