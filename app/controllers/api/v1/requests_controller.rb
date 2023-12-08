class Api::V1::RequestsController < ApplicationController
    before_action :set_request, only: [:show, :update, :destroy]
    
        def index
        @requests = Request.all
        render json: @requests
        end

        def index_request_pending
            user_ids = User.joins(:roles).where(roles: { name: 'pending_request' }).pluck(:id)
            @requests = Request.where(user_id: user_ids)
            render json: @requests
        end

        

        def show_by_user
            @request = Request.find_by(user_id: params[:id])
            if @request
                render json: @request.as_json.merge({
                person_photo: rails_blob_url(@request.person_photo),
                title_photo: rails_blob_url(@request.title_photo),
                id_person: rails_blob_url(@request.id_person),
                cv: rails_blob_url(@request.cv)
                }).tap { |json| puts json }
            else
                render json: { error: 'No request found for this user' }, status: :not_found
            end
        end         
    
        def show
            render json: @request.as_json.merge({
                person_photo: rails_blob_url(@request.person_photo),
                title_photo: rails_blob_url(@request.title_photo),
                id_person: rails_blob_url(@request.id_person),
                cv: rails_blob_url(@request.cv)
            }).tap { |json| puts json }
        end
    
        def create

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
        params.require(:request).permit(:identification_number, :subject_id, :person_photo, :title_photo, :id_person, :cv)
        end
    
        def attach_files_to_request
        @request.id_person.attach(params[:request][:id_person])
        @request.person_photo.attach(params[:request][:person_photo])
        @request.title_photo.attach(params[:request][:title_photo])
        @request.cv.attach(params[:request][:cv])
        end
    end 