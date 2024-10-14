(() => {
  const requiredEnvVars = [
    "SERVICE_TITAN_APP_KEY",
    "SERVICE_TITAN_TENANT_ID",
    "SERVICE_TITAN_BOOKING_PROVIDER_ID",
    "SERVICE_TITAN_CLIENT_ID",
    "SERVICE_TITAN_CLIENT_SECRET",
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
})();

export const serviceTitanConfig = {
  tenantId: process.env.SERVICE_TITAN_TENANT_ID as string,
  appKey: process.env.SERVICE_TITAN_APP_KEY as string,
  bookingProviderId: process.env.SERVICE_TITAN_BOOKING_PROVIDER_ID as string,
  clientId: process.env.SERVICE_TITAN_CLIENT_ID as string,
  clientSecret: process.env.SERVICE_TITAN_CLIENT_SECRET as string,
};
