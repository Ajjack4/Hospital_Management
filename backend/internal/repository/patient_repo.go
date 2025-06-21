package repository

import (
	"hospital_app/internal/models"

	"gorm.io/gorm"
)

type PatientRepository struct {
	DB *gorm.DB
}

func NewPatientRepository(db *gorm.DB) *PatientRepository {
	return &PatientRepository{DB: db}
}

func (r *PatientRepository) Create(patient *models.Patient) error {
	return r.DB.Create(patient).Error
}

func (r *PatientRepository) List() ([]models.Patient, error) {
	var patients []models.Patient
	err := r.DB.Find(&patients).Error
	return patients, err
}

func (r *PatientRepository) GetByID(id string) (*models.Patient, error) {
	var patient models.Patient
	err := r.DB.First(&patient, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &patient, nil
}

func (r *PatientRepository) Update(patient *models.Patient) error {
	return r.DB.Save(patient).Error
}

func (r *PatientRepository) Delete(id string) error {
	return r.DB.Delete(&models.Patient{}, "id = ?", id).Error
}
