"use client";

import { useState, useEffect } from "react";
import {
  actorPortrait,
  actressDrama,
  actressPortrait,
  actressPortrait2,
  asianActress,
  bunkerHorrorDark,
  detectiveMysteryWoman,
  heistCrimeNightCity,
  maleActorSerious,
  moviePosterMysteryActress,
  scifiLaboratoryThriller,
  surveillanceThrillerSpy,
  womanDetective,
  womanDetective2,
  womanHorror,
  youngMaleActor,
} from "../assets";

// Dummy data for FMV games
const GAMES_DATA = [
  {
    id: "1",
    title: "The Immortality",
    description:
      "A cinematic masterpiece where you explore the life of a mysterious actress through three lost films.",
    coverImage: moviePosterMysteryActress,
    releaseYear: 2022,
    genre: "Mystery, Thriller",
    rating: 9.2,
    actors: [
      {
        id: "1",
        name: "Manon Gage",
        role: "Marissa Marcel",
        photo: actressPortrait,
      },
      {
        id: "2",
        name: "Charlotta Mohlin",
        role: "Amy",
        photo: actressPortrait2,
      },
      {
        id: "3",
        name: "Ty Molbak",
        role: "John Durick",
        photo: actorPortrait,
      },
    ],
  },
  {
    id: "2",
    title: "Her Story",
    description:
      "A crime fiction game with non-linear storytelling. Search through a database of video clips to solve the mystery.",
    coverImage: detectiveMysteryWoman,
    releaseYear: 2015,
    genre: "Mystery, Crime",
    rating: 8.8,
    actors: [
      {
        id: "4",
        name: "Viva Seifert",
        role: "Hannah Smith",
        photo: womanDetective,
      },
      {
        id: "5",
        name: "Viva Seifert",
        role: "Eve Smith",
        photo: womanDetective2,
      },
    ],
  },
  {
    id: "3",
    title: "Telling Lies",
    description:
      "An investigative thriller game where you search through stolen NSA database of video conversations.",
    coverImage: surveillanceThrillerSpy,
    releaseYear: 2019,
    genre: "Thriller, Drama",
    rating: 8.5,
    actors: [
      {
        id: "6",
        name: "Logan Marshall-Green",
        role: "David Smith",
        photo: maleActorSerious,
      },
      {
        id: "7",
        name: "Alexandra Shipp",
        role: "Karen Jones",
        photo: maleActorSerious,
      },
      {
        id: "8",
        name: "Kerry Bishé",
        role: "Emma",
        photo: actressDrama,
      },
    ],
  },
  {
    id: "4",
    title: "Late Shift",
    description:
      "A crime thriller FMV game where your choices shape the story of a student forced into a heist.",
    coverImage: heistCrimeNightCity,
    releaseYear: 2016,
    genre: "Crime, Thriller",
    rating: 7.9,
    actors: [
      {
        id: "9",
        name: "Joe Sowerbutts",
        role: "Matt",
        photo: youngMaleActor,
      },
      {
        id: "10",
        name: "Haruka Abe",
        role: "May-Ling",
        photo: asianActress,
      },
    ],
  },
  {
    id: "5",
    title: "The Bunker",
    description:
      "A psychological horror game set in a nuclear bunker with the last survivor of a nuclear attack.",
    coverImage: bunkerHorrorDark,
    releaseYear: 2016,
    genre: "Horror, Psychological",
    rating: 7.5,
    actors: [
      { id: "11", name: "Adam Brown", role: "John", photo: "/scared-man.jpg" },
      {
        id: "12",
        name: "Sarah Greene",
        role: "Margaret",
        photo: womanHorror,
      },
    ],
  },
  {
    id: "6",
    title: "The Complex",
    description:
      "A sci-fi thriller where a bioweapon attack forces you to make life-or-death decisions.",
    coverImage: scifiLaboratoryThriller,
    releaseYear: 2020,
    genre: "Sci-Fi, Thriller",
    rating: 7.2,
    actors: [
      {
        id: "13",
        name: "Michelle Mylett",
        role: "Amy Tenant",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "14",
        name: "Kate Dickie",
        role: "Nathalie Kensington",
        photo: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
];

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames(GAMES_DATA);
      setLoading(false);
    }, 500);
  }, []);

  const getGameById = (id) => {
    return games.find((game) => game.id === id);
  };

  return { games, loading, getGameById };
}
