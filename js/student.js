// Student module

const StudentModule = {
    selectedSymptoms: [],
    
    symptoms: [
        'Headache', 'Fever', 'Insomnia', 'Fatigue', 'Stress',
        'Anxiety', 'Dizziness', 'Appetite Loss', 'Back Pain', 'Eye Strain',
        'Nausea', 'Low Activity', 'Concentration Issue', 'Heart Rate Changes', 'Mood Swings'
    ],
    
    init() {
        if (!Auth.requireAuth() || Auth.getRole() !== 'student') {
            return;
        }
        
        this.renderSymptoms();
        this.loadHistory();
        this.setupEventListeners();
    },
    
    renderSymptoms() {
        const container = document.getElementById('symptomsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.symptoms.forEach(symptom => {
            const card = document.createElement('div');
            card.className = 'symptom-card';
            card.dataset.symptom = symptom;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `symptom-${symptom}`;
            checkbox.value = symptom;
            
            const label = document.createElement('label');
            label.htmlFor = `symptom-${symptom}`;
            // Map symptom names to translation keys
            const symptomKeyMap = {
                'Headache': 'headache',
                'Fever': 'fever',
                'Insomnia': 'insomnia',
                'Fatigue': 'fatigue',
                'Stress': 'stress',
                'Anxiety': 'anxiety',
                'Dizziness': 'dizziness',
                'Appetite Loss': 'appetiteLoss',
                'Back Pain': 'backPain',
                'Eye Strain': 'eyeStrain',
                'Nausea': 'nausea',
                'Low Activity': 'lowActivity',
                'Concentration Issue': 'concentrationIssue',
                'Heart Rate Changes': 'heartRateChanges',
                'Mood Swings': 'moodSwings'
            };
            const translationKey = symptomKeyMap[symptom] || symptom.toLowerCase().replace(/\s+/g, '');
            label.textContent = LanguageManager.t(translationKey) || symptom;
            
            card.appendChild(checkbox);
            card.appendChild(label);
            
            card.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                this.toggleSymptom(symptom, checkbox.checked);
            });
            
            container.appendChild(card);
        });
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
            Utils.showNotification('Iltimos, kamida bitta belgi tanlang', 'error');
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
            
            // Show doctors if risk is not low
            if (result.risk !== 'Low') {
                this.loadDoctors();
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
        
        const riskClass = result.risk.toLowerCase();
        const riskColors = {
            low: 'var(--primary-blue)',
            medium: '#FFC107',
            high: 'var(--primary-red)'
        };
        
        const resultCard = document.createElement('div');
        resultCard.className = `risk-result ${riskClass}`;
        resultCard.innerHTML = `
            <div class="risk-level" style="color: ${riskColors[riskClass]}">
                ${LanguageManager.t(`${riskClass}Risk`)} ${LanguageManager.t('riskLevel')}
            </div>
            <div class="risk-score" style="color: ${riskColors[riskClass]}">
                ${result.score}
            </div>
            <div style="margin-top: 1rem; font-size: 1.1rem;">
                ${result.recommendation}
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
    
    async loadDoctors() {
        const doctorsContainer = document.getElementById('doctorsContainer');
        if (!doctorsContainer) return;
        
        doctorsContainer.style.display = 'block';
        doctorsContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        
        try {
            const doctors = await MockAPI.getDoctors();
            
            doctorsContainer.innerHTML = `
                <h3 class="card-title" data-i18n="doctors">Shifokorlar</h3>
                <div class="doctors-grid"></div>
            `;
            
            const grid = doctorsContainer.querySelector('.doctors-grid');
            
            doctors.forEach(doctor => {
                const card = document.createElement('div');
                card.className = 'doctor-card';
                card.innerHTML = `
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-specialty">${doctor.specialty}</div>
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
            doctorsContainer.innerHTML = '<p>Shifokorlar yuklanmadi</p>';
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

