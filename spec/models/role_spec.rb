require 'rails_helper'

    RSpec.describe Role, type: :model do
    let(:user) { User.create(email: "test@example.com", password: "password") }

    describe "associations" do
    it "has and belongs to many users" do
        association = described_class.reflect_on_association(:users)
        expect(association.macro).to eq :has_and_belongs_to_many
    end

    it "belongs to resource" do
        association = described_class.reflect_on_association(:resource)
        expect(association.macro).to eq :belongs_to
    end
    end

    describe "validations" do
    it "validates resource_type inclusion" do
        role = Role.new(resource_type: "InvalidResource")
        expect(role).not_to be_valid
        expect(role.errors[:resource_type]).to include("is not included in the list")
    end

    it "allows nil resource_type" do
        role = Role.new(resource_type: nil)
        expect(role).to be_valid
    end
    end
    end