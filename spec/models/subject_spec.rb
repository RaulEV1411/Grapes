    require 'rails_helper'

    RSpec.describe Subject, type: :model do
    # Prueba de asociación has_many :subject_courses
    it 'has many subject_courses' do
        association = described_class.reflect_on_association(:subject_courses)
            expect(association.macro).to eq :has_many
    end

    # Prueba de asociación has_many :courses, through: :subject_courses
    it 'has many courses through subject_courses' do
        association = described_class.reflect_on_association(:courses)
            expect(association.macro).to eq :has_many
            expect(association.options[:through]).to eq :subject_courses
        end
    end