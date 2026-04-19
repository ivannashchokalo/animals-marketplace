import { Animal, AnimalId } from "@/types/animal";
import { nextServer } from "./api";

export interface FetchAnimalsRequest {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  animals: Animal[];
}

export const fetchAnimals = async (page = 1, type = "", search = "") => {
  const { data } = await nextServer.get<FetchAnimalsRequest>("/animals", {
    params: {
      page,
      perPage: 12,
      type,
      search,
    },
  });

  return data;
};

export const fetchAnimalById = async (id: AnimalId) => {
  const { data } = await nextServer.get<Animal>(`/animals/${id}`);
  return data;
};
