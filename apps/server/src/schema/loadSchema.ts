import { readFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Resolver el equivalente de __dirname en módulos ES6
const __dirname = dirname(fileURLToPath(import.meta.url));

// Leer todos los archivos .graphql en el directorio schema
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
