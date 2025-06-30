function adicionarTarefa() {
    var tarefa = document.getElementById('tarefa').value;
    var lista = document.getElementById('listaTarefas');
    var item = document.createElement('li');
    item.innerHTML = tarefa + ' <button onclick="removerTarefa(this)">Remover</button>';
    lista.appendChild(item);
    document.getElementById('tarefa').value = '';
}

function removerTarefa(elemento) {
    elemento.parentElement.remove();
}
