class VoteService < Appcelerator::Service
  Service 'get.votes2.request', :get_votes, 'get.votes2.response'
  def get_votes2
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
    {:rows=>rows,:success=>true}
  end
end

