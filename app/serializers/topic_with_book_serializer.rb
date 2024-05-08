class TopicWithBookSerializer < ActiveModel::Serializer
  attributes :id, :tag, :description, :created_at, :updated_at
  belongs_to :book, serializer: BookSerializer
end