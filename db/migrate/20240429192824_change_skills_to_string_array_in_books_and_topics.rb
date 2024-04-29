class ChangeSkillsToStringArrayInBooksAndTopics < ActiveRecord::Migration[6.0]
  def change
    remove_column :books, :skills, :string
    add_column :books, :skills, :string, array: true, default: '{}'

    remove_column :topics, :skills, :string
    add_column :topics, :skills, :string, array: true, default: '{}'
  end
end