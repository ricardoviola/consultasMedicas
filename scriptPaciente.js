const KEY_BD = '@usuariosestudo'

/*Variável responsável pela admnistração de registros de pacientes*/
var listaRegistros = {
    ultimoIdGerado:0,
    usuarios:[]

}

function gravarBd() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))

}

function lerBd() {
    const data = localStorage.getItem(KEY_BD)
    if(data) {
        listaRegistros = JSON.parse(data)
    }

    desenhar()
}

/*Inserir cadastro paciente/gravar
*/
function insertUsuario(nome, fone) {
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({
        id, nome, fone
    })

    gravarBd()
    desenhar()
    visualizar('lista')
}

// Alert dados cadastrados com sucesso
function Enviar() {

    var nome = document.getElementById("nomePaciente");

    //if (nome.value != "") {
        alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
   // }

}


/* Função pra desenhar tabela cadastro pacientes
Join - não retornar em forma de array
*/
function desenhar() {
        const tbody = document.getElementById('listaRegistrosBody')
        if(tbody) {
            tbody.innerHTML = listaRegistros.usuarios
            .sort((a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map( usuario => {

                return `<tr>
                        <td>${usuario.id}</td>
                        <td id='nomePaciente'>${usuario.nome}</td>
                        <td>${usuario.fone}</td>
                        <td>
                            <button class="vermelho" onclick='visualizar("cadastro", false,${usuario.id})'>Editar</button>
                            <button class="vermelho" onclick='perguntarSeDeleta(${usuario.id})'>Deletar</button>
                        </td>
                </tr>`
                
            } ).join('')
        }
}

function perguntarSeDeleta(id) {
    if(confirm('Quer deletar o registro de id' + id)){
        deleteUsuario(id)
        
    }


}

function deleteUsuario(id) {
    listaRegistros.usuarios = listaRegistros.usuarios.filter(usuario =>{
        return usuario.id != id
    })

        gravarBd()
        desenhar()
}

/*Função ?
*/
function submeter(e) {
    e.preventDefault()
    const data = {
        id:document.getElementById('id').value,
        nome:document.getElementById('nome').value,
        fone:document.getElementById('fone').value,
    }
    if(data.id) {
        editUsuario(...data)
    }else {
        insertUsuario(data.nome, data.fone)
    }
}


function limparEdiçao() {
    document.getElementById('nome') .value = ''
    document.getElementById('fone') .value = ''
}
