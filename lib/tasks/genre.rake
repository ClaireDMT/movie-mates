namespace :genre do
  desc "Fetching all the existing genres"
  task fetch_all: :environment do
    GenresJob.perform_later
    # rake task will return when all jobs are _enqueued_ (not done).
  end
end
