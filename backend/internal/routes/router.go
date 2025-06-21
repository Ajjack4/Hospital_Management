package routes

import (
	"hospital_app/config"
	"hospital_app/internal/handlers"
	middleware "hospital_app/internal/middlewares"
	"hospital_app/internal/repository"
	"hospital_app/internal/services"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	userRepo := repository.NewUserRepo(config.DB)
	authService := services.NewAuthService(userRepo)
	authHandler := handlers.NewAuthHandler(authService)
	patientRepository := repository.NewPatientRepository(config.DB)
	patientService := services.NewPatientService(patientRepository)
	patientHandler := handlers.NewPatientHandler(patientService)

	auth := router.Group("/api/auth")
	{
		auth.POST("/login", authHandler.Login)
		auth.GET("/me", middleware.AuthMiddleware(), authHandler.Me)
	}
	api := router.Group("/api/patients").Use(middleware.AuthMiddleware())
	{
		api.GET("/", patientHandler.List)
		api.POST("/", middleware.RequireRole("receptionist"), patientHandler.Create)
		api.PUT("/:id", middleware.RequireRole("receptionist"), patientHandler.Update)
		api.DELETE("/:id", middleware.RequireRole("receptionist"), patientHandler.Delete)
	}
}
