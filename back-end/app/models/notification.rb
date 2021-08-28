class Notification < ApplicationRecord
  enum notif_type: {essay_assigned: 0, essay_reviewing: 1, essay_reviewed: 2}, _prefix: true
end
