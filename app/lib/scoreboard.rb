require "redis"

class ScoreBoard
  class << self
    def record_guess(correct, guess)
      redis.hincrby correct, guess, 1
    end

    def redis
      @redis ||= Redis.new url: ENV['MYREDIS_URL']
    end

    def all_guesses(refresh = false)
      @cached_guesses = nil if refresh
      @cached_guesses ||= self.redis.keys.map(&:to_i).map { |peep| self.redis.hgetall(peep) }
    end

    def all_sorted
      all_guesses.sort { |g1, g2| self.ratio_for_guesses(g2) <=> self.ratio_for_guesses(g1) }
    end

    def top_easiest
      all_sorted.map { |g| self.simplify_guesses g }[0...20]
    end

    def top_hardest
      all_sorted.reverse.map { |g| self.simplify_guesses g }[0...20]
    end

    def save_backup
      json_content = ScoreBoard.all_guesses.to_s.gsub('=>', ': ')
      File.write "backup #{Time.now.utc}.json", json_content
    end

    def guesses_for(peep)
      self.explain_guesses self.redis.hgetall(peep)
    end

    def explain_guesses(guesses)
      guesses.reduce({}) do |memo, pair|
        peep = Crowd.find pair.first
        name = peep.nil? ? pair.first : peep.name
        memo[name] = pair.last
        memo
      end
    end

    def simplify_guesses(guesses)
      id = self.id_from_guesses guesses
      peep = Crowd.find id
      {
        name: peep.nil? ? id : peep.name,
        ratio: self.ratio_for_guesses(guesses)
      }
    end

    def ratio_for_guesses(guesses)
      corrects_for_guesses(guesses) / total_for_guesses(guesses).to_f
    end

    def total_for_guesses(guesses)
      guesses.values.map(&:to_i).reduce(:+) || 0
    end

    def corrects_for_guesses(guesses)
      guesses.values.map(&:to_i).max || 0
    end

    def errors_for_guesses(guesses)
      guesses.values.map(&:to_i).sort.reverse[1..-1].reduce(:+) || 0
    end

    def id_from_guesses(guesses)
      corrects = ScoreBoard.corrects_for_guesses(guesses)
      guesses.find { |pair| pair[1] == corrects.to_s }.first
    end
  end
end

