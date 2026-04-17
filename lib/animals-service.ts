import { Animal, AnimalId } from "@/types/animal";
import { nextServer } from "./service";

interface FetchAnimalsRequest {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  animals: Animal[];
}

// interface FetchAnimalsParams {
//   page?: number;
//   perPage?: number;
//   type?: string;
//   search?: string;
// }

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
  console.log("fetch");
  const { data } = await nextServer.get<Animal>(`/animals/${id}`);
  return data;
};
