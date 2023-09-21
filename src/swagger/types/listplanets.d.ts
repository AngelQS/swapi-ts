import { Planet } from "./planet";

export interface ListPlanets {
  data: Planets;
}

export interface Planets {
  planets: Planet[];
}
