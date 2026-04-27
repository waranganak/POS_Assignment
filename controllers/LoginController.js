import { authenticate } from '../models/UserModel.js';

const loginSection = document.getElementById('login_section');
const mainContent = document.getElementById('main-content-wrapper');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('login-error-msg');

window.navigateToSection = function(sectionId) {
    const sections = ['home_section', 'customer_section', 'item_section', 'order_section'];
    
    sections.forEach(s => {
        const element = document.getElementById(s);
        if (element) {
            element.style.display = (s === sectionId) ? 'block' : 'none';
        }
    });
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameVal = document.getElementById('username').value;
    const passwordVal = document.getElementById('password').value;

    if (authenticate(usernameVal, passwordVal)) {
        loginSection.style.display = 'none';
        
        mainContent.style.display = 'block';

        window.navigateToSection('home_section');
        
        console.log("Login Success!");
    } else {
        errorMsg.innerText = "Invalid username or password!";
    }
});