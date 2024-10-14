import { serviceTitanConfig } from "../config/serviceTitan.config";
import { authenticateServiceTitan } from "./authenticateST.util";

interface MakeRequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export const makeRequest = async <T = unknown>(
  options: MakeRequestOptions
): Promise<T> => {
  const accessToken = await authenticateServiceTitan();

  const { url, method, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "ST-App-Key": serviceTitanConfig.appKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`API request failed: ${response.status}`, errorData);
    throw new Error(
      `ServiceTitan API request failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data as T;
};
