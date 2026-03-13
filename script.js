// Configuración básica
const API_URL_CPX = "https://publisher.cpx-research.com/index.php?app_id=TU_ID_AQUI&ext_user_id=";
const USER_ID = "user_test_01"; // Esto lo obtendrás de Firebase después

// Función para abrir ofertas
function openOffer(tipo) {
    console.log("Abriendo sección: " + tipo);
    
    if (tipo === 'encuestas') {
        // Redirige al panel de CPX Research con el ID del usuario
        // window.location.href = API_URL_CPX + USER_ID;
        alert("Redirigiendo al panel de encuestas seguro...");
    } else {
        alert("Sección de " + tipo + " estará disponible pronto.");
    }
}

// Simulación de actividad real de otros usuarios
function loadRecentActivity() {
    const log = document.getElementById('activity-log');
    const names = ["Juan M.", "Luis R.", "Elena P.", "Oscar T.", "Maria G."];
    const actions = ["completó una encuesta", "descargó una app", "ganó 500 puntos", "retiró $5.00"];
    
    log.innerHTML = "";
    for(let i=0; i<3; i++) {
        const randomName = names[Math.floor(Math.random()*names.max)];
        const randomAction = actions[Math.floor(Math.random()*actions.length)];
        log.innerHTML += `<div class="border-b border-gray-700 pb-2">✅ ${names[i]} ${actions[i]} hace unos minutos.</div>`;
    }
}

window.onload = loadRecentActivity;
