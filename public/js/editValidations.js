window.onload = function() {
    const inputName = document.querySelector('#name');
    inputName.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []

        if(form.producto_id.value == ''){
            errores.push('*Selecciona un ID de producto')
        }

        if(form.nombre.value == ''){
            errores.push('*El nombre es un campo obligatorio')
        } else if (form.nombre.value.length < 5){
            errores.push('*El nombre debe tener minimo 5 caracteres');
        }
        
        if(form.description.value == ''){
            errores.push('*La descripción es un campo obligatorio')
        } else if (form.description.value.length < 16){
            errores.push('*La descripción debe tener 16 caracteres como minimo');
        }

        if(form.precio.value == ''){
            errores.push('*El precio debe ser obligatorio')
        }

        if(form.img.value == ''){
            errores.push('*La imágen es obligatoria')
        }

        if(form.category.value == ''){
            errores.push('*La categoria es obligatoria')
        }

        if(form.color.value == ''){
            errores.push('*El color del producto es obligatorio')
        }

        const ul = document.querySelector('.errores');

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
                text : 'Revisar los errores!'
            }
            )
        } else {
          Swal.fire(
            'Buen trabajo!',
            'Producto creado con éxito!',
            'success'
          ).then (()=> {
            form.submit()
        })
        }})}
