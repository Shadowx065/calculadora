const input = document.getElementById("permisoInput");
const usuario = document.getElementById("usuario");
const grupo = document.getElementById("grupo");
const otros = document.getElementById("otros");

// Mapeo número → texto
const permisosTexto = {
    0: "Sin permisos",
    1: "Ejecución",
    2: "Escritura",
    3: "Escritura y Ejecución",
    4: "Lectura",
    5: "Lectura y Ejecución",
    6: "Lectura y Escritura",
    7: "Lectura, Escritura y Ejecución"
};

// Mapeo texto → número
const permisosNumero = {
    "Sin permisos": 0,
    "Ejecución": 1,
    "Escritura": 2,
    "Escritura y Ejecución": 3,
    "Lectura": 4,
    "Lectura y Ejecución": 5,
    "Lectura y Escritura": 6,
    "Lectura, Escritura y Ejecución": 7
};

// Llenar selects al iniciar
function llenarSelect(select) {
    select.innerHTML = "";
    for (let key in permisosTexto) {
        let option = document.createElement("option");
        option.textContent = permisosTexto[key];
        option.value = key;
        select.appendChild(option);
    }
}

llenarSelect(usuario);
llenarSelect(grupo);
llenarSelect(otros);

// Actualizar selects desde input
input.addEventListener("input", () => {
    // Eliminar todo lo que no sea 0-7
    input.value = input.value.replace(/[^0-7]/g, "");

    // Limitar a 3 dígitos
    input.value = input.value.slice(0, 3);

    let valor = input.value;

    if (valor.length === 3) {
        let u = valor[0];
        let g = valor[1];
        let o = valor[2];

        if (permisosTexto[u] && permisosTexto[g] && permisosTexto[o]) {
            usuario.value = u;
            grupo.value = g;
            otros.value = o;
        }
    }
});

// BLOQUEAR CARACTERES NO VÁLIDOS
input.addEventListener("keypress", (e) => {
    const char = e.key;

    // Solo permitir números del 0 al 7
    if (!/[0-7]/.test(char)) {
        e.preventDefault();
    }

    // Limitar a 3 caracteres
    if (input.value.length >= 3) {
        e.preventDefault();
    }
});

// Actualizar input desde selects
function actualizarInput() {
    let u = usuario.value;
    let g = grupo.value;
    let o = otros.value;

    if (u !== "" && g !== "" && o !== "") {
        input.value = `${u}${g}${o}`;
    }
}

// Eventos de cambio
usuario.addEventListener("change", actualizarInput);
grupo.addEventListener("change", actualizarInput);
otros.addEventListener("change", actualizarInput);