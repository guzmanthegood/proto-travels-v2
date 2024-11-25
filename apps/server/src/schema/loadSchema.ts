import { readFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadSchemas = (): string => {
  const schemaDir = join(__dirname);
  const schemaFiles = readdirSync(schemaDir).filter((file) =>
    file.endsWith(".graphql")
  );

  return schemaFiles
    .map((file) => readFileSync(join(schemaDir, file), "utf8"))
    .join("\n");
};

const schema = loadSchemas();

export default schema;
