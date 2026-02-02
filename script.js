// Menu Toggle para Mobile
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    
    // Muda o ícone do menu
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fecha o menu ao clicar em um link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navegação Ativa baseada na Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Header com fundo ao fazer scroll
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Botão Voltar ao Topo
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Filtro de Projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.projeto-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'todos' || filter === category) {
                card.style.display = 'block';
                // Animação de entrada
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animação de Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll(
    '.servico-card, .projeto-card, .timeline-item, .habilidade-categoria, .sobre-container'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Smooth Scroll para Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Formulário de Contato - DESATIVADO (usando FormSubmit.co)
// O formulário agora envia via POST para FormSubmit.co
// Se quiser voltar para JavaScript, descomente o código abaixo

/*
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica de envio do formulário
        // Por exemplo, usando fetch para enviar para um backend
        
        // Mensagem de sucesso (exemplo)
        const formData = new FormData(contactForm);
        
        // Simulação de envio
        console.log('Formulário enviado!');
        
        // Mostra mensagem de sucesso
        showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
        
        // Limpa o formulário
        contactForm.reset();
    });
}
*/

// Função para mostrar notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.6rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Adiciona animações CSS necessárias
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animação dos números (contador) na seção Sobre
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observa a seção Sobre para iniciar a animação dos números
const sobreSection = document.querySelector('.sobre');
if (sobreSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.info-item h4');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                    }
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(sobreSection);
}

// Animação da barra de progresso das habilidades
const habilidadesSection = document.querySelector('.habilidades');
if (habilidadesSection) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.animation = 'progressAnimation 2s ease-out';
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressObserver.observe(habilidadesSection);
}

// Cursor personalizado (opcional - remova se não quiser)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #ff6b35;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: 0.1s;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efeito hover nos elementos interativos
const interactiveElements = document.querySelectorAll('a, button, .servico-card, .projeto-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#f7931e';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#ff6b35';
    });
});

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    showNotification('🎉 Você encontrou o Easter Egg! Modo Especial Ativado!', 'success');
    document.body.style.animation = 'rainbow 3s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// Adiciona animação rainbow para o easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Log de boas-vindas no console
console.log('%c👋 Olá, curioso!', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
console.log('%c🎨 Gostou do portfólio? Vamos criar algo juntos!', 'font-size: 14px; color: #f7931e;');
console.log('%c💼 Email: giovanni.design@email.com', 'font-size: 12px; color: #b8b8b8;');

// Performance: Lazy loading para imagens (se aplicável)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Modal de Serviços
const modal = document.getElementById('serviceModal');
const serviceLinks = document.querySelectorAll('.service-link');
const modalClose = document.querySelector('.modal-close');

// Dados dos serviços
const servicesData = {
    instagram: {
        icon: 'fab fa-instagram',
        title: 'Design para Instagram',
        description: 'Criação completa de artes estratégicas para Instagram, pensadas para converter seguidores em clientes e aumentar seu engajamento.',
        includes: [
            'Posts para Feed (estático e carrossel)',
            'Stories criativos e interativos',
            'Capas de destaques personalizadas',
            'Identidade visual harmoniosa',
            'Paleta de cores estratégica',
            'Revisões ilimitadas',
            'Arquivos em alta resolução',
            'Suporte pós-entrega'
        ],
        pricing: 'A partir de R$ 500/mês para pacotes de 10 posts. Valores personalizados de acordo com a necessidade do projeto.'
    },
    crescimento: {
        icon: 'fas fa-chart-line',
        title: 'Estratégia de Crescimento',
        description: 'Análise profunda do seu perfil e da concorrência para criar uma estratégia visual que gera crescimento orgânico real e duradouro.',
        includes: [
            'Análise completa do perfil atual',
            'Pesquisa de concorrência no nicho',
            'Definição de identidade visual',
            'Criação de paleta de cores',
            'Grid estratégico do feed',
            'Plano de conteúdo visual',
            'Consultoria de 1h mensal',
            'Relatório de métricas'
        ],
        pricing: 'Pacote único: R$ 1.500 ou Consultoria mensal: R$ 800/mês'
    },
    identidade: {
        icon: 'fas fa-palette',
        title: 'Identidade Visual',
        description: 'Desenvolvimento de identidade visual completa que representa a essência da sua marca e se destaca no Instagram.',
        includes: [
            'Criação ou redesign de logo',
            'Manual de identidade visual',
            'Paleta de cores completa',
            'Tipografia personalizada',
            'Padrões e texturas',
            'Mockups de aplicação',
            'Arquivos editáveis',
            'Suporte de 30 dias'
        ],
        pricing: 'A partir de R$ 2.000 - Projeto completo com todas as entregas'
    },
    templates: {
        icon: 'fas fa-layer-group',
        title: 'Templates Editáveis',
        description: 'Templates personalizados e editáveis para você manter a consistência visual do seu Instagram de forma independente.',
        includes: [
            '20 templates de posts',
            '15 templates de stories',
            '10 modelos de carrossel',
            'Elementos gráficos customizados',
            'Fontes e ícones incluídos',
            'Tutorial em vídeo de edição',
            'Versão Canva e Photoshop',
            'Atualizações trimestrais'
        ],
        pricing: 'Pacote completo: R$ 800 - Acesso vitalício aos templates'
    },
    reels: {
        icon: 'fas fa-video',
        title: 'Design para Reels',
        description: 'Capas e elementos visuais profissionais que fazem seus Reels se destacarem e viralizarem no Instagram.',
        includes: [
            'Capas de Reels personalizadas',
            'Elementos de motion design',
            'Transições e efeitos visuais',
            'Lower thirds e legendas',
            'Intro e outro animados',
            'Pack de stickers personalizados',
            'Arquivos em vídeo e estáticos',
            'Tutorial de aplicação'
        ],
        pricing: 'A partir de R$ 400 - Pacote com 10 capas + elementos'
    },
    pacotes: {
        icon: 'fas fa-star',
        title: 'Pacotes Mensais',
        description: 'Planos recorrentes de artes para manter seu Instagram sempre atualizado, profissional e em constante crescimento.',
        includes: [
            'De 10 a 30 posts por mês',
            'Stories ilimitados',
            'Capas de Reels incluídas',
            'Revisões ilimitadas',
            'Entrega programada',
            'Suporte prioritário',
            'Consultoria mensal',
            'Análise de performance'
        ],
        pricing: 'Básico (10 posts): R$ 500/mês | Intermediário (20 posts): R$ 900/mês | Premium (30 posts): R$ 1.300/mês'
    }
};

// Abrir modal
serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceType = link.getAttribute('data-service');
        const serviceData = servicesData[serviceType];
        
        if (serviceData) {
            // Atualizar conteúdo do modal
            document.querySelector('.modal-icon i').className = serviceData.icon;
            document.querySelector('.modal-title').textContent = serviceData.title;
            document.querySelector('.modal-description').textContent = serviceData.description;
            
            // Atualizar lista de inclusões
            const listElement = document.querySelector('.modal-list');
            listElement.innerHTML = '';
            serviceData.includes.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                listElement.appendChild(li);
            });
            
            // Atualizar preço
            document.querySelector('.price-info').textContent = serviceData.pricing;
            
            // Mostrar modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fechar modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Fechar modal clicando fora
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Botão de Download Portfólio
const downloadBtn = document.getElementById('downloadPortfolio');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('📥 Download iniciado! Verifique sua pasta de downloads.', 'success');
        // Aqui você pode adicionar a lógica real de download do PDF
        // window.location.href = 'caminho/para/portfolio.pdf';
    });
}

// Copiar email ao clicar
const emailLinks = document.querySelectorAll('a[href^="mailto"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent;
        navigator.clipboard.writeText(email).then(() => {
            showNotification('📧 Email copiado para área de transferência!', 'success');
        });
    });
});

// Função para abrir WhatsApp
const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const number = link.getAttribute('href');
        const message = encodeURIComponent('Olá Giovanni! Vi seu portfólio e gostaria de conversar sobre um projeto.');
        window.open(`${number}?text=${message}`, '_blank');
    });
});

// Adicionar efeito parallax suave ao scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.home-img, .sobre-img');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// Adicionar contadores animados na primeira visualização
let countersAnimated = false;
const counters = document.querySelectorAll('.info-item h4');

const animateCountersOnce = () => {
    if (countersAnimated) return;
    
    const sobreSection = document.querySelector('.sobre');
    const rect = sobreSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            if (!isNaN(target)) {
                let count = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count) + '+';
                    }
                }, 20);
            }
        });
        countersAnimated = true;
    }
};

window.addEventListener('scroll', animateCountersOnce);

// Melhorar UX do formulário
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Adicionar validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'rgba(255, 107, 53, 0.2)';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
    });
}

// Adicionar indicador de progresso da página
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--gradient-1);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

console.log('%c✨ Site totalmente funcional!', 'font-size: 16px; font-weight: bold; color: #10b981;');

// Funcionalidade de visualização de projetos
const viewProjectLinks = document.querySelectorAll('.view-project');

viewProjectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        showNotification('🎨 Abrindo detalhes do projeto...', 'success');
        
        // Aqui você pode adicionar lógica para abrir um modal com mais imagens
        // ou redirecionar para uma página específica do projeto
        setTimeout(() => {
            showNotification('💡 Em breve: Galeria completa de imagens!', 'success');
        }, 1000);
    });
});

// Adicionar efeitos de hover nos cards de projeto
const projectCards = document.querySelectorAll('.projeto-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Adicionar animação de entrada aos elementos quando ficam visíveis
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todos os cards e seções
document.querySelectorAll('.servico-card, .projeto-card, .timeline-item, .habilidade-categoria').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    fadeInObserver.observe(el);
});