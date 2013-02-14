require 'digest'
class Person
  attr_reader :gender, :name, :id, :link, :tampered_id
  @@sha512 = Digest::SHA512.new
  @@salt = @@sha512.hexdigest 'here is the salt'

  def initialize gender, name, id, link
    @gender, @name, @id, @link = gender.to_sym, name, id.to_i, link
    @tampered_id = @@sha512.hexdigest(id.to_s + @@salt)
  end

  def male?
    @gender == :m
  end

  def female?
    @gender == :f
  end

end

