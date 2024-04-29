class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :name
      t.string :author
      t.string :ISBN
      t.string :publisher
      t.integer :year
      t.timestamps
    end
    add_column :books, :skills, :integer, array: true, default: [], using: 'gin'
  end
end