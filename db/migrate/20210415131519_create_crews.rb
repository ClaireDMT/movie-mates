class CreateCrews < ActiveRecord::Migration[6.1]
  def change
    create_table :crews do |t|
      t.string :first_name
      t.string :last_name
      t.text :biography
      t.string :known_for
      t.integer :age

      t.timestamps
    end
  end
end
