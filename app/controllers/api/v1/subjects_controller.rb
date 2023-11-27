class Api::V1::SubjectsController < ApplicationController

    before_action :authenticate_user!, except: [:index, :show]
    before_action :set_subject, only: %i[ show edit update destroy create new]


        # GET /users or /users.json
        def index
            @subjects = Subject.all
            render json: @subjects
        end

        # GET /users/1 or /users/1.json
        def show
            render json: @subject
        end

        # GET /users/new
        def new
            @subject = Subject.new
        end

        # GET /users/1/edit
        def edit
        end

        # POST /users or /users.json
        def create
            @subject = Subject.new(subject_params)
            respond_to do |format|
                if @subject.save
                    format.html { redirect_to subject_url(@subject), notice: "subject was successfully created." }
                    format.json { render :show, status: :created, location: @subject }
                else
                    format.html { render :new, status: :unprocessable_entity }
                    format.json { render json: @subject.errors, status: :unprocessable_entity }
                end
            end
        end



        # PATCH/PUT /users/1 or /users/1.json
        def update
            respond_to do |format|
                if @subject.update(subject_params)
                    format.html { redirect_to subject_url(@subject), notice: "subject was successfully updated." }
                    format.json { render :show, status: :ok, location: @subject }
                else
                    format.html { render :edit, status: :unprocessable_entity }
                    format.json { render json: @subject.errors, status: :unprocessable_entity }
                end
            end
        end

        # DELETE /users/1 or /users/1.json
        def destroy
            @subject.destroy
            respond_to do |format|
                format.html { redirect_to subject_url, notice: "Course was successfully destroyed." }
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
                params.require(:subject).permit(:name )
            end
end
