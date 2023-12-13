class Api::V1::ContentsController < ApplicationController

    before_action :set_content, only: %i[ show update destroy]

    def index
        @contents = Content.all
        render json: @contents
    end

    # GET /users/1 or /users/1.json
    def show
        render json: @content
    end

    # GET /users/new
    def new
        @content = Content.new
    end

    # GET /users/1/edit
    def edit
    end

    # POST /users or /users.json
    def create
        @content = Content.new(content_params)
        attach_files_to_content if @content.valid?
        if @content.save
            render json: @content, status: :created
        else
            render json: @content.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /users/1 or /users/1.json
    def update
        respond_to do |format|
            if @content.update(user_params)
                format.html { redirect_to content_url(@content), notice: "User was successfully updated." }
                format.json { render :show, status: :ok, location: @content }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @content.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /users/1 or /users/1.json
    def destroy
        @content.destroy
        respond_to do |format|
            format.html { redirect_to contents_url, notice: "User was successfully destroyed." }
            format.json { head :no_content }
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
        def set_content
            @content = Content.find(params[:id])
        end

    # Only allow a list of trusted parameters through.
        def content_params
            params.require(:content).permit(:name, :description,:course_id, :img, :video,:pdf)
        end

        def attach_files_to_content
        @content.img.attach(params[:content][:img])
        @content.video.attach(params[:content][:video])
        @content.pdf.attach(params[:content][:pdf])
        end

end