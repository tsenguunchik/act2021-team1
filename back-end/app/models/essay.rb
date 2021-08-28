class Essay < ApplicationRecord
  belongs_to :user
  has_many :essay_logs

  enum essay_rule: { public: 0, private: 1 }, _prefix: true
end
