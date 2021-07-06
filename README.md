# movie_mates

This is a Rails 6 app created using [rails-template][]. Please check README of the template repository to see the features available out of the box. To have a look to the new features introduced by Rails 5.2 (credentials for example), check this [article][].

## Hot Relaoding


## Load Data from TMDB API
` ./bin/webpack-dev-server`

#### Load Genres (only 19)
In your rails console: `rails genre:fetch_all`

#### Load Movies from specific year and their cast
1. Launch Sidekiq to get a worker
`bundle exec sidekiq`

2. Start the job
In your rails console: `Mrails movie:fetch_from_year\[year\]`

[TMDB API]: https://www.themoviedb.org/documentation/api
[heroku]: https://www.heroku.com/
[redis]: https://devcenter.heroku.com/articles/heroku-redis
