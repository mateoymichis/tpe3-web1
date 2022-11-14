export default function contacto() {
    function stringAleatorio (caracteres) {
        let letras = "abcdefghijklmnopqrstuvwxyz0123456789";
        let string = "";
        for (let i=1; i<=caracteres; i++) {
            let index = Math.floor(Math.random()*letras.length);
            let caracter = letras[index];
            string = string + caracter;
        }
        return string;
    }
    
    function generarCaptcha() {
        let captcha = document.getElementById('captcha');
        let contenido = stringAleatorio(6);
        captcha.value = contenido;
        captcha.innerHTML = contenido;
    }
    
    function validarCaptcha () {
        
        let captcha = document.getElementById('captcha').value;
        let captchaInput = document.getElementById('captcha-input').value;
        let captchaVacio = document.getElementById('captcha-vacio');
        let captchaIncorrecto = document.getElementById('captcha-incorrecto');
        let captchaCorrecto = document.getElementById('captcha-correcto');
        
        if (captcha === captchaInput) {
            captchaIncorrecto.classList.remove("captcha-incorrecto-mostrar");
            captchaIncorrecto.classList.add("captcha-incorrecto");
            captchaCorrecto.classList.add("captcha-correcto-mostrar");
            captchaCorrecto.classList.remove("captcha-correcto");
            return true;
        } else if (captchaInput === "") {
            captchaVacio.classList.remove("captcha-vacio");
            captchaVacio.classList.add("captcha-vacio-mostrar");
            return false;
        } else {
            captchaVacio.classList.remove("captcha-vacio-mostrar");
            captchaVacio.classList.add("captcha-vacio");
            captchaIncorrecto.classList.remove("captcha-incorrecto");
            captchaIncorrecto.classList.add("captcha-incorrecto-mostrar");
            captchaCorrecto.classList.add("captcha-correcto");
            captchaCorrecto.classList.remove("captcha-correcto-mostrar");
            generarCaptcha();
            return false;
        }
    }
    
    function validarFormulario (evento) {
        evento.preventDefault();
        let enviado = document.getElementById('enviado');
        
        if(validarCaptcha()) {
            form.reset();
            enviado.classList.remove("enviado");
            enviado.classList.add("enviado-ok");
        } else {
            enviado.classList.remove("enviado-ok");
            enviado.classList.add("enviado");
        }
    }
    
    generarCaptcha();
    const form = document.getElementById("form");
    form.addEventListener("submit", validarFormulario);

}