require('dotenv').config();

module.exports = {
  database: {
    database: process.env.DB_NAME || 'neate',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  certificate: {
    privkey: process.env.PRIVKEY_PATH || 'path to priv key',
    fullchain: process.env.FULLCHAIN_PATH || 'path to fullchain key'
  },
  stripe:{
    publishKey: process.env.STRIPE_PUBLISH_KEY || "Stripe publish key",
    secretKey: process.env.STRIPE_SECRET_KEY || "Stripe secret key",
    stripeRecreateAccountLinkURL: process.env.STRIPE_RECREATE_ACCOUNT_LINK_URL || "Stripe create account link url",
    stripeAccountLinkSuccessURL: process.env.STRIPE_ACCOUNT_LINK_SUCCESS || "Stripe account link url success",
  },
  protocol: process.env.PROTOCOL || 'http',
  port: process.env.APP_PORT || 3000
};
