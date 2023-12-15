class PrivateController < ApplicationController

  def test
    render json: {
      message: "Welcome to Grape's " 
    }
  end

end