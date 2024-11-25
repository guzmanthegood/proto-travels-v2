// src/utils/helpers.ts

/**
 * Generates a random alphanumeric string of a specified length.
 * @param length - The desired length of the generated string.
 * @returns A random alphanumeric string.
 */
export const generateUniqueId = (length: number = 40): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Allowed characters
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length)); // Append a random character
  }
  return result;
};
