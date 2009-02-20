class HomeController < ApplicationController
    
    def prototypejs 
        @framework_url = 'prototype-1.6.0.3.js'
        @framework_name = 'prototypejs'
        render :action => 'test'
    end
    def mootools 
        @framework_url = 'mootools-1.2.1-core.js'
        @framework_name = 'mootools'
        render :action => 'test'
    end
    
    def jquery 
        @framework_url = 'jquery-1.3.1.js'
        @framework_name = 'jquery'
        render :action => 'test'
    end
    
    def appcelerator 
        @framework_url = 'appcelerator-debug.js'
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
end
