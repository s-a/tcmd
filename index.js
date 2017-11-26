#!/usr/bin/env node

'use strict'

var path = require('path')
var Registry = require('winreg')
var args = process.argv.slice(2)
var regKey = new Registry({ // new operator is optional 
	hive: Registry.HKCU, // open registry hive HKEY_CURRENT_USER 
	key: '\\Software\\Ghisler\\Total Commander\\' // key containing autostart programs 
})

regKey.values(function (err, items /* array of RegistryItem */ ) {
	if (err) {
		console.log('ERROR: ' + err)
		process.exit(1)
	} else {
		for (var i = 0; i < items.length; i++) {
			if (items[i].name.toLowerCase() === 'installdir') {
				var tc = path.join(items[i].value, 'TOTALCMD64.EXE')
				var dir = (args[0] || process.cwd()).replace(/\\/g, '/')
				var parms = ['"c:\\app"']
				var child_process = require('child_process')
				child_process.exec(tc + ' /T /R="' + dir + '"')
			}
		}
	}
});