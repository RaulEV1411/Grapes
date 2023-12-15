require 'rails_helper'

RSpec.describe Course, type: :model do
# Prueba de asociación belongs_to :subject
    it 'belongs to subject' do
        association = described_class.reflect_on_association(:subject)
        expect(association.macro).to eq :belongs_to
    end

# Prueba de asociación has_many :subject_courses
    it 'has many subject_courses' do
        association = described_class.reflect_on_association(:subject_courses)
        expect(association.macro).to eq :has_many
    end

# Prueba de asociación has_many :subjects, through: :subject_courses
    it 'has many subjects through subject_courses' do
        association = described_class.reflect_on_association(:subjects)
        expect(association.macro).to eq :has_many
        expect(association.options[:through]).to eq :subject_courses
    end
end
