class Book < ApplicationRecord
  has_many :topics, dependent: :destroy
  validates :coverURL, format: { with: URI::regexp(%w[http https]), message: "is not a valid URL" }, allow_blank: true
end
