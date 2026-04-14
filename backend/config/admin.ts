export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'toBeModified'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'toBeModified'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'toBeModified'),
    },
  },
});
