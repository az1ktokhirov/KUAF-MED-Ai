// Mock API for KUAF MED AI Frontend
// Simulates backend API with delays

const MockAPI = {
    delay: () => Math.random() * 300 + 400, // 400-700ms

    // POST /api/login
    login: async (email, password, role) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        const users = {
            student: {
                status: "success",
                role: "student",
                token: "mock_student_token_123",
                name: "Azizillo Toxirov",
                id: 1,
                faculty: "Computer Science",
                course: 3
            },
            doctor: {
                status: "success",
                role: "doctor",
                token: "mock_doctor_token_456",
                name: "Dr. Alisher Aliev",
                id: 1
            },
            admin: {
                status: "success",
                role: "admin",
                token: "mock_admin_token_789",
                name: "Admin User",
                id: 1
            }
        };

        return users[role] || { status: "error", message: LanguageManager.t('invalidCredentials') };
    },

    // POST /api/student/report
    submitReport: async (studentId, symptoms) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        const symptomCount = symptoms.length;
        let risk = "Low";
        let score = symptomCount * 2;
        let urgent = false;

        if (score >= 40) {
            risk = "High";
            urgent = true;
        } else if (score >= 25) {
            risk = "Medium";
        }

        const recommendations = {
            Low: LanguageManager.t('lowRiskRecommendation'),
            Medium: LanguageManager.t('mediumRiskRecommendation'),
            High: LanguageManager.t('highRiskRecommendation')
        };

        return {
            risk,
            score,
            recommendation: recommendations[risk],
            urgent,
            suggestedDoctors: risk !== "Low" ? [1, 2, 3] : [],
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/doctors
    getDoctors: async () => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return [
            {
                id: 1,
                name: "Dr. Alisher Aliev",
                specialty: "General Practitioner",
                experience: "15 years",
                price: "50000 UZS",
                available: true
            },
            {
                id: 2,
                name: "Dr. Farida Karimova",
                specialty: "Psychologist",
                experience: "10 years",
                price: "60000 UZS",
                available: true
            },
            {
                id: 3,
                name: "Dr. Bobur Toshmatov",
                specialty: "Cardiologist",
                experience: "20 years",
                price: "80000 UZS",
                available: true
            },
            {
                id: 4,
                name: "Dr. Malika Yusupova",
                specialty: "Neurologist",
                experience: "12 years",
                price: "70000 UZS",
                available: true
            }
        ];
    },

    // GET /api/student/history
    getStudentHistory: async (studentId) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            reports: [
                {
                    date: "2024-01-15",
                    symptoms: ["Headache", "Fatigue", "Stress"],
                    risk: "Medium",
                    score: 28
                },
                {
                    date: "2024-01-08",
                    symptoms: ["Insomnia", "Anxiety"],
                    risk: "Low",
                    score: 18
                },
                {
                    date: "2023-12-20",
                    symptoms: ["Fever", "Headache", "Nausea"],
                    risk: "High",
                    score: 42
                }
            ],
            visits: [
                {
                    date: "2023-12-20",
                    doctor: "Dr. Alisher Aliev",
                    reason: "High fever and headache"
                }
            ],
            trend: [18, 28, 42, 25, 20, 27] // Last 6 reports
        };
    },

    // GET /api/dashboard/hot
    getHotList: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        let students = [
            {
                id: 1,
                name: "Azizillo Toxirov",
                faculty: "Computer Science",
                course: 3,
                risk: "High",
                score: 45,
                priority: "Urgent",
                lastReport: "2024-01-20"
            },
            {
                id: 2,
                name: "Malika Karimova",
                faculty: "Medicine",
                course: 2,
                risk: "High",
                score: 42,
                priority: "Urgent",
                lastReport: "2024-01-19"
            },
            {
                id: 3,
                name: "Bobur Toshmatov",
                faculty: "Engineering",
                course: 4,
                risk: "Medium",
                score: 30,
                priority: "High",
                lastReport: "2024-01-18"
            },
            {
                id: 4,
                name: "Farida Yusupova",
                faculty: "Computer Science",
                course: 1,
                risk: "Medium",
                score: 28,
                priority: "Medium",
                lastReport: "2024-01-17"
            },
            {
                id: 5,
                name: "Alisher Voxidov",
                faculty: "Business",
                course: 2,
                risk: "Low",
                score: 15,
                priority: "Low",
                lastReport: "2024-01-16"
            }
        ];

        // Apply filters
        if (filters.faculty) {
            students = students.filter(s => s.faculty === filters.faculty);
        }
        if (filters.course) {
            students = students.filter(s => s.course === parseInt(filters.course));
        }
        if (filters.risk) {
            students = students.filter(s => s.risk === filters.risk);
        }

        return students;
    },

    // GET /api/dashboard/stats
    getDashboardStats: async () => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            facultyCases: {
                "Computer Science": 45,
                "Medicine": 32,
                "Engineering": 28,
                "Business": 15,
                "Law": 12
            },
            symptomDistribution: {
                "Headache": 35,
                "Stress": 28,
                "Fatigue": 25,
                "Anxiety": 20,
                "Insomnia": 18,
                "Eye Strain": 15,
                "Back Pain": 12,
                "Fever": 10,
                "Others": 27
            },
            weeklyTrend: [45, 52, 48, 55, 60, 58, 62],
            monthlyEvolution: [180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345]
        };
    },

    // GET /api/admin/stats
    getAdminStats: async () => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            healthIndex: 72,
            monthlyCases: {
                "Jan 2023": 180,
                "Feb 2023": 195,
                "Mar 2023": 210,
                "Apr 2023": 225,
                "May 2023": 240,
                "Jun 2023": 255,
                "Jul 2023": 270,
                "Aug 2023": 285,
                "Sep 2023": 300,
                "Oct 2023": 315,
                "Nov 2023": 330,
                "Dec 2023": 345
            },
            facultyComparison: {
                "Computer Science": 45,
                "Medicine": 32,
                "Engineering": 28,
                "Business": 15,
                "Law": 12,
                "Economics": 18
            },
            correlation: "Stress-related symptoms increase 32% during exam weeks. Academic performance shows negative correlation with high stress levels."
        };
    },

    // POST /api/booking/create
    createBooking: async (doctorId, date, time, complaint, studentName) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            status: "success",
            bookingId: Math.floor(Math.random() * 10000),
            message: LanguageManager.t('appointmentBookedSuccessfully'),
            doctorId,
            date,
            time,
            complaint
        };
    },

    // POST /api/ai/chat
    chat: async (message) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
    
        const text = message.toLowerCase();
    
        let reply = "Iltimos, alomatlaringizni aniqroq tasvirlab bering.";
    
        if (text.includes("uyqu") || text.includes("uxlay olmayapman")) {
            reply = "Uyqu jadvalini yaxshilash uchun soat 23:00 dan oldin uxlashga yoting va doimiy rejimga amal qiling. Uxlashdan 1 soat oldin ekranlardan foydalanmang.";
        }
        else if (text.includes("stress") || text.includes("asab")) {
            reply = "Stressni boshqarish uchun muntazam jismoniy mashqlar, chuqur nafas olish mashqlari va o‘qish paytida qisqa tanaffuslar qilishni tavsiya qilaman.";
        }
        else if (text.includes("bosh") || text.includes("boshim og`riyapti")) {
            reply = "Agar bosh og‘rig‘i tez-tez bezovta qilsa, yetarli suv ichayotganingizga ishonch hosil qiling, ekranlardan muntazam tanaffus qiling va to‘g‘ri holatda o‘tiring.";
        }
        else if (text.includes("charchoq") || text.includes("holdan toyish")) {
            reply = "Charchoqni kamaytirish uchun kuniga 7–9 soat uxlash, muvozanatli ovqatlanish va jismoniy faol bo‘lish muhim.";
        }
        else if (text.includes("xavotir") || text.includes("bezovta")) {
            reply = "Bezovtalikni kamaytirish uchun mindfulness meditatsiyasi, mushaklarni bosqichma-bosqich bo‘shashtirish mashqlari yoki maslahatchi bilan suhbatni sinab ko‘ring.";
        }
        else if (text.includes("ishtaha") || text.includes("ovqat yeyolmayapman")) {
            reply = "Agar ishtaha yo‘qolishi kuzatilsa, kamroq miqdorda, lekin tez-tez ovqatlanishga harakat qiling va yetarli suyuqlik iching.";
        }
        else if (text.includes("bel") || text.includes("orqa og`riq")) {
            reply = "Bel og‘rig‘i uchun to‘g‘ri ergonomikani ta’minlang, muntazam tanaffuslar qiling va yengil cho‘zilish mashqlarini bajaring.";
        }
    
        return { reply };
    },
    

    // GET /api/student/profile
    getStudentProfile: async (studentId) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            id: studentId,
            name: "Azizillo Toxirov",
            faculty: "Computer Science",
            course: 3,
            email: "azizillo@student.kuaf.uz",
            phone: "+998 90 123 45 67",
            pastSymptoms: ["Headache", "Fatigue", "Stress", "Insomnia"],
            contact: {
                email: "azizillo@student.kuaf.uz",
                phone: "+998 90 123 45 67",
                emergency: "+998 90 987 65 43"
            }
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockAPI;
}

