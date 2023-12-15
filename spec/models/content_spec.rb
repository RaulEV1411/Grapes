require 'rails_helper'

RSpec.describe Content, type: :model do
# Prueba de asociación has_one_attached :pdf
    it 'has one attached pdf' do
        expect(Content.new.pdf).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    # Prueba de asociación has_one_attached :video
    it 'has one attached video' do
        expect(Content.new.video).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    # Prueba de asociación has_many_attached :img
    it 'has many attached images' do
        expect(Content.new.img).to be_an_instance_of(ActiveStorage::Attached::Many)
    end
end