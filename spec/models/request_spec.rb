require 'rails_helper'

RSpec.describe Request, type: :model do
let(:subject) { Subject.create(name: "Math") }

    describe "validations" do
    it "validates presence of identification_number" do
        request = Request.new(subject: subject)
        expect(request).not_to be_valid
        expect(request.errors[:identification_number]).to include("can't be blank")
    end

    it "validates presence of subject_id" do
        request = Request.new(identification_number: "123456")
            expect(request).not_to be_valid
            expect(request.errors[:subject_id]).to include("can't be blank")
        end
    end

    describe "associations" do
    it "belongs to subject" do
        association = described_class.reflect_on_association(:subject)
        expect(association.macro).to eq :belongs_to
    end

    it "has one attached id_person" do
        expect(Request.new.id_person).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    it "has one attached person_photo" do
        expect(Request.new.person_photo).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    it "has one attached title_photo" do
        expect(Request.new.title_photo).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    it "has one attached cv" do
        expect(Request.new.cv).to be_an_instance_of(ActiveStorage::Attached::One)
        end
    end
end

