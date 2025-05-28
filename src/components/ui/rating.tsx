import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value,
      onChange,
      max = 5,
      readOnly = false,
      size = "md",
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
      if (readOnly) return;
      setHoverValue(index);
    };

    const handleMouseLeave = () => {
      if (readOnly) return;
      setHoverValue(null);
    };

    const handleClick = (index: number) => {
      if (readOnly) return;
      onChange?.(index);
    };

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled =
            (hoverValue !== null ? hoverValue : value) >= starValue;

          return (
            <button
              key={index}
              type="button"
              className={cn(
                "rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                readOnly ? "cursor-default" : "cursor-pointer"
              )}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
              disabled={readOnly}
              aria-label={`${starValue} ${
                starValue === 1 ? "estrela" : "estrelas"
              }`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-all",
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-transparent text-muted-foreground"
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating };
