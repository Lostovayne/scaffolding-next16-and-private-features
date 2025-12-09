import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

// Define parsers for search params
export const productsParams = {
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

// Create a safe cache for server-side usage
export const loadSearchParams = createSearchParamsCache(productsParams);
