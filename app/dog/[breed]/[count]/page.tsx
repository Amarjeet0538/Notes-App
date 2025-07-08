"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";

export default function BreedPage() {
  const { breed, count } = useParams();
  console.log(count);
  const [dogUrl, setDogUrl] = useState<string | null>(null);

  const fetchBreedImage = async () => {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();

    setDogUrl(data.message);
  };

  useEffect(() => {
    fetchBreedImage();
  }, [breed]);

  return (
    <div className="flex flex-col h-full">
      <Header
        heading={`Breed: ${breed}`}
        buttonText="New Image"
        buttonFxn={fetchBreedImage}
      />

      <main className="flex flex-col min-h-full items-center">
        {dogUrl && (
          <img
            src={dogUrl}
            alt={`Dog breed: ${breed}`}
            className="rounded-xlmax-h-full max-w-full shadow-lg"
          />
        )}
      </main>
    </div>
  );
}
