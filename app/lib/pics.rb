class Pic
  attr_reader :gender, :name, :id, :link

  def initialize gender, name, id, link
    @gender, @name, @id, @link = gender, name, id, link
  end

end

class Pics
  @@pics = nil

  def self.total
    load_pics
    @@pics.size
  end

  def self.random params
    picks = @@pics.select { |e| e if !params[:to_exclude].include?(e.id) }
    picks.shuffle.first
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
    File.open(File.join(settings.root, "resources/peeps.csv")).each_line do |l|
      gender, name, id, link = l.split(",")
      pic = Pic.new(gender.to_sym, name, id, link)
      @@pics << pic
      @@pics_by_gender[:m] << pic if pic.gender == :m
      @@pics_by_gender[:f] << pic if pic.gender == :f
    end
  end

end

