import { fetchAnimalById, fetchAnimals } from "@/lib/animals-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import { Metadata } from "next";
import AnimalDetailsClient from "./AnimalDetailsClient";
import { notFound } from "next/navigation";
import AnimalsByCategoryClient from "./AnimalsByCategoryClient";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = slug[0];
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  if (slug.length === 1) {
    return {
      title: `${categoryTitle} for Sale`,
      description: `Browse ${categoryTitle.toLowerCase()} available for purchase.`,
    };
  }
  const id = slug[1];
  const animal = await fetchAnimalById(id);

  return {
    title: `${animal.name} | Animal Details`,
    description: "View detailed information about this animal.",
    openGraph: {
      title: animal.name,
      description: `${animal.name} is a ${animal.breed} available for purchase.`,
      url: "",
      images: [
        {
          url: animal.images?.[0],
          width: 1200,
          height: 630,
          alt: animal.name,
        },
      ],
    },
  };
}

interface AnimalsProps {
  params: Promise<{ slug: string[] }>;
}

export default async function AnimalsByCategory({ params }: AnimalsProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const category = slug[0];

  if (slug.length == 1) {
    const type = category;
    const page = 1;
    const search = "";

    await queryClient.prefetchQuery({
      queryKey: ["animals", { page: 1, type, search: "" }],
      queryFn: () => fetchAnimals(page, type, search),
    });

    return (
      <Section>
        <Container>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AnimalsByCategoryClient />
          </HydrationBoundary>
        </Container>
      </Section>
    );
  }

  if (slug.length === 2) {
    const id = slug[1];

    await queryClient.prefetchQuery({
      queryKey: ["animal", id],
      queryFn: () => fetchAnimalById(id),
    });

    return (
      <Section>
        <Container>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AnimalDetailsClient />
          </HydrationBoundary>
        </Container>
      </Section>
    );
  }

  return notFound();
}
