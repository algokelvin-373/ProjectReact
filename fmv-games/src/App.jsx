import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGames } from "./hooks/use-games";
import { useFavorites } from "./hooks/use-favorites";

function App() {
  const { games, loading } = useGames();
  const { isFavorite, toggleFavorite } = useFavorites();
  const featuredGames = games.slice(0, 3);
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
        <img
          src="/placeholder.svg?height=800&width=1600"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-balance">
            Experience Interactive Cinema
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover the best Full Motion Video games where your choices shape
            the story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button size="lg" className="text-lg px-8">
              <Film className="mr-2 h-5 w-5" />
              Browse Games
            </button>
            <button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              <Heart className="mr-2 h-5 w-5" />
              Save Favorites
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why FMV Games?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Cinematic Experience
                </h3>
                <p className="text-muted-foreground">
                  Real actors, professional cinematography, and
                  Hollywood-quality production
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Your Choices Matter
                </h3>
                <p className="text-muted-foreground">
                  Every decision shapes the narrative and leads to different
                  outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Talented Cast
                </h3>
                <p className="text-muted-foreground">
                  Featuring performances from acclaimed actors and actresses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Games
            </h2>
            <button variant="outline">View All</button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={isFavorite(game.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={() => router.push(`/games/${game.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create an account to save your favorite games and track your
            progress
          </p>
          <button size="lg" className="text-lg px-8">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
