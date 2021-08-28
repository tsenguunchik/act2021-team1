class V1::NotificationsController < ApplicationController
  before_action :authorize_request, only: [:index, :badge, :update]

  def index
    notification = Notification.where(target_id: @current_user.id).order(created_at: :desc)

    render json: {data: notification}, status: :ok
  end

  def badge
    notification_badge = Notification.where(target_id: @current_user.id, seen: false).count

    render json: {data: notification_badge}, status: :ok
  end

  def update
    notification_update = Notification.find_by(id: params[:id])
    notification_update.seen = 1
    notification_update.save!

    notification = Notification.where(target_id: @current_user.id).order(created_at: :desc)

    render json: {data: notification}, status: :ok
  end
end
