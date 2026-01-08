// Student module

const StudentModule = {
    selectedSymptoms: [],
    
    // Fixed list of 10 symptoms (displayed via i18n)
    symptoms: [
        "Bosh og'rig'i",
        'Surunkali charchoq',
        'Uyqusizlik',
        "Ko'ngil aynishi",
        "Yo‘tal",
        'Bosh aylanishi',
        'Yurak tez urishi',
        'Nafas qisishi',
        'Teri toshmasi va qichishish',
        'Bezovtalik va asabiylashish'
    ],
    
    init() {
        try {
            // Check dependencies
            if (typeof Auth === 'undefined') {
                console.error('Auth module not loaded');
                return;
            }
            
            if (!Auth.requireAuth() || Auth.getRole() !== 'student') {
                return;
            }
            
            // Always render symptoms first (critical functionality)
            this.renderSymptoms();
            
            // Load history and setup listeners (non-critical)
            try {
                this.loadHistory();
            } catch (err) {
                console.error('Error loading history:', err);
            }
            
            try {
                this.setupEventListeners();
            } catch (err) {
                console.error('Error setting up event listeners:', err);
            }
        } catch (error) {
            console.error('Error initializing StudentModule:', error);
            // Still try to render symptoms even if other parts fail
            try {
                this.renderSymptoms();
            } catch (renderError) {
                console.error('Critical error: Cannot render symptoms', renderError);
            }
        }
    },
    
    renderSymptoms() {
        const container = document.getElementById('symptomsContainer');
        if (!container) {
            console.error('Symptoms container not found');
            return;
        }
        
        // Ensure symptoms array is locked and always has 10 items
        if (!this.symptoms || this.symptoms.length !== 10) {
            console.error('Symptoms array is invalid. Expected 10 symptoms.');
            // Restore the locked list if corrupted
            this.symptoms = [
                "Bosh og'rig'i",
                'Surunkali charchoq',
                'Uyqusizlik',
                "Ko'ngil aynishi",
                "Yo'tal",
                'Bosh aylanishi',
                'Yurak tez urishi',
                'Nafas qisishi',
                'Teri toshmasi va qichishish',
                'Bezovtalik va asabiylashish'
            ];
        }
        
        try {
            container.innerHTML = '';
            
            this.symptoms.forEach(symptom => {
                try {
                    const card = document.createElement('div');
                    card.className = 'symptom-card';
                    card.dataset.symptom = symptom;
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `symptom-${symptom.replace(/[^a-zA-Z0-9]/g, '_')}`;
                    checkbox.value = symptom;
                    
                    const label = document.createElement('label');
                    label.htmlFor = checkbox.id;
                    // Use the fixed Uzbek symptom labels directly
                    label.textContent = symptom;
                    
                    card.appendChild(checkbox);
                    card.appendChild(label);
                    
                    card.addEventListener('click', () => {
                        checkbox.checked = !checkbox.checked;
                        this.toggleSymptom(symptom, checkbox.checked);
                    });
                    
                    container.appendChild(card);
                } catch (err) {
                    console.error('Error rendering symptom:', symptom, err);
                }
            });
        } catch (error) {
            console.error('Error rendering symptoms:', error);
            container.innerHTML = '<p style="color: var(--text-light);">Alomatlar yuklanmadi. Sahifani yangilang.</p>';
        }
    },
    
    toggleSymptom(symptom, selected) {
        if (selected) {
            if (!this.selectedSymptoms.includes(symptom)) {
                this.selectedSymptoms.push(symptom);
            }
        } else {
            this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
        }
        
        // Update UI
        const card = document.querySelector(`[data-symptom="${symptom}"]`);
        if (card) {
            if (selected) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        }
    },
    
    async submitSymptoms() {
        if (this.selectedSymptoms.length === 0) {
            Utils.showNotification(LanguageManager.t('pleaseSelectAtLeastOneSymptom'), 'error');
            return;
        }
        
        const submitBtn = document.getElementById('submitSymptomsBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = LanguageManager.t('loading');
        }
        
        try {
            const studentId = Auth.getUserId() || 1;
            const result = await MockAPI.submitReport(studentId, this.selectedSymptoms);
            
            this.displayResults(result);
            
            // Show doctors if risk is not low - filter by recommended specialty
            if (result.risk !== 'Low' && result.recommendedDoctor) {
                this.loadDoctors(result.recommendedDoctor);
            }
            
            // Reload history
            this.loadHistory();
        } catch (error) {
            Utils.showNotification('Xatolik yuz berdi', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = LanguageManager.t('submitSymptoms');
            }
        }
    },
    
    displayResults(result) {
        const resultsContainer = document.getElementById('resultsContainer');
        if (!resultsContainer) return;
        
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = '';

        // Get raw risk level from result
        const riskLevelRaw = result.riskLevel || (result.risk ? result.risk.toUpperCase() : 'LOW');
        const riskClass = riskLevelRaw.toLowerCase();
        
        // Translate risk level to Uzbek when interface is Uzbek
        const currentLang = LanguageManager?.currentLang || 'uz';
        const riskLevelTranslations = {
            uz: {
                'LOW': 'Past',
                'MEDIUM': "O'rta",
                'HIGH': 'Yuqori',
                'CRITICAL': 'Juda yuqori (shoshilinch)'
            },
            en: {
                'LOW': 'LOW',
                'MEDIUM': 'MEDIUM',
                'HIGH': 'HIGH',
                'CRITICAL': 'CRITICAL'
            }
        };
        // Single declaration of riskLevel (translated)
        const riskLevel = riskLevelTranslations[currentLang]?.[riskLevelRaw] || riskLevelRaw;

        const riskColors = {
            low: 'var(--text-white)',
            medium: '#FFC107',
            high: 'var(--primary-red-light)',
            critical: '#ff5252'
        };

        const detectedSymptomsText = result.detectedSymptoms || (result.symptoms || []).join(', ');
        const possibleConditionsText = Array.isArray(result.possibleConditions)
            ? result.possibleConditions.join('; ')
            : (result.possibleConditions || '');
        const recommendedDoctor = result.recommendedDoctor || '';
        const actionAdvice = result.actionAdvice || '';
        const disclaimer =
            result.disclaimer ||
            "Bu tizim natijalari taxminiy bo'lib, rasmiy tibbiy tashxis emas. Yakuniy baholash uchun shifokorga murojaat qiling.";
        
        // Use Uzbek labels when interface is Uzbek, English when interface is English
        const labels = currentLang === 'uz' ? {
            detectedSymptoms: "Aniqlangan alomatlar",
            possibleConditions: "Mumkin bo'lgan kasalliklar (kombinatsiyalar asosida)",
            riskLevel: "Xavf darajasi",
            recommendedDoctor: "Tavsiya etilgan shifokor",
            actionAdvice: "Harakat tavsiyalari (1–2 qisqa qadam)"
        } : {
            detectedSymptoms: "Detected symptoms",
            possibleConditions: "Possible conditions (based on combinations)",
            riskLevel: "Risk level",
            recommendedDoctor: "Recommended doctor",
            actionAdvice: "Action advice (1–2 short steps only)"
        };
        
        const resultCard = document.createElement('div');
        resultCard.className = `risk-result ${riskClass}`;
        resultCard.innerHTML = `
            <div class="risk-level" style="color: ${riskColors[riskClass] || 'var(--text-white)'}">
                ${labels.riskLevel}: ${riskLevel}
            </div>
            <div style="text-align: left; margin-top: 1rem; font-size: 1rem; line-height: 1.7;">
                <p>- <strong>${labels.detectedSymptoms}:</strong> ${detectedSymptomsText || '-'}</p>
                <p>- <strong>${labels.possibleConditions}:</strong> ${possibleConditionsText || '-'}</p>
                <p>- <strong>${labels.riskLevel}:</strong> ${riskLevel}</p>
                <p>- <strong>${labels.recommendedDoctor}:</strong> ${recommendedDoctor}</p>
                <p>- <strong>${labels.actionAdvice}:</strong> ${actionAdvice}</p>
            </div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-light);">
                ${disclaimer}
            </div>
        `;
        
        if (result.risk === 'Low') {
            const aiButton = document.createElement('button');
            aiButton.className = 'btn btn-primary';
            aiButton.style.marginTop = '1.5rem';
            aiButton.textContent = LanguageManager.t('openAIAssistant');
            aiButton.onclick = () => {
                window.location.href = 'chat.html';
            };
            resultCard.appendChild(aiButton);
            
            const message = document.createElement('p');
            message.style.marginTop = '1rem';
            message.textContent = LanguageManager.t('doctorVisitNotRequired');
            resultCard.appendChild(message);
        }
        
        resultsContainer.appendChild(resultCard);
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    },
    
    async loadDoctors(recommendedSpecialty) {
        const doctorsContainer = document.getElementById('doctorsContainer');
        if (!doctorsContainer) return;
        
        doctorsContainer.style.display = 'block';
        doctorsContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        
        try {
            // Get doctors filtered by recommended specialty (auto-generates if needed)
            const doctors = await MockAPI.getDoctorsBySpecialty(recommendedSpecialty);
            
            if (!doctors || doctors.length === 0) {
                doctorsContainer.innerHTML = `<p>${LanguageManager.t('doctorsNotLoaded')}</p>`;
                return;
            }
            
            doctorsContainer.innerHTML = `
                <h3 class="card-title" data-i18n="doctors">Shifokorlar</h3>
                <div class="doctors-grid"></div>
            `;
            
            const grid = doctorsContainer.querySelector('.doctors-grid');
            
            // Display only matching doctors (1-4 doctors)
            doctors.forEach(doctor => {
                // Use Uzbek specialty directly (already in Uzbek in database)
                const specialtyDisplay = doctor.specialty || doctor.specialtyEn;
                
                const card = document.createElement('div');
                card.className = 'doctor-card';
                card.innerHTML = `
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-specialty">${specialtyDisplay}</div>
                    <div style="margin: 1rem 0; color: var(--text-light);">
                        <div>${LanguageManager.t('experience')}: ${doctor.experience}</div>
                        <div>${LanguageManager.t('price')}: ${doctor.price}</div>
                    </div>
                    <button class="btn btn-primary" onclick="window.location.href='booking.html?doctor=${doctor.id}'">
                        ${LanguageManager.t('bookAppointment')}
                    </button>
                `;
                grid.appendChild(card);
            });
        } catch (error) {
            console.error('Doctors load error:', error);
            doctorsContainer.innerHTML = `<p>${LanguageManager.t('doctorsNotLoaded')}</p>`;
        }
    },
    
    async loadHistory() {
        const historyContainer = document.getElementById('historyContainer');
        if (!historyContainer) return;
        
        try {
            const studentId = Auth.getUserId() || 1;
            const history = await MockAPI.getStudentHistory(studentId);
            
            historyContainer.innerHTML = `
                <h3 class="card-title" data-i18n="medicalHistory">Tibbiy tarix</h3>
                <div id="historyList"></div>
            `;
            
            const list = document.getElementById('historyList');
            
            history.reports.forEach(report => {
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div class="history-date">${Utils.formatDate(report.date)}</div>
                    <div class="history-symptoms">
                        ${report.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}
                    </div>
                    <div style="margin-top: 0.5rem;">
                        <span class="priority-badge priority-${report.risk.toLowerCase()}">
                            ${report.risk} - ${report.score} ${LanguageManager.t('riskScore')}
                        </span>
                    </div>
                `;
                list.appendChild(item);
            });
        } catch (error) {
            console.error('History load error:', error);
        }
    },
    
    setupEventListeners() {
        const submitBtn = document.getElementById('submitSymptomsBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitSymptoms());
        }
    }
};

// Expose StudentModule globally for HTML access
if (typeof window !== 'undefined') {
    window.StudentModule = StudentModule;
}

