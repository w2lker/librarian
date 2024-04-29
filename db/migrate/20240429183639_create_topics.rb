class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :tag
      t.text :description
      t.integer :skill
      t.references :book, null: false, foreign_key: true
      t.timestamps
    end

    add_index :topics, [:book_id, :tag], unique: true
  end
end
