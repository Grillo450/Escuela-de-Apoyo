document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        // Validar nombres (sin números ni símbolos)
        const textoInputs = form.querySelectorAll('input[type="text"]');
        const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        for (const input of textoInputs) {
            if (input.name.includes("nombre")) {
                if (!soloLetras.test(input.value)) {
                    alert(`El campo "${input.placeholder}" no puede tener números ni símbolos.`);
                    input.focus();
                    e.preventDefault();
                    return;
                }
            }
        }

        // Validar edad (entre 12 y 120 años)
        const edadInputs = form.querySelectorAll('input[name="Edad"]');
        for (const edadInput of edadInputs) {
            const edad = parseInt(edadInput.value);
            if (isNaN(edad) || edad < 4 || edad > 120) {
                alert("La edad debe estar entre 4 y 120 años.");
                edadInput.focus();
                e.preventDefault();
                return;
            }
        }

        // Validar campos numéricos
        const soloNumeros = /^\d+$/;

        const camposNumericos = [
            { name: "dni_estudiante", label: "DNI del estudiante" },
            { name: "dni_tutor", label: "DNI del tutor" },
            { name: "telefono_estudiante", label: "Teléfono del estudiante" },
            { name: "telefono_tutor", label: "Teléfono del tutor" },
            { name: "N°tarjeta", label: "Número de tarjeta" },
            { name: "cvv", label: "CVV" },
        ];

        for (const campo of camposNumericos) {
            const input = form.querySelector(`input[name="${campo.name}"]`);
            if (input && !soloNumeros.test(input.value)) {
                alert(`El campo "${campo.label}" debe contener solo números.`);
                input.focus();
                e.preventDefault();
                return;
            }
        }

        // Validar número de tarjeta (13-19 dígitos)
        const tarjeta = form.querySelector('input[name="N°tarjeta"]');
        if (!/^\d{13,19}$/.test(tarjeta.value)) {
            alert("El número de tarjeta debe tener entre 13 y 19 dígitos.");
            tarjeta.focus();
            e.preventDefault();
            return;
        }

        // Validar CVV (3 dígitos)
        const cvv = form.querySelector('input[name="cvv"]');
        if (!/^\d{3}$/.test(cvv.value)) {
            alert("El CVV debe tener exactamente 3 dígitos.");
            cvv.focus();
            e.preventDefault();
            return;
        }

        // Validar correo electrónico (estudiante y tutor)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailEst = form.querySelector('input[name="correo_estudiante"]');
        const emailTut = form.querySelector('input[name="correo_tutor"]');

        if (!emailRegex.test(emailEst.value)) {
            alert("El correo del estudiante no es válido.");
            emailEst.focus();
            e.preventDefault();
            return;
        }

        if (!emailRegex.test(emailTut.value)) {
            alert("El correo del tutor no es válido.");
            emailTut.focus();
            e.preventDefault();
            return;
        }

        // Validar selección de curso
        const curso = form.querySelector('select[name="Cursos"]');
        if (!curso.value || curso.value === "") {
            alert("Por favor seleccioná el año en el que va el estudiante.");
            curso.focus();
            e.preventDefault();
            return;
        }

        // Validar radio: ¿Se quedó de año?
        const repitenteRadios = form.querySelectorAll('input[name="repitente"]');
        if (![...repitenteRadios].some(r => r.checked)) {
            alert("Por favor seleccioná si el estudiante se quedó de año.");
            e.preventDefault();
            return;
        }

        // Validar radio: ¿Tiene discapacidad?
        const discapacidadRadios = form.querySelectorAll('input[name="discapacidad"]');
        if (![...discapacidadRadios].some(r => r.checked)) {
            alert("Por favor seleccioná si el estudiante tiene alguna discapacidad o necesidad educativa especial.");
            e.preventDefault();
            return;
        }
    });
});