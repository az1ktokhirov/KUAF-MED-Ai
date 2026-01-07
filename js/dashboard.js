// Doctor Dashboard module

const DashboardModule = {
    charts: {},
    
    init() {
        if (!Auth.requireAuth() || Auth.getRole() !== 'doctor') {
            return;
        }
        
        this.loadHotList();
        this.loadStats();
        this.setupFilters();
    },
    
    setupFilters() {
        const filterForm = document.getElementById('filterForm');
        if (!filterForm) return;
        
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.applyFilters();
        });
        
        // Reset button
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                filterForm.reset();
                this.loadHotList();
            });
        }
    },
    
    async applyFilters() {
        const filters = {
            faculty: document.getElementById('filterFaculty')?.value || '',
            course: document.getElementById('filterCourse')?.value || '',
            risk: document.getElementById('filterRisk')?.value || ''
        };
        
        await this.loadHotList(filters);
    },
    
    async loadHotList(filters = {}) {
        const tableBody = document.getElementById('hotListBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;"><div class="spinner"></div></td></tr>';
        
        try {
            const students = await MockAPI.getHotList(filters);
            
            if (students.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">${LanguageManager.t('noResultsFound')}</td></tr>`;
                return;
            }
            
            tableBody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.faculty}</td>
                    <td>${student.course}</td>
                    <td>
                        <span class="priority-badge priority-${student.risk.toLowerCase()}">
                            ${student.risk}
                        </span>
                    </td>
                    <td>${student.score}</td>
                    <td>
                        <span class="priority-badge priority-${student.priority.toLowerCase()}">
                            ${student.priority}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" 
                                onclick="DashboardModule.showStudentProfile(${student.id})">
                            ${LanguageManager.t('profile')}
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--primary-red);">${LanguageManager.t('errorOccurred')}</td></tr>`;
        }
    },
    
    async showStudentProfile(studentId) {
        try {
            const profile = await MockAPI.getStudentProfile(studentId);
            const history = await MockAPI.getStudentHistory(studentId);
            
            const modal = document.getElementById('studentModal');
            const modalContent = document.getElementById('studentModalContent');
            
            if (!modal || !modalContent) return;
            
            modalContent.innerHTML = `
                <button class="modal-close" onclick="DashboardModule.closeModal()">&times;</button>
                <h2 style="margin-bottom: 1.5rem;">${profile.name}</h2>
                <div style="margin-bottom: 1rem;">
                    <strong>${LanguageManager.t('faculty')}:</strong> ${profile.faculty}<br>
                    <strong>${LanguageManager.t('course')}:</strong> ${profile.course}<br>
                    <strong>${LanguageManager.t('emailLabel')}:</strong> ${profile.email}<br>
                    <strong>${LanguageManager.t('phone')}:</strong> ${profile.phone}
                </div>
                <h3 style="margin: 1.5rem 0 1rem 0;">${LanguageManager.t('pastSymptoms')}:</h3>
                <div class="history-symptoms">
                    ${profile.pastSymptoms.map(s => {
                        const symptomKey = s.toLowerCase().replace(/\s+/g, '');
                        const translatedSymptom = LanguageManager.t(symptomKey) || s;
                        return `<span class="symptom-tag">${translatedSymptom}</span>`;
                    }).join('')}
                </div>
                <h3 style="margin: 1.5rem 0 1rem 0;">${LanguageManager.t('reports')}:</h3>
                <div>
                    ${history.reports.slice(0, 5).map(report => `
                        <div class="history-item">
                            <div class="history-date">${Utils.formatDate(report.date)}</div>
                            <div class="history-symptoms">
                                ${report.symptoms.map(s => {
                                    const symptomKey = s.toLowerCase().replace(/\s+/g, '');
                                    const translatedSymptom = LanguageManager.t(symptomKey) || s;
                                    return `<span class="symptom-tag">${translatedSymptom}</span>`;
                                }).join('')}
                            </div>
                            <span class="priority-badge priority-${report.risk.toLowerCase()}">
                                ${LanguageManager.t(`${report.risk.toLowerCase()}Risk`)} - ${report.score}
                            </span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            modal.classList.add('active');
        } catch (error) {
            Utils.showNotification(LanguageManager.t('profileNotLoaded'), 'error');
        }
    },
    
    closeModal() {
        const modal = document.getElementById('studentModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    async loadStats() {
        try {
            const stats = await MockAPI.getDashboardStats();
            this.renderCharts(stats);
        } catch (error) {
            console.error('Stats load error:', error);
        }
    },
    
    renderCharts(stats) {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }
        
        // Faculty Cases Bar Chart
        const facultyCtx = document.getElementById('facultyChart');
        if (facultyCtx && !this.charts.faculty) {
            this.charts.faculty = new Chart(facultyCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(stats.facultyCases).map(faculty => {
                        const facultyKey = faculty.toLowerCase().replace(/\s+/g, '');
                        return LanguageManager.t(facultyKey) || faculty;
                    }),
                    datasets: [{
                        label: LanguageManager.t('casesPerFaculty'),
                        data: Object.values(stats.facultyCases),
                        backgroundColor: '#DC143C'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
        
        // Symptom Distribution Pie Chart
        const symptomCtx = document.getElementById('symptomChart');
        if (symptomCtx && !this.charts.symptom) {
            this.charts.symptom = new Chart(symptomCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(stats.symptomDistribution).map(symptom => {
                        const symptomKey = symptom.toLowerCase().replace(/\s+/g, '');
                        return LanguageManager.t(symptomKey) || symptom;
                    }),
                    datasets: [{
                        data: Object.values(stats.symptomDistribution),
                        backgroundColor: [
                            '#DC143C', '#B22222', '#FF1744', '#FFC107', '#DC3545',
                            '#FF6B6B', '#8B0000', '#E83E8C', '#FD7E14'
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
        
        // Weekly Trend Line Chart
        const weeklyCtx = document.getElementById('weeklyChart');
        if (weeklyCtx && !this.charts.weekly) {
            this.charts.weekly = new Chart(weeklyCtx, {
                type: 'line',
                data: {
                    labels: [
                        LanguageManager.t('monday'),
                        LanguageManager.t('tuesday'),
                        LanguageManager.t('wednesday'),
                        LanguageManager.t('thursday'),
                        LanguageManager.t('friday'),
                        LanguageManager.t('saturday'),
                        LanguageManager.t('sunday')
                    ],
                    datasets: [{
                        label: LanguageManager.t('casesPerFaculty'),
                        data: stats.weeklyTrend,
                        borderColor: '#DC143C',
                        backgroundColor: 'rgba(220, 20, 60, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
        
        // Monthly Evolution Area Chart
        const monthlyCtx = document.getElementById('monthlyChart');
        if (monthlyCtx && !this.charts.monthly) {
            this.charts.monthly = new Chart(monthlyCtx, {
                type: 'line',
                data: {
                    labels: [
                        LanguageManager.t('jan'),
                        LanguageManager.t('feb'),
                        LanguageManager.t('mar'),
                        LanguageManager.t('apr'),
                        LanguageManager.t('may'),
                        LanguageManager.t('jun'),
                        LanguageManager.t('jul'),
                        LanguageManager.t('aug'),
                        LanguageManager.t('sep'),
                        LanguageManager.t('oct'),
                        LanguageManager.t('nov'),
                        LanguageManager.t('dec')
                    ],
                    datasets: [{
                        label: LanguageManager.t('monthlyEvolution'),
                        data: stats.monthlyEvolution,
                        borderColor: '#DC143C',
                        backgroundColor: 'rgba(220, 20, 60, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    }
};

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('studentModal');
    if (modal && e.target === modal) {
        DashboardModule.closeModal();
    }
});

