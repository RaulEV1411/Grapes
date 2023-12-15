class Api::V1::SubjectsController < ApplicationController
    # Before executing the 'show', 'edit', 'update', 'destroy', 'create', 'new' methods, the 'set_subject' method is executed
    before_action :set_subject, only: %i[ show edit update destroy create new]

    # GET /subjects
    # Returns all subjects in JSON format
    def index
        @subjects = Subject.all
        render json: @subjects
    end

    # GET /subjects/1
    # Returns a specific subject in JSON format
    def show
        render json: @subject
    end

    # GET /subjects/new
    # Initializes a new subject
    def new
        @subject = Subject.new
    end

    # GET /subjects/1/edit
    # Edit a specific subject
    def edit
    end

    # POST /subjects
    # Creates a new subject and saves it to the database
    def create
        token = request.headers['Authorization']
        puts "Received Token: #{token}"
        @subject = Subject.new(subject_params)
        respond_to do |format|
            if @subject.save
                format.html { redirect_to subject_url(@subject), notice: "Subject was successfully created." }
                format.json { render :show, status: :created, location: @subject }
            else
                format.html { render :new, status: :unprocessable_entity }
                format.json { render json: @subject.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /subjects/1
    # Updates a specific subject
    def update
        respond_to do |format|
            if @subject.update(subject_params)
                format.html { redirect_to subject_url(@subject), notice: "Subject was successfully updated." }
                format.json { render :show, status: :ok, location: @subject }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @subject.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /subjects/1
    # Deletes a specific subject
    def destroy
        @subject.destroy
        respond_to do |format|
            format.html { redirect_to subjects_url, notice: "Subject was successfully destroyed." }
            format.json { head :no_content }
        end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_subject
        @subject = Subject.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def subject_params
        params.require(:subject).permit(:name)
    end
end
