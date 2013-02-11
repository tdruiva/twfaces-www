require 'sinatra'
require 'sinatra/cookies'

require_relative 'lib/pics'


get '/' do
  @pics = Pics.get(:gender => [:m, :f].shuffle.first, :quantity => 4)
  @to_guess = @pics.shuffle.first
  @total = Pics.total
  @progress = cookies[:right].to_i + cookies[:wrong].to_i
  erb :main
end

post '/guess' do
  puts params.inspect
  if params["correct"] == params["guess"] then
    cookies[:right] = add_to_string(1, cookies[:right])
  else
    cookies[:wrong] = add_to_string(1, cookies[:wrong])
  end

  redirect '/'
end


def add_to_string val, string
  return 0 if string.nil?
  return (string.to_i + 1).to_s
end
