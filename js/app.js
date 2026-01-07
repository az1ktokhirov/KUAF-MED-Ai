// Main application file - Localization and utilities

const lang = {
    uz: {
        // Navigation
        login: "Kirish",
        logout: "Chiqish",
        dashboard: "Boshqaruv paneli",
        student: "Talaba",
        admin: "Admin",
        booking: "Bron qilish",
        chat: "AI Yordamchi",
        history: "Tarix",
        
        // Common
        loading: "Yuklanmoqda...",
        error: "Xatolik",
        success: "Muvaffaqiyatli",
        cancel: "Bekor qilish",
        save: "Saqlash",
        submit: "Yuborish",
        back: "Orqaga",
        next: "Keyingi",
        close: "Yopish",
        
        // Login
        email: "Email",
        password: "Parol",
        role: "Rol",
        selectRole: "Rolni tanlang",
        studentRole: "Talaba",
        doctorRole: "Shifokor",
        adminRole: "Administrator",
        
        // Symptoms
        symptoms: "Belgilar",
        selectSymptoms: "Belgilarni tanlang",
        submitSymptoms: "Belgilarni yuborish",
        headache: "Bosh og'rig'i",
        fever: "Isitma",
        insomnia: "Uyqusizlik",
        fatigue: "Charchoq",
        stress: "Stress",
        anxiety: "Tashvish",
        dizziness: "Bosh aylanishi",
        appetiteLoss: "Ishtaha yo'qolishi",
        backPain: "Orqa og'rig'i",
        eyeStrain: "Ko'z charchog'i",
        nausea: "Ko'ngil aynishi",
        lowActivity: "Past faollik",
        concentrationIssue: "Diqqat muammosi",
        heartRateChanges: "Yurak urishi o'zgarishi",
        moodSwings: "Kayfiyat o'zgarishi",
        
        // Results
        riskLevel: "Xavf darajasi",
        riskScore: "Xavf balli",
        recommendation: "Tavsiya",
        lowRisk: "Past",
        mediumRisk: "O'rtacha",
        highRisk: "Yuqori",
        urgent: "Shoshilinch",
        doctorVisitNotRequired: "Shifokorga borish shart emas. Yo'riqnoma uchun AI Yordamchiga o'ting.",
        openAIAssistant: "AI Yordamchini ochish",
        bookAppointment: "Vaqt belgilash",
        
        // Doctors
        doctors: "Shifokorlar",
        specialty: "Mutaxassislik",
        experience: "Tajriba",
        price: "Narx",
        available: "Mavjud",
        
        // Booking
        selectDate: "Sanani tanlang",
        selectTime: "Vaqtni tanlang",
        complaint: "Shikoyat",
        complaintPlaceholder: "Shikoyatingizni batafsil yozing...",
        bookingSuccess: "Bron muvaffaqiyatli yaratildi",
        
        // Dashboard
        hotList: "Muhim ro'yxat",
        filters: "Filtrlash",
        byFaculty: "Fakultet bo'yicha",
        byCourse: "Kurs bo'yicha",
        byRisk: "Xavf bo'yicha",
        dateRange: "Sana oralig'i",
        priority: "Prioritet",
        casesPerFaculty: "Fakultet bo'yicha holatlar",
        symptomDistribution: "Belgi taqsimoti",
        weeklyTrend: "Haftalik tendentsiya",
        monthlyEvolution: "Oylik o'zgarish",
        
        // Admin
        universityHealthIndex: "Universitet sog'liq indeksi",
        seasonalTrend: "Mavsumiy tendentsiya",
        facultyComparison: "Fakultetlar taqqoslash",
        academicPerformanceCorrelation: "Akademik ko'rsatkichlar korrelyatsiyasi",
        recommendations: "Tavsiyalar",
        improveMentalHealth: "Ruhiy salomatlik dasturlarini yaxshilash",
        increaseFitness: "Jismoniy faollikni oshirish",
        nutritionSupport: "Ovqatlanish yordami yaratish",
        earlyFluDetection: "Erkak gripp aniqlash dasturi",
        
        // Chat
        aiAssistant: "AI Yordamchi",
        typeMessage: "Xabar yozing...",
        send: "Yuborish",
        suggestedReplies: "Tavsiya etilgan javoblar",
        
        // QR Code
        qrHealthCode: "Sog'liq kodi QR",
        scanByStaff: "Meditsina xodimlari tomonidan skanerlash orqali so'nggi hisobotni ko'ring.",
        
        // History
        medicalHistory: "Tibbiy tarix",
        previousReports: "Oldingi hisobotlar",
        lastVisits: "So'nggi tashriflar"
    },
    en: {
        // Navigation
        login: "Login",
        logout: "Logout",
        dashboard: "Dashboard",
        student: "Student",
        admin: "Admin",
        booking: "Booking",
        chat: "AI Assistant",
        history: "History",
        
        // Common
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        save: "Save",
        submit: "Submit",
        back: "Back",
        next: "Next",
        close: "Close",
        
        // Login
        email: "Email",
        password: "Password",
        role: "Role",
        selectRole: "Select Role",
        studentRole: "Student",
        doctorRole: "Doctor",
        adminRole: "Administrator",
        
        // Symptoms
        symptoms: "Symptoms",
        selectSymptoms: "Select Symptoms",
        submitSymptoms: "Submit Symptoms",
        headache: "Headache",
        fever: "Fever",
        insomnia: "Insomnia",
        fatigue: "Fatigue",
        stress: "Stress",
        anxiety: "Anxiety",
        dizziness: "Dizziness",
        appetiteLoss: "Appetite Loss",
        backPain: "Back Pain",
        eyeStrain: "Eye Strain",
        nausea: "Nausea",
        lowActivity: "Low Activity",
        concentrationIssue: "Concentration Issue",
        heartRateChanges: "Heart Rate Changes",
        moodSwings: "Mood Swings",
        
        // Results
        riskLevel: "Risk Level",
        riskScore: "Risk Score",
        recommendation: "Recommendation",
        lowRisk: "Low",
        mediumRisk: "Medium",
        highRisk: "High",
        urgent: "Urgent",
        doctorVisitNotRequired: "Doctor visit not required. Continue to the AI Assistant for guidance.",
        openAIAssistant: "Open AI Assistant",
        bookAppointment: "Book Appointment",
        
        // Doctors
        doctors: "Doctors",
        specialty: "Specialty",
        experience: "Experience",
        price: "Price",
        available: "Available",
        
        // Booking
        selectDate: "Select Date",
        selectTime: "Select Time",
        complaint: "Complaint",
        complaintPlaceholder: "Describe your complaint...",
        bookingSuccess: "Booking created successfully",
        
        // Dashboard
        hotList: "Hot List",
        filters: "Filters",
        byFaculty: "By Faculty",
        byCourse: "By Course",
        byRisk: "By Risk",
        dateRange: "Date Range",
        priority: "Priority",
        casesPerFaculty: "Cases per Faculty",
        symptomDistribution: "Symptom Distribution",
        weeklyTrend: "Weekly Trend",
        monthlyEvolution: "Monthly Evolution",
        
        // Admin
        universityHealthIndex: "University Health Index",
        seasonalTrend: "Seasonal Trend",
        facultyComparison: "Faculty Comparison",
        academicPerformanceCorrelation: "Academic Performance Correlation",
        recommendations: "Recommendations",
        improveMentalHealth: "Improve mental health programs",
        increaseFitness: "Increase fitness activities",
        nutritionSupport: "Create nutrition support",
        earlyFluDetection: "Early flu detection program",
        
        // Chat
        aiAssistant: "AI Assistant",
        typeMessage: "Type a message...",
        send: "Send",
        suggestedReplies: "Suggested Replies",
        
        // QR Code
        qrHealthCode: "QR Health Code",
        scanByStaff: "Scan by medical staff to view your latest report.",
        
        // History
        medicalHistory: "Medical History",
        previousReports: "Previous Reports",
        lastVisits: "Last Visits"
    }
};

// Language management
const LanguageManager = {
    currentLang: localStorage.getItem('language') || 'uz',
    
    setLanguage(langCode) {
        this.currentLang = langCode;
        localStorage.setItem('language', langCode);
        this.updatePage();
    },
    
    t(key) {
        return lang[this.currentLang]?.[key] || key;
    },
    
    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        // Update language switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            const btnText = btn.textContent.trim();
            if ((btnText === 'O\'zbek' || btnText === 'Uzbek') && this.currentLang === 'uz') {
                btn.classList.add('active');
            } else if (btnText === 'English' && this.currentLang === 'en') {
                btn.classList.add('active');
            }
        });
    }
};

// Initialize language on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        LanguageManager.updatePage();
    });
} else {
    LanguageManager.updatePage();
}

// Utility functions
const Utils = {
    formatDate(date) {
        return new Date(date).toLocaleDateString(LanguageManager.currentLang === 'uz' ? 'uz-UZ' : 'en-US');
    },
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    redirect(url) {
        window.location.href = url;
    }
};

