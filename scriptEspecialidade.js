var listaEspecialidades = {
    especialidades: [
        'Pediatra',
        'Ginecologista',
        'Cardiologista',
        'Odontologista',
        'Urologista',
    ]
}

function desenharOpcoesDropdownEspecialidades() {

    const tbody = document.getElementById('listaEspecialidadesBody')
    const especialidades = listaEspecialidades.especialidades
    const dropDown = document.getElementById('dropDownEspecialidades')
   
    dropDown.innerHTML = listaEspecialidades.especialidades

    .map( especialidade => {

        return `<option id='especialidade' value="${especialidade}">${especialidade}</option>`
            
    }).join('')
}