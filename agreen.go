package main

import (
	log "github.com/cihub/seelog"
	"github.com/holsten2/agreen/start"
)

//main is the main loop
func main() {
	defer log.Flush()
	logger, err := log.LoggerFromConfigAsFile("seelog.xml")

	if err != nil {
		log.Warn("Failed to load logger config ", err)
	} else {
		log.ReplaceLogger(logger)
	}

	start.Run()
}
