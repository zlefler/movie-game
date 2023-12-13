# Movie Rankings

It's a game for ranking movies! Pretty straightforward.

# To Play

You can play the deployed version [here](https://movie-rankings.netlify.app).

# Running Locally

To run this project on your own machine, you'll need two API keys: one from [MoviesMiniDatabase](https://rapidapi.com/SAdrian/api/moviesminidatabase), and one from [Open Movie Database](https://www.omdbapi.com/). Add those to your .env using the .env.example as your template. Run `npm i` to install dependencies, then run `npm start` to start it. That's it!

# Some thoughts

I made some arbitrary calls about what genres to use based on what I thought people would find interesting and what I expected to have roughly comparable stats (eg. no documentaries). If you're interested in the remaining options, you can find all genres using the MoviesMiniDatabase API. I did some trial and error to see how far back I could go in terms of years and still get results; if you're not worried about it taking too long to load you could always set the parameters even wider.

# Changes

Any and all feedback is welcome, PRs for minor fixes are welcome without discussion. For bigger changes, shoot me a message beforehand.
