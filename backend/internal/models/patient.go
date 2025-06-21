package models

import "gorm.io/gorm"

type Patient struct {
	gorm.Model
	Name             string `json:"name"`
	Email            string `json:"email"`
	Phone            string `json:"phone"`
	DateOfBirth      string `json:"dateOfBirth"`
	Gender           string `json:"gender"`
	Address          string `json:"address"`
	EmergencyContact string `json:"emergencyContact"`
	MedicalHistory   string `json:"medicalHistory"`
}
