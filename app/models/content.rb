class Content < ApplicationRecord
    has_one_attached :pdf
    has_one_attached :video
    has_many_attached :img
end
