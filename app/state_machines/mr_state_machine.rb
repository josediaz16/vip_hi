# Message Request State Machine
class MRStateMachine
  include Statesman::Machine

  state :pending, initial: true
  state :accepted
  state :rejected
  state :cancelled

  transition from: :pending,   to: [:accepted, :rejected, :cancelled]
  transition from: :accepted,  to: [:cancelled]
  transition from: :cancelled, to: [:pending]
end
