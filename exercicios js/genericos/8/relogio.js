function atualizarRelogio() {
    var agora = new Date();
    var horas = agora.getHours();
    var minutos = agora.getMinutes();
    var segundos = agora.getSeconds();
    var relogio = document.getElementById('relogio');
    relogio.innerHTML = horas + ":" + minutos + ":" + segundos;
}

setInterval(atualizarRelogio, 1000);
