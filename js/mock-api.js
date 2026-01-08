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
    // Combination-based analysis engine for the fixed list of 10 symptoms
    submitReport: async (studentId, symptoms) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));

        const set = new Set(symptoms || []);

        const has = (name) => set.has(name);

        const S = {
            HEADACHE: "Bosh og'rig'i",
            FATIGUE: 'Surunkali charchoq',
            INSOMNIA: 'Uyqusizlik',
            NAUSEA: "Ko'ngil aynishi",
            COUGH: "Yo‘tal",
            DIZZINESS: 'Bosh aylanishi',
            TACHY: 'Yurak tez urishi',
            DYSPNEA: 'Nafas qisishi',
            RASH: 'Teri toshmasi va qichishish',
            ANXIETY: 'Bezovtalik va asabiylashish'
        };

        const count = symptoms.length;

        // Detect major interacting patterns
        const patterns = {
            cardioResp: has(S.DYSPNEA) && (has(S.TACHY) || has(S.DIZZINESS) || has(S.COUGH)),
            infectionResp: has(S.COUGH) && (has(S.HEADACHE) || has(S.NAUSEA) || has(S.FATIGUE)),
            neuroVestibular: has(S.HEADACHE) && has(S.DIZZINESS) && (has(S.NAUSEA) || has(S.INSOMNIA)),
            chronicFatigueStress: has(S.FATIGUE) && has(S.INSOMNIA) && has(S.ANXIETY),
            allergyDerm: has(S.RASH) && (has(S.COUGH) || has(S.DYSPNEA) || has(S.ANXIETY)),
            isolatedDerm: has(S.RASH) && count <= 2 && !has(S.DYSPNEA)
        };

        // Risk level calculation (LOW / MEDIUM / HIGH / CRITICAL)
        let riskLevel = 'LOW';

        // Critical patterns – suggest emergency-level care
        if (
            has(S.DYSPNEA) &&
            has(S.RASH) &&
            (has(S.TACHY) || has(S.DIZZINESS) || has(S.NAUSEA))
        ) {
            riskLevel = 'CRITICAL';
        } else if (
            (has(S.DYSPNEA) && has(S.TACHY)) ||
            (patterns.cardioResp && count >= 3)
        ) {
            riskLevel = 'HIGH';
        } else if (
            patterns.infectionResp && (has(S.DYSPNEA) || count >= 4)
        ) {
            riskLevel = 'HIGH';
        } else if (
            patterns.chronicFatigueStress ||
            patterns.neuroVestibular ||
            patterns.allergyDerm ||
            count >= 3
        ) {
            riskLevel = 'MEDIUM';
        } else {
            riskLevel = count <= 1 ? 'LOW' : 'MEDIUM';
        }

        // Map riskLevel to legacy risk/score for existing UI pieces
        const legacyRiskMap = {
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            CRITICAL: 'High'
        };

        const baseScore = count * 5;
        let score = baseScore;
        if (riskLevel === 'MEDIUM') score += 10;
        if (riskLevel === 'HIGH') score += 20;
        if (riskLevel === 'CRITICAL') score += 30;

        const risk = legacyRiskMap[riskLevel];
        const urgent = riskLevel === 'HIGH' || riskLevel === 'CRITICAL';

        // Possible conditions based on combinations
        const possibleConditions = [];

        if (patterns.cardioResp) {
            possibleConditions.push(
                "Yurak-qon tomir va nafas tizimi yuklamasi (yurak urish tezlashuvi va nafas qisishi birgalikda)",
                "Panik holat yoki tashvish bilan bog'liq yurak urishi va nafas qisishi"
            );
        }

        if (patterns.infectionResp) {
            possibleConditions.push(
                "Yuqori nafas yo'llari infeksiyasi (o‘tkir respirator infeksiya, bronxit kabi holatlar)",
                "Grippga o‘xshash o‘tkir holat (bosh og'rig'i, charchoq va yo‘tal kombinatsiyasi)"
            );
        }

        if (patterns.neuroVestibular) {
            possibleConditions.push(
                "Migren yoki kuchlanish bosh og'rig'i bosh aylanishi va ko'ngil aynishi bilan",
                "Vestibulyar buzilish (bosh aylanishi va muvozanat buzilishi bilan kechuvchi holatlar)"
            );
        }

        if (patterns.chronicFatigueStress) {
            possibleConditions.push(
                "Surunkali charchoq sindromi yoki uzoq davom etuvchi ortiqcha zo‘riqish",
                "Tashvish buzilishi yoki depressiv holat (uyqusizlik, charchoq va bezovtalik kombinatsiyasi)"
            );
        }

        if (patterns.allergyDerm) {
            possibleConditions.push(
                "Allergik reaksiyalar (teri toshmasi va qichishish, nafas yoki yo‘tal bilan birgalikda)"
            );
        } else if (patterns.isolatedDerm) {
            possibleConditions.push(
                "Mahalliy teri kasalligi yoki allergik dermatit (asosan teri toshmasi va qichishish)"
            );
        }

        // If still empty, provide broader but common explanations based on combined profile
        if (possibleConditions.length === 0 && count > 0) {
            if (count === 1) {
                possibleConditions.push(
                    "Yengil darajadagi funksional buzilish yoki vaqtinchalik noqulaylik (hozircha alomatlar cheklangan)"
                );
            } else if (count === 2) {
                possibleConditions.push(
                    "Bir-birini kuchaytiruvchi, ammo hozircha cheklangan kombinatsiyadagi alomatlar (masalan, ortiqcha zo‘riqish, yengil infeksiya yoki stress bilan bog‘liq holatlar)"
                );
            } else {
                possibleConditions.push(
                    "Bir nechta tizimlarga ta'sir qiluvchi holat (umumiy ahvolning yomonlashuvi, charchoq va uyqu buzilishi bilan birga keluvchi kasalliklar)"
                );
            }
        }

        // Doctor recommendation – determine exactly ONE dominant specialty (Uzbek names)
        let recommendedDoctor = null;

        // Strict validation rules (highest priority)
        if (has(S.COUGH) && has(S.DYSPNEA)) {
            recommendedDoctor = 'Pulmonolog'; // Yo‘tal + Nafas qisishi
        } else if (has(S.TACHY) || has(S.DYSPNEA)) {
            recommendedDoctor = 'Kardiolog'; // Yurak tez urishi OR Nafas qisishi
        } else if (has(S.ANXIETY) && has(S.INSOMNIA)) {
            recommendedDoctor = 'Psixiatr'; // Bezovtalik + Uyqusizlik
        }

        // Pattern-based selection if still not set
        if (!recommendedDoctor) {
            if (patterns.allergyDerm || patterns.isolatedDerm) {
                recommendedDoctor = 'Dermatolog';
            } else if (patterns.neuroVestibular) {
                recommendedDoctor = 'Nevrolog';
            } else if (patterns.chronicFatigueStress) {
                recommendedDoctor = 'Psixiatr';
            } else if (patterns.cardioResp) {
                // Cardio-respiratory without strict triggers
                recommendedDoctor = has(S.COUGH) ? 'Pulmonolog' : 'Kardiolog';
            } else if (patterns.infectionResp) {
                recommendedDoctor = 'Pulmonolog';
            } else if (has(S.NAUSEA) && count <= 3 && !has(S.COUGH) && !has(S.DYSPNEA)) {
                recommendedDoctor = 'Gastroenterolog';
            }
        }

        // Final fallback: only Terapevt when risk is Past and no dominant direction
        if (!recommendedDoctor && riskLevel === 'LOW') {
            recommendedDoctor = 'Terapevt';
        }

        // Action advice (1–2 short steps)
        let actionAdvice = '';
        if (riskLevel === 'LOW') {
            actionAdvice =
                "1) Alomatlarni 24–48 soat davomida kuzating. 2) Agar yangi alomatlar qo‘shilsa yoki holat yomonlashsa, shifokor bilan bog‘laning.";
        } else if (riskLevel === 'MEDIUM') {
            actionAdvice =
                "1) Yaqin kunlarda terapevt yoki tegishli mutaxassis bilan maslahatga boring. 2) Dam olish, yetarli suv ichish va kuchli zo‘riqishlardan qochishga harakat qiling.";
        } else if (riskLevel === 'HIGH') {
            actionAdvice =
                "1) Imkon qadar tezroq shifokor ko‘rigiga boring (bugun yoki ertaga). 2) Alomatlar kuchaysa yoki yangi jiddiy belgilar qo‘shilsa, kechiktirmay shoshilinch yordam chaqiring.";
        } else if (riskLevel === 'CRITICAL') {
            actionAdvice =
                "1) Darhol shoshilinch tibbiy yordam chaqiring yoki eng yaqin shifoxonaga boring. 2) Yolg‘iz qolmang va yaqinlaringizni xabardor qiling.";
        }

        const disclaimer =
            "Bu tizim natijalari taxminiy bo‘lib, rasmiy tibbiy tashxis emas. Yakuniy baholash va davolash uchun albatta shifokorga murojaat qiling.";

        const detectedSymptoms =
            symptoms && symptoms.length ? symptoms.join(', ') : "Hech qanday alomat tanlanmadi";

        // Get current language to determine output language
        const currentLang = LanguageManager?.currentLang || 'uz';
        
        // Translate risk level based on language
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
        const riskLevelDisplay = riskLevelTranslations[currentLang]?.[riskLevel] || riskLevel;
        
        // Structured text block for UI (STRICT format) - Uzbek only when interface is Uzbek
        let structuredConclusion = '';
        if (currentLang === 'uz') {
            structuredConclusion =
`- Aniqlangan alomatlar: ${detectedSymptoms}
- Mumkin bo'lgan kasalliklar (kombinatsiyalar asosida): ${possibleConditions.join('; ')}
- Xavf darajasi: ${riskLevelDisplay}
- Tavsiya etilgan shifokor: ${recommendedDoctor}
- Harakat tavsiyalari (1–2 qisqa qadam): ${actionAdvice}

${disclaimer}`;
        } else {
            structuredConclusion =
`- Detected symptoms: ${detectedSymptoms}
- Possible conditions (based on combinations): ${possibleConditions.join('; ')}
- Risk level: ${riskLevelDisplay}
- Recommended doctor: ${recommendedDoctor}
- Action advice (1–2 short steps only): ${actionAdvice}

${disclaimer}`;
        }

        // Also keep legacy fields so existing components continue working
        const recommendations = {
            Low: LanguageManager.t('lowRiskRecommendation'),
            Medium: LanguageManager.t('mediumRiskRecommendation'),
            High: LanguageManager.t('highRiskRecommendation')
        };

        return {
            // New structured fields
            riskLevel,
            detectedSymptoms,
            possibleConditions: possibleConditions,
            recommendedDoctor,
            actionAdvice,
            disclaimer,
            conclusionText: structuredConclusion,

            // Legacy fields for compatibility
            risk,
            score,
            recommendation: recommendations[risk] || '',
            urgent,
            suggestedDoctors: risk !== "Low" ? [1, 2, 3] : [],
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/doctors - returns all doctors in database
    getDoctors: async () => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return [
            {
                id: 1,
                name: "Dr. Alisher Aliev",
                specialty: "Terapevt",
                specialtyEn: "General Practitioner",
                experience: "15 yil",
                price: "50000 UZS",
                available: true
            },
            {
                id: 2,
                name: "Dr. Farida Karimova",
                specialty: "Psixolog",
                specialtyEn: "Psychologist",
                experience: "10 yil",
                price: "60000 UZS",
                available: true
            },
            {
                id: 3,
                name: "Dr. Bobur Toshmatov",
                specialty: "Kardiolog",
                specialtyEn: "Cardiologist",
                experience: "20 yil",
                price: "80000 UZS",
                available: true
            },
            {
                id: 4,
                name: "Dr. Malika Yusupova",
                specialty: "Nevrolog",
                specialtyEn: "Neurologist",
                experience: "12 yil",
                price: "70000 UZS",
                available: true
            }
        ];
    },

    // GET /api/doctors/by-specialty - returns doctors filtered by specialty, auto-generates if needed
    getDoctorsBySpecialty: async (requiredSpecialty) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        // Get all doctors
        const allDoctors = await MockAPI.getDoctors();
        
        // Map Uzbek specialty names to match database
        const specialtyMap = {
            'Terapevt': ['Terapevt', 'General Practitioner'],
            'Pulmonolog': ['Pulmonolog', 'Pulmonologist'],
            'Kardiolog': ['Kardiolog', 'Cardiologist'],
            'Nevrolog': ['Nevrolog', 'Neurologist'],
            'Dermatolog': ['Dermatolog', 'Dermatologist'],
            'Gastroenterolog': ['Gastroenterolog', 'Gastroenterologist'],
            'Psixiatr': ['Psixiatr', 'Psychiatrist'],
            'Psixolog': ['Psixolog', 'Psychologist']
        };
        
        // Find matching doctors
        const matchingDoctors = allDoctors.filter(doctor => {
            const specialties = specialtyMap[requiredSpecialty] || [requiredSpecialty];
            return specialties.includes(doctor.specialty) || 
                   (doctor.specialtyEn && specialties.includes(doctor.specialtyEn));
        });
        
        // If no matching doctors found, auto-generate them
        if (matchingDoctors.length === 0) {
            const generatedDoctors = MockAPI.generateDoctorsForSpecialty(requiredSpecialty);
            return generatedDoctors.slice(0, 4); // Return 1-4 doctors
        }
        
        // Return 1-4 matching doctors
        return matchingDoctors.slice(0, 4);
    },

    // Auto-generate doctors for a specialty if none exist
    generateDoctorsForSpecialty: (specialty) => {
        const doctorTemplates = {
            'Terapevt': [
                { name: "Dr. Alisher Aliev", experience: "15 yil", price: "50000 UZS" },
                { name: "Dr. Rustam Karimov", experience: "12 yil", price: "48000 UZS" },
                { name: "Dr. Malika Toshmatova", experience: "18 yil", price: "55000 UZS" },
                { name: "Dr. Farhod Yusupov", experience: "10 yil", price: "45000 UZS" }
            ],
            'Pulmonolog': [
                { name: "Dr. Shavkat Rahimov", experience: "16 yil", price: "75000 UZS" },
                { name: "Dr. Dilshoda Alimova", experience: "14 yil", price: "72000 UZS" },
                { name: "Dr. Azizbek Toshmatov", experience: "11 yil", price: "70000 UZS" },
                { name: "Dr. Nigora Karimova", experience: "13 yil", price: "73000 UZS" }
            ],
            'Kardiolog': [
                { name: "Dr. Bobur Toshmatov", experience: "20 yil", price: "85000 UZS" },
                { name: "Dr. Gulnora Alieva", experience: "17 yil", price: "82000 UZS" },
                { name: "Dr. Javohir Rahimov", experience: "15 yil", price: "80000 UZS" },
                { name: "Dr. Madina Yusupova", experience: "13 yil", price: "78000 UZS" }
            ],
            'Nevrolog': [
                { name: "Dr. Malika Yusupova", experience: "12 yil", price: "70000 UZS" },
                { name: "Dr. Temur Alimov", experience: "14 yil", price: "72000 UZS" },
                { name: "Dr. Sevara Karimova", experience: "11 yil", price: "68000 UZS" },
                { name: "Dr. Bekzod Toshmatov", experience: "16 yil", price: "75000 UZS" }
            ],
            'Dermatolog': [
                { name: "Dr. Zulfiya Rahimova", experience: "10 yil", price: "65000 UZS" },
                { name: "Dr. Sardor Aliev", experience: "12 yil", price: "68000 UZS" },
                { name: "Dr. Nigora Toshmatova", experience: "9 yil", price: "62000 UZS" },
                { name: "Dr. Azamat Karimov", experience: "11 yil", price: "66000 UZS" }
            ],
            'Gastroenterolog': [
                { name: "Dr. Feruza Alimova", experience: "13 yil", price: "70000 UZS" },
                { name: "Dr. Olimjon Yusupov", experience: "15 yil", price: "73000 UZS" },
                { name: "Dr. Dilbar Rahimova", experience: "11 yil", price: "68000 UZS" },
                { name: "Dr. Shohruh Toshmatov", experience: "14 yil", price: "72000 UZS" }
            ],
            'Psixiatr': [
                { name: "Dr. Farida Karimova", experience: "10 yil", price: "60000 UZS" },
                { name: "Dr. Akmal Aliev", experience: "12 yil", price: "65000 UZS" },
                { name: "Dr. Lola Yusupova", experience: "9 yil", price: "58000 UZS" },
                { name: "Dr. Rustam Rahimov", experience: "11 yil", price: "62000 UZS" }
            ],
            'Psixolog': [
                { name: "Dr. Nargiza Toshmatova", experience: "8 yil", price: "55000 UZS" },
                { name: "Dr. Jamshid Alimov", experience: "10 yil", price: "60000 UZS" },
                { name: "Dr. Malika Karimova", experience: "7 yil", price: "52000 UZS" },
                { name: "Dr. Azizbek Yusupov", experience: "9 yil", price: "57000 UZS" }
            ]
        };
        
        const templates = doctorTemplates[specialty] || doctorTemplates['Terapevt'];
        const specialtyEnMap = {
            'Terapevt': 'General Practitioner',
            'Pulmonolog': 'Pulmonologist',
            'Kardiolog': 'Cardiologist',
            'Nevrolog': 'Neurologist',
            'Dermatolog': 'Dermatologist',
            'Gastroenterolog': 'Gastroenterologist',
            'Psixiatr': 'Psychiatrist',
            'Psixolog': 'Psychologist'
        };
        
        let nextId = 100; // Start from high ID to avoid conflicts
        
        return templates.map(template => ({
            id: nextId++,
            name: template.name,
            specialty: specialty,
            specialtyEn: specialtyEnMap[specialty] || specialty,
            experience: template.experience,
            price: template.price,
            available: true
        }));
    },

    // GET /api/student/history
    getStudentHistory: async (studentId) => {
        await new Promise(resolve => setTimeout(resolve, MockAPI.delay()));
        
        return {
            reports: [
                {
                    date: "2024-01-15",
                    symptoms: ["Bosh og'rig'i", "Surunkali charchoq", "Uyqusizlik"],
                    risk: "Medium",
                    score: 55
                },
                {
                    date: "2024-01-08",
                    symptoms: ["Uyqusizlik", "Bezovtalik va asabiylashish"],
                    risk: "Medium",
                    score: 45
                },
                {
                    date: "2023-12-20",
                    symptoms: ["Yo‘tal", "Nafas qisishi", "Yurak tez urishi"],
                    risk: "High",
                    score: 80
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
                "Bosh og'rig'i": 35,
                "Surunkali charchoq": 28,
                "Uyqusizlik": 25,
                "Ko'ngil aynishi": 20,
                "Yo‘tal": 18,
                "Bosh aylanishi": 15,
                "Yurak tez urishi": 12,
                "Nafas qisishi": 10,
                "Teri toshmasi va qichishish": 8,
                "Bezovtalik va asabiylashish": 30
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
            correlation: "Surunkali charchoq, uyqusizlik va bezovtalik bilan asabiylashish imtihon haftalarida 30–35% ga oshadi. Akademik ko‘rsatkichlar bu alomatlar kombinatsiyasining yuqori darajasi bilan salbiy korrelyatsiyaga ega."
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
            pastSymptoms: [
                "Bosh og'rig'i",
                "Surunkali charchoq",
                "Uyqusizlik",
                "Bezovtalik va asabiylashish"
            ],
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

// Expose MockAPI globally for HTML access
if (typeof window !== 'undefined') {
    window.MockAPI = MockAPI;
}

