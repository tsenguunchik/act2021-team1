class EssayLog < ApplicationRecord
  belongs_to :user
  belongs_to :essay

  enum essay_status: { created: 0, reviewing: 1, done: 2 }, _prefix: true
end
