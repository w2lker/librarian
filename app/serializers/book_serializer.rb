class BookSerializer < ActiveModel::Serializer
  attributes :id, :name, :author, :ISBN, :publisher, :year, :coverURL, :skills

  def skills
    object.skills.is_a?(String) ? JSON.parse(object.skills) : object.skills
  end
end
