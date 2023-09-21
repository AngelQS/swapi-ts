import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { makeRequest } from "./utils/http-client.util";
import { HttpMethod } from "./common/constants";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import urlEncodeBodyParser from "@middy/http-urlencode-body-parser";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware";
import { createResponse } from "./utils/response.util";
import { HttpResponse } from "./common/http-response";
import { CreateVehicleRequestDto } from "./dtos/create-vehicle-request.dto";
import Service from "./service";
import { GetVehicleRequestDto } from "./dtos/get-vehicle-request.dto";
import ListPeopleRequestDto from "./dtos/list-people-request.dto";
import ListPlanetsRequestDto from "./dtos/list-planets-request.dto";

const healthHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return createResponse(HttpResponse.OK, { message: "Service is running" });
};

const listPeopleHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const page = event.queryStringParameters?.page || 1;

  const listPeopleRequestDto: ListPeopleRequestDto = {
    page,
  };
  const response = await Service.listPeople(listPeopleRequestDto);

  return createResponse(HttpResponse.OK, { data: response });
};

const listPlanetsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const page = event.queryStringParameters?.page || 1;

  const listPlanetsRequestDto: ListPlanetsRequestDto = {
    page,
  };
  const response = await Service.listPlanets(listPlanetsRequestDto);

  return createResponse(HttpResponse.OK, { data: response });
};

const createVehicleHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const createVehicleRequestDto: CreateVehicleRequestDto = event.body;
  const response = await Service.createVehicle(createVehicleRequestDto);

  return createResponse(HttpResponse.OK, { data: response });
};

const getVehicleHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const vehicle_id = event.pathParameters?.vehicle_id;

  const getVehicleRequestDto: GetVehicleRequestDto = {
    vehicle_id,
  };
  const response = await Service.getVehicle(getVehicleRequestDto);

  return createResponse(HttpResponse.OK, { data: response });
};

export const health = middy(healthHandler)
.use(jsonBodyParser())
.use(urlEncodeBodyParser())
.use(ErrorHandlingMiddleware());

export const listPeople = middy(listPeopleHandler)
.use(jsonBodyParser())
.use(urlEncodeBodyParser())
.use(ErrorHandlingMiddleware());

export const listPlanets = middy(listPlanetsHandler)
.use(jsonBodyParser())
.use(urlEncodeBodyParser())
.use(ErrorHandlingMiddleware());

export const createVehicle = middy(createVehicleHandler)
.use(jsonBodyParser())
.use(urlEncodeBodyParser())
.use(ErrorHandlingMiddleware());

export const getVehicle = middy(getVehicleHandler)
.use(jsonBodyParser())
.use(urlEncodeBodyParser())
.use(ErrorHandlingMiddleware());
