import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Band {
  id: string;
  title: string;
  profilePicture: string | null;
  rating: number;
}

interface BandCardProps {
  band: Band;
  compact?: boolean;
}

export function BandCard({ band, compact = false }: BandCardProps) {
  if (compact) {
    return (
      <Link to={`/bandas/${band.id}`} className="flex items-start gap-3 group">
        <img
          src={band.profilePicture || "https://www.gravatar.com/avatar/?d=mp"}
          alt="Band Thumbnail"
          width={64}
          height={96}
          className="object-cover w-16 rounded-md aspect-[2/3]"
        />
        <div>
          <h3 className="font-medium group-hover:text-stone-600">
            {band.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{band.rating.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/bandas/${band.id}`}
      className="block overflow-hidden transition-transform rounded-lg shadow group hover:scale-105"
    >
      <div className="relative">
        <img
          src={band.profilePicture || "/placeholder.svg"}
          alt={band.title}
          className="object-cover w-full aspect-[2/3]"
          width={300}
          height={450}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-sm font-medium text-white">{band.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-white">{band.rating.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
