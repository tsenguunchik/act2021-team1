class V1::MentorController < ApplicationController
  def index
    data = User.user_type_mentor
    render json: {data: data}, status: :ok
  end
end
