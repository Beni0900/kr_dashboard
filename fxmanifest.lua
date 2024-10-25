fx_version 'cerulean'
game 'gta5'

description "Login system"
author "Beni"
version "1.0.0"

lua54 'yes'
use_experimental_fxv2_oal 'yes'

shared_scripts {
	'@ox_lib/init.lua',
	'@es_extended/imports.lua',
	'config.lua'
}

client_scripts {
	'client/*.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'server/db.lua',
	'server/server.lua',
	'server/functions.lua'
}

ui_page {'web/dist/index.html'}

files {
	'web/dist/*.*',
	'web/dist/assets/*.*'
}