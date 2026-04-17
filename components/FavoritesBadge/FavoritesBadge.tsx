"use client";

import { useFavoritesStore } from "@/stores/favoritesStore";

export default function FavoritesBadge() {
  const count = useFavoritesStore((state) => state.favoriteIds.length);

  return <p>favorite {count}</p>;
}
