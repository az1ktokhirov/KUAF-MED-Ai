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
        improveMentalHealthDesc: "Talabalar uchun ruhiy salomatlik dasturlarini kengaytirish va yaxshilash",
        increaseFitness: "Jismoniy faollikni oshirish",
        increaseFitnessDesc: "Jismoniy faollikni rag'batlantirish va sport dasturlarini oshirish",
        nutritionSupport: "To'g'ri ovqatlanish",
        nutritionSupportDesc: "To'g'ri ovqatlanish bo'yicha maslahat va yordam dasturlari yaratish",
        earlyFluDetection: "Kasaliklarni erta aniqlash",
        earlyFluDetectionDesc: "Kasalliklarni erta aniqlash tizimini joriy etish",
        
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
        lastVisits: "So'nggi tashriflar",
        
        // Error messages
        pleaseSelectRole: "Iltimos, rolni tanlang",
        loginError: "Kirishda xatolik yuz berdi",
        networkError: "Tarmoq xatoligi",
        loginFailed: "Kirish muvaffaqiyatsiz",
        invalidCredentials: "Noto'g'ri ma'lumotlar",
        noResultsFound: "Hech qanday natija topilmadi",
        errorOccurred: "Xatolik yuz berdi",
        profileNotLoaded: "Profil yuklanmadi",
        doctorsNotLoaded: "Shifokorlar yuklanmadi",
        doctorInfoNotLoaded: "Shifokor ma'lumotlari yuklanmadi",
        pleaseFillAllFields: "Iltimos, barcha maydonlarni to'ldiring",
        bookingError: "Bron qilishda xatolik",
        pleaseSelectAtLeastOneSymptom: "Iltimos, kamida bitta belgi tanlang",
        chatError: "Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        
        // Form labels
        studentName: "Talaba ismi",
        name: "Ism",
        user: "Foydalanuvchi",
        faculty: "Fakultet",
        course: "Kurs",
        risk: "Xavf",
        score: "Ball",
        actions: "Amallar",
        emailLabel: "Email",
        phone: "Telefon",
        pastSymptoms: "O'tmish belgilari",
        reports: "Hisobotlar",
        profile: "Profil",
        
        // Dropdown options
        all: "Barchasi",
        computerScience: "Kompyuter fanlari",
        medicine: "Tibbiyot",
        engineering: "Muhandislik",
        business: "Biznes",
        law: "Huquq",
        course1: "1-kurs",
        course2: "2-kurs",
        course3: "3-kurs",
        course4: "4-kurs",
        
        // Recommendations
        lowRiskRecommendation: "Yetarlicha dam oling va suv iching. Belgilaringizni kuzatib boring.",
        mediumRiskRecommendation: "Agar belgilar davom etsa, shifokor bilan maslahatlashing. Dam oling va suv iching.",
        highRiskRecommendation: "Iltimos, darhol shifokor bilan maslahatlashing. Sizning belgilaringiz tibbiy yordam talab qiladi.",
        
        // Chat
        welcomeMessage: "Salom! Men KUAF MED AI yordamchisiman. Sizga qanday yordam bera olaman?",
        suggestedReply1: "Uyqusizlikni qanday yengish mumkin?",
        suggestedReply2: "Stressni kamaytirish uchun nima qilish kerak?",
        suggestedReply3: "Bosh og`rig`i uchun maslahat",
        suggestedReply4: "Ishtaham yo'q",
        
        // Placeholders
        emailPlaceholder: "email@misol.uz",
        
        // Days of week
        monday: "Dushanba",
        tuesday: "Seshanba",
        wednesday: "Chorshanba",
        thursday: "Payshanba",
        friday: "Juma",
        saturday: "Shanba",
        sunday: "Yakshanba",
        
        // Months
        jan: "Yan",
        feb: "Fev",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Iyun",
        jul: "Iyul",
        aug: "Avg",
        sep: "Sen",
        oct: "Okt",
        nov: "Noy",
        dec: "Dek",
        
        // Doctor specialties
        generalPractitioner: "Umumiy shifokor",
        psychologist: "Psixolog",
        cardiologist: "Kardiolog",
        neurologist: "Nevrolog",
        
        // Booking
        appointmentBookedSuccessfully: "Uchrashuv muvaffaqiyatli belgilandi"
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
        improveMentalHealthDesc: "Expand and improve mental health programs for students",
        increaseFitness: "Increase fitness activities",
        increaseFitnessDesc: "Encourage physical activity and increase sports programs",
        nutritionSupport: "Create nutrition support",
        nutritionSupportDesc: "Create nutrition advice and support programs",
        earlyFluDetection: "Early flu detection program",
        earlyFluDetectionDesc: "Implement early detection system for flu and other diseases",
        
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
        lastVisits: "Last Visits",
        
        // Error messages
        pleaseSelectRole: "Please select a role",
        loginError: "Login error occurred",
        networkError: "Network error",
        loginFailed: "Login failed",
        invalidCredentials: "Invalid credentials",
        noResultsFound: "No results found",
        errorOccurred: "An error occurred",
        profileNotLoaded: "Profile not loaded",
        doctorsNotLoaded: "Doctors not loaded",
        doctorInfoNotLoaded: "Doctor information not loaded",
        pleaseFillAllFields: "Please fill all fields",
        bookingError: "Booking error",
        pleaseSelectAtLeastOneSymptom: "Please select at least one symptom",
        chatError: "Sorry, an error occurred. Please try again.",
        
        // Form labels
        studentName: "Student Name",
        name: "Name",
        user: "User",
        faculty: "Faculty",
        course: "Course",
        risk: "Risk",
        score: "Score",
        actions: "Actions",
        emailLabel: "Email",
        phone: "Phone",
        pastSymptoms: "Past Symptoms",
        reports: "Reports",
        profile: "Profile",
        
        // Dropdown options
        all: "All",
        computerScience: "Computer Science",
        medicine: "Medicine",
        engineering: "Engineering",
        business: "Business",
        law: "Law",
        course1: "1st Year",
        course2: "2nd Year",
        course3: "3rd Year",
        course4: "4th Year",
        
        // Recommendations
        lowRiskRecommendation: "Get enough rest and drink water. Monitor your symptoms.",
        mediumRiskRecommendation: "Consider consulting a doctor if symptoms persist. Rest and stay hydrated.",
        highRiskRecommendation: "Please consult a doctor immediately. Your symptoms require medical attention.",
        
        // Chat
        welcomeMessage: "Hello! I'm the KUAF MED AI assistant. How can I help you?",
        suggestedReply1: "How to overcome insomnia?",
        suggestedReply2: "What to do to reduce stress?",
        suggestedReply3: "Advice for headache",
        suggestedReply4: "How to prevent eye strain?",
        
        // Placeholders
        emailPlaceholder: "email@example.com",
        
        // Days of week
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        
        // Months
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec",
        
        // Doctor specialties
        generalPractitioner: "General Practitioner",
        psychologist: "Psychologist",
        cardiologist: "Cardiologist",
        neurologist: "Neurologist",
        
        // Booking
        appointmentBookedSuccessfully: "Appointment booked successfully"
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
        
        // Update select options
        document.querySelectorAll('select option[data-i18n]').forEach(option => {
            const key = option.getAttribute('data-i18n');
            option.textContent = this.t(key);
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

