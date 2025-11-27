package system

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/shirou/gopsutil/v4/mem"
	wemit "github.com/wailsapp/wails/v2/pkg/runtime"
)

// CPUStats holds CPU usage statistics.
type CPUStats struct {
	User    uint64
	Nice    uint64
	System  uint64
	Idle    uint64
	Iowait  uint64
	Irq     uint64
	Softirq uint64
	Steal   uint64
}

// SystemMonitor manages CPU usage tracking and display.
type SystemMonitor struct {
	CPUHistory    []float64
	LastCPUUpdate time.Time
	LastCPUStats  *CPUStats
	RAMUsage      float64
	LastRAMUpdate time.Time
}

// NewSystemMonitor creates a new system monitor.
func NewSystemMonitor() *SystemMonitor {
	return &SystemMonitor{
		CPUHistory:    make([]float64, 0, 10),
		LastCPUUpdate: time.Now(),
		LastRAMUpdate: time.Now(),
		RAMUsage:      0,
	}
}

// GetCPUUsage returns the current CPU usage as a percentage.
func (c *SystemMonitor) GetCPUUsage() float64 {
	usage, err := c.readCPUUsage()
	if err != nil {
		return 0
	}
	return usage
}

// UpdateCPUHistory updates the CPU usage history.
func (c *SystemMonitor) UpdateCPUHistory() {
	now := time.Now()
	// Update every 500ms
	if now.Sub(c.LastCPUUpdate) < 500*time.Millisecond {
		return
	}

	c.LastCPUUpdate = now
	usage := c.GetCPUUsage()

	// Keep last 10 samples for a compact graph
	if len(c.CPUHistory) >= 10 {
		c.CPUHistory = c.CPUHistory[1:]
	}
	c.CPUHistory = append(c.CPUHistory, usage)
}

// GetCPUGraph returns a string representing the CPU usage graph.
func (c *SystemMonitor) GetCPUGraph(ctx context.Context) string {
	// Always return a fixed-width string to prevent layout shifts

	// Get current usage
	current := 0.0
	if len(c.CPUHistory) > 0 {
		current = c.CPUHistory[len(c.CPUHistory)-1]
	}

	// Create a mini bar graph - always exactly 10 characters
	graph := ""

	// If we have less than 10 samples, pad with spaces on the left
	startPadding := 10 - len(c.CPUHistory)
	if startPadding > 0 {
		graph = strings.Repeat(" ", startPadding)
	}

	// Add the actual graph bars
	for i, usage := range c.CPUHistory {
		if i >= 10 { // Limit to 10 bars
			break
		}
		// Convert to 0-8 scale for vertical bars
		height := min(
			// 100/8 = 12.5
			int(usage/12.5), 8)

		// Use block characters for the graph
		switch height {
		case 0:
			graph += "▁"
		case 1:
			graph += "▂"
		case 2:
			graph += "▃"
		case 3:
			graph += "▄"
		case 4:
			graph += "▅"
		case 5:
			graph += "▆"
		case 6:
			graph += "▇"
		case 7, 8:
			graph += "█"
		}
	}
	wemit.EventsEmit(ctx, "cpuMonitor", fmt.Sprintf("CPU:%s %3.0f%%", graph, current))
	// Fixed width format: "CPU:" (4) + graph (10) + " " (1) + percentage (4) = 19 chars total
	return fmt.Sprintf("CPU:%s %3.0f%%", graph, current)
}

// Start begins monitoring CPU usage in the background.
func (c *SystemMonitor) Start(ctx context.Context) {
	go c.monitorLoop(ctx)
}

// monitorLoop continuously monitors CPU usage.
func (c *SystemMonitor) monitorLoop(ctx context.Context) {
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		c.UpdateCPUHistory()
		c.UpdateRAMUsage(ctx)

		c.GetCPUGraph(ctx)
	}
}

// UpdateRAMUsage updates the cached RAM usage.
func (c *SystemMonitor) UpdateRAMUsage(ctx context.Context) {
	now := time.Now()
	// Update every 2 seconds (RAM changes slowly)
	if now.Sub(c.LastRAMUpdate) < 2*time.Second {
		return
	}

	c.LastRAMUpdate = now
	v, err := mem.VirtualMemory()
	if err != nil {
		c.RAMUsage = 0
		return
	}
	c.RAMUsage = v.UsedPercent

	wemit.EventsEmit(ctx, "ramMonitor", fmt.Sprintf("RAM: %3.0f%%", c.RAMUsage))
}

// readCPUUsage is a platform-specific method to read CPU usage.
// It is implemented in platform files (sysinfo_linux.go, sysinfo_darwin.go, etc.)
