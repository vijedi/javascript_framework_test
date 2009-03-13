# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

def compress_file(from,to,only_if_newer=false,rubycompress=false,skip_compress=false)
  if only_if_newer && File.exists?(to) && older?(from,to)
    p "skipping compression of #{from}"
    return
  end
  require 'tempfile'
  require 'tmpdir'
  jsdebug = from
  jstmp = jsdebug+".tmp"
  js = to
  
  puts "Compressing #{jsdebug}"
  call_command("java -jar compress/yuicompressor-2.2.5.jar #{jsdebug} -o #{jstmp} --charset UTF-8")
  if rubycompress
    call_command("ruby compress/compress.rb #{jstmp} #{js}")
  else
    FileUtils.cp jstmp, js
  end
  FileUtils.rm "#{jstmp}"
    
end
task :compress do
  Dir["public/javascripts/*-debug*.js"].each do |file|
    to = file.gsub('-debug', '')
    compress_file("#{file}",to)
  end
end
task :appc221 do
  moveappc("2.2.1")
end
task :appcptek do 
  moveappc("ptek")
end
def moveappc(name)
  FileUtils.rm_rf "public/javascripts/appcelerator-debug.js"
  FileUtils.rm_rf "public/javascripts/appcelerator.js"
  FileUtils.rm_rf "public/widgets/app_content"
  FileUtils.rm_rf "public/widgets/app_script"
  FileUtils.rm_rf "public/widgets/app_iterator"
  FileUtils.cp_r("public/javascripts/appcelerator-debug-#{name}.js", "public/javascripts/appcelerator-debug.js")
  FileUtils.cp_r("public/javascripts/appcelerator-#{name}.js", "public/javascripts/appcelerator.js")
  FileUtils.cp_r("public/widgets/app_content_#{name}", "public/widgets/app_content")
  FileUtils.cp_r("public/widgets/app_script_#{name}", "public/widgets/app_script")
  FileUtils.cp_r("public/widgets/app_iterator_#{name}", "public/widgets/app_iterator")
end  
def is_win32
  RUBY_PLATFORM =~/win32/
end
def is_unix
  !is_win32
end
def to_path(file)
  if is_win32
    file.gsub(/\//,'\\')
  else
    file
  end
end
def call_command(cmd)
  if is_win32
    cmd= "cmd.exe /c #{cmd}"
  end
  call = IO.popen(cmd)
  yield(call.readlines) if block_given?
  call.close
end
task :copyentourage do 
  FileUtils.cp_r("public/entourage-ui","public/appcelerator-2.3")
  FileUtils.cp_r("public/javascripts/entourage-debug.js","public/appcelerator-2.3/javascripts")
  FileUtils.cp_r("public/javascripts/entourage.js","public/appcelerator-2.3/javascripts")
end

