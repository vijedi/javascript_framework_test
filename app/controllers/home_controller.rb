class HomeController < ApplicationController
    
    def prototypejs 
        if params[:debug]=="true"
          @framework_url = 'prototype-debug-1.6.0.3.js'
        else
          @framework_url = 'prototype-1.6.0.3.js'
        end
        @framework_name = 'prototypejs'
        render :action => 'test'
    end
    def mootools 
        if params[:debug]=="true"
          @framework_url = 'mootools-debug-1.2.1-core.js'
        else
          @framework_url = 'mootools-1.2.1-core.js'
        end
        @framework_name = 'mootools'
        render :action => 'test'
    end
    
    def jquery
        if params[:debug]=="true"
          @framework_url = 'jquery-debug-1.3.1.js'
        else
          @framework_url = 'jquery-1.3.1.js'
        end
        @framework_name = 'jquery'
        render :action => 'test'
    end
    
    def appcelerator 
        if params[:debug]=="true"
          @framework_url = 'appcelerator-debug.js'
        else
          @framework_url = 'appcelerator.js'
        end
        @framework_name = 'appcelerator'
        render :action => 'test'
    end
    
    def big_table
        
    end
    
    def presidential
        
    end
    
    def senate
        
    end
    
    def senate_appcelerator
        
    end
    
    def blank
        
    end
    def votes
      items = 40
      if !(params[:items].nil?)
        items = params[:items].to_i
      end
      rows = Array.new
      items.times do |i|
        score = "for"
        if (i % 2 == 0)
          score = "against"
        end
        rows.push({:id => i,:score => score})
      end
      @rows = rows
    end
end
