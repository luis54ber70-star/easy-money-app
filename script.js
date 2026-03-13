// === CONFIGURACIÓN OFICIAL EASY MONEY ===
const CPX_APP_ID = "31886"; 

// 1. GESTIÓN DE USUARIO (ID ÚNICO)
let currentUserId = localStorage.getItem('easy_money_user_id');
if (!currentUserId) {
    currentUserId = 'user_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('easy_money_user_id', currentUserId);
}

// 2. DETECTAR PREMIOS AL REGRESAR DE ENCUESTA
const urlParams = new URLSearchParams(window.location.search);
const ganado = urlParams.get('amount_usd');

if (ganado && parseFloat(ganado) > 0) {
    let saldoActual = parseFloat(localStorage.getItem('saldo_real') || "0.00");
    saldoActual += parseFloat(ganado);
    localStorage.setItem('saldo_real', saldoActual.toFixed(2));
    
    // Alerta visual de éxito
    alert("¡Felicidades! Has ganado $" + ganado + " USD");
    
    // Limpiar la URL para evitar sumas dobles al recargar
    window.history.replaceState({}, document.title, window.location.pathname);
}

// 3. INICIALIZAR APP
document.addEventListener('DOMContentLoaded', () => {
    actualizarPantalla();
});

function actualizarPantalla() {
    const saldo = localStorage.getItem('saldo_real') || "0.00";
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.innerText = saldo;
    }
}

// 4. ABRIR PANEL DE ENCUESTAS
function openOffer(tipo) {
    if (tipo === 'encuestas') {
        // Esta URL usa el ID que CPX ya validó
        const urlReal = `https://publisher.cpx-research.com/index.php?app_id=${CPX_APP_ID}&ext_user_id=${currentUserId}`;
        window.open(urlReal, '_blank');
    } else {
        alert("Sección disponible próximamente.");
    }
}
