"use client";

import AnimalsList from "@/components/AnimalsList/AnimalsList";
import { fetchAnimals } from "@/lib/animals-service";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useQuery } from "@tanstack/react-query";

export default function FavoritesAnimalsClient() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["animals"],
    queryFn: () => fetchAnimals({ perPage: 1000 }),
  });

  const favoriteAnimals = data?.animals.filter((animal) =>
    favoriteIds.includes(animal._id),
  );

  const handleClearFavorive = () => {
    clearFavorites();
  };

  return (
    <div>
      <button type="button" onClick={handleClearFavorive}>
        Clear
      </button>
      {favoriteAnimals && favoriteAnimals?.length > 0 && (
        <AnimalsList animals={favoriteAnimals} />
      )}
    </div>
  );
}
