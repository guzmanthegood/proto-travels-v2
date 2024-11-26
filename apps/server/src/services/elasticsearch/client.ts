import { Client } from "@elastic/elasticsearch";

class ElasticsearchClient {
  private static instance: ElasticsearchClient;
  private client: Client;

  private constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_HOST || "http://localhost:9201",
    });

    console.log("[Elasticsearch] Client initialized");
  }

  public static getInstance(): ElasticsearchClient {
    if (!ElasticsearchClient.instance) {
      ElasticsearchClient.instance = new ElasticsearchClient();
    }
    return ElasticsearchClient.instance;
  }

  /**
   * Logs a successful response from Netstorming
   * @param index The Elasticsearch index name
   * @param response The full Axios response object
   */
  public async logNetstormingSuccess(
    index: string,
    response: any
  ): Promise<void> {
    const log = {
      timestamp: new Date().toISOString(),
      url: response.config.baseURL + response.config.url,
      method: response.config.method,
      status: response.status,
      request: response.config.data,
      response: response.data?.slice(0, 1000), // Trim response to 100 characters
      environment: process.env.NODE_ENV || "development",
      transaction_status: "OK",
    };

    this.client.index({ index, body: log }).catch((err) => {
      console.error("[Elasticsearch] Error indexing success log:", err.message);
    });
  }

  /**
   * Logs an error response from Netstorming
   * @param index The Elasticsearch index name
   * @param response The full Axios error object (if available)
   * @param errorMessage A descriptive error message
   */
  public async logNetstormingError(
    index: string,
    response: any,
    errorMessage: string
  ): Promise<void> {
    const log = {
      timestamp: new Date().toISOString(),
      url: response?.config?.baseURL + response?.config?.url || "Unknown URL",
      method: response?.config?.method || "Unknown Method",
      status: response?.status || 0,
      request: response?.config?.data || null,
      response: response?.data || null,
      environment: process.env.NODE_ENV || "development",
      transaction_status: "ERROR",
      error: errorMessage,
    };

    this.client.index({ index, body: log }).catch((err) => {
      console.error("[Elasticsearch] Error indexing error log:", err.message);
    });
  }
}

export default ElasticsearchClient.getInstance();
