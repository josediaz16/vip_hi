# Message Request State Machine
class MRStateMachine
  include Statesman::Machine

  state :pending, initial: true
  state :purchased
  state :accepted
  state :rejected
  state :cancelled
  state :delivered

  transition from: :pending,   to: [:purchased]
  transition from: :purchased, to: [:accepted, :rejected, :cancelled, :delivered]
  transition from: :accepted,  to: [:cancelled, :delivered]
  transition from: :cancelled, to: [:pending]
end
