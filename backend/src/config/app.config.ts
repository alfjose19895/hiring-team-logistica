export const EnvConfiguration = () => ({
  nodeEnv: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
});
