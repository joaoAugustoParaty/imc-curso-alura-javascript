var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

  var form = document.querySelector("#form-adiciona");

  var paciente = obtemPacienteDoFormulario(form);

  
  
  var erros = validaPaciente(paciente);
  
  //Validar Paciente
  if (erros.length > 0) {
   exibirMensagemDeErro(erros)
   
    return;
}
adicionaPacienteNaTabela(paciente);
  //Limpa o Formulário
  form.reset();
  var mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML = "";

});

//Parte do buscar-paciente.js
function adicionaPacienteNaTabela(paciente) {
  var pacienteTr = montaTr(paciente);
   // Adicionando o paciente na tabela
   var tabela = document.querySelector("#tabela-pacientes");
   tabela.appendChild(pacienteTr);
}

function exibirMensagemDeErro(erros){
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "" //zera o que tem no html, mensagens por exemplo do formulário quando da erro

  erros.forEach(function(erro){
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  })
}

function obtemPacienteDoFormulario(form){

  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
      return paciente;
}

function montaTr(paciente){
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(dado, classe){

  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);

  return td;

}

//Validar Paciente

function validaPaciente(paciente){

  var erros = [];

  if(paciente.nome.length == 0){
    erros.push("O nome não pode ser em branco");
  }

  if (!validaPeso(paciente.peso)) 
      erros.push("Peso é inválido");
  

  if (!validaAltura(paciente.altura)) 
      erros.push("Altura é inválida");
  
      if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
      }

      if(paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
      }

      if(paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
      }

  return erros;
}
