require 'date'
class CreateCrew < ApplicationService

  def call(tmdb_id)
    result = api_query("/person/#{tmdb_id}")
    crew = create_crew(result)
    crew.save
    return crew
  end

  private

  def create_crew(hash)
    crew = Crew.new(
      name: hash["name"],
      biography: hash["biography"],
      known_for: hash["known_for_department"],
      tmdb_id: hash["id"]
    )
    crew.age = age(hash["birthday"]) unless hash["birthday"].blank?
    return crew
  end

  def age(dob)
    date_bday = Date.new(dob.to_i, dob[5..6].to_i, dob[8..9].to_i)
    now = Time.now.utc.to_date
    now.year - date_bday.year - ((now.month > date_bday.month || (now.month == date_bday.month && now.day >= date_bday.day)) ? 0 : 1)
  end
end
