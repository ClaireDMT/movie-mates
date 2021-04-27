namespace :movie do
  desc "Fetching movie from specific year"
  task :fetch_from_year, [:year] => :environment do |_t, year|
    puts "fetching movie from year #{year}"
    MoviesJob.perform_later(year.to_i)
    # rake task will return when all jobs are _enqueued_ (not done).
  end
end
