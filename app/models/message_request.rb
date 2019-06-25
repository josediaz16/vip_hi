class MessageRequest < ApplicationRecord
  include Statesman::Adapters::ActiveRecordQueries

  belongs_to :celebrity
  has_many   :mr_transitions, autosave: false

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
end
