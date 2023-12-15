# This is the ContentsController class, which inherits from ApplicationController.
# It's responsible for handling HTTP requests related to Content objects.
class Api::V1::ContentsController < ApplicationController

    # This line sets up a before action that will call the set_content method
    # before the show, update, and destroy actions.
    before_action :set_content, only: %i[ show update destroy]

    # This is the index action. It retrieves all Content objects and renders them as JSON.
    def index
        @contents = Content.all
        render json: @contents
    end

    # This action retrieves all Content objects associated with a specific course.
    # It then renders them as JSON, including URLs for any attached images, PDFs, or videos.
    def contents_by_course
        @contents = Content.where(course_id: params[:course_id])
        render json: @contents.map { |content| 
            content.as_json.merge({
                img: content.img.map { |i| rails_blob_url(i) },
                pdf: content.pdf.attached? ? rails_blob_url(content.pdf) : nil,
                video: content.video.attached? ? rails_blob_url(content.video) : nil
            })
        }
    end

    # This is the show action. It renders the @content object as JSON.
    def show
        render json: @content
    end

    # This is the new action. It creates a new, unsaved Content object.
    def new
        @content = Content.new
    end

    # This is the edit action. It doesn't do anything in this case.
    def edit
    end

    # This is the create action. It attempts to create a new Content object with the given parameters.
    # If the object is valid and saves successfully, it renders the new object as JSON.
    # If the object is not valid, it renders the object's errors as JSON.
    def create
        @content = Content.new(content_params)
        attach_files_to_content if @content.valid?
        if @content.save
            render json: @content, status: :created
        else
            render json: @content.errors, status: :unprocessable_entity
        end
    end

    # This is the update action. It attempts to update the @content object with the given parameters.
    # If the object updates successfully, it renders the updated object as JSON.
    # If the object does not update successfully, it renders the object's errors as JSON.
    def update
        @content = Content.find(params[:id])
        if @content.update(content_params)
            render json: @content
        else
            render json: @content.errors, status: :unprocessable_entity
        end
    end

    # This is the destroy action. It destroys the @content object and returns a no content response.
    def destroy
        @content.destroy
        respond_to do |format|
            format.json { head :no_content }
        end
    end

    private
    # This is a private method that sets the @content object for the show, update, and destroy actions.
    def set_content
        @content = Content.find(params[:id])
    end

    # This is a private method that specifies the parameters that are allowed in the create and update actions.
    def content_params
        params.require(:content).permit(:name, :description,:course_id, :img, :video,:pdf)
    end

    # This is a private method that attaches files to the @content object.
    def attach_files_to_content
        @content.img.attach(params[:content][:img])
        @content.video.attach(params[:content][:video])
        @content.pdf.attach(params[:content][:pdf])
    end
end