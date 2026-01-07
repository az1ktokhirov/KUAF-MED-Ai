// Booking module

const BookingModule = {
    doctorId: null,
    doctor: null,
    
    init() {
        if (!Auth.requireAuth()) {
            return;
        }
        
        // Get doctor ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.doctorId = urlParams.get('doctor');
        
        if (this.doctorId) {
            this.loadDoctor();
        }
        
        this.setupForm();
    },
    
    async loadDoctor() {
        try {
            const doctors = await MockAPI.getDoctors();
            this.doctor = doctors.find(d => d.id === parseInt(this.doctorId));
            
            if (this.doctor) {
                this.displayDoctorInfo();
            }
        } catch (error) {
            Utils.showNotification(LanguageManager.t('doctorInfoNotLoaded'), 'error');
        }
    },
    
    displayDoctorInfo() {
        const container = document.getElementById('doctorInfo');
        if (!container || !this.doctor) return;
        
        let specialtyKey = this.doctor.specialty.toLowerCase().replace(/\s+/g, '');
        // Handle special cases
        if (specialtyKey === 'generalpractitioner') specialtyKey = 'generalPractitioner';
        const translatedSpecialty = LanguageManager.t(specialtyKey) || this.doctor.specialty;
        
        container.innerHTML = `
            <div class="doctor-card" style="max-width: 500px; margin: 0 auto;">
                <div class="doctor-name">${this.doctor.name}</div>
                <div class="doctor-specialty">${translatedSpecialty}</div>
                <div style="margin: 1rem 0; color: var(--text-light);">
                    <div>${LanguageManager.t('experience')}: ${this.doctor.experience}</div>
                    <div>${LanguageManager.t('price')}: ${this.doctor.price}</div>
                </div>
            </div>
        `;
    },
    
    setupForm() {
        const form = document.getElementById('bookingForm');
        if (!form) return;
        
        // Set min date to today
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
        
        // Auto-fill student name
        const studentNameInput = document.getElementById('studentName');
        if (studentNameInput) {
            studentNameInput.value = Auth.getName() || '';
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.submitBooking();
        });
    },
    
    async submitBooking() {
        const form = document.getElementById('bookingForm');
        if (!form) return;
        
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const complaint = document.getElementById('complaint').value;
        const studentName = document.getElementById('studentName').value;
        
        if (!date || !time || !complaint) {
            Utils.showNotification(LanguageManager.t('pleaseFillAllFields'), 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = LanguageManager.t('loading');
        
        try {
            const result = await MockAPI.createBooking(
                parseInt(this.doctorId),
                date,
                time,
                complaint,
                studentName
            );
            
            if (result.status === 'success') {
                Utils.showNotification(LanguageManager.t('bookingSuccess'), 'success');
                
                setTimeout(() => {
                    window.location.href = 'student.html';
                }, 2000);
            }
        } catch (error) {
            Utils.showNotification(LanguageManager.t('bookingError'), 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = LanguageManager.t('submit');
        }
    }
};

