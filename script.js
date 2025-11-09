const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('message-box');
const dashboardUserInfo = document.getElementById('dashboard-user-info');

let registeredUser = null; 

const handleFormSubmission = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const isLogin = form.id === 'login-form';
    
    const emailInput = isLogin ? document.getElementById('login-email') : document.getElementById('register-email');
    const passwordInput = isLogin ? document.getElementById('login-password') : document.getElementById('register-password');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    if (!isLogin) {
        const confirmPassword = document.getElementById('register-confirm-password').value;
        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }
        
        registeredUser = { email: email, password: password };
        
        form.reset();
        showMessage('Registration successful! Please log in now.', 'success');
        switchView('login'); 
    } else {
        if (!registeredUser) {
            showMessage('No accounts found. Please register first!', 'error');
            return;
        }
        
        if (email === registeredUser.email && password === registeredUser.password) {
            form.reset();
            switchView('dashboard', email, 'logged in');
        } else {
            showMessage('Login failed. Invalid email or password.', 'error');
        }
    }
};

loginForm.addEventListener('submit', handleFormSubmission);
registerForm.addEventListener('submit', handleFormSubmission);

const switchView = (view, email = '', action = '') => {
    loginContainer.classList.add('hidden');
    registerContainer.classList.add('hidden');
    dashboardContainer.classList.add('hidden');
    
    if (view === 'login') {
        loginContainer.classList.remove('hidden');
    } else if (view === 'register') {
        registerContainer.classList.remove('hidden');
    } else if (view === 'dashboard') {
        dashboardContainer.classList.remove('hidden');
        dashboardUserInfo.textContent = `User: ${email}`;
        showMessage(`Success! You have been successfully ${action}.`, 'success');
    }
};

const showMessage = (message, type) => {
    messageBox.textContent = message; 
    
    messageBox.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 p-4 text-sm font-medium rounded-lg shadow-xl transition-opacity duration-300 z-50';
    
    if (type === 'success') {
        messageBox.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
        messageBox.classList.add('bg-red-100', 'text-red-700');
    }

    messageBox.classList.remove('hidden');

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
};

switchView('login');

window.switchView = switchView;