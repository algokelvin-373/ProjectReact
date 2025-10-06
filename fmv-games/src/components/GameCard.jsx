"use client";

import { Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export function GameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  showFavoriteButton = true,
}) {
  return (
    <Card className="group overflow-hidden bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer border-border/50">
      <div
        className="relative aspect-[3/4] overflow-hidden"
        onClick={onViewDetails}
      >
        <img
          src={game.coverImage || "/placeholder.svg"}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {showFavoriteButton && (
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm",
              isFavorite && "text-primary"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </Button>
        )}
      </div>

      <CardContent className="p-4" onClick={onViewDetails}>
        <h3 className="font-semibold text-lg mb-1 text-foreground line-clamp-1">
          {game.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{game.genre}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {game.releaseYear}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold text-sm">
              {game.rating}
            </span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
