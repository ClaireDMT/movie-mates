class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:app]

  def app
  end
end
