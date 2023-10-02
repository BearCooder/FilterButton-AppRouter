import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { createUrl } from "./utils";

interface FilterButtonsProps {
  categories: string[];
}

export default function FilterButtons({ categories }: FilterButtonsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const handleFilter = useCallback(
    (category: string) => {
      const currentCategory = newParams.get("category");
      if (currentCategory === category) {
        // Deselect the category
        newParams.delete("category");
      } else {
        // Select the category
        newParams.set("category", category);
      }

      router.push(createUrl("/filter", newParams));
    },
    [router, newParams]
  );

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`mr-2 ${
            searchParams.get("category") === category
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
