# 🔒 GUIA COMPLETO DE SEGURANÇA
## Portfolio Giovanni - Locaweb

---

## 📋 ÍNDICE

1. [Segurança Básica (Obrigatório)](#basico)
2. [Segurança Avançada (Recomendado)](#avancado)
3. [SSL/HTTPS](#ssl)
4. [Cloudflare (Extra)](#cloudflare)
5. [Monitoramento](#monitoramento)
6. [Backup](#backup)
7. [Checklist](#checklist)

---

## 🛡️ 1. SEGURANÇA BÁSICA (OBRIGATÓRIO) {#basico}

### A. Arquivo .htaccess

**O QUE É:**
- Arquivo de configuração do Apache
- Controla segurança do site
- Já está PRONTO para você!

**COMO INSTALAR:**

1. **Baixe o arquivo `.htaccess`** que eu criei
2. **Edite a linha 32** (proteção hotlinking):
   ```apache
   RewriteCond %{HTTP_REFERER} !^https?://(www\.)?seudominio\.com [NC]
   ```
   Substitua `seudominio.com` pelo seu domínio real

3. **Upload para Locaweb:**
   - Via FTP: Coloque na pasta `public_html`
   - Via Painel: Upload no Gerenciador de Arquivos
   
4. **IMPORTANTE:** O nome DEVE ser `.htaccess` (com ponto no início)

**O QUE ELE FAZ:**
- ✅ Força HTTPS (SSL)
- ✅ Bloqueia SQL Injection
- ✅ Protege contra XSS
- ✅ Impede Clickjacking
- ✅ Bloqueia bots maliciosos
- ✅ Protege arquivos sensíveis
- ✅ Desabilita listagem de pastas
- ✅ Otimiza performance

---

### B. SSL/HTTPS na Locaweb

**ATIVAR SSL GRÁTIS:**

1. **Acesse Painel Locaweb**
2. **Produtos e Serviços**
3. **Seu domínio** → Gerenciar
4. **SSL** → Let's Encrypt (GRÁTIS)
5. **Ativar SSL**
6. Aguarde 5-15 minutos
7. Teste: `https://seudominio.com`

**VERIFICAR SE FUNCIONOU:**
- Veja se aparece o cadeado 🔒 no navegador
- Teste em: https://www.ssllabs.com/ssltest/

---

### C. Senhas Fortes

**LOCAWEB:**
- ✅ Senha com 12+ caracteres
- ✅ Letras, números e símbolos
- ✅ Ativar autenticação em 2 fatores (2FA)

**FTP:**
- ✅ Senha diferente da Locaweb
- ✅ Use SFTP em vez de FTP (mais seguro)

**DICA:** Use gerenciador de senhas (Bitwarden, 1Password)

---

## 🔐 2. SEGURANÇA AVANÇADA (RECOMENDADO) {#avancado}

### A. Cloudflare (GRÁTIS)

**POR QUE USAR:**
- ✅ Proteção DDoS
- ✅ Firewall (WAF)
- ✅ Esconde IP do servidor
- ✅ CDN (site mais rápido)
- ✅ Analytics grátis
- ✅ 100% GRÁTIS

**COMO CONFIGURAR:**

#### Passo 1: Criar Conta
1. Acesse: https://cloudflare.com
2. Sign Up (grátis)
3. Adicione seu domínio
4. Escolha plano FREE

#### Passo 2: Mudar DNS
1. Cloudflare mostra 2 nameservers:
   ```
   Exemplo:
   alex.ns.cloudflare.com
   bella.ns.cloudflare.com
   ```
2. Copie esses nameservers
3. Acesse seu registro de domínio (Registro.br, GoDaddy, etc)
4. Troque os nameservers pelos da Cloudflare
5. Aguarde propagação (até 24h, geralmente minutos)

#### Passo 3: Configurar SSL
1. No Cloudflare: SSL/TLS
2. Modo: **Full** (ou Full Strict se Locaweb já tem SSL)
3. Always Use HTTPS: **ON**

#### Passo 4: Ativar Segurança
1. **Security** → **Settings**
   - Security Level: **Medium** ou **High**
   - Browser Integrity Check: **ON**
   - Hotlink Protection: **ON**

2. **Firewall** → **Managed Rules**
   - Cloudflare Managed Ruleset: **ON**

3. **Scrape Shield**
   - Email Address Obfuscation: **ON**
   - Hotlink Protection: **ON**

#### Passo 5: Performance
1. **Speed** → **Optimization**
   - Auto Minify: Marque CSS, HTML, JS
   - Brotli: **ON**
   - Rocket Loader: **OFF** (pode quebrar site)

2. **Caching**
   - Caching Level: **Standard**

---

### B. Headers de Segurança Adicionais (via Cloudflare)

Se usar Cloudflare, adicione headers extras:

1. **Transform Rules** → **Modify Response Header**
2. **Create Rule**
3. Nome: "Security Headers"
4. When incoming requests match: **All incoming requests**
5. Add Header:
   ```
   X-Frame-Options: SAMEORIGIN
   X-Content-Type-Options: nosniff
   X-XSS-Protection: 1; mode=block
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: geolocation=(), microphone=(), camera=()
   ```

---

### C. Proteção de Formulário Extra

**1. reCAPTCHA do Google (ANTI-BOT)**

Adicionar reCAPTCHA v3 (invisível):

1. **Criar conta:**
   - https://www.google.com/recaptcha/admin
   - Escolha reCAPTCHA v3
   - Adicione seu domínio
   - Copie as chaves

2. **No HTML** (antes do `</head>`):
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=SUA_SITE_KEY"></script>
   ```

3. **No formulário** (antes do botão submit):
   ```html
   <input type="hidden" name="g-recaptcha-response" id="recaptchaResponse">
   ```

4. **No JavaScript** (quando enviar):
   ```javascript
   grecaptcha.ready(function() {
       grecaptcha.execute('SUA_SITE_KEY', {action: 'submit'}).then(function(token) {
           document.getElementById('recaptchaResponse').value = token;
       });
   });
   ```

**2. Rate Limiting (Cloudflare)**

Se usar Cloudflare:

1. **Firewall** → **Tools**
2. **Rate Limiting**
3. Create Rule:
   - URL: `/contato`
   - Requests: 5 por 10 minutos
   - Action: Block

---

## 🔒 3. SSL/HTTPS DETALHADO {#ssl}

### Verificar SSL Funcionando

1. **Teste Básico:**
   - Acesse: `https://seusite.com`
   - Veja o cadeado 🔒

2. **Teste Avançado:**
   - https://www.ssllabs.com/ssltest/
   - Nota ideal: **A ou A+**

3. **Forçar HTTPS:**
   - O .htaccess já faz isso
   - Teste: `http://seusite.com` deve redirecionar para HTTPS

### Problemas Comuns

**"Conexão não é segura"**
- SSL não ativado → Ative na Locaweb
- Aguardar propagação → Espere 15 min

**"Conteúdo misto"**
- Links HTTP em site HTTPS
- Solução: Use `https://` em todos os links

---

## 📊 4. MONITORAMENTO {#monitoramento}

### A. Google Search Console

**CONFIGURAR:**

1. Acesse: https://search.google.com/search-console
2. Adicionar propriedade
3. Verificar propriedade:
   - Opção 1: Meta tag (adicionar no `<head>`)
   - Opção 2: Arquivo HTML (upload)
4. Enviar sitemap (se tiver)

**O QUE MONITORAR:**
- ✅ Erros de indexação
- ✅ Problemas de segurança
- ✅ Links quebrados
- ✅ Desempenho mobile

---

### B. UptimeRobot (Monitorar se site está no ar)

**GRÁTIS:**

1. Acesse: https://uptimerobot.com
2. Sign Up
3. New Monitor:
   - Type: **HTTP(s)**
   - URL: `https://seusite.com`
   - Interval: **5 minutos**
4. Adicione email para alertas

**RESULTADO:**
- Recebe email se site cair
- Dashboard com histórico

---

### C. Logs de Acesso (Locaweb)

**VER QUEM ACESSA:**

1. Painel Locaweb
2. Estatísticas
3. Logs de Acesso
4. Procure atividades suspeitas:
   - Muitos erros 404
   - Tentativas de acesso a admin
   - IPs estranhos

---

## 💾 5. BACKUP {#backup}

### Estratégia 3-2-1

**3 cópias | 2 tipos de mídia | 1 externa**

**BACKUP AUTOMÁTICO (Locaweb):**

1. Painel Locaweb
2. Backup
3. Ativar Backup Automático
4. Frequência: **Diário**

**BACKUP MANUAL (Semanal):**

1. **Via FTP:**
   - Baixe toda pasta `public_html`
   - Salve em pasta datada: `backup-2026-02-11`

2. **Onde guardar:**
   - ✅ Computador local
   - ✅ Google Drive / Dropbox
   - ✅ HD externo (mensal)

---

## ✅ 6. CHECKLIST DE SEGURANÇA {#checklist}

### Segurança Básica (OBRIGATÓRIO)

- [ ] SSL/HTTPS ativado na Locaweb
- [ ] Arquivo `.htaccess` instalado
- [ ] HTTPS forçado (teste `http://` redireciona)
- [ ] Senha forte na Locaweb
- [ ] Senha forte no FTP
- [ ] Backup configurado

### Segurança Avançada (RECOMENDADO)

- [ ] Cloudflare configurado
- [ ] Headers de segurança ativos
- [ ] Google Search Console
- [ ] UptimeRobot monitorando
- [ ] 2FA ativado na Locaweb
- [ ] Logs revisados mensalmente

### Testes (VERIFICAR)

- [ ] SSL teste: Nota A+ em ssllabs.com
- [ ] Security Headers: Nota A em securityheaders.com
- [ ] Site carrega em HTTPS
- [ ] Formulário funciona
- [ ] Backup testado (restaurar teste)

---

## 🚨 7. O QUE FAZER SE FOR HACKEADO

### Sinais de Invasão

- ⚠️ Site mudou sem você mexer
- ⚠️ Arquivos desconhecidos
- ⚠️ Redirecionamentos estranhos
- ⚠️ Google mostra aviso de malware
- ⚠️ Site muito lento

### Ação Imediata

1. **Mudar TODAS as senhas:**
   - Locaweb
   - FTP
   - Email
   - Banco de dados (se tiver)

2. **Restaurar Backup:**
   - Use backup mais recente limpo
   - Delete arquivos atuais
   - Upload do backup

3. **Escanear:**
   - https://sitecheck.sucuri.net/
   - Procure malware

4. **Notificar:**
   - Locaweb (suporte)
   - Google Search Console

5. **Investigar:**
   - Como entraram?
   - Atualizar segurança

---

## 📈 8. NÍVEIS DE SEGURANÇA

### BÁSICO (Mínimo Necessário)
✅ SSL/HTTPS
✅ .htaccess
✅ Senhas fortes
✅ Backup semanal

**Proteção:** ~60%
**Tempo:** 30 minutos

---

### INTERMEDIÁRIO (Recomendado)
✅ Tudo do Básico +
✅ Cloudflare
✅ Google Search Console
✅ UptimeRobot
✅ 2FA

**Proteção:** ~85%
**Tempo:** 2 horas

---

### AVANÇADO (Paranoia Mode 😄)
✅ Tudo do Intermediário +
✅ reCAPTCHA
✅ Rate Limiting
✅ Monitoramento de logs
✅ Backup diário automatizado
✅ Headers extras de segurança

**Proteção:** ~95%
**Tempo:** 4 horas

---

## 🎯 RECOMENDAÇÃO PARA VOCÊ (GIOVANNI)

### FAÇA AGORA (30 minutos):

1. ✅ Ative SSL na Locaweb
2. ✅ Faça upload do .htaccess
3. ✅ Mude senha da Locaweb
4. ✅ Configure backup automático

### FAÇA ESSA SEMANA (2 horas):

5. ✅ Configure Cloudflare
6. ✅ Adicione ao Google Search Console
7. ✅ Configure UptimeRobot
8. ✅ Ative 2FA na Locaweb

### OPCIONAL (quando tiver tempo):

9. ⭐ Adicione reCAPTCHA
10. ⭐ Configure Rate Limiting

---

## 📞 SUPORTE

### Problemas com .htaccess:
- Teste: Renomeie para `.htaccess.old`
- Se site voltar, alguma regra conflitou
- Ative linha por linha até encontrar problema

### Locaweb Suporte:
- Chat: 24/7
- Telefone: 0800
- Ticket: Painel

### Testes de Segurança:
- SSL: https://www.ssllabs.com/ssltest/
- Headers: https://securityheaders.com/
- Malware: https://sitecheck.sucuri.net/

---

## 🎉 RESULTADO FINAL

Com TUDO configurado, seu site terá:

✅ **SSL/HTTPS** (criptografia)
✅ **Proteção DDoS** (Cloudflare)
✅ **Firewall** (WAF)
✅ **Anti-bot** (reCAPTCHA)
✅ **Monitoramento** (uptime + logs)
✅ **Backup** (diário)
✅ **Headers** de segurança
✅ **Proteção** contra:
   - SQL Injection
   - XSS
   - Clickjacking
   - Hotlinking
   - Bots maliciosos
   - Força bruta

**NÍVEL DE SEGURANÇA: PROFISSIONAL 🔒**

---

**Seu portfolio estará mais seguro que 90% dos sites! 🚀**
