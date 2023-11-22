# require 'rails_helper'

# RSpec.describe FeedBack, type: :model do
#     describe "validations" do
#         it "is valid with valid attributes" do
#             course = Course.create(name: "Programming 101", description: "Introduction to programming", publication_date: Date.today)
#             user = User.new(first_name: "jonh", last_name: "dear",email: "john20example.com")

#             feedback = FeedBack.new(comments: "Great course!", qualification: 5, course: course, user: user)
#             expect(feedback).to be_valid
#         end

#     it "is not valid without comments" do
#       feedback = FeedBack.new(qualification: 4)
#       expect(feedback).not_to be_valid
#     end

#     it "is not valid without a qualification" do
#       feedback = FeedBack.new(comments: "Good course!")
#       expect(feedback).not_to be_valid
#     end

#     it "is not valid with a non-integer qualification" do
#       feedback = FeedBack.new(comments: "Good course!", qualification: 3.5)
#       expect(feedback).not_to be_valid
#     end

#     it "is not valid with a qualification less than 1" do
#       feedback = FeedBack.new(comments: "Good course!", qualification: 0)
#       expect(feedback).not_to be_valid
#     end

#     it "is not valid with a qualification greater than 5" do
#       feedback = FeedBack.new(comments: "Good course!", qualification: 6)
#       expect(feedback).not_to be_valid
#     end
#   end
# end
