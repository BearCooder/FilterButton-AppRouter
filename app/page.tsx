"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import FilterButtons from "./filter2";
import artworks from "../Gallery";
import Image from "next/image";

export default function YourPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the selected category from URL query params
  const selectedCategory = searchParams.get("category");

  // Filter artworks based on the selected category
  const filteredArtworks = selectedCategory
    ? artworks.filter((artwork) => artwork.category === selectedCategory)
    : artworks;

  return (
    <div>
      <h1>Your Artworks</h1>
      <FilterButtons categories={["Nature", "Animal", "Architecture"]} />

      <div>
        {filteredArtworks.map((artwork) => (
          <div key={artwork.id}>
            <Image
              src={artwork.coverImage}
              title={`Artwork ${artwork.title}`}
              alt={`Image`}
              placeholder="blur"
            />
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
