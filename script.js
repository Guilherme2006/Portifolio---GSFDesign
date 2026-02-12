// Menu Toggle para Mobile - COM SUPORTE A TOUCH
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

function toggleMenu() {
    console.log('Menu toggle - State:', navbar.classList.contains('active'));
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
}

// Click event
menuToggle.addEventListener('click', toggleMenu);

// Touch event para mobile (mais responsivo)
menuToggle.addEventListener('touchstart', function(e) {
    e.preventDefault();
    toggleMenu();
}, { passive: false });

// Fecha o menu ao clicar em um link
const closeMenuOnLinkClick = () => {
    navbar.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
};

// Navegação Ativa e Links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Smooth scroll para seções
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Fecha o menu
        closeMenuOnLinkClick();
    });
    
    // Touch event também
    link.addEventListener('touchend', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        closeMenuOnLinkClick();
    });
});

// Logo também faz smooth scroll
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        const href = logo.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeMenuOnLinkClick();
        }
    });
    
    // Touch event
    logo.addEventListener('touchend', (e) => {
        const href = logo.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeMenuOnLinkClick();
        }
    });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    // Se navbar está ativa e o clique foi fora do menu e fora do botão toggle
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMenuOnLinkClick();
    }
}, true);

// Touch event para fechar menu ao tocar fora
document.addEventListener('touchend', (e) => {
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMenuOnLinkClick();
    }
}, true);

// Navegação Ativa baseada na Scroll - COM THROTTLE
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
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
            
            scrollTicking = false;
        });
        scrollTicking = true;
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
const modalCta = document.querySelector(".modal-cta");
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
        e.stopPropagation();
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
            
            // Garantir scroll funciona
            setTimeout(() => {
                const modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                    // Força o browser a calcular o scroll
                    modalContent.style.overflow = 'hidden';
                    modalContent.offsetHeight;
                    modalContent.style.overflow = 'scroll';
                }
            }, 50);
        }
    }, { passive: false });
});

// Fechar modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Função auxiliar para fechar modal
function closeServiceModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar no X
modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeServiceModal();
}, { passive: false });

// Fechar modal clicando fora
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeServiceModal();
    }
}, { passive: false });

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeServiceModal();
    }
}, { passive: false });

// Botão "Solicitar Orçamento" - Fecha e navega
modalCta.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Fecha modal imediatamente
    closeServiceModal();

    // Navega para contato
    setTimeout(() => {
        const contato = document.querySelector("#contato");
        if (contato) {
            contato.scrollIntoView({ behavior: "smooth" });
        }
    }, 200);
}, { passive: false });



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

// Adicionar efeito parallax suave ao scroll - OTIMIZADO
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.home-img, .sobre-img');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

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

// Funcionalidade de visualização de projetos com Modal Carrossel
let currentSlideIndex = 0;
let currentImages = [];
let currentProjectTitle = '';
let currentProjectDescription = '';

// Criar Modal Carrossel dinamicamente
function createImageModal() {
    const existingModal = document.getElementById('imageModal');
    if (existingModal) return;

    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Fechar imagem">&times;</button>
            
            <div class="carousel-container">
                <img id="modalImage" src="" alt="Imagem do projeto" class="modal-image">
                
                <button class="carousel-btn carousel-prev" aria-label="Imagem anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-btn carousel-next" aria-label="Próxima imagem">
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="carousel-indicators" id="carouselIndicators"></div>
            </div>
            
            <div class="modal-info">
                <h3 id="modalTitle" class="modal-title"></h3>
                <p id="modalDescription" class="modal-description"></p>
                <div class="image-counter">
                    <span id="imageCounter">1</span> / <span id="totalImages">1</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Eventos
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.carousel-prev');
    const nextBtn = modal.querySelector('.carousel-next');

    closeBtn.addEventListener('click', closeImageModal);
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Navegação via teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeImageModal();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });
}

function changeSlide(direction) {
    if (currentImages.length === 0) return;
    
    currentSlideIndex += direction;
    
    // Loop carrossel
    if (currentSlideIndex >= currentImages.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = currentImages.length - 1;
    }
    
    updateSlide();
}

function updateSlide() {
    const modalImage = document.getElementById('modalImage');
    const imageCounter = document.getElementById('imageCounter');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    modalImage.src = currentImages[currentSlideIndex];
    imageCounter.textContent = currentSlideIndex + 1;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
}

function openImageModal(images, title, description) {
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const totalImages = document.getElementById('totalImages');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    // Definir dados globais
    currentImages = images;
    currentSlideIndex = 0;
    currentProjectTitle = title;
    currentProjectDescription = description;

    // Atualizar conteúdo
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    totalImages.textContent = images.length;

    // Criar indicadores
    indicatorsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
        indicator.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
        indicator.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlide();
        });
        indicatorsContainer.appendChild(indicator);
    });

    updateSlide();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentImages = [];
}

// Inicializar o modal
createImageModal();

// ===== CONFIGURAÇÃO DE IMAGENS =====

const projectData = {
    feed1: {
        title: 'Loja de Moda Premium',
        description: 'Identidade visual completa para loja de moda. Feed harmônico com paleta rosa e dourado. Resultado: +15k seguidores em 3 meses.',
        images: [
            'https://gsfdesign.com.br/img1.jpg',
            'https://gsfdesign.com.br/img2.jpg',
            'https://gsfdesign.com.br/img3.jpg',
            'https://gsfdesign.com.br/img4.jpg'
        ]
    },
    stories1: {
        title: 'Stories Interativos',
        description: 'Templates de stories com enquetes, caixinhas de perguntas e quizzes para aumentar o engajamento e interação com a audiência.',
        images: [
            'https://gsfdesign.com.br/img2.jpg',
            'https://gsfdesign.com.br/img3.jpg'
        ]
    },
    feed2: {
        title: 'Academia & Fitness',
        description: 'Redesign completo de feed fitness com antes/depois, dicas de treino e motivação. Crescimento de 200% no engajamento.',
        images: [
            'https://gsfdesign.com.br/img3.jpg',
            'https://gsfdesign.com.br/img4.jpg'
        ]
    },
    reels1: {
        title: 'Reels de Receitas',
        description: 'Criação de capas e elementos visuais para Reels de culinária. Vídeos alcançaram +500k visualizações cada.',
        images: [
            'https://gsfdesign.com.br/img1.jpg',
            'https://gsfdesign.com.br/img2.jpg'
        ]
    },
    feed3: {
        title: 'Criador de Conteúdo',
        description: 'Identidade visual para produtor digital. Carrosséis educativos, posts de valor e calls-to-action estratégicos.',
        images: [
            'https://gsfdesign.com.br/img1.jpg',
            'https://gsfdesign.com.br/img3.jpg',
            'https://gsfdesign.com.br/img4.jpg'
        ]
    },
    stories2: {
        title: 'Campanha de Lançamento',
        description: 'Sequência de 15 stories para lançamento de produto digital. Design estratégico que gerou R$50k em vendas.',
        images: [
            'https://gsfdesign.com.br/img2.jpg',
            'https://gsfdesign.com.br/img4.jpg',
            'https://gsfdesign.com.br/img1.jpg'
        ]
    }
};

// Event listeners para os links de visualização de projetos
const viewProjectLinks = document.querySelectorAll('.view-project');

viewProjectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            openImageModal(project.images, project.title, project.description);
            showNotification('🎨 Galeria de imagens carregada!', 'success');
        }
    });
});
