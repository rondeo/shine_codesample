class Teacher < User
  has_many :lessons, foreign_key: :tutor_id	
end
