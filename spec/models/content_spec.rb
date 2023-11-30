require 'rails_helper'

RSpec.describe Content, type: :model do
  describe "validations" do
    let(:content_type) { ContentType.create(name: "Video") }
    let(:course) { Course.create(name: "Programming 101", description: "Introduction to programming", publication_date: Date.today) }

    it "is valid with valid attributes" do
      content = Content.new(
        name: "Introduction to Programming",
        url: "https://example.com/intro-video",
        description: "A brief introduction to programming",
        content_type: content_type,
        course: course
      )
      expect(content).to be_valid
    end

    it "is not valid without a name" do
      content = Content.new(
        url: "https://example.com/intro-video",
        description: "A brief introduction to programming",
        content_type: content_type,
        course: course
      )
      expect(content).not_to be_valid
    end

    it "is not valid without a url" do
      content = Content.new(
        name: "Introduction to Programming",
        description: "A brief introduction to programming",
        content_type: content_type,
        course: course
      )
      expect(content).not_to be_valid
    end

    it "is not valid without a description" do
      content = Content.new(
        name: "Introduction to Programming",
        url: "https://example.com/intro-video",
        content_type: content_type,
        course: course
      )
      expect(content).not_to be_valid
    end

    it "is not valid without a content_type" do
      content = Content.new(
        name: "Introduction to Programming",
        url: "https://example.com/intro-video",
        description: "A brief introduction to programming",
        course: course
      )
      expect(content).not_to be_valid
    end

    it "is not valid without a course" do
      content = Content.new(
        name: "Introduction to Programming",
        url: "https://example.com/intro-video",
        description: "A brief introduction to programming",
        content_type: content_type
      )
      expect(content).not_to be_valid
    end
  end
end