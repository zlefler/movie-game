import requests
import os
from dotenv import load_dotenv
import random

load_dotenv()

genres = [
    "Adventure",
    "Family",
    "Fantasy",
    "Crime",
    "Drama",
    "Comedy",
    "Animation",
    "Sci-Fi",
    "Sport",
    "Action",
    "Thriller",
    "Mystery",
    "Western",
    "Romance",
    "Biography",
    "Horror",
    "War",
    "Musical",
    "History",
]
movies = []

mini_api = os.environ.get("MOVIES_MINI_API_KEY")

while len(movies) < 4:
    year = random.randint(1982, 2002)
    genre = genres[random.randint(0, 14)]
    url = (
        f"https://moviesminidatabase.p.rapidapi.com/movie/byYear/{year}/byGen/{genre}/"
    )

    headers = {
        "X-RapidAPI-Key": mini_api,
        "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    }

    response = requests.get(url, headers=headers)
    json = response.json()
    print(json)
    movies = json["results"]


{
    "Title": "Guardians of the Galaxy Vol. 2",
    "Year": "2017",
    "Rated": "PG-13",
    "Released": "05 May 2017",
    "Runtime": "136 min",
    "Genre": "Action, Adventure, Comedy",
    "Director": "James Gunn",
    "Writer": "James Gunn, Dan Abnett, Andy Lanning",
    "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista",
    "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    "Language": "English",
    "Country": "United States",
    "Awards": "Nominated for 1 Oscar. 15 wins & 60 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
    "Ratings": [
        {"Source": "Internet Movie Database", "Value": "7.6/10"},
        {"Source": "Rotten Tomatoes", "Value": "85%"},
        {"Source": "Metacritic", "Value": "67/100"},
    ],
    "Metascore": "67",
    "imdbRating": "7.6",
    "imdbVotes": "738,822",
    "imdbID": "tt3896198",
    "Type": "movie",
    "DVD": "10 Jul 2017",
    "BoxOffice": "$389,813,101",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True",
}

omdb_api = os.environ.get("OMDB_API_KEY")

print(f"{genre} Movies In {year}")
for movie in movies:
    url = f'http://www.omdbapi.com/?i={movie["imdb_id"]}&apikey={omdb_api}'
    response = requests.get(url)
    data = response.json()
    print(movie["title"])
    for rating in data["Ratings"]:
        if rating["Source"] == "Rotten Tomatoes":
            print(rating["Value"])
    print(data["BoxOffice"])
