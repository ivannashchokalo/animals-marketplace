"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Breadcrumbs() {
  const { slug } = useParams<{ slug?: string[] }>();

  const category = slug?.[0];

  if (!slug || !category) return null;

  const categoryName = `${category.charAt(0).toUpperCase() + category.slice(1)}s`;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{ display: "flex", alignItems: "center", gap: 8 }}
    >
      <Link href="/animals">← Animals</Link>

      <span>/</span>

      {slug.length === 2 ? (
        <>
          <Link href={`/animals/${category}`}>{categoryName}</Link>
          <span>/</span>
          <span>Animal details</span>
        </>
      ) : (
        <span>{categoryName}</span>
      )}
    </nav>
  );
}
