"use client";

import { DEFAULT_PET } from "@/constants/images";
import { fetchAnimalById } from "@/lib/animalsClient";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function AnimalDetailsClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const id = slug[1];

  const { data } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimalById(id),
    refetchOnMount: false,
  });

  return (
    <div>
      <Image
        src={data?.images[0] || DEFAULT_PET}
        width={300}
        height={400}
        alt={`${data?.type} ${data?.name}`}
      />
      <h1>{data?.name}</h1>
      <p>{data?.breed}</p>
      <p>{data?.description}</p>
    </div>
  );
}
