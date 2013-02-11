require 'sinatra'

require_relative 'lib/pics'


get '/' do
  @pics = Pics.get(:gender => [:m, :f].shuffle.first, :quantity => 4)
  @to_guess = @pics.shuffle.first
  erb :main
end

post '/guess' do
  redirect_to '/'
end
