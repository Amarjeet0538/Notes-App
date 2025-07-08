"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Image from "next/image";


export default function BreedPage() {
  const { breed, count } = useParams();
  console.log(count);
  const [dogUrl, setDogUrl] = useState<string | null>(null);

  // Wrap fetchBreedImage in useCallback to prevent unnecessary re-renders
  const fetchBreedImage = useCallback(async () => {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();
    setDogUrl(data.message);
  }, [breed]);

  // Add fetchBreedImage to dependency array
  useEffect(() => {
    fetchBreedImage();
  }, [fetchBreedImage]);

  return (
    <div className="flex flex-col h-full">
      <Header
        heading={`Breed: ${breed}`}
        buttonText="New Image"
        buttonFxn={fetchBreedImage}
      />
      <main className="flex flex-col min-h-full items-center">
        {/* {dogUrl && (
          <img
            src={dogUrl}
            alt={`Dog breed: ${breed}`}
            className="rounded-xlmax-h-full max-w-full shadow-lg"
          />
        )} */}

        {dogUrl && (
          <Image
            src={dogUrl}
            alt={`Dog breed: ${breed}`}
            width={600}
            height={600}
            className="rounded-xl max-h-full max-w-full shadow-lg"
            style={{ objectFit: "cover" }}
          />
        )}
      </main>
    </div>
  );
}
