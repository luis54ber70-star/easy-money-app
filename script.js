// === CONFIGURACIÓN OFICIAL EASY MONEY ===
const CPX_APP_ID = "31886"; 

// 1. Detectar si el usuario viene regresando de una encuesta con dinero
const urlParams = new URLSearchParams(window.location.search);
const ganadoUSD = urlParams.get('amount_usd'); // Coincide con la etiqueta de CPX
const ganadoLocal = urlParams.get('amount_local'); // Coincide con la etiqueta de CPX

if (ganadoUSD) {
    // Guardar el premio en la memoria del celular
    let saldoActual = parseFloat(localStorage.getItem('saldo_real') || "0.00");
    saldoActual += parseFloat(ganadoUSD);
    localStorage.setItem('saldo_real', saldoActual.toFixed(2));
    
    alert("¡Felicidades! Recibiste $" + ganadoUSD + " USD");
    // Limpiar la URL para que no se sume doble al recargar
    window.history.replaceState({}, document.title, window.location.pathname);
}

// 2. Función para abrir las encuestas
function openOffer(tipo) {
    if (tipo === 'encuestas') {
        let currentUserId = localStorage.getItem('easy_money_user_id') || 'user_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('easy_money_user_id', currentUserId);

        const urlReal = `https://publisher.cpx-research.com/index.php?app_id=${CPX_APP_ID}&ext_user_id=${currentUserId}`;
        window.open(urlReal, '_blank');
    }
}

// 3. Mostrar el saldo en pantalla al cargar
document.addEventListener('DOMContentLoaded', () => {
    const saldo = localStorage.getItem('saldo_real') || "0.00";
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.innerText = saldo;
    }
});
