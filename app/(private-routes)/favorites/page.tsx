import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import FavoritesAnimalsClient from "./FavoritesAnimalsClient";

export default function FavoritesAnimals() {
  return (
    <Section>
      <Container>
        <FavoritesAnimalsClient />
      </Container>
    </Section>
  );
}
