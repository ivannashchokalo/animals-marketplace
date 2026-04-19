import { AnimalId } from "@/types/animal";
import { nextServer } from "./api";

export const getFavorites = async () => {
  const { data } = await nextServer.get("users/favorites");
  return data.favorites;
};

export const addToFavorites = async (animalId: AnimalId) => {
  const { data } = await nextServer.patch("users/favorites", { animalId });
  return data;
};

export const removeFromFavorites = async (animalId: AnimalId) => {
  const { data } = await nextServer.delete("users/favorites", {
    data: { animalId },
  });
  return data;
};

export const getFavoriteAnimals = async () => {
  const { data } = await nextServer.get("users/favorites/animals");
  return data;
};

export const clearFavorites = async () => {
  const { data } = await nextServer.delete("/users/favorites/animals");
  console.log(data);
  return data;
};
