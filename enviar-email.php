<?php
// Permitir requisições de qualquer origem
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Dados do formulário
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $assunto = isset($_POST['assunto']) ? trim($_POST['assunto']) : 'Sem assunto';
    $mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';
    
    // Validações básicas
    if (empty($nome) || empty($email) || empty($mensagem)) {
        header('Location: index.html?status=erro&msg=campos');
        exit;
    }
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: index.html?status=erro&msg=email');
        exit;
    }
    
    // Email de destino
    $destinatario = 'guis.felippe@gmail.com';
    
    // Assunto do email
    $assunto_email = "Novo contato: " . htmlspecialchars($assunto);
    
    // Conteúdo do email
    $conteudo = "Nome: " . htmlspecialchars($nome) . "\n";
    $conteudo .= "Email: " . htmlspecialchars($email) . "\n";
    $conteudo .= "Assunto: " . htmlspecialchars($assunto) . "\n";
    $conteudo .= "Data: " . date('d/m/Y H:i:s') . "\n\n";
    $conteudo .= "Mensagem:\n";
    $conteudo .= htmlspecialchars($mensagem);
    
    // Headers do email
    $headers = "From: " . htmlspecialchars($email) . "\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Tentar enviar o email
    if (mail($destinatario, $assunto_email, $conteudo, $headers)) {
        header('Location: index.html?status=sucesso');
        exit;
    } else {
        header('Location: index.html?status=erro&msg=envio');
        exit;
    }
}

// Se não for POST, redirecionar para index
header('Location: index.html');
exit;
?>
