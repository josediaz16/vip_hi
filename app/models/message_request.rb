class MessageRequest < ApplicationRecord
  include Statesman::Adapters::ActiveRecordQueries

  belongs_to :celebrity
  belongs_to :fan, optional: true
  has_one    :payment

  has_many   :mr_transitions, autosave: false, class_name: "MRTransition"

  delegate :can_transition_to?, :transition_to!, :transition_to, :last_transition, :current_state, :in_state?, to: :state_machine

  def state_machine
    @state_machine ||= MRStateMachine.new(self, transition_class: MRTransition)
  end

  def self.transition_class
    MRTransition
  end

  def initial_state
    :pending
  end

  def self.ordered_by_relevance
    order("
      CASE
        WHEN status = 'purchased' THEN 0
        WHEN status = 'pending' THEN 1
        WHEN status = 'delivered' THEN 2
        WHEN status = 'cancelled' THEN 3
      END
    ")
  end
end
