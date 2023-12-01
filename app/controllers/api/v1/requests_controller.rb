
class Api::V1::RequestsController < ApplicationController
    skip_before_action :authenticate_user!
    before_action :set_request, only: [:show, :update, :destroy]
    
        def index
        @requests = Request.all
        render json: @requests
        end
    
        def show
        render json: @request
        end
    
        def create
        pry.byebug
            

            @request = Request.new(request_params.merge(user_id: current_user.id))
        
            attach_files_to_request if @request.valid?
        
            if @request.save
                render json: @request, status: :created
            else
                render json: @request.errors, status: :unprocessable_entity
            end
        end
    
        def update
        if @request.update(request_params)
            render json: @request
        else
            render json: @request.errors, status: :unprocessable_entity
        end
        end
    
        def destroy
        @request.destroy
        head :no_content
        end
    
        private
    
        def set_request
        @request = Request.find(params[:id])
        end
    
        def request_params
        params.require(:request).permit(:identification_number, :subject_id)
        end
    
        def attach_files_to_request
        @request.id_person.attach(params[:request][:id_person])
        @request.person_photo.attach(params[:request][:person_photo])
        @request.title_photo.attach(params[:request][:title_photo])
        @request.cv.attach(params[:request][:cv])
        end
    end 