require 'json'
require 'sinatra/activerecord'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/reloader'
require 'pry'

require './models/payment'

class PaymentApp < Sinatra::Base
  set :public_folder, 'dist'

  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    ids = Order.pluck(:id)
    erb :index, locals: { ids: ids}
  end

  get '/visual/:id' do
    puts params[:id]
    erb :visual
  end

  post 'upload' do
    data = File.read(params[:file][:tempfile])
    Payment.create! payload: data
  end

  get '/data/:id' do
    order = Order.find params[:id]
    json JSON.parse(order.payload)
  end
end
