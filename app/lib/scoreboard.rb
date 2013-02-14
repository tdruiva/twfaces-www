require "redis"

class ScoreBoard
  def self.record_guess(correct, guess)
    redis.hincrby correct, guess, 1
  end

  def self.redis
    @redis ||= Redis.new url: ENV['MYREDIS_URL']
  end
end

