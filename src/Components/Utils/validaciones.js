export const validarTexto = (texto) => {
    const regex = new RegExp("^[A-Za-z]\\w{2,29}$");
    if (regex.test(texto)) {
        return true;
    }
    return false;
}

export const validarTextos = (texto) => {
    const regex = new RegExp("^[A-Za-z]\\w{2,29}$");
    const procesado = texto.replace(/\s+/g, '')
    if (regex.test(procesado)) {
        return true;
    }
    return false;
}

export const validarEmail = (email) =>{
    const regex = new RegExp("^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$");
    if (regex.test(email)) {
        return true;
    }
    return false;
}

export const validarContrasenia = (contrasenia) =>{
    const regex = new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,16}$");
    if (regex.test(contrasenia)) {
        return true;
    }
    return false;
}

export const compararContrasenias = (contrasenia_1, contrasenia_2) => {
    if(contrasenia_1 === '' || contrasenia_2 === ''){
        return false
    } else if (contrasenia_1 === contrasenia_2){
        return true
    } else {
        return false
    }
}
