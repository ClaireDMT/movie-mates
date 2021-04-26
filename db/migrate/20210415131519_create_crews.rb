class CreateCrews < ActiveRecord::Migration[6.1]
  def change
    create_table :crews do |t|
      t.string :name, index: true
      t.text :biography
      t.string :known_for
      t.integer :age
      t.integer :tmdb_id, index: true

      t.timestamps
    end
  end
end
