import { API_BASE_URL } from '../db/Routes';

class AuthService {
    private baseUrl = API_BASE_URL;

    // Login function
    async login(email: string, password: string) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const userData = await response.json();
                
                // Store token and user data
                localStorage.setItem('admin_token', userData.token);
                localStorage.setItem('admin_user', JSON.stringify({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email
                }));
                
                return userData;
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Check if user is authenticated
    async checkAuth() {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            console.log('No token found in localStorage');
            return false;
        }

        try {
            const user = await this.getCurrentUser(token);
            if (user && user.id) {
                console.log('User authenticated successfully');
                return user;
            } else {
                console.log('Invalid user data received');
                this.logout();
                return false;
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            // Token is invalid, remove it
            this.logout();
            return false;
        }
    }

    // Get current user
    async getCurrentUser(token?: string) {
        const authToken = token || this.getToken();
        if (!authToken) throw new Error('No token available');

        const response = await fetch(`${this.baseUrl}/user`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
            }
        });

        if (response.ok) {
            const userData = await response.json();
            // Validate user data structure
            if (userData && userData.id && userData.email) {
                // Update stored user data
                localStorage.setItem('admin_user', JSON.stringify(userData));
                return userData;
            } else {
                throw new Error('Invalid user data received from server');
            }
        } else if (response.status === 401) {
            throw new Error('Token expired or invalid');
        } else {
            throw new Error(`Server error: ${response.status}`);
        }
    }

    // Logout function
    logout() {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }

    // Get stored token
    getToken() {
        return localStorage.getItem('admin_token');
    }

    // Get stored user data
    getUser() {
        const userData = localStorage.getItem('admin_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Check if user is logged in (without API call)
    isLoggedIn() {
        return !!this.getToken();
    }

    // Make authenticated API calls
    async makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
        const token = this.getToken();
        if (!token) throw new Error('No authentication token');

        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        });

        if (response.status === 401) {
            // Token expired, logout user
            this.logout();
            throw new Error('Authentication expired');
        }

        return response;
    }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
