window.onload = function() {
    const inputUsuario = document.querySelector('#usuario');
    inputUsuario.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []
        
        if(form.usuario.value == '') {
            form.usuario.classList.remove('.valid');
            form.usuario.classList.add('.errors');
            errores.push('El campo "usuario" es obligatorio.');
        } else {
            form.usuario.classList.remove('errors');
            form.usuario.classList.add('valid');
        }
        if(form.contraseña.value == '') {
            form.contraseña.classList.remove('.valid');
            form.contraseña.classList.add('.errors');
            errores.push('El campo "contraseña" es obligatorio.');
        } else {
            form.contraseña.classList.remove('errors');
            form.contraseña.classList.add('valid');
        }
        const ul = document.querySelector('.errores'); // Usa un punto para seleccionar por clase

        if (errores.length != 0) {
            ul.innerHTML = ''
            ul.classList.add('alert-warning');
            for (let i = 0; i < errores.length; i++) {
                const error = errores[i];
                ul.innerHTML += `<li>${error}</li>`;
            }
            Swal.fire(
                {icon : 'error',
                title : 'Hubo un error!',
                text : 'Revisa los errores!'
            }
            )
        }
        })
} 