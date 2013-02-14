require 'digest'
class Person
  attr_reader :gender, :name, :id, :link, :tampered_id

  def initialize gender, name, id, link
    @gender, @name, @id, @link = gender.to_sym, name, id.to_i, link
    @tampered_id = sha512.hexdigest(id.to_s + 'here is the salt')
  end

  def sha512
    @sha512 ||= Digest::SHA512.new
  end

end

