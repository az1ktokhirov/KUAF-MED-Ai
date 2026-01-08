// Authentication module

const Auth = {
    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('authToken');
    },
    
    // Get current user role
    getRole() {
        return localStorage.getItem('userRole');
    },
    
    // Get current user name
    getName() {
        return localStorage.getItem('userName');
    },
    
    // Get current user ID
    getUserId() {
        return localStorage.getItem('userId');
    },
    
    // Login
    async login(email, password, role) {
        try {
            const response = await MockAPI.login(email, password, role);
            
            if (response.status === 'success') {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userRole', response.role);
                localStorage.setItem('userName', response.name);
                if (response.id) {
                    localStorage.setItem('userId', response.id);
                }
                
                return { success: true, role: response.role };
            } else {
                return { success: false, message: response.message || LanguageManager.t('loginFailed') };
            }
        } catch (error) {
            return { success: false, message: LanguageManager.t('networkError') };
        }
    },
    
    // Logout
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        window.location.href = 'login.html';
    },
    
    // Require authentication (redirect if not logged in)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },
    
    // Require specific role
    requireRole(requiredRole) {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        
        const userRole = this.getRole();
        if (userRole !== requiredRole) {
            // Redirect based on actual role
            if (userRole === 'student') {
                window.location.href = 'student.html';
            } else if (userRole === 'doctor') {
                window.location.href = 'dashboard.html';
            } else if (userRole === 'admin') {
                window.location.href = 'admin.html';
            }
            return false;
        }
        return true;
    }
};

// Expose Auth globally for HTML access
if (typeof window !== 'undefined') {
    window.Auth = Auth;
}

