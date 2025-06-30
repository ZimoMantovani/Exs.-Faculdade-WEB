function gerarSenha() {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var senha = "";
    for (var i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.getElementById('senha').innerHTML = "Senha Gerada: " + senha;
}
