# This is the UsersController class which inherits from ApplicationController.
class Api::V1::UsersController < ApplicationController
    
    # Before executing the actions 'show', 'edit', 'update', 'destroy', 'create', and 'new', the method 'set_user' is called.
    before_action :set_user, only: %i[ show edit update destroy create new]

        # This method allows a user to request admin privileges.
        def request_admin
            # Find the user with the given id.
            @user = User.find(params[:id])
            # Remove the 'user' role from the user.
            @user.remove_role :user
            # Add the 'pending_request' role to the user.
            @user.add_role :pending_request
            # Redirect to the user session path with a notice.
            redirect_to user_session_path, notice: 'Your request has been sent.'
        end

        # This method approves a user's request for admin privileges.
        def approve_admin
            # Find the user with the given id.
            @user = User.find(params[:id])
            # Remove the 'pending_request' role from the user.
            @user.remove_role :pending_request
            # Add the 'admin' role to the user.
            @user.add_role :admin
            # Redirect to the user session path with a notice.
            redirect_to user_session_path, notice: 'The user has been approved as an admin.'
        end

        # This method declines a user's request for admin privileges.
        def decline_request
            # Find the user with the given id.
            @user = User.find(params[:id])
            # Find the request made by the user.
            @request = Request.find_by(user_id: @user.id)
            # If the user has the 'admin' role, remove it.
            if @user.has_role? :admin
                @user.remove_role :admin
            # If the user has the 'pending_request' role, remove it.
            elsif @user.has_role? :pending_request
                @user.remove_role :pending_request
            end
            # Add the 'user' role to the user.
            @user.add_role :user
            # If there is a request, destroy it.
            if @request
                @request.destroy
                # Redirect to the user session path with a notice.
                redirect_to user_session_path, notice: 'La solicitud de administrador ha sido eliminada.'
            else
                # Redirect to the user session path with a notice.
                redirect_to user_session_path, notice: 'No se encontró ninguna solicitud de administrador para este usuario.'
            end
        end
        # GET /users or /users.json
        # This method returns all users.
        def index
            @users = User.all
            render json: @users
        end

        # GET /users/1 or /users/1.json
        # This method returns a specific user and their roles.
        def show
            render json: { user: @user, roles: @user.roles }
        end

        # GET /users/new
        # This method initializes a new user.
        def new
            @user = User.new
        end

        # GET /users/1/edit
        # This method is for editing a user.
        def edit
        end

        # POST /users or /users.json
        # This method creates a new user.
        def create
            @user = User.new(user_params)
            respond_to do |format|
                if @user.save
                    format.json { render :show, status: :created, location: @user }
                else
                    format.html { render :new, status: :unprocessable_entity }
                    format.json { render json: @user.errors, status: :unprocessable_entity }
                end
            end
        end

        # PATCH/PUT /users/1 or /users/1.json
        # This method updates a user.
        def update
            respond_to do |format|
                if @user.update(user_params)
                    format.json { render :show, status: :ok, location: @user }
                else
                    format.html { render :edit, status: :unprocessable_entity }
                    format.json { render json: @user.errors, status: :unprocessable_entity }
                end
            end
        end

        # DELETE /users/1 or /users/1.json
        # This method deletes a user.
        def destroy
            @user.destroy
            respond_to do |format|
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
