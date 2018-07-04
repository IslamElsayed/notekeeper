class UsersController < ApplicationController
  before_action :set_note
  before_action :set_user
  before_action ->{ authorize @note }

  def invite
    respond_to do |format|
      if @note.share(@user, params[:role])
        format.html { redirect_to @note, notice: 'Note was successfully shared.' }
        format.json { render :show, status: :created, location: @note }
      else
        format.html { render :edit }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  def revoke
    respond_to do |format|
      if @note.revoke(@user)
        format.html { redirect_to @note, notice: 'Note was successfully revoked.' }
        format.json { render :show, status: :created, location: @note }
      else
        format.html { render :edit }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def set_note
      @note = Note.find(params[:note_id])
    end

    def note_params
      params.permit(:user_id, :role)
    end
end
