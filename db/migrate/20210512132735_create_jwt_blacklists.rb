class CreateJwtBlacklists < ActiveRecord::Migration[6.1]
  def change
    create_table :jwt_blacklists do |t|
      t.string :jti, null: false
      t.timestamps
    end
    add_index :jwt_blacklist, :jti
  end
end
