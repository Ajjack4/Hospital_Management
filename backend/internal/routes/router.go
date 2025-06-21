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

	auth := router.Group("/api/auth")
	{
		auth.POST("/login", authHandler.Login)
		auth.GET("/me", middleware.AuthMiddleware(), authHandler.Me)
	}
}
