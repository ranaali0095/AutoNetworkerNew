const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;

const path = require('path');
const url = require('url');
const BrowserWindow = electron.BrowserWindow;
const settings = require('electron-settings');
var mainWindow;

// const iconPath = path.join(__dirname, 'icon.png');
var iconPath;
var appIcon = null;
const AutoLaunch = require('auto-launch');
const windowStateKeeper = require('electron-window-state');

const ipc = electron.ipcMain;
const autoUpdater = require("electron-updater").autoUpdater;
// const log = require("electron-log");

// this should be placed at top of main.js to handle setup events quickly
if ( handleSquirrelEvent(app) ) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}
const ElectronSampleAppLauncher = new AutoLaunch({
	name: 'auto-networker'
});

if ( process.platform == 'darwin' ) {
	iconPath = path.join(__dirname , '/pages/assets/ico/app-icon.png');
} else { // fallback , if (process.platform == 'win32')
	iconPath = path.join(__dirname , '/pages/assets/ico/app-icon.ico');
}

var shouldQuit = app.makeSingleInstance(
	function( commandLine , workingDirectory ) {
		// Someone tried to run a second instance, we should focus our window.
		if ( mainWindow ) {
			if ( mainWindow.isMinimized() ) mainWindow.restore();
			mainWindow.focus();
		}
	});

if ( shouldQuit ) {
	app.quit();
	return;
}

const toggleWin = function( winInfo ) {
	if ( process.platform === 'win32' ) {
		if ( winInfo.isMinimized() ) {
			winInfo.restore();
		} else if ( winInfo.isVisible() ) {
			winInfo.hide();
		} else {
			winInfo.show();
		}
	} else {
		winInfo.isVisible() ? winInfo.hide() : winInfo.show();
	}
};

function createWin () {
	// mainWindow = new BrowserWindow({ width: 1024, height: 768, backgroundColor: '#2e2c29', icon: __dirname + '/pages/assets/ico/app-icon.png' });
	let mainWindowState = windowStateKeeper({
		defaultWidth: 1024 ,
		defaultHeight: 786 ,
		maximize: true ,
		fullScreen: true
	});

	mainWindow = new BrowserWindow({
		tabbingIdentifier: 'main' ,
		title: 'AutoNetworker(0.0.1)' ,
		icon: iconPath ,
		'x': mainWindowState.x ,
		'y': mainWindowState.y ,
		backgroundColor: '#2e2c29' ,
		'width': mainWindowState.width ,
		show: false ,
		'height': mainWindowState.height ,
		minWidth: 756 ,
		minHeight: 800
	});
	// mainWindow = new BrowserWindow({ width: 1024, height: 768, backgroundColor: '#2e2c29', icon: __dirname + '/pages/assets/ico/app-icon.png' });
	// mainWindow = new BrowserWindow({ width: 1024, height: 768, backgroundColor: '#2e2c29', icon: iconPath });

	mainWindowState.manage(mainWindow);
	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname , 'pages/index.html') ,
		protocol: 'file:' ,
		slashes: true
	}));

	mainWindow.once('ready-to-show' , () => {
		mainWindow.show();
	});

	if(settings.get('autoLaunch')){
		ElectronSampleAppLauncher.enable();
		console.log('enable auto launch')
	}else{
		ElectronSampleAppLauncher.disable();
		console.log('disable auto launch')
	}

	ElectronSampleAppLauncher.isEnabled().then(function( isEnabled ) {
		if ( isEnabled ) {
			return;
		}
		ElectronSampleAppLauncher.enable();
	}).catch(function( err ) {
		// handle error
	});

	appIcon = new Tray(iconPath);
	mainWindow.on('minimize' , function( event ) {
		event.preventDefault();
		mainWindow.hide();
	});
	mainWindow.on('close' , function( event ) {
		if ( !app.isQuiting ) {
			event.preventDefault();
			mainWindow.hide();
		}
		return false;
	});
	var contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show/Hide Window' ,
			accelerator: 'Alt+Command+I' ,
			click: function() {
				if ( mainWindow.isVisible() ) {
					mainWindow.hide();
				} else {
					mainWindow.show();
				}
			}
		} ,
		{
			label: 'Quit' ,
			accelerator: 'Command+Q' ,
			selector: 'terminate:' ,
			click: function() {
				app.isQuiting = true;
				app.quit();
			}
		}
	]);
	appIcon.setToolTip('Auto Networker(0.0.1)');
	appIcon.setContextMenu(contextMenu);
	appIcon.on('click' , function handleClicked () {
		toggleWin(mainWindow);
	});
	// mainWindow.openDevTools();
}

app.on('ready' , function() {
	createWin();
});
app.on('activate' , function() {
	if ( mainWindow === null ) {
		createWin();
	}
});

/**
 * Initialise autoUpdate
 */
var statue_autoUpdating = false;

autoUpdater.on('update-available' , function() {
	if ( statue_autoUpdating == true ) {

		var str = '<div class ="Notification" style = "border:1px solid black; padding: 5px; display: block;">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td>' +
			'Do you update new version ..?' +
			'</td>' +
			'<td>' +
			'<div>' +
			'ok' +
			'</div>' +
			'</td>' +
			'<td>' +
			'<div onclick = "$("#Notification-container .Notification").remove();">' +
			'cancel' +
			'</div>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>';
		mainWindow.webContents.executeJavaScript('              \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") +
			'\');');
	}
});

autoUpdater.on('update-not-available' , function() {
	if ( statue_autoUpdating == true ) {
		var str = '<div class ="Notification" onclick = "this.remove();" style = "border:1px solid black; padding: 5px; display: block;">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td>' +
			'New version doesn\'t exist.' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>';
		mainWindow.webContents.executeJavaScript('              \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") + '\');  \
      setTimeout(function(){$("#Notification-container .Notification").remove();}, 3000);');
		statue_autoUpdating = false;
	}
});
autoUpdater.on('error' , function() {
	if ( statue_autoUpdating == true ) {
		var str = '<div class ="Notification" onclick = "this.remove();" style = "border:1px solid black; padding: 5px; display: block;">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td>' +
			'Error in autoUpdating.' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>';
		mainWindow.webContents.executeJavaScript('              \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") + '\');  \
      setTimeout(function(){$("#Notification-container .Notification").remove();}, 3000);');
		statue_autoUpdating = false;
	}
});
autoUpdater.on('download-progress' , function() {
	if ( statue_autoUpdating == true ) {
		var str = '<div class ="Notification" style = "border:1px solid black; padding: 5px; display: block;">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td>' +
			'Download progress...' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>';
		mainWindow.webContents.executeJavaScript('              \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") +
			'\');');
	}
});
autoUpdater.on('update-downloaded' , function() {
	if ( statue_autoUpdating == true ) {
		var str = '<div class ="Notification" style = "border:1px solid black; padding: 5px; display: block;">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td>' +
			'Update downloaded; will install in 5 seconds' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>';
		mainWindow.webContents.executeJavaScript('              \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") +
			'\');');
		setTimeout(function() {
			autoUpdater.quitAndInstall();
		} , 5000);
	}
});
/**
 *Start autoUpdate
 */
ipc.on('start-autoUpdate' , function( event ) {
	// autoUpdater.setFeedURL('http://localhost/updates/');
	autoUpdater.setFeedURL('http://updates.autonetworker.com/updates/');
	console.log("ipc send working");
	autoUpdater.checkForUpdates();
	statue_autoUpdating = true;

	// log.info('mainWindow');

	var str = '<div class ="Notification" style = "border:1px solid black; padding: 5px; display: block;z-index: 20;height: 40px;">' +
		'<table>' +
		'<tbody>' +
		'<tr>' +
		'<td>' +
		'Checking for new version.........' +
		'</td>' +
		'</tr>' +
		'</tbody>' +
		'</table>' +
		'</div>';
	mainWindow.webContents.executeJavaScript(' \
      $("#Notification-container .Notification").remove();  \
      $("#Notification-container").append(\'' + str.replace(/'/g , "\\'") +
		'\');console.log($("#Notification-container .Notification"));');
});

/* --autoUpdate*/

function handleSquirrelEvent ( application ) {
	if ( process.argv.length === 1 ) {
		return false;
	}
	const ChildProcess = require('child_process');
	const path = require('path');

	const appFolder = path.resolve(process.execPath , '..');
	const rootAtomFolder = path.resolve(appFolder , '..');
	const updateDotExe = path.resolve(path.join(rootAtomFolder , 'Update.exe'));
	const exeName = path.basename(process.execPath);

	const spawn = function( command , args ) {
		let spawnedProcess , error;

		try {
			spawnedProcess = ChildProcess.spawn(command , args , {
				detached: true
			});
		} catch ( error ) {}

		return spawnedProcess;
	};

	const spawnUpdate = function( args ) {
		return spawn(updateDotExe , args);
	};

	const squirrelEvent = process.argv[ 1 ];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
			// Optionally do things such as:
			// - Add your .exe to the PATH
			// - Write to the registry for things like file associations and
			//   explorer context menus

			// Install desktop and start menu shortcuts
			spawnUpdate([ '--createShortcut' , exeName ]);

			setTimeout(application.quit , 1000);
			return true;

		case '--squirrel-uninstall':
			// Undo anything you did in the --squirrel-install and
			// --squirrel-updated handlers

			// Remove desktop and start menu shortcuts
			spawnUpdate([ '--removeShortcut' , exeName ]);

			setTimeout(application.quit , 1000);
			return true;

		case '--squirrel-obsolete':
			// This is called on the outgoing version of your app before
			// we update to the new version - it's the opposite of
			// --squirrel-updated

			application.quit();
			return true;
	}
};
