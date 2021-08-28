class V1::EssayController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :show, :done]

  def index
    datas = Essay.order(created_at: :desc)

    render json: { data: datas }, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      essay = Essay.new(essay_params)
      essay.save!
      essay_log = EssayLog.new(essay_status: 0, essay: essay, user: @current_user )
      NotificationHelper.new_notification(essay.mentor_id, @current_user.id, essay.personal_note, 0, essay.id) if essay.essay_rule_private?
      essay_log.save!

      render json: { data: essay }, status: :ok
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.message }, status: :unprocessable_entity
      raise ActiveRecord::Rollback
    end
  end

  def show
    essay = Essay.find_by(id: params[:id])
    other_essays = Essay.where.not(id: params[:id])

    if essay.present?
      essay[:seen_count] += 1
      essay.save!

      render json: { 
        data: {
          essay: essay,
          user: "#{essay.user.first_name} #{essay.user.last_name}",
          log: essay.essay_logs.order(created_at: :desc),
          other_essays: other_essays
        } 
      }, status: :ok
    else
      render json: { errors: "Can't find essay" }, status: :unprocessable_entity
    end
  end

  def update
    essay = Essay.find_by(id: params[:id])

    if essay.present?
      essay.mentor_id = @current_user.id if essay.mentor_id == nil
      essay.save!
      essay_log = EssayLog.new(essay_status: 1, essay: essay, user: @current_user)
      essay_log.save!
      
      NotificationHelper.new_notification(essay.user_id, @current_user.id, essay.personal_note, 1, essay.id)

      render json: { 
        data: {
          log: essay.essay_logs.order(created_at: :desc),
        } 
      }, status: :ok
    else
      render json: { errors: "Can't find essay" }, status: :unprocessable_entity
    end
  end

  def done
    essay = Essay.find_by(id: params[:id])

    if essay.present?
      essay_log = EssayLog.new(essay_status: 2, essay: essay, user: @current_user)
      essay_log.save!
      
      NotificationHelper.new_notification(essay.user_id, @current_user.id, essay.personal_note, 2, essay.id)

      render json: { 
        data: {
          log: essay.essay_logs.order(created_at: :desc),
        } 
      }, status: :ok
    else
      render json: { errors: "Can't find essay" }, status: :unprocessable_entity
    end
  end

  private

  def essay_params
    params.permit(:personal_note, :essay_rule, :mentor_id, :university_name, :google_doc_link, :essay_intro).merge!(user_id: @current_user.id)
  end
end
