package rest

import (
	"net/http"
	"os"

	"github.com/GeertJohan/go.rice"
	log "github.com/cihub/seelog"
	"github.com/gorilla/mux"
)

// Service configures the rest endpoints
type Service struct {
	box *rice.Box
}

// NewRestService creates a new REST service object
func NewRestService() (s *Service) {
	box, err := rice.FindBox("build")
	if err != nil {
		log.Critical("Cannot find webserver build directory. Did you build the webserver (npm run gulp)?")
		return
	}
	return &Service{
		box: box,
	}
}

// Start starts the webserver
func (s *Service) Start() {
	go s.run()
}

func (s *Service) run() {
	log.Infof("Starting a new webserver on %d\n", 3000)
	r := mux.NewRouter()

	files := http.FileServer(s.box.HTTPBox())
	r.Methods("GET").Path("/").HandlerFunc(s.getHandler)

	r.PathPrefix("/").Handler(files)
	err := http.ListenAndServe(":3000", r)
	// err := SSL.ListenAndServeTLS(fmt.Sprintf(":%d", s.port), "server.crt", "server.key", r)
	if nil != err {
		log.Critical("Failed to listen on port ", 3000, " err: ", err)
		os.Exit(2)
	}
}

func (s *Service) getHandler(w http.ResponseWriter, r *http.Request) {
	contentString, err := s.box.Bytes("static/view/index.html")
	if err != nil {
		log.Error("Error loading file: ", err)
	}
	w.Write(contentString)
	return
}

// Close satisifies the closer interface to allow for runnable instance
func (s *Service) Close() error {
	log.Info("Closed")
	return nil
}
