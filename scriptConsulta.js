const BD_CONSULTAS = '@consultas'

var listaConsultas = {
    ultimoIdGerado:0,
    consultas:[]

}


function gravarBdConsultas() {
    localStorage.setItem(BD_CONSULTAS, JSON.stringify(listaConsultas))

}

function lerBdConsultas() {
    const data = localStorage.getItem(BD_CONSULTAS)
    if(data) {
        listaConsultas = JSON.parse(data)
    }

    console.log(data);

    //desenharTabelaConsultas()

}

function limparEdiçaoConsulta() {
    document.getElementById('nome') .value = ''
    document.getElementById('data') .value = ''
    document.getElementById('hora') .value = ''
    document.getElementById('dropDownEspecialidades') .value = ''
}


function perguntarSeDeletaConsulta(id) {
    if(confirm('Quer deletar a consulta id' + id)){
        deleteConsulta(id)
        
    }


}

function deleteConsulta(id) {
    listaConsultas.consultas = listaConsultas.consultas.filter(consulta =>{
        return consulta.id != id
    })

        gravarBdConsultas()
        desenharTabelaConsultas()
}



/*Função para desenhar dropdown para marcar consulta
.sort - ordem alfabética
Se a.nome < b.nome, se sim retorna a, se não, b
*/
function desenharOpcoesDropdown() {

    const usuarios = listaRegistros.usuarios
    const dropDown = document.getElementById('dropDownPacientes')
   
    dropDown.innerHTML = listaRegistros.usuarios
        .sort((a, b) => {
            return a.nome < b.nome ? -1 : 1
        }) 
        .map( usuario => {

            return `<option id='pacienteNome' value="${usuario.nome}">${usuario.nome}</option>`
            
        } ).join('')
}

function desenharTabelaConsultas() {

    const tbody = document.getElementById('listaConsultasBody')
    
    if(tbody) {
        tbody.innerHTML = listaConsultas.consultas
        .map( consulta => {
            return `<tr>
                    <td>${consulta.id}</td>
                    <td>${consulta.nome}</td>
                    <td>${consulta.data}</td>
                    <td>${consulta.hora}</td>
                    <td>${consulta.especialidade}</td>
                    <td>  
                        <button class="vermelho" onclick='perguntarSeDeletaConsulta(${consulta.id})'>Cancelar</button>
                    </td>
            </tr>`
            
        } ).join('')
    }
}

function insertConsultas(nome, data, hora, especialidade) {
    const id = listaConsultas.ultimoIdGerado + 1;
    listaConsultas.ultimoIdGerado = id;
    listaConsultas.consultas.push({
        id, nome, data, hora, especialidade
    })

    gravarBdConsultas()
   
    
}

/*Chamar a função desenhar
*/
function submeterConsultas(e) {
    e.preventDefault()
    const consulta = {
        id:document.getElementById('idConsulta').value,
        nome:document.getElementById('dropDownPacientes').value,
        data:document.getElementById('data').value,
        hora:document.getElementById('hora').value,
        especialidade:document.getElementById('dropDownEspecialidades').value,
    }
    insertConsultas(consulta.nome, consulta.data, consulta.hora, consulta.especialidade)
}

