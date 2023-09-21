export const createResponse = (statusCode: number, body: object | null) => {
  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode,
    body: JSON.stringify(body),
  };
};