# Project's name REST API
## Description

This is a the backend repository for the React application `app's name`.

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
- User can get recommendations (random) based on its votes.
- User can save a review about a previously voted movie.
- User can edit its own movie reviews.
- User can delete its own movie reviews.
- Admin can create a movie.
- Admin can delete a movie.
- Admin can edit any movie.

## User stories (Backlog)

- User can also vote 'Ignore' so the movie is not considered an opinion, and is never recommended again.
- User can add movies to its watchList, to be able to get to them later and watch them.
- User can upload or change a profile picture.
- User can delete its own account.
- User can see its vote history.
- User can filter its own recommendations through genre checkboxes.
- User can visit IMDB through movie-detail links for more information.
- User can sort its own vote history by ranking, popularity or voting date.
- User can sort its own vote history by genres.
- Admins can see the list of registered users.

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
  },
  watchList:{
    type: [Schema.Types.ObjectId],
    ref: "Movie"
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
        },
        watchList: {
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
        },
        likes: {
            type: Number,
        }
}
```

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |

---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

