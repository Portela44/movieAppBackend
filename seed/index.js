require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require("../models/Movie");

const movies = [
  //movie 1
  {
    imdb_id: "0286716",
    name: "Hulk",
    year: 2003,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BNTQyNGIxMzctM2NkYy00ZWY4LWIwN2MtYzJmNDQ3MDJiNmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BNTQyNGIxMzctM2NkYy00ZWY4LWIwN2MtYzJmNDQ3MDJiNmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BNTQyNGIxMzctM2NkYy00ZWY4LWIwN2MtYzJmNDQ3MDJiNmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BNTQyNGIxMzctM2NkYy00ZWY4LWIwN2MtYzJmNDQ3MDJiNmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@.jpg"
    },
    premiere: "2003-07-04",
    genres: [
      "1",
      "27"
    ],
    people: [
      {
        imdb_id: "0000487",
        name: "Ang Lee",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Ang Lee"
          }
        ]
      },
      {
        imdb_id: "0498278",
        name: "Stan Lee",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Stan Lee"
          }
        ]
      },
      {
        imdb_id: "0456158",
        name: "Jack Kirby",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Jack Kirby"
          }
        ]
      },
      {
        imdb_id: "0770005",
        name: "James Schamus",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "James Schamus"
          }
        ]
      }
    ],
    imdb_rating: 56,
    imdb_vote: 266039,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Hulk",
        overview: "Bruce Banner, a genetics researcher with a tragic past, suffers an accident that causes him to transform into a raging green monster when he gets angry.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BMzQwZDg1MGEtN2E5My00ZDJlLWI4MzItM2U2MjJhYzlkNmEzXkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BMzQwZDg1MGEtN2E5My00ZDJlLWI4MzItM2U2MjJhYzlkNmEzXkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BMzQwZDg1MGEtN2E5My00ZDJlLWI4MzItM2U2MjJhYzlkNmEzXkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BMzQwZDg1MGEtN2E5My00ZDJlLWI4MzItM2U2MjJhYzlkNmEzXkEyXkFqcGdeQXVyNDAxNjkxNjQ@.jpg"
        }
      }
    ]
  },
];

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Movie.create(movies);
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  });