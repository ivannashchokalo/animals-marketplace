"use client";

import AnimalsList from "@/components/AnimalsList/AnimalsList";
import { clearFavorites, getFavoriteAnimals } from "@/lib/usersService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function FavoritesAnimalsClient() {
  const { data } = useQuery({
    queryKey: ["favoriteAnimals"],
    queryFn: getFavoriteAnimals,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: clearFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      queryClient.invalidateQueries({
        queryKey: ["favoriteAnimals"],
      });
    },
  });

  return (
    <>
      <div>
        <button
          disabled={data?.length < 1}
          type="button"
          onClick={() => mutate()}
        >
          Clear
        </button>
        {data?.length > 0 && <AnimalsList animals={data} />}
      </div>
    </>
  );
}
