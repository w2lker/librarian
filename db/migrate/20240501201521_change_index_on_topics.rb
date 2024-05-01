class ChangeIndexOnTopics < ActiveRecord::Migration[7.1]
  def change
    remove_index :topics, column: [:book_id, :tag], unique: true
    add_index :topics, [:book_id, :tag]
  end
end
