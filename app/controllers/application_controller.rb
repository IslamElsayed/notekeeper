class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  protected
    def not_authorized
      redirect_to request.referer || root_path, notice: 'You are not authorized to perform this action.'
    end
end
