# MovieFetch REST API
## Description

This is a the backend repository for the React application `MovieFetch`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## User stories (MVP)

What can the user do with the app?
- User can sign up and create and account.
- User can login.
- User can log out.
- User can vote LIKE or DISLIKE every movie shown.
- User can save a review about a previously voted movie.
- User can edit its own movie reviews.
- User can delete its own movie reviews.
- Admin can create a movie.
- Admin can delete a movie.
- Admin can edit any movie.
- User can get random recommendations based only on its votes.

## User stories (Backlog)

- User can search for a determined movie included in App.
- Admin can easly search for any movie JSON data included in the API (the json data will be displayed in console).
- User can also vote 'Ignore' so the movie is not considered an opinion, and is never recommended again.
- User can add movies to its watchList ("add to watchlist" button), to be able to get to them later and watch them.
- User can upload or change a profile picture.
- User can delete its own account.
- User can see its vote history.
- User can filter its own recommendations through genre checkboxes.
- User can visit IMDB through movie-detail links for more information.
- User can sort its own vote history by ranking, popularity or voting date.
- User can sort its own vote history by genres.
- Admin can see the list of registered users, and delete them if necessary.
- User can leave reviews on movies previously seen (voted).
- User can leave likes on any review.
- Admin can delete any review in case it is needed.
- User can get recommendations considering its votes and the genres saved in preferences.
---

## Models

### User

Users in the database have the following properties:

```js
{
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  imageUrl:{
    type: String,
    default: "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png"
  },
  preferences: {
    type: [String],
    default: []
  },
  biography:{
    type: String,
    required: true,
    default: 'This is my biography.'
  }
}
```

### Movie

Movies in the database have the following properties:

```js
{
        imdb_id: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            unique: true
        },
        year: {
            type: Number,
        },
        image: {
            sm: String,
            md: String,
            lg: String,
            og: String
        },
        premiere: String,
        genres: [String],
        people: [
            {
                imdb_id: String,
                name: String,
                department: String,
                job: String,
                translations: [
                    {
                        country: String,
                        language: String,
                        name: String
                    }
                ]
            },
            {
                imdb_id: String,
                name: String,
                department: String,
                translations: [
                    {
                        country: String,
                        language: String,
                        name: String,
                    }
                ]
            },
            {
                imdb_id: String,
                name: String,
                department: String,
                translations: [
                    {
                        country: String,
                        language: String,
                        name: String
                    }
                ]
            }
        ],
        imdb_rating: Number,
        imdb_vote: Number,
        translations: [
            {
                country: String,
                language: String,
                name: String,
                overview: String,
                poster: {
                    sm: String,
                    md: String,
                    lg: String,
                    og: String
                }
            }
        ],
        handmade: Boolean,
}
```

### Vote

Votes in the database have the following properties:

```js
{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        },
        vote: {
            type: Boolean,
        },
        ignore: {
            type: Boolean,
        }
}
```

### Review

Reviews in the database have the following properties:

```js
{
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        voteId:{
            type: Schema.Types.ObjectId,
            ref:"Vote",
        },
        titleReview:{
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
            default: 0
        }
}
```

### ReviewLike

Likes in reviews saved in the database have the following properties:

```js
{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        reviewId:{
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
}
```

### WatchList

WatchList items saved in the database have the following properties:

```js
{
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
}
```

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| POST create user     | POST      | /api/v1/auth/signup  | { username, email, password, biography, imageUrl}   |    Public |                 
| POST login user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged-in user   | GET     | /api/v1/auth/me    |     | Private |
| GET next movie   | GET     | /api/v1/movies/next    |     | User |
| GET ignored movies   | GET     | /api/v1/movies/ignored    |     | User |
| GET user voteList   | GET     | /api/v1/movies/voteList    |     | User |
| GET search movie in APP (name)   | GET     | /api/v1/movies/search/:search    |     | Public |
| GET search movie in API (name)   | GET     | /api/v1/movies/api-search-by-name/:search    |     | Admin |
| GET search movie in API (imdbId)   | GET     | /api/v1/movies/api-search-by-imdbId/:search    |     | Admin |
| DELETE movie   | DELETE     | /api/v1/movies/:movieId/delete    |     | Admin |
| GET edit movie form   | GET     | /api/v1/movies/:movieId/edit    |     | Admin |
| PUT edit movie   | PUT     | /api/v1/movies/:movieId/edit    |{ imdb_id, name, year, image1, premiere, genre1, genre2, genre3, department1, people1, department2, people2, department3, people3, imdb_rating, imdb_vote, poster1, overview } | Admin |
| POST create movie   | POST     | /api/v1/movies/create    |{ imdb_id, name, year, image1, premiere, genre1, genre2, genre3, department1, people1, department2, people2, department3, people3, imdb_rating, imdb_vote, poster1, overview } | Admin |
| GET voteList by year  | GET     | /api/v1/movies/voteList/byYear    |     | User |
| GET voteList by Rating  | GET     | /api/v1/movies/voteList/byRating    |     | User |
| GET voteList by Popularity  | GET     | /api/v1/movies/voteList/byPopularity    |     | User |
| GET movie page  | GET     | /api/v1/movies/:movieId    |     | User |
| POST a like in a review  | POST    | /api/v1/reviewLike/add    |     | User |
| DELETE a like in a review  | DELETE   | /api/v1/reviewLike/remove    |     | User |
| GET likes in a review  | GET    | /api/v1/reviewLike/:reviewId    |     | User |
| GET if a review is liked  | GET    | /api/v1/reviewLike/isLiked/:reviewId    |     | User |
| POST a review  | GET    | /api/v1/reviews/:movieId/create    |     | User |
| DELETE a user's own review  | DELETE   | /api/v1/reviews/:movieId/delete    |     | User |
| DELETE any review  | DELETE   | /api/v1/reviews/:movieId/adminDelete    |     | Admin |
| GET all reviews of a movie  | GET    | /api/v1/reviews/:movieId/allReviews    |     | User |
| GET all reviews of a user  | GET    | /api/v1/reviews/allUserReviews    |     | User |
| POST picture in cloudinary  | POST    | /api/v1/user/upload   |     | User |
| GET the logged in user  | GET    | /api/v1/user/loggedInUser   |     | User |
| PUT edit user details  | PUT    | /api/v1/user/edit   |     | User |
| DELETE user  | DELETE    | /api/v1/user/delete   |     | User |
| DELETE any user  | DELETE    | /api/v1/user/:userId/delete   |     | Admin |
| GET the user list  | GET    | /api/v1/user/userList   |     | Admin |
| PUT the user preference view  | PUT    | /api/v1/user/preferences   |     | User |
| POST vote like  | POST    | /api/v1/votes/:movieId/like   |     | User |
| POST vote dislike  | POST    | /api/v1/votes/:movieId/dislike   |     | User |
| POST vote ignore  | POST    | /api/v1/votes/:movieId/ignore   |     | User |
| GET all user votes  | GET    | /api/v1/votes/myVotes  |     | User |
| POST movie to watchlist  | POST    | /api/v1/watchList/:movieId/add   |     | User |
| DELETE movie from watchlist  | DELETE    | /api/v1/watchList/:movieId/remove   |     | User |
| GET if a movie exists in watchList  | GET    | /api/v1/watchList/:movieId/exists  |     | User |
| GET all user watchlist items  | GET    | /api/v1/watchList  |     | User |

---

## Useful links

- [Presentation slides](https://docs.google.com/presentation/d/18FTmbfKPk4-kvmUaDFEL434RDo-BS3r-xkGEDVOJ4cY/edit#slide=id.g15922dfdf9b_0_17)
- [Frontend repository](https://github.com/Paumesonero/movieAppFrontend)
- [Frontend deploy](https://moviefetchapp.netlify.app/)
- [Deployed REST API]()

