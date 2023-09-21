import { randomUUID } from "crypto";
import DynamoDBClient from "./utils/database.util";
import { DYNAMODB_ACTIONS, DYNAMODB_METHODS, HttpMethod } from "./common/constants";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { CreateVehicleRequestDto } from "./dtos/create-vehicle-request.dto";
import { GetVehicleRequestDto } from "./dtos/get-vehicle-request.dto";
import { CreateVehicleResponseDto } from "./dtos/create-vehicle-response.dto";
import { personTranslatedKeys, planetTranslatedKeys, updateObjectKeys, vehicleTranslatedKeys } from "./utils/translator.util";
import ListPeopleRequestDto from "./dtos/list-people-request.dto";
import { makeRequest } from "./utils/http-client.util";
import ListPeopleResponseDto from "./dtos/list-people-response.dto";
import ListPlanetsRequestDto from "./dtos/list-planets-request.dto";
import ListPlanetsResponseDto from "./dtos/list-planets-response.dto";

export default class Service {
  static listPeople = async (listPeopleRequestDto: ListPeopleRequestDto): Promise<ListPeopleResponseDto> => {
    const { page } = listPeopleRequestDto;

    const { SW_API_URL, SW_LIST_PEOPLE_ENDPOINT } = process.env;
    const url = `${SW_API_URL}${SW_LIST_PEOPLE_ENDPOINT}?page=${page}`;

    const response = await makeRequest(url, HttpMethod.GET, null);

    const translatedData = response.results.map((person: any) => updateObjectKeys(person, personTranslatedKeys));

    const listPeopleResponseDto: ListPeopleResponseDto = {
      people: translatedData,
      page,
      count: response.count,
    }

    return listPeopleResponseDto;
  };

  static listPlanets = async (listPlanetsRequestDto: ListPlanetsRequestDto): Promise<ListPlanetsResponseDto> => {
    const { page } = listPlanetsRequestDto;
    
    const { SW_API_URL, SW_LIST_PLANETS_ENDPOINT } = process.env;
    const url = `${SW_API_URL}${SW_LIST_PLANETS_ENDPOINT}?page=${page}`;

    const response = await makeRequest(url, HttpMethod.GET, null);

    const translatedData = response.results.map((planet: any) => updateObjectKeys(planet, planetTranslatedKeys));

    const listPeopleResponseDto: ListPlanetsResponseDto = {
      planets: translatedData,
      page,
      count: response.count,
    }

    return listPeopleResponseDto;
  };

  static createVehicle = async (createVehicleDto: CreateVehicleRequestDto): Promise<CreateVehicleResponseDto> => {
    const newVehicle: CreateVehicleDto = {
        vehicle_id: randomUUID(),
        ...createVehicleDto,
    };

    const createVehicleParams = {
      TableName: process.env.DYNAMODB_TABLE_VEHICLES,
      Item: newVehicle,
    };

    await DynamoDBClient.performOperation(DYNAMODB_ACTIONS.PUT, createVehicleParams);

    return {
      vehicle_id: newVehicle.vehicle_id,
    } as CreateVehicleResponseDto;
  };

  static getVehicle = async (getVehicleRequestDto: GetVehicleRequestDto): Promise<any> => {
    const { vehicle_id } = getVehicleRequestDto;

    const getVehicleParams = {
      TableName: process.env.DYNAMODB_TABLE_VEHICLES,
      Key: {
        "vehicle_id": vehicle_id,
      },
    };

    const vehicle = await DynamoDBClient.performOperation(DYNAMODB_ACTIONS.GET, getVehicleParams);

    const translatedData = updateObjectKeys(vehicle, vehicleTranslatedKeys);

    return translatedData;
  };
};
