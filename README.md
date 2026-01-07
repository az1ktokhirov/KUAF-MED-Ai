# KUAF MED AI - Frontend Prototype

AI-powered university student health monitoring system - Investor-grade frontend prototype.

## 📋 Overview

KUAF MED AI is a comprehensive health monitoring system for university students. This is a **frontend-only prototype** built with pure HTML, CSS, and JavaScript (vanilla) - no frameworks, no backend. All data comes from a mock API.

## 🚀 Installation & Running

### Option 1: Using npx serve (Recommended)
```bash
npx serve
```
Then open `http://localhost:3000` in your browser.

### Option 2: Using Python HTTP Server
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js http-server
```bash
npm install -g http-server
http-server
```

## 📁 Project Structure

```
/kuaf-med-ai-frontend
  /assets
      logo-kuaf.png
      logo-medai.png
      qr-placeholder.png
      icons/
  /css
      style.css
  /js
      app.js          # Main app, localization
      student.js      # Student module
      dashboard.js    # Doctor dashboard
      admin.js        # Admin analytics
      auth.js         # Authentication
      booking.js      # Appointment booking
      chat.js         # AI chat assistant
      mock-api.js     # Mock API endpoints
  index.html          # Landing page
  login.html          # Login page
  student.html        # Student interface
  dashboard.html      # Doctor dashboard
  admin.html          # Admin analytics
  booking.html        # Appointment booking
  chat.html           # AI chat assistant
  README.md
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Responsive**: Works on mobile, tablet, and desktop
- **Color Scheme**: 
  - Primary Blue: #005BBD
  - Red: Risk indicators only
  - White: Background
- **Accessibility**: ARIA labels, keyboard navigation support
- **Localization**: Uzbek (default) and English language support

## 📄 Pages Overview

### 1. **index.html** - Landing Page
Welcome page with overview of the system features.

### 2. **login.html** - Authentication
- Email and password input
- Role selector (Student / Doctor / Admin)
- Language switcher
- Mock authentication (no real backend)

**Test Credentials:**
- Any email/password works
- Select role: Student, Doctor, or Admin

### 3. **student.html** - Student Module
Main interface for students:
- **Symptom Selection**: 15 selectable symptoms
- **Risk Assessment**: Automatic risk calculation (Low/Medium/High)
- **Results Display**: Color-coded risk cards with recommendations
- **Doctor Suggestions**: List of available doctors (if risk is Medium/High)
- **QR Health Code**: Placeholder QR code for medical staff scanning
- **Medical History**: Previous reports and visits

**Features:**
- Select multiple symptoms
- Submit for risk assessment
- Low risk → Redirect to AI Assistant
- Medium/High risk → Show doctor booking options

### 4. **booking.html** - Appointment Booking
- Doctor information display
- Date and time selection
- Complaint description
- Student name (auto-filled)
- Mock booking creation

### 5. **dashboard.html** - Doctor Dashboard
Medical staff interface:
- **Hot List Table**: Students with risk levels, priority tags
- **Filters**: By faculty, course, risk level
- **Charts** (Chart.js):
  - Bar chart: Cases per faculty
  - Pie chart: Symptom distribution
  - Line chart: Weekly risk trend
  - Area chart: Monthly risk evolution
- **Student Profile Modal**: Click to view detailed student information

### 6. **admin.html** - Admin Analytics
University-level analytics:
- **Health Index**: Large numeric metric (0-100)
- **Seasonal Trend Chart**: Monthly cases over time
- **Faculty Comparison**: Bar chart comparing faculties
- **Academic Performance Correlation**: Text analysis
- **Recommendation Cards**: 4 actionable recommendations

### 7. **chat.html** - AI Chat Assistant
Interactive chat interface:
- Chat bubble messages
- Loading animations
- Suggested quick replies
- Auto-scroll to latest message
- Mock AI responses

## 🔌 API Documentation

All endpoints are mocked in `mock-api.js` with 400-700ms delays to simulate real API calls.

### Authentication
- **POST /api/login**
  - Body: `{ email, password, role }`
  - Response: `{ status, role, token, name, id }`

### Student
- **POST /api/student/report**
  - Body: `{ studentId, symptoms: [] }`
  - Response: `{ risk, score, recommendation, urgent, suggestedDoctors: [] }`

- **GET /api/student/history**
  - Response: `{ reports: [], visits: [], trend: [] }`

- **GET /api/student/profile**
  - Response: `{ id, name, faculty, course, email, phone, pastSymptoms: [] }`

### Doctors
- **GET /api/doctors**
  - Response: `[{ id, name, specialty, experience, price, available }]`

### Booking
- **POST /api/booking/create**
  - Body: `{ doctorId, date, time, complaint, studentName }`
  - Response: `{ status, bookingId, message }`

### Dashboard
- **GET /api/dashboard/hot**
  - Query: `?faculty=&course=&risk=`
  - Response: `[{ id, name, faculty, course, risk, score, priority, lastReport }]`

- **GET /api/dashboard/stats**
  - Response: `{ facultyCases: {}, symptomDistribution: {}, weeklyTrend: [], monthlyEvolution: [] }`

### Admin
- **GET /api/admin/stats**
  - Response: `{ healthIndex, monthlyCases: {}, facultyComparison: {}, correlation }`

### AI Chat
- **POST /api/ai/chat**
  - Body: `{ message }`
  - Response: `{ reply }`

## 🧪 Test Scenarios

### Scenario 1: Student Login and Symptom Submission
1. Go to `login.html`
2. Enter any email/password
3. Select "Talaba" (Student) role
4. Click "Kirish"
5. On `student.html`, select symptoms (e.g., Headache, Stress, Fatigue)
6. Click "Belgilarni yuborish"
7. View risk assessment results
8. If Low risk → Click "AI Yordamchini ochish"
9. If Medium/High risk → View doctor suggestions

### Scenario 2: Doctor Booking
1. From student page, click "Vaqt belgilash" on a doctor card
2. Fill in date, time, and complaint description
3. Submit booking
4. See success message

### Scenario 3: Doctor Dashboard
1. Login as "Shifokor" (Doctor)
2. View hot list table
3. Apply filters (faculty, course, risk)
4. Click "Profil" on a student to see details
5. View charts (cases per faculty, symptom distribution, trends)

### Scenario 4: Admin Analytics
1. Login as "Administrator" (Admin)
2. View University Health Index
3. Examine seasonal trend chart
4. Review faculty comparison
5. Read academic performance correlation
6. Check recommendation cards

### Scenario 5: AI Chat Assistant
1. From student page (Low risk) or direct navigation
2. Open `chat.html`
3. Type a message or click suggested reply
4. See AI response with loading animation
5. Continue conversation

### Scenario 6: Medical History
1. As student, scroll to "Tibbiy tarix" section
2. View previous reports with dates, symptoms, and risk scores
3. See last doctor visits

### Scenario 7: QR Health Code
1. As student, view QR code section
2. See placeholder QR code
3. Read description about scanning by medical staff

## 🌍 Localization

The system supports two languages:
- **Uzbek (uz)** - Default
- **English (en)**

Language preference is saved in `localStorage` and persists across sessions.

To switch language, click the language buttons in the header.

## 🎯 Key Features

✅ **No Backend Required**: All data is mocked  
✅ **Responsive Design**: Mobile-first approach  
✅ **Modern UI**: Clean, professional interface  
✅ **Chart Visualizations**: Using Chart.js  
✅ **Real-time Feel**: Loading states and animations  
✅ **Accessibility**: ARIA labels, keyboard navigation  
✅ **Localization**: Multi-language support  
✅ **Mock Authentication**: Role-based access control  

## 📝 Notes

- All data is **mock data** - no real backend
- Authentication is **simulated** - any credentials work
- Charts use **Chart.js** (loaded from CDN)
- QR code uses placeholder image
- All API calls have **400-700ms delays** to simulate network latency

## 🔧 Customization

### Adding New Symptoms
Edit `js/student.js`:
```javascript
symptoms: [
    'Headache', 'Fever', 'Insomnia', ...
    // Add your symptom here
]
```

### Modifying Colors
Edit `css/style.css`:
```css
:root {
    --primary-blue: #005BBD;
    --primary-red: #DC3545;
    /* Modify colors here */
}
```

### Adding New Languages
Edit `js/app.js`:
```javascript
const lang = {
    uz: {...},
    en: {...},
    ru: {...}  // Add new language
};
```

## 📞 Support

For questions or issues, please refer to the code comments or contact the development team.

## 📄 License

This is a prototype for investor presentation purposes.

---

**Built with ❤️ for KUAF MED AI**

