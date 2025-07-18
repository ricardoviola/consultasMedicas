/*Função de visualizar a página/id 
Focus para o cursor ficar piscando no nome (Não está dando certo)
*/
function visualizar(pagina, novo = false, id=null) {
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro') {
        document.getElementById('nome').focus
        if(novo) limparEdiçao()
        
        if(id){
            const usuario = listaRegistros.usuarios.find(usuario => usuario.id == id)
            if(usuario){
                document.getElementById('id') .value = usuario.id
                document.getElementById('nome') .value = usuario.nome
                document.getElementById('fone') .value = usuario.fone

            }            
        }
    }
    if(pagina === 'cadastroConsultas') {
        if(novo) limparEdiçaoConsulta()
        desenharOpcoesDropdown()
        desenharOpcoesDropdownEspecialidades()
        
    } 
    if(pagina === 'listaConsultas') {
        desenharTabelaConsultas()
    }
};



window.addEventListener('load', ()=> {
    lerBd()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
    lerBdConsultas()
    document.getElementById('cadastroConsultas').addEventListener('submit', submeterConsultas)
});
