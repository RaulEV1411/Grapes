
require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET #index" do
    it "returns a successful response" do
      get :index
      expect(response).to be_successful
    end

    it "assigns all users to @users" do
      user = create(:user)
      get :index
      expect(assigns(:users)).to eq([user])
    end
  end

  describe "GET #show" do
    it "returns a successful response" do
      user = create(:user)
      get :show, params: { id: user.id }
      expect(response).to be_successful
    end

    it "assigns the requested user to @user" do
      user = create(:user)
      get :show, params: { id: user.id }
      expect(assigns(:user)).to eq(user)
    end
  end

  describe "GET #new" do
    it "returns a successful response" do
      get :new
      expect(response).to be_successful
    end

    it "assigns a new user to @user" do
      get :new
      expect(assigns(:user)).to be_a_new(User)
    end
  end

  describe "GET #edit" do
    it "returns a successful response" do
      user = create(:user)
      get :edit, params: { id: user.id }
      expect(response).to be_successful
    end

    it "assigns the requested user to @user" do
      user = create(:user)
      get :edit, params: { id: user.id }
      expect(assigns(:user)).to eq(user)
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new user" do
        expect {
          post :create, params: { user: attributes_for(:user) }
        }.to change(User, :count).by(1)
      end

      it "redirects to the created user" do
        post :create, params: { user: attributes_for(:user) }
        expect(response).to redirect_to(user_url(User.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new user" do
        expect {
          post :create, params: { user: attributes_for(:user, email: nil) }
        }.to_not change(User, :count)
      end

      it "renders the new template" do
        post :create, params: { user: attributes_for(:user, email: nil) }
        expect(response).to render_template(:new)
      end
    end
  end

  describe "PATCH #update" do
    context "with valid parameters" do
      let(:user) { create(:user) }

      it "updates the requested user" do
        patch :update, params: { id: user.id, user: { first_name: "NewName" } }
        user.reload
        expect(user.first_name).to eq("NewName")
      end

      it "redirects to the updated user" do
        patch :update, params: { id: user.id, user: { first_name: "NewName" } }
        expect(response).to redirect_to(user_url(user))
      end
    end

    context "with invalid parameters" do
      let(:user) { create(:user) }

      it "does not update the user" do
        patch :update, params: { id: user.id, user: { email: nil } }
        user.reload
        expect(user.email).not_to eq(nil)
      end

      it "renders the edit template" do
        patch :update, params: { id: user.id, user: { email: nil } }
        expect(response).to render_template(:edit)
      end
    end
  end

  describe "DELETE #destroy" do
    let(:user) { create(:user) }

    it "destroys the requested user" do
      expect {
        delete :destroy, params: { id: user.id }
      }.to change(User, :count).by(-1)
    end

    it "redirects to the users list" do
      delete :destroy, params: { id: user.id }
      expect(response).to redirect_to(users_url)
    end
  end
end
