class NotePolicy < ApplicationPolicy
  def initialize(user, record)
    @user = user
    @record = record
  end

  def show?
    record.note_user_for(user) || record.creator == user
  end

  def edit?
    record.note_user_for(user)&.updater? || record.note_user_for(user)&.owner? || record.creator == user
  end

  def destroy?
    record.note_user_for(user).owner? || record.creator == user
  end
  alias_method :share?, :destroy?
  alias_method :revoke?, :destroy?
end
