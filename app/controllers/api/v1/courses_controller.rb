class Api::V1::CoursesController < ApplicationController

    before_action :authenticate_user!, except: [:index, :show]
    before_action :set_course, only: %i[ show edit update destroy create new]


        # GET /users or /users.json
        def index
            @courses = Course.all
            render json: @courses
        end

        # GET /users/1 or /users/1.json
        def show
            render json: @course
        end

        # GET /users/new
        def new
            @course = Course.new
        end

        # GET /users/1/edit
        def edit
        end

        # POST /users or /users.json
        def create
            @course = Course.new(course_params)
            respond_to do |format|
                if @course.save
                    format.html { redirect_to course_url(@course), notice: "Course was successfully created." }
                    format.json { render :show, status: :created, location: @course }
                else
                    format.html { render :new, status: :unprocessable_entity }
                    format.json { render json: @course.errors, status: :unprocessable_entity }
                end
            end
        end



        # PATCH/PUT /users/1 or /users/1.json
        def update
            respond_to do |format|
                if @course.update(course_params)
                    format.html { redirect_to course_url(@course), notice: "Course was successfully updated." }
                    format.json { render :show, status: :ok, location: @course }
                else
                    format.html { render :edit, status: :unprocessable_entity }
                    format.json { render json: @course.errors, status: :unprocessable_entity }
                end
            end
        end

        # DELETE /users/1 or /users/1.json
        def destroy
            @course.destroy
            respond_to do |format|
                format.html { redirect_to courses_url, notice: "Course was successfully destroyed." }
                format.json { head :no_content }
            end
        end

        private
        # Use callbacks to share common setup or constraints between actions.
            def set_course
                @course = Course.find(params[:id])
            end

        # Only allow a list of trusted parameters through.
            def course_params
                params.require(:course).permit(:name, :description, :publication_date)
            end
end
