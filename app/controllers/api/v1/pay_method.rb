class Api::V1::UsersController < ApplicationController
    # Before executing any methods, the user must be authenticated, except for 'index' and 'show' methods
    before_action :authenticate_user!, except: [:index, :show]
    # Before executing the 'show', 'edit', 'update', 'destroy', 'create', 'new' methods, the 'set_user' method is executed
    before_action :set_user, only: %i[ show edit update destroy create new]

    # GET /users or /users.json
    # Returns all users in JSON format
    def index
        @users = User.all
        render json: @users
    end

    # GET /users/1 or /users/1.json
    # Returns a specific user in JSON format
    def show
        render json: @user
    end

    # GET /users/new
    # Initializes a new user
    def new
        @user = User.new
    end

    # GET /users/1/edit
    # Edit a specific user
    def edit
    end

    # POST /users or /users.json
    # Creates a new user and saves it to the database
    def create
        @user = User.new(user_params)
        respond_to do |format|
            if @user.save
                format.html { redirect_to user_url(@user), notice: "User was successfully created." }
                format.json { render :show, status: :created, location: @user }
            else
                format.html { render :new, status: :unprocessable_entity }
                format.json { render json: @user.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /users/1 or /users/1.json
    # Updates a specific user
    def update
        respond_to do |format|
            if @user.update(user_params)
                format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
                format.json { render :show, status: :ok, location: @user }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @user.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /users/1 or /users/1.json
    # Deletes a specific user
    def destroy
        @user.destroy
        respond_to do |format|
            format.html { redirect_to users_url, notice: "User was successfully destroyed." }
            format.json { head :no_content }
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
        params.require(:user).permit(:first_name, :last_name, :birth_date, :email, :password, :password_confirmation, :photo,:jti)
    end
end
