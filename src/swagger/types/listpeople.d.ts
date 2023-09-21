import { Person } from "./person";

export interface ListPeople {
  data: People;
}

export interface People {
  people: Person[];
}
