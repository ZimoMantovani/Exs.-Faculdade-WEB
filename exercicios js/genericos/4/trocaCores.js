function mudarCor() {
    var cores = ["red", "blue", "green", "yellow", "purple"];
    var corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    document.body.style.backgroundColor = corAleatoria;
}
