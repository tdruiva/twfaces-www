class Pic
  @@id = 0
  attr_reader :link, :gender, :name, :id

  def initialize link
    @link = link.split('/').last
    @gender = @link.split('_').first.to_sym
    @name = get_name
    @id = @@id
    @@id += 1
  end

  private
  def get_name
    to_split = @link.gsub(/\..*$/, "").split("_")
    to_split.slice(1...(to_split.size)).map { |e| e.capitalize }.join(" ")
  end

end

class Pics
  @@pics = nil

  def self.total
    load_pics
    @@pics.size
  end

  def self.random params
    picks = @@pics.collect { |e| e if !params[:to_exclude].include?(e.id) }
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
    return if !@@pics.nil?
    @@pics, @@pics_by_gender = [], { :m => [],  :f => [] }
    Dir[File.join(settings.public_folder, "pics/**.*")].each do |pic_link| 
      pic = Pic.new(pic_link)
      @@pics << pic
      @@pics_by_gender[:m] << pic if pic.link =~ /^m/
      @@pics_by_gender[:f] << pic if pic.link =~ /^f/
    end
  end

end

