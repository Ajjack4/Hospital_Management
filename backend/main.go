package main

import (
	"fmt"
	"log"
	"os"

	"hospital_app/config"
	"hospital_app/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	router := gin.Default()
	routes.SetupRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on http://localhost:%s", port)
	err := router.Run(fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
