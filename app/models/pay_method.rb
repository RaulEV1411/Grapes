class PayMethod < ApplicationRecord
    validates :payment_type, presence: true
end
