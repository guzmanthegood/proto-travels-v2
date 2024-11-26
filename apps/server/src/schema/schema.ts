import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Create __dirname manually in ESM environments
const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to load all `.graphql` files from the schema directory
const loadSchemas = (): string => {
  const schemaDir = join(__dirname, "graphql"); // Path to the `graphql` directory
  console.log("[Schema Loader] Loading schemas from:", schemaDir);

  // Check and list all `.graphql` files in the directory
  const schemaFiles = readdirSync(schemaDir).filter((file) =>
    file.endsWith(".graphql")
  );

  // Read the content of each `.graphql` file and combine them into a single string
  return schemaFiles
    .map((file) => readFileSync(join(schemaDir, file), "utf8"))
    .join("\n");
};

// Load and export the combined schemas
const schema = loadSchemas();
export default schema;
