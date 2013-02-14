require 'csv'
require_relative 'person'

class Crowd
  @@people = nil

  def self.total
    load_data
    @@people.size
  end

  def self.random params
    picks = @@people.select { |e| e if !params[:to_exclude].include?(e.id) }
    picks.shuffle.first
  end

  def self.get params
    gender, quantity = params[:gender], params[:quantity]
    picks = []
    same_gender_picks = @@people_by_gender[gender].dup
    same_gender_picks.delete_if { |e| e.id == params[:pick].id }
    quantity.times do 
      shuffled = same_gender_picks.shuffle
      pick = shuffled.shift
      picks.push(pick)
      same_gender_picks = shuffled
    end
    picks
  end

  private
  def self.load_data
    @@people, @@people_by_gender = [], { :m => [],  :f => [] }
    CSV.foreach(File.join(settings.root, "resources/peeps.csv")) do |row|
      person = Person.new(*row)
      @@people << person
      @@people_by_gender[:m] << person if person.male?
      @@people_by_gender[:f] << person if person.female?
    end
  end

end

