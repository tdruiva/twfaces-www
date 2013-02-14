require 'csv'

class Pic
  attr_reader :gender, :name, :id, :link

  def initialize gender, name, id, link
    @gender, @name, @id, @link = gender.to_sym, name, id, link
  end

  def male?
    @gender == :m
  end

  def female?
    @gender == :f
  end

end

class Pics
  @@pics = nil

  def self.total
    load_pics
    @@pics.size
  end

  def self.random params
    @@pics.select { |e| e if !params[:to_exclude].include?(e.id) }.sample
  end

  def self.get params
    gender, quantity = params[:gender], params[:quantity]
    pics = []
    same_gender_pics = @@pics_by_gender[gender].dup
    same_gender_pics.delete_if { |e| e.id == params[:pick].id }
    quantity.times do 
      shuffled = same_gender_pics.shuffle
      pick = shuffled.shift
      pics.push(pick)
      same_gender_pics = shuffled
    end
    pics
  end

  private
  def self.load_pics
    @@pics, @@pics_by_gender = [], { :m => [],  :f => [] }
    CSV.foreach(File.join(settings.root, "resources/peeps.csv")) do |row|
      pic = Pic.new(*row)
      @@pics << pic
      @@pics_by_gender[:m] << pic if pic.male?
      @@pics_by_gender[:f] << pic if pic.female?
    end
  end

end

