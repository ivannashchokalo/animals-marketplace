import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],

      addFavorite: (id) =>
        set((state) => ({
          favoriteIds: [...state.favoriteIds, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter(
            (favoriteId) => favoriteId !== id,
          ),
        })),
      clearFavorites: () =>
        set({
          favoriteIds: [],
        }),
    }),
    {
      name: "favorite",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
