"use client";

import { DEFAULT_PET } from "@/constants/images";
import { Animal, AnimalId } from "@/types/animal";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/lib/usersService";

interface AnimalsListProps {
  animals: Animal[];
}

export default function AnimalsList({ animals }: AnimalsListProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const from = `${pathname}?${searchParams.toString()}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const addMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });

  const handleFavoriteClick = (animalId: AnimalId) => {
    const isFavorite = favorites?.includes(animalId);

    if (isFavorite) {
      removeMutation.mutate(animalId);
    } else {
      addMutation.mutate(animalId);
    }
  };

  return (
    <>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {animals.map((animal) => {
          const isFavorite = favorites?.includes(animal._id);

          return (
            <li key={animal._id}>
              <Link
                href={`/animals/${animal.type}/${animal._id}?from=${encodeURIComponent(
                  from,
                )}`}
              >
                <div>
                  <Image
                    src={animal.images[0] || DEFAULT_PET}
                    alt={`${animal.type} ${animal.name}`}
                    width={300}
                    height={400}
                  />
                </div>

                <div>
                  <div>
                    <h2>{animal.name}</h2>
                    <p>{animal.price && `$${animal.price}`}</p>
                  </div>

                  <p>{animal.breed}</p>

                  <p>
                    {animal.sex
                      ? animal.sex.charAt(0).toUpperCase() + animal.sex.slice(1)
                      : ""}
                  </p>

                  <p>
                    {animal.status.charAt(0).toUpperCase() +
                      animal.status.slice(1)}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => handleFavoriteClick(animal._id)}
              >
                {isFavorite ? "-" : "+"}
              </button>

              <button type="button" onClick={() => setIsModalOpen(true)}>
                Reserve
              </button>
            </li>
          );
        })}
      </ul>

      {isModalOpen && (
        <Modal>
          <div
            style={{
              backgroundColor: "yellow",
              width: 500,
              minHeight: 700,
            }}
          >
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
