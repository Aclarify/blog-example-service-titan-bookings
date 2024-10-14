import { serviceTitanConfig } from "../config/serviceTitan.config";

export const authenticateServiceTitan = async (): Promise<string> => {
  const response = await fetch("https://auth.servicetitan.io/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: serviceTitanConfig.clientId,
      client_secret: serviceTitanConfig.clientSecret,
      grant_type: "client_credentials",
    }).toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Authentication failed:", errorData);
    throw new Error("Failed to authenticate with ServiceTitan API.");
  }

  const data = await response.json();
  return data.access_token;
};
