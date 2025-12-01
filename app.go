package main

import (
	"context"
	"fmt"
	"net/http"
	"nexatron/internal/system"
	"time"

	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/options"
	wemit "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	cpMonitor := system.NewSystemMonitor()
	cpMonitor.Start(ctx)

	time.Sleep(10 * time.Second)
	wemit.EventsEmit(a.ctx, "openPanel", map[string]string{
		"id":   "filetree",
		"dock": "float",
	})
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) applicationMenu() *menu.Menu {
	// Dom is ready

	return menu.NewMenu()
}

func (a *App) domready(ctx context.Context) {
	// Dom is ready
}

func (a *App) shutdown(ctx context.Context) {
	// Perform any cleanup here
}

func (a *App) beforeClose(ctx context.Context) bool {
	// Return true to proceed with the close
	return true
}

func assetsHandler() http.Handler {
	// Custom asset handler logic can be added here
	return http.FileServer(http.FS(assets))
}
func assetsMidldeware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Custom middleware logic can be added here
		next.ServeHTTP(w, r)
	})
}

func (a *App) onSecondInstanceLaunch(secondInstanceData options.SecondInstanceData) {

}
