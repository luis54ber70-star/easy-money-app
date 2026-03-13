// === CONFIGURACIÓN OFICIAL EASY MONEY ===
const CPX_APP_ID = "31886"; 
const DOMAIN_CPX = "https://publisher.cpx-research.com/index.php";

// Generar o recuperar ID de usuario único para que los pagos sean reales
let currentUserId = localStorage.getItem('easy_money_user_id');
if (!currentUserId) {
    currentUserId = 'user_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('easy_money_user_id', currentUserId);
}

// === INICIO DE LA APP ===
document.addEventListener('DOMContentLoaded', () => {
    console.log("Easy Money: Sistema Real Activo - ID: " + currentUserId);
    actualizarSaldoVisual();
    mostrarActividad();
});

// === FUNCIÓN PARA ABRIR ENCUESTAS REALES ===
function openOffer(tipo) {
    if (tipo === 'encuestas') {
        // Esta es la URL que conecta tu App con CPX Research
        const urlReal = `${DOMAIN_CPX}?app_id=${CPX_APP_ID}&ext_user_id=${currentUserId}`;
        
        // Abrir en nueva pestaña para que el usuario no pierda tu app
        window.open(urlReal, '_blank');
    } else {
        alert("Esta sección se activará automáticamente al completar tu primera encuesta.");
    }
}

// === GESTIÓN DE SALDO ===
function actualizarSaldoVisual() {
    // Intenta leer el saldo guardado por el sistema de postback
    const saldo = localStorage.getItem('saldo_real') || "0.00";
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.innerText = parseFloat(saldo).toFixed(2);
    }
}

// === HISTORIAL DE ACTIVIDAD ===
function mostrarActividad() {
    const log = document.getElementById('activity-log');
    if (!log) return;

    // Mensaje de estado real
    log.innerHTML = `
        <div class="bg-gray-800/50 p-4 rounded-2xl border border-gray-700 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <p class="text-xs text-gray-400">Conectado al servidor de CPX Research...</p>
            </div>
            <span class="text-[10px] text-gray-600 font-mono">ID: ${currentUserId}</span>
        </div>
    `;
}

// === NOTIFICACIÓN DE ÉXITO ===
// Si regresas de una encuesta y la URL tiene datos, los procesamos
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('amount_usd')) {
    const ganado = urlParams.get('amount_usd');
    alert("¡Felicidades! Has ganado $" + ganado + " USD");
    // Aquí podrías sumar el saldo localmente mientras se sincroniza el servidor
}
