var numeroAleatorio = Math.floor(Math.random() * 100) + 1;

function adivinhar() {
    var palpite = parseInt(document.getElementById('palpite').value);
    var resultado = document.getElementById('resultado');
    if (palpite === numeroAleatorio) {
        resultado.innerHTML = "Parabéns! Você acertou!";
    } else if (palpite < numeroAleatorio) {
        resultado.innerHTML = "Tente um número maior.";
    } else {
        resultado.innerHTML = "Tente um número menor.";
    }
}
