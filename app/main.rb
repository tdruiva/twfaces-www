require 'sinatra'
require 'sinatra/cookies'

require_relative 'lib/crowd'
require_relative 'lib/scoreboard'

get '/' do
  if params[:restart] == "now" then
    clean_cookies(cookies)
    redirect '/'
  end
  erb :main
end

def clean_cookies cookies
  cookies[:right] = "0"
  cookies[:wrong] = "0"
  cookies[:to_exclude] = ""
end

get '/quiz' do
  cookies[:to_exclude] ||= ""
  response.headers['correctnes'] = 'y'

  @total = Crowd.total
  @progress = cookies[:right].to_i
  return erb :game_over if @progress >= @total #just in case...

  @to_guess = Crowd.random(:to_exclude => to_array(cookies[:to_exclude]))
  @pics = (Crowd.get(:gender => @to_guess.gender, :quantity => 3, :pick => @to_guess) << @to_guess).shuffle

  erb :quiz
end

post '/guess' do
  hex = params[:hex]
  guess = params[:guess]

  personToGuess = Crowd.everyone.find { |p| p.tampered_id == hex }

  if personToGuess.id.to_s == guess.to_s then
    cookies[:right] = add_to_string(1, cookies[:right])
    cookies[:to_exclude] = add_to_exclude_to_list(cookies[:to_exclude], guess)
    redirect '/quiz'
  end

  ScoreBoard.record_guess personToGuess.id, guess
  cookies[:wrong] = add_to_string(1, cookies[:wrong])
  response.headers['correctnes'] = 'n'
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

