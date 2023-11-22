# require 'rails_helper'

# RSpec.describe Subject, type: :model do
#     describe "validations" do
#         it "is valid with valid attributes" do
#         subject = Subject.new(name: "Mathematics")
#         expect(subject).to be_valid
#         end

#         it "is not valid without a name" do
#         subject = Subject.new
#         expect(subject).not_to be_valid
#         end

#         it "is not valid with a duplicate name" do
#         Subject.create(name: "Mathematics")
#         subject = Subject.new(name: "Mathematics")
#         expect(subject).not_to be_valid
#         end
#     end
# end