document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Monta o payload com os dados vindos da URL
    const formData = {
        nome: params.get('nome'),
        email: params.get('email'),
        telefone: params.get('telefone'),
        faturamento: params.get('faturamento'),
        setor: params.get('setor'),
        empresa: params.get('empresa'),
        mensagem: params.get('mensagem'),
        origem: location.hostname || 'site',
        // Adicione o timestamp para ter um registro da data e hora do envio
        timestamp: new Date().toLocaleString("pt-BR")
    };

    // Se o campo nome e email forem obrigatórios, valida antes de enviar
    if (!formData.nome || !formData.email) {
        console.error('Nome e e-mail são obrigatórios');
        return;
    }

    // AQUI ESTÁ A ATUALIZAÇÃO IMPORTANTE
    // Aponte para o seu novo proxy no Vercel, não mais para a URL do Google Apps Script
    const PROXY_URL = '/api/proxy';

    // Faz o POST para o proxy
    fetch(PROXY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erro ao enviar dados para o proxy');
            // Dependendo da resposta, você pode querer lançar um erro mais específico
            throw new Error('Erro na resposta do servidor.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
    });

    // Exibe o nome do cliente dinamicamente, se existir o elemento
    const clientName = params.get('nome');
    const clientNameSpan = document.getElementById('client-name');
    if (clientName && clientNameSpan) {
        clientNameSpan.textContent = clientName;
    }
});