export const JSONStringParser = (value: any): any => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};