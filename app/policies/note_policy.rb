class NotePolicy < ApplicationPolicy
  attr_reader :note_user

  def initialize(user, record)
    @user = user
    @record = record
    @note_user = record.note_user_for(user)
  end

  def show?
    record
  end

  def edit?
    note_user&.updater? || note_user&.owner? || record.creator == user
  end
  alias_method :update?, :edit?

  def destroy?
    note_user.owner? || note_user.creator?
  end
  alias_method :invite?, :destroy?
  alias_method :revoke?, :destroy?
end
