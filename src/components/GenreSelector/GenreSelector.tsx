import { Button } from "@/components/ui/button.tsx";

const genres = ["Rock", "Sertanejo", "Forró", "Pop", "Jazz", "Eletrônico"];

export default function GenreSelector({
  onGenreSelect,
}: {
  onGenreSelect: (genre: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs cursor-pointer"
          onClick={() => onGenreSelect(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
