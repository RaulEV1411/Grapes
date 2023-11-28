class Request < ApplicationRecord
    belongs_to :subject
    has_one_attached :id_person
    has_one_attached :person_photo
    has_one_attached :title_photo
    has_one_attached :cv  # Agregado para el archivo de CV
  
    validates :identification_number, presence: true
    validates :subject_id, presence: true
  end