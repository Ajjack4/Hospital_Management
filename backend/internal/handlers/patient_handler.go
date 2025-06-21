package handlers

import (
	"hospital_app/internal/models"
	"hospital_app/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PatientHandler struct {
	Service *services.PatientService
}

func NewPatientHandler(service *services.PatientService) *PatientHandler {
	return &PatientHandler{Service: service}
}

func (h *PatientHandler) Create(c *gin.Context) {
	var patient models.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := h.Service.Create(&patient); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create patient"})
		return
	}

	c.JSON(http.StatusCreated, patient)
}

func (h *PatientHandler) List(c *gin.Context) {
	patients, err := h.Service.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch patients"})
		return
	}

	c.JSON(http.StatusOK, patients)
}

func (h *PatientHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var data models.Patient
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	updated, err := h.Service.Update(id, &data)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update patient"})
		return
	}

	c.JSON(http.StatusOK, updated)
}

func (h *PatientHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.Service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete patient"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Patient deleted successfully"})
}
