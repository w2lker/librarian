class RemoveSkillAndSkillsFromTopics < ActiveRecord::Migration[7.1]
  def change
    remove_column :topics, :skill, :integer
    remove_column :topics, :skills, :string
  end
end
