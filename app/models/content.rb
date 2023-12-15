# The Content class inherits from ApplicationRecord, which means it has all the methods and properties of the ApplicationRecord.
# This class is used to represent a content in your application.
class Content < ApplicationRecord
  # has_one_attached :pdf indicates that each instance of the Content model can have one PDF file attached to it.
  has_one_attached :pdf

  # has_one_attached :video indicates that each instance of the Content model can have one video file attached to it.
  has_one_attached :video

  # has_many_attached :img indicates that each instance of the Content model can have many image files attached to it.
  has_many_attached :img
end

