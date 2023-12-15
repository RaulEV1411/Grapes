    class Api::V1::CoursesController < ApplicationController
        
        before_action :set_course, only: %i[ show edit update destroy]
    
        # GET /courses or /courses.json
        def index
        @courses = Course.all
        render json: @courses
        end

        def courses_by_teacher
            @courses = Course.where(user_id: current_user.id)
            render json: @courses
        end

        def courses_by_subject
            # Obtén los cursos asociados al subject_id
            @subject = Subject.find(params[:id])
            @courses = @subject.courses
            render json: @courses
        end
    
        # GET /courses/1 or /courses/1.json
        def show
        render json: @course
        end
    
        # GET /courses/new
        def new
        @course = Course.new
        end
    
        # GET /courses/1/edit
        def edit
        end
        # POST /courses or /courses.json
        def create
            @course = Course.new(course_params.merge(user_id: current_user.id))
            respond_to do |format|
            if @course.save
                if current_user.has_role? :admin
                    # Obtén el subject_id del último request del usuario actual
                    subject_id = Request.where(user_id: current_user.id).last.subject_id
                    # Crea una nueva entrada en la tabla intermedia con el subject_id y course_id
                    SubjectCourse.create(subject_id: subject_id, course_id: @course.id)
                end
                format.json { render :show, status: :created }
            else
                format.json { render json: @course.errors, status: :unprocessable_entity }
            end
            end
        end
    
        # PATCH/PUT /courses/1 or /courses/1.json
        def update
            respond_to do |format|
                if @course.update(course_params)
                    format.json { render :show, status: :ok }
                else
                    format.json { render json: @course.errors, status: :unprocessable_entity }
                end
            end
        end
    
        # DELETE /courses/1 or /courses/1.json
        def destroy
        @course.destroy
        respond_to do |format|
            # format.html { redirect_to courses_url, notice: "Course was successfully destroyed." }
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
        params.require(:course).permit(:name, :description, :subject_id)
        end
    end
    