function somar() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = "Resultado: " + (num1 + num2);
}
