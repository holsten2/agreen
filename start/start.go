package start

import (
	"io"
	SYS "syscall"

	log "github.com/cihub/seelog"
	"github.com/holsten2/agreen/rest"
	DEATH "github.com/vrecan/death"
)

// Run starts the webserver
func Run() {
	log.Info("Run")

	var goRoutines []io.Closer
	death := DEATH.NewDeath(SYS.SIGINT, SYS.SIGTERM) //pass the signals you want to end your application

	restService := rest.NewRestService()

	goRoutines = append(goRoutines, restService) // this will work as long as the type implements a Close method

	restService.Start()

	//when you want to block for shutdown signals
	death.WaitForDeath(goRoutines...) // this will finish when a signal of your type is sent to your application

}
