# Message Request State Machine
class MRStateMachine
  include Statesman::Machine

  state :pending, initial: true
  state :accepted
  state :rejected
  state :cancelled
  state :delivered

  transition from: :pending,   to: [:accepted, :rejected, :cancelled]
  transition from: :accepted,  to: [:cancelled, :delivered]
  transition from: :cancelled, to: [:pending]
end
