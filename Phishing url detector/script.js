// --- TAILWIND CONFIG ---
// This must be defined for custom colors to work
tailwind.config = {
    theme: {
        extend: {
            colors: {
                cyber: '#3DFF3D',
                cyberDark: '#1a8c1a',
                darkBg: '#020302',
                glassLight: 'rgba(61, 255, 61, 0.1)',
                glassDark: 'rgba(2, 3, 2, 0.8)'
            },
            fontFamily: {
                cyber: ['Orbitron', 'sans-serif'],
                modern: ['Space Grotesk', 'sans-serif'],
            }
        }
    }
}

// --- NAVIGATION LOGIC ---
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- FLASK INTEGRATION: SCANNER LOGIC ---
async function scanURL() {
    const urlInput = document.getElementById('urlInput');
    const spinner = document.getElementById('spinner');
    const resultDiv = document.getElementById('result');
    const scanBtn = document.querySelector('.scan-btn');

    if (!urlInput.value) {
        alert("Please enter a URL");
        return;
    }

    resultDiv.style.display = 'none';
    resultDiv.className = 'result';
    spinner.style.display = 'block';
    scanBtn.disabled = true;
    scanBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> SCANNING...';

    try {
        // Ensure your Flask route /scan is active
        const response = await fetch('/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput.value })
        });

        const data = await response.json();
        spinner.style.display = 'none';
        scanBtn.disabled = false;
        scanBtn.innerHTML = '<i class="fas fa-shield-alt"></i> SCAN';

        resultDiv.style.display = 'block';
        resultDiv.classList.add(data.status);
        document.getElementById('resultIcon').innerHTML = data.icon;
        document.getElementById('resultTitle').textContent = data.title;
        document.getElementById('resultMessage').textContent = data.message;

        let detailsHtml = '<div class="details-title">Analysis Report</div>';
        for (const [key, value] of Object.entries(data.details)) {
            detailsHtml += `<div class="detail-item"><span style="color:rgba(255,255,255,0.7)">${key}:</span> <span style="float:right; color:#fff; font-weight:bold">${value}</span></div>`;
        }
        document.getElementById('resultDetails').innerHTML = detailsHtml;

    } catch (error) {
        console.error('Error:', error);
        spinner.style.display = 'none';
        scanBtn.disabled = false;
        scanBtn.innerHTML = 'RETRY SCAN';
        alert("Server connection failed. Is Flask running?");
    }
}

// --- LOGIN LOGIC ---
let currentUser = {};
let otpTimer = 60;
let otpInterval = null;

function switchLoginTab(tab) {
    document.querySelectorAll('.form-container').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.error-text').forEach(el => el.classList.remove('show'));
    document.getElementById(tab + 'Form').classList.remove('hidden');
    const btns = document.querySelectorAll('.tab-btn');
    if(tab === 'login') btns[0].classList.add('active'); else btns[1].classList.add('active');
}

function togglePassword(id) {
    const input = document.getElementById(id);
    const toggleBtn = input.parentElement.querySelector('.password-toggle');
    if (input.type === "password") { 
        input.type = "text"; 
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>'; 
    } else { 
        input.type = "password"; 
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'; 
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    if (!email.includes('@')) { 
        const el = document.getElementById('loginEmailError');
        el.textContent = 'Invalid email'; el.classList.add('show'); return; 
    }
    currentUser.email = email;
    initOTP();
}

function handleSignup() {
    const email = document.getElementById('signupEmail').value;
    if (!email.includes('@')) {
        const el = document.getElementById('signupEmailError');
        el.textContent = 'Invalid email'; el.classList.add('show'); return;
    }
    currentUser.email = email;
    initOTP();
}

function socialLogin(provider) {
    alert(`Connecting to secure ${provider} gateway...`);
    currentUser.email = `user@${provider.toLowerCase()}.com`;
    initOTP();
}

function initOTP() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('otpContainer').classList.remove('hidden');
    document.getElementById('otpEmailDisplay').textContent = currentUser.email;
    otpTimer = 60;
    startOtpTimer();
}

function startOtpTimer() {
    const timerEl = document.getElementById('otpTimer');
    const resendBtn = document.getElementById('resendBtn');
    if (otpInterval) clearInterval(otpInterval);
    otpInterval = setInterval(() => {
        otpTimer--;
        timerEl.textContent = otpTimer + 's';
        resendBtn.disabled = true;
        if (otpTimer <= 0) {
            clearInterval(otpInterval);
            timerEl.textContent = 'Resend available';
            resendBtn.disabled = false;
        }
    }, 1000);
}

function handleOtpInput(input, index) {
    if (input.value.length === 1) {
        const next = document.querySelectorAll('.otp-input')[index + 1];
        if (next) next.focus();
    }
}

function handleOtpVerify() {
    const inputs = document.querySelectorAll('.otp-input');
    let code = '';
    inputs.forEach(i => code += i.value);
    if (code.length === 4) {
        clearInterval(otpInterval);
        document.getElementById('otpContainer').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');
        setTimeout(() => navigateTo('dashboard'), 2000);
    } else {
        const el = document.getElementById('otpError');
        el.textContent = 'Invalid Code. Try 1234'; el.classList.add('show');
    }
}

// --- CHARTS INITIALIZATION ---
function initCharts() {
    const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#00FF47', font: { family: "'Space Grotesk', sans-serif" } } } },
        scales: {
            y: { ticks: { color: '#00FF47' }, grid: { color: 'rgba(0, 255, 71, 0.1)' } },
            x: { ticks: { color: '#00FF47' }, grid: { color: 'rgba(0, 255, 71, 0.1)' } }
        }
    };

    const ctxLine = document.getElementById('lineChart');
    if(ctxLine) new Chart(ctxLine.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                { label: 'Total Scans', data: [450, 520, 480, 690, 720, 340, 640], borderColor: '#00FF47', backgroundColor: 'rgba(0, 255, 71, 0.1)', borderWidth: 3, fill: true, tension: 0.4 },
                { label: 'Threats Detected', data: [35, 48, 42, 67, 85, 28, 53], borderColor: '#FF4444', backgroundColor: 'rgba(255, 68, 68, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }
            ]
        },
        options: chartOptions
    });

    const ctxPie = document.getElementById('pieChart');
    if(ctxPie) new Chart(ctxPie.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Safe URLs', 'Malicious URLs', 'Suspicious URLs'],
            datasets: [{ data: [1850, 147, 95], backgroundColor: ['#00FF47', '#FF4444', '#FFD700'], borderColor: '#000000', borderWidth: 2 }]
        },
        options: chartOptions
    });

    const ctxBar = document.getElementById('barChart');
    if(ctxBar) new Chart(ctxBar.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Russia', 'China', 'India', 'Nigeria', 'Vietnam'],
            datasets: [{ label: 'Threat Count', data: [42, 38, 35, 28, 24], backgroundColor: ['#FF4444', '#FF6B6B', '#FFD700', '#FFA500', '#00FF47'], borderColor: '#00FF47', borderWidth: 2, borderRadius: 6 }]
        },
        options: chartOptions
    });
}

// --- MATRIX ANIMATION ---
const matrix = document.getElementById("matrixCanvas");
const ctx = matrix.getContext("2d");
function resizeMatrix() { matrix.height = window.innerHeight; matrix.width = window.innerWidth; }
resizeMatrix();
window.addEventListener('resize', resizeMatrix);
const characters = "01PHISHGUARD";
const fontSize = 14;
const columns = matrix.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
function drawMatrix() {
    if(!document.getElementById('page-login').classList.contains('active')) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrix.width, matrix.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash === 'landing' || hash === 'login' || hash === 'dashboard')) {
        navigateTo(hash);
    } else {
        navigateTo('scanner');
    }
    initCharts();
});