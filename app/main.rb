require 'sinatra'
require 'sinatra/cookies'

require_relative 'lib/pics'
require_relative 'lib/scoreboard'

get '/' do
  erb :main
end

get '/quiz' do
  cookies[:to_exclude] ||= ""
  response.headers['correctnes'] = params[:correct] if !params[:correct].nil?

  @total = Pics.total
  @progress = cookies[:right].to_i
  return "<h1>Congrats! Game over!</h1>" if @progress >= @total #just in case...

  @to_guess = Pics.random(:to_exclude => to_array(cookies[:to_exclude]))
  @pics = (Pics.get(:gender => @to_guess.gender, :quantity => 3, :pick => @to_guess) << @to_guess).shuffle

  erb :quiz
end

post '/guess' do
  if params[:correct] == params[:guess] then
    cookies[:right] = add_to_string(1, cookies[:right])
    cookies[:to_exclude] = add_to_exclude_to_list(cookies[:to_exclude], params[:guess])
    redirect '/quiz?correct=y'
  end
  cookies[:wrong] = add_to_string(1, cookies[:wrong])
  redirect '/quiz?correct=n'
end

def add_to_exclude_to_list(list, id)
  return id.to_s if list == ""
  return "#{list},#{id}"
end

def add_to_string val, string
  return 0 if string == ""
  return (string.to_i + 1).to_s
end

def to_array string
  return [] if string == ""
  return string.split(",").map(&:to_i)
end

