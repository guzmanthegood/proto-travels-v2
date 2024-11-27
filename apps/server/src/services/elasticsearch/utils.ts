import { parseStringPromise } from "xml2js";

/**
 * Extracts `type` and `product` from the XML request
 * @param xmlRequest The XML request string
 * @returns An object with `type` and `product` values (or null if not found)
 */
export async function extractRequestDetails(
  xmlRequest: string
): Promise<{ type: string | null; product: string | null }> {
  try {
    const parsedXml: any = await parseStringPromise(xmlRequest, {
      explicitArray: false,
    });

    const query = parsedXml?.envelope?.query || {};
    const type = query?.$?.type || null;
    const product = query?.$?.product || null;

    return { type, product };
  } catch (err: any) {
    console.error(
      "[XML Parsing Error] Failed to extract request details:",
      err.message
    );
    return { type: null, product: null };
  }
}
