"use client";

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DogPage() {
  const [dogUrl, setDogUrl] = useState<string[]>([]);
  const [noOfPics, setPics] = useState<number>(1);
  const [breedName, setBreedName] = useState("");
  const router = useRouter();

  useEffect(() => {
    generateImage(noOfPics);
  }, []);

  const generateImage = async (count: number) => {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    const data = await res.json();

    const urls = Array.isArray(data.message) ? data.message : [data.message];

    setDogUrl(urls);
  };

  const handleBreed = () => {
    const trimmed = breedName.trim().toLowerCase();
    if (trimmed) {
      router.push(`/dog/${trimmed}`);
    }
  };

  const checkFxn = () => {
    if (!breedName) generateImage(noOfPics);
    else handleBreed();
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        buttonFxn={checkFxn}
        heading="Random Dog image"
        buttonText="Generate"
      />

      <main className="flex flex-col min-h-full items-center">
        <form className=" m-10 gap-2">
          <input
            type="text"
            value={breedName}
            onChange={(e) => setBreedName(e.target.value)}
            placeholder="Enter dog breed (e.g., husky)"
            className="border rounded px-4 py-2"
          />
          <input
            type="number"
            value={noOfPics}
            className="border rounded px-2 py-2 ml-5 max-w-20"
            onChange={(e) => {
              setPics(Number(e.target.value));
            }}
          />
        </form>

        {dogUrl.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Dog ${i + 1}`}
            className="rounded-xl max-w-sm shadow-lg my-2"
          />
        ))}
      </main>
    </div>
  );
}
