
# AWS Serverless con Node.js

El proyecto utiliza la API swapi para obtener información sobre los personajes de Star Wars. Se está empleando DynamoDB como base de datos para almacenar información relacionada con los el universo de Star Wars.

## Configuración

A continuación se muestra la configuración de funciones en AWS Serverless con Node.js:

```bash
provider:
  name: aws
  runtime: nodejs18.x

functions:
  health:
    handler: src/controller.health
    events:
      - httpApi:
          path: /api/health
          method: get
          cors: true
  listPeople:
    handler: src/controller.listPeople
    timeout: 60
    events:
      - httpApi:
          path: /api/people
          method: get
          cors: true
          responses:
            200:
              description: 'Success response'
              bodyType: 'ListPeople'
              headers:
                Content-Type: "'application/json'"
  listPlanets:
    handler: src/controller.listPlanets
    timeout: 60
    events:
      - httpApi:
          path: /api/planets
          method: get
          cors: true
          responses:
            200:
              description: 'Success response'
              bodyType: 'ListPlanets'
              headers:
                Content-Type: "'application/json'"
  createVehicle:
    handler: src/controller.createVehicle
    timeout: 60
    events:
      - httpApi:
          path: /api/vehicles
          method: post
          cors: true
          responses:
            200:
              description: 'Success response'
              bodyType: 'Vehicle'
              headers:
                Content-Type: "'application/json'"
  getVehicle:
    handler: src/controller.getVehicle
    timeout: 60
    events:
      - httpApi:
          path: /api/vehicles/{vehicle_id}
          method: get
          cors: true
          responses:
            200:
              description: 'Success response'
              bodyType: 'Vehicle'
              headers:
                Content-Type: "'application/json'"
```

## Funciones

Esta configuración contiene 5 funciones diferentes que se pueden desplegar en AWS Lambda utilizando el framework Serverless. Las funciones están descritas a continuación:

### Función Health
Esta función maneja una solicitud HTTP GET en la ruta /api/health y llama al manejador health en el archivo controller.ts. Esta función está diseñada para obtener el estado de la función lambda.

### Función listPeople
Esta función maneja una solicitud HTTP GET en la ruta /api/people y llama al manejador listPeople en el archivo controller.ts. Esta función está diseñada para obtener el listado de personajes (en español) de Star Wars de la API [swapi](https://swapi.py4e.com/) de acuerdo a la página indicada. La función tiene un tiempo de espera de 60 segundos.


### Función listPlanets
Esta función maneja una solicitud HTTP GET en la ruta /api/planets y llama al manejador listPlanets en el archivo controller.ts. Esta función está diseñada para obtener el listado de planetas (en español) de Star Wars de la API [swapi](https://swapi.py4e.com/) de acuerdo a la página indicada. La función tiene un tiempo de espera de 60 segundos.

### Función createVehicle

Esta función maneja una solicitud HTTP POST en la ruta /api/vehicles y llama al manejador createVehicle en el archivo controller.ts. Esta función está diseñada para crear un nuevo vehículo y almacenarlo en una tabla DynamoDB en AWS. La función tiene un tiempo de espera de 60 segundos.

### Función getVehicle

Esta función maneja una solicitud HTTP GET en la ruta /api/vehicles/{vehicle_id} y llama al manejador getVehicle en el archivo controller.ts. Esta función está diseñada para recuperar vehículos almacenados en una tabla DynamoDB en AWS. La función tiene un tiempo de espera de 60 segundos.

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## API Reference

Root endpoint: ```https://3znvgsvepb.execute-api.us-east-1.amazonaws.com/```

#### Health

```http
  GET {root-endpoint}/api/health
```

#### List People

```http
  GET {root-endpoint}/api/people?page=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | Número de página |

#### List Planets

```http
  GET {root-endpoint}/api/planets?page=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | Número de página |

#### Create Vehicle

```http
  POST {root-endpoint}/api/vehicles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cargo_capacity` | `string` | **Required**. Capacidad de carga |
| `consumables` | `string` | **Required**. Consumibles |
| `cost_in_credits` | `string` | **Required**. Coste en creditos |
| `crew` | `string` | **Required**. Multitud |
| `length` | `string` | **Required**. Longitud |
| `manufacturer` | `string` | **Required**. Fabricante |
| `max_atmosphering_speed` | `string` | **Required**. Velocidad maxima de atmosfera |
| `model` | `string` | **Required**. Modelo |
| `name` | `string` | **Required**. Nombre |
| `passengers` | `string` | **Required**. Pasajeros |
| `pilots` | `array` | **Required**. Pilots |
| `films` | `array` | **Required**. Películas |
| `url` | `string` | **Required**. URL |
| `vehicle_class` | `string` | **Required**. Clase vehículo |

#### Create Public Image (DynamoDB)

```http
  POST {root-endpoint}/dynamo/image/public
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `vehicle_id` | `string` | **Required**. Identificador del vehículo |
