class VotesController < ApplicationController
    
    def list
      puts "you called list"
      items = 40
      if !(params['items'].nil?)
        items = params['items'].to_i
      end
      rows = Array.new
      items.times do |i|
        score = "for"
        if (i % 2 == 0)
          score = "against"
        end
        rows.push({:id => i,:score => score})
      end
      render :json => {:rows=>rows,:success=>true}  
    end
end