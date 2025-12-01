package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "NeoTron Editor",
		Width:            800,
		Height:           600,
		DisableResize:    false,
		Fullscreen:       false,
		WindowStartState: options.Maximised,
		// Frameless:        false,
		MinWidth:          400,
		MinHeight:         400,
		StartHidden:       false,
		HideWindowOnClose: false,
		// Fully transparent so macOS vibrancy + CSS can show through
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		AlwaysOnTop:      false,
		AssetServer: &assetserver.Options{
			Assets:     assets,
			Handler:    assetsHandler(),
			Middleware: assetsMidldeware,
		},
		Menu:                             app.applicationMenu(),
		Logger:                           nil,
		LogLevel:                         logger.DEBUG,
		LogLevelProduction:               logger.ERROR,
		OnStartup:                        app.startup,
		OnDomReady:                       app.domready,
		OnShutdown:                       app.shutdown,
		OnBeforeClose:                    app.beforeClose,
		CSSDragProperty:                  "--wails-draggable",
		CSSDragValue:                     "drag",
		EnableDefaultContextMenu:         false,
		EnableFraudulentWebsiteDetection: false,
		Bind: []interface{}{
			app,
		},
		EnumBind: []interface{}{
			// Enums can be added here,
		},
		ErrorFormatter: func(err error) any { return err.Error() },
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId:               "c9c8fd93-6758-4144-87d1-34bdb0a8bd60",
			OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     false,
			DisableWebViewDrop: false,
			CSSDropProperty:    "--wails-drop-target",
			CSSDropValue:       "drop",
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              true,
			WindowIsTranslucent:               true,
			ContentProtection:                 false,
			BackdropType:                      windows.Mica,
			DisablePinchZoom:                  false,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			WebviewBrowserPath:                "",
			Theme:                             windows.SystemDefault,
			CustomTheme: &windows.ThemeSettings{
				DarkModeTitleBar:   windows.RGB(20, 20, 20),
				DarkModeTitleText:  windows.RGB(200, 200, 200),
				DarkModeBorder:     windows.RGB(20, 0, 20),
				LightModeTitleBar:  windows.RGB(200, 200, 200),
				LightModeTitleText: windows.RGB(20, 20, 20),
				LightModeBorder:    windows.RGB(200, 200, 200),
			},
			// ZoomFactor is the zoom factor for the WebView2. This is the option matching the Edge user activated zoom in or out.
			ZoomFactor: float64(1.0),
			// IsZoomControlEnabled enables the zoom factor to be changed by the user.
			IsZoomControlEnabled: true,
			// User messages that can be customised
			Messages: &windows.Messages{},
			// OnSuspend is called when Windows enters low power mode
			OnSuspend: func() {},
			// OnResume is called when Windows resumes from low power mode
			OnResume: func() {},

			// Class name for the window. If empty, 'wailsWindow' will be used.
			WindowClassName: "MyWindow",
		},
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            true,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameAccessibilityHighContrastVibrantDark,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			ContentProtection:    false,
			About: &mac.AboutInfo{
				Title:   "My Application",
				Message: "© 2021 Me",
				// Icon:    icon,
			},
		},
		Linux: &linux.Options{
			// Icon:                icon,
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "wails",
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
		BindingsAllowedOrigins: "https://*.wails.isgreat",
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
