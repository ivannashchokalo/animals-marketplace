"use client";

import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/lib/usersService";

export default function FavoritesBadge() {
  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  return <p>favorite {favorites?.length}</p>;
}
