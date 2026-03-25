const input = document.getElementById("permisoInput");
const usuario = document.getElementById("usuario");
const grupo = document.getElementById("grupo");
const otros = document.getElementById("otros");
const limpiarBtn = document.getElementById("limpiarBtn");

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

// Llenar selects
function llenarSelect(select) {
    select.innerHTML = '<option value="">---</option>';

    for (let key in permisosTexto) {
        let option = document.createElement("option");
        option.value = key;
        option.textContent = permisosTexto[key];
        select.appendChild(option);
    }
}

llenarSelect(usuario);
llenarSelect(grupo);
llenarSelect(otros);

// INPUT → SELECTS
input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-7]/g, "").slice(0, 3);

    if (input.value.length === 3) {
        usuario.value = input.value[0];
        grupo.value = input.value[1];
        otros.value = input.value[2];
    }
});

// SELECTS → INPUT
function actualizarInput() {
    if (usuario.value && grupo.value && otros.value) {
        input.value = `${usuario.value}${grupo.value}${otros.value}`;
    }
}

usuario.addEventListener("change", actualizarInput);
grupo.addEventListener("change", actualizarInput);
otros.addEventListener("change", actualizarInput);

// LIMPIAR TODO
limpiarBtn.addEventListener("click", () => {
    input.value = "";
    usuario.value = "";
    grupo.value = "";
    otros.value = "";
});
