async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
        if(consultaCEP.erro) {
            throw Error('CEP não existe.');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        
        cidade.value = consultaCEP.localidade;
        logradouro.value = consultaCEP.logradouro;
        estado.value = consultaCEP.uf;

        console.log(consultaCEP);   
        return consultaCEP;
    } catch(erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", ()=> buscaEndereco(cep.value));