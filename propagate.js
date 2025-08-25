(function () {
    const form = document.querySelector("form");
    if (!form) {
        // Se não houver formulário na página, não faz nada.
        console.log("Nenhum formulário encontrado. Script 'propagate.js' não será executado.");
        return;
    }
    
    const qs = new URLSearchParams(location.search);

    // Adiciona todos os parâmetros da URL como inputs hidden ao formulário
    for (const [key, value] of qs.entries()) {
        if (!form.querySelector(`input[type="hidden"][name="${key}"]`)) {
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = key;
            hiddenInput.value = value;
            form.appendChild(hiddenInput);
        }
    }
    
    console.log("✅ Parâmetros da URL propagados para o formulário.");
})();