class CreateCrews < ActiveRecord::Migration[6.1]
  def change
    create_table :crews do |t|
      t.string :name
      t.text :biography
      t.string :known_for
      t.integer :age
      t.integer :tmdb_id

      t.timestamps
    end
  end
end
