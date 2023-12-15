    require 'rails_helper'

    RSpec.describe User, type: :model do
    describe "validations" do
    it "validates presence of first_name" do
        user = User.new
        expect(user).not_to be_valid
        expect(user.errors[:first_name]).to include("can't be blank")
    end

    it "validates presence of email" do
        user = User.new(first_name: "Test")
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include("can't be blank")
    end

    it "validates presence of password" do
        user = User.new(first_name: "Test", email: "test@example.com")
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include("can't be blank")
    end
    end

    describe "associations" do
    it "has many attached photo" do
        expect(User.new.photo).to be_an_instance_of(ActiveStorage::Attached::Many)
    end
    end

    describe "callbacks" do
    it "assigns default role before create" do
        user = User.create(first_name: "Test", email: "test@example.com", password: "password")
        expect(user.has_role?(:user)).to be true
    end
    end

    describe "methods" do
    it "returns jwt_payload" do
        user = User.create(first_name: "Test", email: "test@example.com", password: "password")
        expect(user.jwt_payload).to eq({ 'foo' => 'bar' })
    end
    end
    end