package config

import (
	"hospital_app/internal/models"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func seedUser(email string, password string, role string, name string) {
	var user models.User
	err := DB.Where("email = ?", email).First(&user).Error
	if err == nil {
		log.Printf("ℹ️  User %s already exists, skipping seed.\n", email)
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	user = models.User{
		Name:     name,
		Email:    email,
		Password: string(hashed),
		Role:     role,
	}

	if err := DB.Create(&user).Error; err != nil {
		log.Printf("❌ Failed to seed user %s: %v\n", email, err)
		return
	}

	log.Printf("✅ Seeded user: %s [%s]", email, role)
}

func SeedUsers() {
	seedUser("receptionist@hospital.com", "password", "receptionist", "Serena Williams")
	seedUser("doctor@hospital.com", "password", "doctor", "John Doe")
}
