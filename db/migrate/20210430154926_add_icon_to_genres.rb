class AddIconToGenres < ActiveRecord::Migration[6.1]
  def change
    add_column :genres, :icon, :string
  end
end
