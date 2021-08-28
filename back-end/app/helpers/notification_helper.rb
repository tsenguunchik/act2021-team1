module NotificationHelper
  def self.new_notification(target_id, user_id, title, notif_type, essay_id)
    notification = Notification.new(target_id: target_id, user_id: user_id, notif_type: notif_type, title: title, essay_id: essay_id)

    case notif_type
      when 0
        notification.information = "#{User.find(user_id).first_name} assigned an essay to you"
      when 1
        notification.information = "#{User.find(user_id).first_name} is reviewing your an essay"
      when 2
        notification.information = "#{User.find(user_id).first_name} reviewed your an essay"
      else
        return
    end
    
    notification.save!
  end
end
