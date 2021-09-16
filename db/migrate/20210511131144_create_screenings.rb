class CreateScreenings < ActiveRecord::Migration[6.1]
  def change
    create_table :screenings do |t|
      t.references :user1,  null: false, foreign_key: { to_table: :users }
      t.references :user2,  null: true, foreign_key: { to_table: :users }
      t.references :user3,  null: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
