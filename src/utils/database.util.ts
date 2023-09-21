import AWS from "aws-sdk";
import { DYNAMODB_ACTIONS } from "../common/constants";

AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default class DynamoDBClient {
  static async performOperation(action: DYNAMODB_ACTIONS, params: any) {
    let result;
    try {
      result = await dynamodb[action](params).promise();
    } catch (error) {
      console.log("$Database::error: ", error);
      throw error;
    }
    if (["scan"].includes(action)) return result?.Items;
    if (["get"].includes(action)) return result?.Item;
    return result?.Item;
  };
}