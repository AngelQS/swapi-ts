import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

function ErrorHandlingMiddleware(): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> {
  return {
    onError: async (request) => {
      // console.log('middleware request: ', request)
      const { error } = request;
      // console.error('ErrorHandlingMiddleware:', error);
  
      request.response = {
        statusCode: error?.statusCode || 500,
        body: JSON.stringify({
          code: error?.code || "ERR-001",
          message: error?.message || 'Internal Server Error',
        }),
      };
    },
  };
};
  
export default ErrorHandlingMiddleware;
