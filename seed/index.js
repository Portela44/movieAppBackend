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
  //movie 2
  {
    imdb_id: "6723592",
    name: "Tenet",
    year: 2020,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BZWM4MDJjNzMtYjk5Ni00MTJkLThlNjAtZDdjODhlNzU4ZTcwXkEyXkFqcGdeQWFybm8@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BZWM4MDJjNzMtYjk5Ni00MTJkLThlNjAtZDdjODhlNzU4ZTcwXkEyXkFqcGdeQWFybm8@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BZWM4MDJjNzMtYjk5Ni00MTJkLThlNjAtZDdjODhlNzU4ZTcwXkEyXkFqcGdeQWFybm8@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BZWM4MDJjNzMtYjk5Ni00MTJkLThlNjAtZDdjODhlNzU4ZTcwXkEyXkFqcGdeQWFybm8@.jpg"
    },
    premiere: "2020-08-26",
    genres: [
      "1",
      "27",
      "32"
    ],
    people: [
      {
        imdb_id: "0634240",
        name: "Christopher Nolan",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Christopher Nolan"
          }
        ]
      },
      {
        imdb_id: "0634240",
        name: "Christopher Nolan",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Christopher Nolan"
          }
        ]
      }
    ],
    imdb_rating: 73,
    imdb_vote: 487487,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Tenet",
        overview: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BOTFiNDEyMTItYmI0NC00NzVhLTlmNzktZjRiYmIwMTM4OWM0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BOTFiNDEyMTItYmI0NC00NzVhLTlmNzktZjRiYmIwMTM4OWM0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BOTFiNDEyMTItYmI0NC00NzVhLTlmNzktZjRiYmIwMTM4OWM0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BOTFiNDEyMTItYmI0NC00NzVhLTlmNzktZjRiYmIwMTM4OWM0XkEyXkFqcGdeQXVyODc0OTEyNDU@.jpg"
        }
      }
    ]
  },
  //movie 3
  {
    imdb_id: "0253474",
    name: "The Pianist",
    year: 2002,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMmQ4MWQzNDEtYmI4Zi00NmY0LWEwYTEtZTg4MmQ3MDM2YmJlXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMmQ4MWQzNDEtYmI4Zi00NmY0LWEwYTEtZTg4MmQ3MDM2YmJlXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMmQ4MWQzNDEtYmI4Zi00NmY0LWEwYTEtZTg4MmQ3MDM2YmJlXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMmQ4MWQzNDEtYmI4Zi00NmY0LWEwYTEtZTg4MmQ3MDM2YmJlXkEyXkFqcGdeQXVyNzU1NzE3NTg@.jpg"
    },
    premiere: "2002-12-13",
    genres: [
      "6",
      "12",
      "20"
    ],
    people: [
      {
        imdb_id: "0000591",
        name: "Roman Polanski",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Roman Polanski"
          }
        ]
      },
      {
        imdb_id: "0367838",
        name: "Ronald Harwood",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Ronald Harwood"
          }
        ]
      },
      {
        imdb_id: "0844262",
        name: "Wladyslaw Szpilman",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Wladyslaw Szpilman"
          }
        ]
      }
    ],
    imdb_rating: 85,
    imdb_vote: 819522,
    translations: [
      {
        country: "US",
        language: "en",
        name: "The Pianist",
        overview: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BZTBmZWVmZjYtNjRkMC00YjEwLWE0ZTctMDBjNjhhMjViMzIxXkEyXkFqcGdeQXVyMTAxNTQzMDM4._V1_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BZTBmZWVmZjYtNjRkMC00YjEwLWE0ZTctMDBjNjhhMjViMzIxXkEyXkFqcGdeQXVyMTAxNTQzMDM4._V1_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BZTBmZWVmZjYtNjRkMC00YjEwLWE0ZTctMDBjNjhhMjViMzIxXkEyXkFqcGdeQXVyMTAxNTQzMDM4._V1_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BZTBmZWVmZjYtNjRkMC00YjEwLWE0ZTctMDBjNjhhMjViMzIxXkEyXkFqcGdeQXVyMTAxNTQzMDM4._V1_.jpg"
        }
      }
    ]
  },
  //movie 4
  {
    imdb_id: "4680182",
    name: "Colossal",
    year: 2017,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMjM5MzM5OTY4NF5BMl5BanBnXkFtZTgwOTE3NDk0MTI@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMjM5MzM5OTY4NF5BMl5BanBnXkFtZTgwOTE3NDk0MTI@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMjM5MzM5OTY4NF5BMl5BanBnXkFtZTgwOTE3NDk0MTI@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMjM5MzM5OTY4NF5BMl5BanBnXkFtZTgwOTE3NDk0MTI@.jpg"
    },
    premiere: "2017-04-21",
    genres: [
      "8",
      "12",
      "14"
    ],
    people: [
      {
        imdb_id: "1443023",
        name: "Nacho Vigalondo",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Nacho Vigalondo"
          }
        ]
      },
      {
        imdb_id: "1443023",
        name: "Nacho Vigalondo",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Nacho Vigalondo"
          }
        ]
      }
    ],
    imdb_rating: 62,
    imdb_vote: 65026,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Colossal",
        overview: "Gloria is an out-of-work party girl forced to leave her life in New York City and move back home. When reports surface that a giant creature is destroying Seoul, she gradually comes to the realization that she is somehow connected...",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BZDAxZmNhZjAtYjMyNy00ZDRhLWIxNTYtMDJhN2EzZDYyN2VlXkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BZDAxZmNhZjAtYjMyNy00ZDRhLWIxNTYtMDJhN2EzZDYyN2VlXkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BZDAxZmNhZjAtYjMyNy00ZDRhLWIxNTYtMDJhN2EzZDYyN2VlXkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BZDAxZmNhZjAtYjMyNy00ZDRhLWIxNTYtMDJhN2EzZDYyN2VlXkEyXkFqcGdeQXVyNjEwNTM2Mzc@.jpg"
        }
      }
    ]
  },
  //movie 5
  {
    imdb_id: "3450958",
    name: "War for the Planet of the Apes",
    year: 2017,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMTc0OTc5ODY2MF5BMl5BanBnXkFtZTgwNzY4MDA5MjI@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMTc0OTc5ODY2MF5BMl5BanBnXkFtZTgwNzY4MDA5MjI@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMTc0OTc5ODY2MF5BMl5BanBnXkFtZTgwNzY4MDA5MjI@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMTc0OTc5ODY2MF5BMl5BanBnXkFtZTgwNzY4MDA5MjI@.jpg"
    },
    premiere: "2017-07-12",
    genres: [
      "1",
      "3",
      "12"
    ],
    people: [
      {
        imdb_id: "0716257",
        name: "Matt Reeves",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Matt Reeves"
          }
        ]
      },
      {
        imdb_id: "0093560",
        name: "Mark Bomback",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Mark Bomback"
          }
        ]
      },
      {
        imdb_id: "0716257",
        name: "Matt Reeves",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Matt Reeves"
          }
        ]
      },
      {
        imdb_id: "0415425",
        name: "Rick Jaffa",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Rick Jaffa"
          }
        ]
      }
    ],
    imdb_rating: 74,
    imdb_vote: 255046,
    translations: [
      {
        country: "US",
        language: "en",
        name: "War for the Planet of the Apes",
        overview: "After the apes suffer unimaginable losses, Caesar wrestles with his darker instincts and begins his own mythic quest to avenge his kind.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BNTE2ZDc1MGMtYTI5ZC00MTAzLWIwNTUtNzQ4ODMxYWE4ZTdmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BNTE2ZDc1MGMtYTI5ZC00MTAzLWIwNTUtNzQ4ODMxYWE4ZTdmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BNTE2ZDc1MGMtYTI5ZC00MTAzLWIwNTUtNzQ4ODMxYWE4ZTdmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BNTE2ZDc1MGMtYTI5ZC00MTAzLWIwNTUtNzQ4ODMxYWE4ZTdmXkEyXkFqcGdeQXVyODc0OTEyNDU@.jpg"
        }
      }
    ]
  },
  //movie 6
  {
    imdb_id: "0437086",
    name: "Alita: Battle Angel",
    year: 2019,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BODMzMjlmZTYtOGU2NS00NGM2LWI4ZDItNzQzYTYwNDA2ZmU4XkEyXkFqcGdeQXRzdGFzaWVr._V1_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BODMzMjlmZTYtOGU2NS00NGM2LWI4ZDItNzQzYTYwNDA2ZmU4XkEyXkFqcGdeQXRzdGFzaWVr._V1_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BODMzMjlmZTYtOGU2NS00NGM2LWI4ZDItNzQzYTYwNDA2ZmU4XkEyXkFqcGdeQXRzdGFzaWVr._V1_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BODMzMjlmZTYtOGU2NS00NGM2LWI4ZDItNzQzYTYwNDA2ZmU4XkEyXkFqcGdeQXRzdGFzaWVr._V1_.jpg"
    },
    premiere: "2019-02-15",
    genres: [
      "1",
      "3",
      "27"
    ],
    people: [
      {
        imdb_id: "0001675",
        name: "Robert Rodriguez",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Robert Rodriguez"
          }
        ]
      },
      {
        imdb_id: "0000116",
        name: "James Cameron",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "James Cameron"
          }
        ]
      },
      {
        imdb_id: "0436164",
        name: "Laeta Kalogridis",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Laeta Kalogridis"
          }
        ]
      },
      {
        imdb_id: "1738737",
        name: "Yukito Kishiro",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Yukito Kishiro"
          }
        ]
      }
    ],
    imdb_rating: 73,
    imdb_vote: 264509,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Alita: Battle Angel",
        overview: "A deactivated cyborg&apos;s revived, but can&apos;t remember anything of her past and goes on a quest to find out who she is.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BYWZhNTMwODItOWQyMC00NjIyLTgxNGEtNDg0OTY4YzY1MDJiXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BYWZhNTMwODItOWQyMC00NjIyLTgxNGEtNDg0OTY4YzY1MDJiXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BYWZhNTMwODItOWQyMC00NjIyLTgxNGEtNDg0OTY4YzY1MDJiXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BYWZhNTMwODItOWQyMC00NjIyLTgxNGEtNDg0OTY4YzY1MDJiXkEyXkFqcGdeQXVyMTYzMDM0NTU@.jpg"
        }
      }
    ]
  },
  //movie 7
  {
    imdb_id: "7146812",
    name: "Onward",
    year: 2020,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@.jpg"
    },
    premiere: "2020-03-06",
    genres: [
      "4",
      "3",
      "8"
    ],
    people: [
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "1291392",
        name: "Keith Bunin",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Keith Bunin"
          }
        ]
      },
      {
        imdb_id: "3268751",
        name: "Jason Headley",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Jason Headley"
          }
        ]
      }
    ],
    imdb_rating: 74,
    imdb_vote: 146784,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Onward",
        overview: "Two elven brothers embark on a quest to bring their father back for one day.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@.jpg"
        }
      }
    ]
  },
  {
    imdb_id: "7146812",
    name: "Onward",
    year: 2020,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@.jpg"
    },
    premiere: "2020-03-06",
    genres: [
      "4",
      "3",
      "8"
    ],
    people: [
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "1291392",
        name: "Keith Bunin",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Keith Bunin"
          }
        ]
      },
      {
        imdb_id: "3268751",
        name: "Jason Headley",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Jason Headley"
          }
        ]
      }
    ],
    imdb_rating: 74,
    imdb_vote: 146784,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Onward",
        overview: "Two elven brothers embark on a quest to bring their father back for one day.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@.jpg"
        }
      }
    ]
  },
  {
    imdb_id: "7146812",
    name: "Onward",
    year: 2020,
    image: {
      sm: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX100_.jpg",
      md: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX200_.jpg",
      lg: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_UX400_.jpg",
      og: "https://m.media-amazon.com/images/M/MV5BMGZmYWYzM2ItZTUzNy00YWM1LTg2NTAtZDdmOTc3NjBhMjQ5XkEyXkFqcGdeQXZ3ZXNsZXk@.jpg"
    },
    premiere: "2020-03-06",
    genres: [
      "4",
      "3",
      "8"
    ],
    people: [
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "directing",
        job: "director",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "0768959",
        name: "Dan Scanlon",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Dan Scanlon"
          }
        ]
      },
      {
        imdb_id: "1291392",
        name: "Keith Bunin",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Keith Bunin"
          }
        ]
      },
      {
        imdb_id: "3268751",
        name: "Jason Headley",
        department: "writing",
        translations: [
          {
            country: "US",
            language: "en",
            name: "Jason Headley"
          }
        ]
      }
    ],
    imdb_rating: 74,
    imdb_vote: 146784,
    translations: [
      {
        country: "US",
        language: "en",
        name: "Onward",
        overview: "Two elven brothers embark on a quest to bring their father back for one day.",
        poster: {
          sm: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX100_.jpg",
          md: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX200_.jpg",
          lg: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_UX400_.jpg",
          og: "https://m.media-amazon.com/images/M/MV5BZDZkYzEzZDktOWE4OS00Yjg5LWI5MjctMjhjYzBkNzkxNWVmXkEyXkFqcGdeQXVyODc0OTEyNDU@.jpg"
        }
      }
    ]
  },
  {"imdb_id":"0848228","name":"The Avengers","year":2012,"image":{"sm":"https://m.media-amazon.com/images/M/MV5BMTcwNTg1Nzg2MF5BMl5BanBnXkFtZTcwNDEwOTUwOA@@._V1_UX100_.jpg","md":"https://m.media-amazon.com/images/M/MV5BMTcwNTg1Nzg2MF5BMl5BanBnXkFtZTcwNDEwOTUwOA@@._V1_UX200_.jpg","lg":"https://m.media-amazon.com/images/M/MV5BMTcwNTg1Nzg2MF5BMl5BanBnXkFtZTcwNDEwOTUwOA@@._V1_UX400_.jpg","og":"https://m.media-amazon.com/images/M/MV5BMTcwNTg1Nzg2MF5BMl5BanBnXkFtZTcwNDEwOTUwOA@@.jpg"},"premiere":"2012-04-27","genres":["1","3","27"],"people":[{"imdb_id":"0923736","name":"Joss Whedon","department":"directing","job":"director","translations":[{"country":"US","language":"en","name":"Joss Whedon"}]},{"imdb_id":"0923736","name":"Joss Whedon","department":"writing","translations":[{"country":"US","language":"en","name":"Joss Whedon"}]},{"imdb_id":"0672015","name":"Zak Penn","department":"writing","translations":[{"country":"US","language":"en","name":"Zak Penn"}]}],"imdb_rating":80,"imdb_vote":1376480,"translations":[{"country":"US","language":"en","name":"The Avengers","overview":"Earth&apos;s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.","poster":{"sm":"https://m.media-amazon.com/images/M/MV5BMzFjMzQ4OWItNGNlMi00ZGQ5LWFhNzUtNjllZmY1ZGMxNTBjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg","md":"https://m.media-amazon.com/images/M/MV5BMzFjMzQ4OWItNGNlMi00ZGQ5LWFhNzUtNjllZmY1ZGMxNTBjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg","lg":"https://m.media-amazon.com/images/M/MV5BMzFjMzQ4OWItNGNlMi00ZGQ5LWFhNzUtNjllZmY1ZGMxNTBjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg","og":"https://m.media-amazon.com/images/M/MV5BMzFjMzQ4OWItNGNlMi00ZGQ5LWFhNzUtNjllZmY1ZGMxNTBjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg"}}]},
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