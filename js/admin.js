// Admin Analytics module

const AdminModule = {
    charts: {},
    
    init() {
        if (!Auth.requireAuth() || Auth.getRole() !== 'admin') {
            return;
        }
        
        this.loadStats();
    },
    
    async loadStats() {
        try {
            const stats = await MockAPI.getAdminStats();
            this.displayHealthIndex(stats.healthIndex);
            this.renderCharts(stats);
            this.displayCorrelation(stats.correlation);
            this.displayRecommendations();
        } catch (error) {
            console.error('Stats load error:', error);
        }
    },
    
    displayHealthIndex(index) {
        const container = document.getElementById('healthIndex');
        if (!container) return;
        
        container.innerHTML = `
            <div class="health-index">
                <h2 data-i18n="universityHealthIndex">Universitet sog'liq indeksi</h2>
                <div class="health-index-value">${index}</div>
                <p style="font-size: 1.2rem;">100 balldan</p>
            </div>
        `;
    },
    
    renderCharts(stats) {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }
        
        // Seasonal Trend Line Chart
        const seasonalCtx = document.getElementById('seasonalChart');
        if (seasonalCtx && !this.charts.seasonal) {
            this.charts.seasonal = new Chart(seasonalCtx, {
                type: 'line',
                data: {
                    labels: Object.keys(stats.monthlyCases),
                    datasets: [{
                        label: 'Oylik holatlar',
                        data: Object.values(stats.monthlyCases),
                        borderColor: '#005BBD',
                        backgroundColor: 'rgba(0, 91, 189, 0.1)',
                        fill: true,
                        tension: 0.4
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
        
        // Faculty Comparison Bar Chart
        const facultyCtx = document.getElementById('facultyComparisonChart');
        if (facultyCtx && !this.charts.faculty) {
            this.charts.faculty = new Chart(facultyCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(stats.facultyComparison),
                    datasets: [{
                        label: 'Holatlar',
                        data: Object.values(stats.facultyComparison),
                        backgroundColor: [
                            '#005BBD', '#007BFF', '#28A745', '#FFC107', '#DC3545', '#17A2B8'
                        ]
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
    },
    
    displayCorrelation(text) {
        const container = document.getElementById('correlationSection');
        if (!container) return;
        
        container.innerHTML = `
            <div class="card">
                <h3 class="card-title" data-i18n="academicPerformanceCorrelation">Akademik ko'rsatkichlar korrelyatsiyasi</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-dark);">
                    ${text}
                </p>
            </div>
        `;
    },
    
    displayRecommendations() {
        const container = document.getElementById('recommendationsSection');
        if (!container) return;
        
        const recommendations = [
            { title: LanguageManager.t('improveMentalHealth'), description: 'Talabalar uchun ruhiy salomatlik dasturlarini kengaytirish va yaxshilash' },
            { title: LanguageManager.t('increaseFitness'), description: 'Jismoniy faollikni rag\'batlantirish va sport dasturlarini oshirish' },
            { title: LanguageManager.t('nutritionSupport'), description: 'To\'g\'ri ovqatlanish bo\'yicha maslahat va yordam dasturlari yaratish' },
            { title: LanguageManager.t('earlyFluDetection'), description: 'Gripp va boshqa kasalliklarni erta aniqlash tizimini joriy etish' }
        ];
        
        container.innerHTML = `
            <h2 class="card-title" data-i18n="recommendations">Tavsiyalar</h2>
            <div class="recommendation-cards">
                ${recommendations.map(rec => `
                    <div class="recommendation-card">
                        <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">${rec.title}</h4>
                        <p style="color: var(--text-light);">${rec.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

