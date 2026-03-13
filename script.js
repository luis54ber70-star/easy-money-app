// === CONFIGURACIÓN EASY MONEY ===
const CPX_APP_ID = "31886"; 

// 1. INICIALIZAR DATOS AL CARGAR
document.addEventListener('DOMContentLoaded', () => {
    // Generar ID de usuario si no existe
    if (!localStorage.getItem('easy_money_user_id')) {
        const newId = 'user_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('easy_money_user_id', newId);
    }
    
    // Revisar si venimos de una encuesta con dinero
    revisarPremios();
    
    // Mostrar el saldo guardado
    actualizarPantalla();
});

// 2. DETECTAR PREMIOS DESDE LA URL
function revisarPremios() {
    const params = new URLSearchParams(window.location.search);
    const monto = params.get('amount_usd');

    if (monto && parseFloat(monto) > 0) {
        let saldoActual = parseFloat(localStorage.getItem('saldo_real') || "0.00");
        saldoActual += parseFloat(monto);
        
        // Guardar nuevo saldo
        localStorage.setItem('saldo_real', saldoActual.toFixed(2));
        
        // Notificar al usuario
        alert("¡Felicidades! Ganaste $" + monto + " USD");
        
        // Limpiar la URL para no sumar doble
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// 3. ACTUALIZAR INTERFAZ
function actualizarPantalla() {
    const saldo = localStorage.getItem('saldo_real') || "0.00";
    const el = document.getElementById('user-balance');
    if (el) el.innerText = saldo;
}

// 4. ABRIR ENCUESTAS
function openOffer(tipo) {
    if (tipo === 'encuestas') {
        const uid = localStorage.getItem('easy_money_user_id');
        const url = `https://publisher.cpx-research.com/index.php?app_id=${CPX_APP_ID}&ext_user_id=${uid}`;
        window.open(url, '_blank');
    } else {
        alert("Esta sección se activará pronto.");
    }
}
