require 'sinatra'

require_relative 'lib/pics'


get '/' do
  @to_guess = Pics.random
  @pics = Pics.get(:to_guess => @to_guess.link, :gender => @to_guess.gender, :quantity => 3).collect { |e| e.link } 
  @pics << @to_guess.link
  erb :main
end
