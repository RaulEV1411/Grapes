class Api::V1::UsersController < ApplicationController
    
    before_action :set_user, only: %i[ show edit update destroy create new]

        def request_admin
            @user = User.find(params[:id])
            @user.remove_role :user
            @user.add_role :pending_request
            redirect_to user_session_path, notice: 'Your request has been sent.'
        end

        def approve_admin
            @user = User.find(params[:id])
            @user.remove_role :pending_request
            @user.add_role :admin
            redirect_to user_session_path, notice: 'The user has been approved as an admin.'
        end

        def decline_request
            @user = User.find(params[:id])
            @request = Request.find_by(user_id: @user.id)
            @user.remove_role :pending_request
            @user.add_role :user
            if @request
                @request.destroy
                redirect_to user_session_path, notice: 'La solicitud de administrador ha sido eliminada.'
            else
                redirect_to user_session_path, notice: 'No se encontró ninguna solicitud de administrador para este usuario.'
            end
        end
        # GET /users or /users.json
        def index
            @users = User.all
            render json: @users
        end

        # GET /users/1 or /users/1.json
        def show
            render json: { user: @user, roles: @user.roles }
        end

        # GET /users/new
        def new
            @user = User.new
        end

        # GET /users/1/edit
        def edit
        end

        # POST /users or /users.json
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
