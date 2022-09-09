const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        imdb_id: {
            type: String,
            unique:true
        },
        name: {
            type: String,
            unique:true
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
        premiere: {
            type: String,
        },
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
);

const Movie = model('Movie', movieSchema);

module.exports = Movie;