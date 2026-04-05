const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const isDevelopment = () => {
  return process.env.ENVIRONMENT === 'development';
};
