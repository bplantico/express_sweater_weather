require 'rails_helper'

describe "Munchies API" do
  it "sends a 3 open restaurants for a given location and travel time" do
    get '/api/v1/munchies?start=pueblo,co&end=denver,co&food=chinese'
    expect(response).to be_successful

    result = JSON.parse(response.body, symbolize_names: true)
    expect(result[:restaurants].count).to eq(3)
  end
end
