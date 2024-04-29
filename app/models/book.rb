class Book < ApplicationRecord
  has_many :topics, dependent: :destroy
end
