class Pic
  attr_reader :link, :gender, :name

  def initialize link
    @link = link.split('/').last
    @gender = @link.split('_').first.to_sym
    @name = get_name
  end

  private
  def get_name
    to_split = @link.gsub(/\..*$/, "").split("_")
    to_split.slice(1...(to_split.size)).map { |e| e.capitalize }.join(" ")
  end

end

class Pics
  @@pics = nil

  def self.random
    if @@pics.nil?
      load_pics
    end
    @@pics.shuffle.first
  end

  def self.get params
    gender, quantity = params[:gender], params[:quantity]
    pics = []
    same_gender_pics = @@pics_by_gender[gender].dup
    quantity.times do 
      shuffled = same_gender_pics.shuffle
      pick = shuffled.shift
      pics.push(pick) if pick.link != params[:to_guess]
      same_gender_pics = shuffled
    end
    pics
  end

  private
  def self.load_pics
    @@pics, @@pics_by_gender = [], { :m => [],  :f => [] }
    Dir[File.join(settings.public_folder, "**.*")].each do |pic_link| 
      pic = Pic.new(pic_link)
      @@pics << pic
      @@pics_by_gender[:m] << pic if pic.link =~ /^m/
      @@pics_by_gender[:f] << pic if pic.link =~ /^f/
    end
  end

end

