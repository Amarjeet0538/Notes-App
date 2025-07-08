import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  buttonFxn: () => void;
  heading: string;
  buttonText: string;
}

export default function Header({
  buttonFxn,
  heading,
  buttonText,
}: HeaderProps) {
  return (
    <header className="border-b p-4  pl-10 bg-card">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{heading}</h1>
        <Button onClick={buttonFxn} size="sm" className="cursor-pointer">
          <Plus className=" h-4 w-4 mr-2"> </Plus>
          {buttonText}
        </Button>
      </div>
    </header>
  );
}
