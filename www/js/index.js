function acessaDB(){
    return new localdb('database');
};

function criaTabela(){
    var db = acessaDB();
    db.createTable('locadora');
}

function verificaTabela(){
    var db = acessaDB();
    if(db.tableExists('locadora') == false){
        return criaTabela();
    }else{
        console.log('A tabela já existe.');
    }
};

function salvarDados(){
    var nomeCliente = document.getElementById("nomeCliente").value;
    var telefone = document.getElementById("telefone").value;
    var dataRetirada = document.getElementById("dataRetirada").value;
    var dataEntrega = document.getElementById("dataEntrega").value;
    var veiculo = document.getElementById("veiculo").value;
    var formaPagamento = document.getElementById("formaPagamento").value

    if(!nomeCliente || !dataRetirada || !dataEntrega || !veiculo) return alert('Os campos estão vazios');

    var db = acessaDB();
    db.insert('locadora', {'nome_cliente': nomeCliente, 'telefone': telefone ,'data_retirada': dataRetirada, 'data_entrega': dataEntrega, 'veiculo': veiculo, 'pagamento': formaPagamento});
    location.reload();
};

function mostrarDados(){
    var db = acessaDB();
    var data = JSON.parse(db.exportData('locadora'));
    var total_registros = parseInt(data.totalrows);
    var mostra_dados = document.getElementById('resultado');

    for (let i = 1; i <= total_registros; i++){
        var busca = db.findById('locadora', i);

        var tr = document.createElement('tr');
        tr.addEventListener('click', function(){
            var id = data.rows[i].ID;

            document.getElementById('nomeCliente').value = data.rows[i].nome_cliente;
            document.getElementById('telefone').value = data.rows[i].telefone;
            document.getElementById('dataRetirada').value = data.rows[i].data_retirada;
            document.getElementById('dataEntrega').value = data.rows[i].data_entrega;
            document.getElementById('veiculo').value = data.rows[i].veiculo;
            document.getElementById('formaPagamento').value = data.rows[i].pagamento;

            alterar(id);
        });

        if(busca.ID != undefined){
            var tdNome = document.createElement('td');
            tdNome.innerHTML = busca.nome_cliente;

            var tdTelefone = document.createElement('td');
            tdTelefone.innerHTML = busca.telefone;

            var tdDataRetirada = document.createElement('td');
            tdDataRetirada.innerHTML = busca.data_retirada;

            var tdDataEntrega = document.createElement('td');
            tdDataEntrega.innerHTML = busca.data_entrega;

            var tdVeiculo = document.createElement('td');
            tdVeiculo.innerHTML = busca.veiculo;

            var tdPagamento = document.createElement('td');
            tdPagamento.innerHTML = busca.pagamento;

            tr.appendChild(tdNome);
            tr.appendChild(tdTelefone);
            tr.appendChild(tdDataRetirada);
            tr.appendChild(tdDataEntrega);
            tr.appendChild(tdVeiculo);
            tr.appendChild(tdPagamento);
            mostra_dados.appendChild(tr);
        };
    };

};

function alterar(id){
    var db = acessaDB();

    document.getElementById('divBotoes').removeAttribute('hidden');
    document.getElementById('botaoFinalizar').setAttribute('hidden', true);

    var btnAtualizar = document.getElementById('btnAtualizar');
    btnAtualizar.addEventListener("click", function(){
        var newNomeCliente = document.getElementById("nomeCliente").value;
        var newTelefone = document.getElementById("telefone").value;
        var newDataRetirada = document.getElementById("dataRetirada").value;
        var newDataEntrega = document.getElementById("dataEntrega").value;
        var newVeiculo = document.getElementById("veiculo").value;
        var newPagamento = document.getElementById("formaPagamento").value;

        db.updateById('locadora', {'nome_cliente': newNomeCliente, 'telefone': newTelefone ,'data_retirada': newDataRetirada, 'data_entrega': newDataEntrega, 'veiculo': newVeiculo, 'pagamento': newPagamento}, id);
        location.reload();
    });

    var btnExcluir = document.getElementById('btnExcluir');
    btnExcluir.addEventListener('click', function(){
        excluir(id);
    });
};

function excluir(id){
    var db = acessaDB();
    db.removeById('locadora', id);
    location.reload();
}

window.onload = acessaDB;
window.onload = verificaTabela;
window.onload = mostrarDados;

var botaoFinalizar = document.getElementById("botaoFinalizar");
botaoFinalizar.addEventListener('click', ()=>{
    salvarDados();
});