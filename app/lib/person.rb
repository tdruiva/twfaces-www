class Person
  attr_reader :gender, :name, :id, :link

  def initialize gender, name, id, link
    @gender, @name, @id, @link = gender.to_sym, name, id.to_i, link
  end

  def male?
    @gender == :m
  end

  def female?
    @gender == :f
  end

end

