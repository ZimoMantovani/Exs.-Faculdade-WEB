function converterMoeda() {
    var quantia = parseFloat(document.getElementById('quantia').value);
    var taxaCambio = 0.19; // Taxa de câmbio fixa para exemplo
    var quantiaConvertida = quantia * taxaCambio;
    document.getElementById('resultadoConversao').innerHTML = "Quantia em Dólares: $" + quantiaConvertida.toFixed(2);
}
