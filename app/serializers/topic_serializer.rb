class TopicSerializer < ActiveModel::Serializer
  attributes :id, :tag, :description, :created_at, :updated_at
end