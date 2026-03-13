const CPX_APP_ID = "31886"; 

// 1. INICIO Y SALDO
document.addEventListener('DOMContentLoaded', () => {
    actualizarPantalla();
    const params = new URLSearchParams(window.location.search);
    const monto = params.get('amount_usd');
    if (monto) {
        let saldo = parseFloat(localStorage.getItem('saldo_real') || "0.00");
        saldo += parseFloat(monto);
        localStorage.setItem('saldo_real', saldo.toFixed(2));
        alert("¡Recibiste $" + monto + " USD!");
        window.history.replaceState({}, document.title, window.location.pathname);
        actualizarPantalla();
    }
});

function actualizarPantalla() {
    document.getElementById('user-balance').innerText = localStorage.getItem('saldo_real') || "0.00";
}

// 2. CAMBIO DE PESTAÑAS
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.replace('text-blue-500', 'text-gray-500'));
    event.currentTarget.classList.replace('text-gray-500', 'text-blue-500');
}

// 3. COMPARTIR APP
function compartirApp() {
    const texto = `¡Mira esta app para ganar dinero! 🤑 Regístrate aquí: ${window.location.href}`;
    if (navigator.share) {
        navigator.share({ title: 'Easy Money', text: texto, url: window.location.href });
    } else {
        alert("Copia tu link: " + window.location.href);
    }
}

// 4. SOLICITAR RETIRO
function solicitarRetiro() {
    const saldo = parseFloat(localStorage.getItem('saldo_real') || "0.00");
    const email = document.getElementById('paypal-email').value;

    if (saldo < 10) {
        alert("Necesitas al menos $10.00 USD. ¡Sigue completando encuestas!");
    } else if (!email.includes("@")) {
        alert("Escribe un correo de PayPal válido.");
    } else {
        alert("Solicitud enviada para: " + email + ". Revisaremos tu actividad.");
        // Aquí podrías conectar un servicio de correo si quisieras recibir la notificación
    }
}

function openOffer(tipo) {
    const uid = localStorage.getItem('easy_money_user_id') || 'user_' + Math.random().toString(36).substring(7);
    window.open(`https://publisher.cpx-research.com/index.php?app_id=${CPX_APP_ID}&ext_user_id=${uid}`, '_blank');
}
