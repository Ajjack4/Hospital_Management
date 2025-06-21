package services

import (
	"errors"
	"hospital_app/internal/models"
	"hospital_app/internal/repository"
)

type PatientService struct {
	Repo *repository.PatientRepository
}

func NewPatientService(repo *repository.PatientRepository) *PatientService {
	return &PatientService{Repo: repo}
}

func (s *PatientService) Create(patient *models.Patient) error {
	return s.Repo.Create(patient)
}

func (s *PatientService) List() ([]models.Patient, error) {
	return s.Repo.List()
}

func (s *PatientService) Update(id string, data *models.Patient) (*models.Patient, error) {
	existing, err := s.Repo.GetByID(id)
	if err != nil {
		return nil, errors.New("patient not found")
	}

	existing.Name = data.Name
	existing.Email = data.Email
	existing.Phone = data.Phone
	existing.DateOfBirth = data.DateOfBirth
	existing.Gender = data.Gender
	existing.Address = data.Address
	existing.EmergencyContact = data.EmergencyContact
	existing.MedicalHistory = data.MedicalHistory

	if err := s.Repo.Update(existing); err != nil {
		return nil, err
	}

	return existing, nil
}

func (s *PatientService) Delete(id string) error {
	return s.Repo.Delete(id)
}
