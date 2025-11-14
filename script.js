// =============================================
// PATRICINHA LUXURY - SCRIPT COMPLETO ATUALIZADO
// =============================================
(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5511977277049';
  const WHATSAPP_BASE = `https://wa.me/${5511977277049}`;
  const LOADING_TIME = 1500;
  const IMAGE_FALLBACK = './img/placeholder.jpg';

  let currentProductId = null;
  let imageCache = new Map();
  
  // =============================================
  // UTILITÁRIOS
  // =============================================
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  // Função para carregar imagem com fallback
  const loadImage = (src, alt = 'Produto') => {
    return new Promise((resolve) => {
      // Verificar se já está no cache
      if (imageCache.has(src)) {
        resolve(imageCache.get(src));
        return;
      }

      const img = new Image();
      img.onload = () => {
        imageCache.set(src, src);
        resolve(src);
      };
      img.onerror = () => {
        console.warn(`Imagem não encontrada: ${src}, usando fallback`);
        resolve(IMAGE_FALLBACK);
      };
      img.src = src;
    });
  };

  // =============================================
  // DADOS DOS PRODUTOS (ESTRUTURA OTIMIZADA)
  // =============================================
  const produtos = [
    {
      id: 1, 
      nome: "NEVERFULL LV", 
      categoria: "bolsas", 
      marca: "Louis Vuitton",
      descricao: "A icônica bolsa tote Neverfull MM combina design atemporal com praticidade. Canvas Monogram com acabamento em couro natural, alças ajustáveis e interior espaçoso com bolso removível.",
      preco: 2200,
      precoFormatado: "R$ 2.200,00",
      imagens: [
        "./img/Neverfull/IMG_6180.AVIF",
        "./img/Neverfull/IMG_6182.AVIF",
        "./img/Neverfull/IMG_6183.AVIF",
        "./img/Neverfull/IMG_6184.AVIF",
        "./img/Neverfull/IMG_6185.AVIF",
        "./img/Neverfull/IMG_6186.AVIF",
        "./img/Neverfull/IMG_6187.WEBP",
        "./img/Neverfull/IMG_6188.AVIF",
        "./img/Neverfull/IMG_6189.AVIF",
        "./img/Neverfull/IMG_6190.AVIF",
        "./img/Neverfull/IMG_6191.AVIF",
        "./img/Neverfull/IMG_6192.AVIF",
        "./img/Neverfull/IMG_6193.AVIF",
        "./img/Neverfull/IMG_6194.AVIF"
      ],
      dimensoes: "PM: 29×21×12 cm | MM: 31×28×14 cm | GM: 39×32×19 cm",
      disponivel: true
    },
    {
      id: 2, 
      nome: "BOÎTE CHAPEAU LV", 
      categoria: "bolsas", 
      marca: "Louis Vuitton",
      descricao: "Reinterpretação moderna da clássica caixa de chapéu. Estrutura rígida, alça removível, ferragens douradas e canvas Monogram. Perfeita para eventos.",
      preco: 1999,
      precoFormatado: "R$ 1.999,00",
      imagens: [
        "./img/bolsas/boite-1.jpg",
        "./img/bolsas/boite-2.jpg",
        "./img/bolsas/boite-3.jpg"
      ],
      dimensoes: "20 × 22,5 cm",
      disponivel: true
    },
    {
      id: 3, 
      nome: "MONTAIGNE LV", 
      categoria: "bolsas", 
      marca: "Louis Vuitton",
      descricao: "Homenagem à elegância parisiense. Fechamento com torção, alça de ombro e bolso frontal. Couro granulado com detalhes em Monogram.",
      preco: 2500,
      precoFormatado: "R$ 2.500,00",
      imagens: [
        "./img/Montaigne/IMG_6195.JPG",
        "./img/Montaigne/IMG_6196.JPG",
        "./img/Montaigne/IMG_6197.JPG"
      ],
      dimensoes: "33 × 23 × 15 cm",
      disponivel: true
    },
    {
      id: 4, 
      nome: "ONTHEGO GM LV", 
      categoria: "bolsas", 
      marca: "Louis Vuitton",
      descricao: "Tote gigante em Monogram Giant. Alças duplas, interior com divisórias, perfeita para o dia a dia com estilo. Capacidade para notebook.",
      preco: 2499,
      precoFormatado: "R$ 2.499,00",
      imagens: [
        "./img/onthego/louis-vuitton-bolsa-onthego-mm--M45321_PM1_Interior view.avif",
        "./img/onthego/louis-vuitton-bolsa-onthego-mm--M45321_PM1_Side view.avif",
        "./img/onthego/louis-vuitton-bolsa-onthego-mm--M45321_PM2_Front view.avif"
      ],
      dimensoes: "41 × 34 × 19 cm",
      disponivel: true
    },
    {
      id: 5, 
      nome: "NÉONOÉ LV", 
      categoria: "bolsas", 
      marca: "Louis Vuitton",
      descricao: "Bolsa bucket moderna com cordão ajustável. Forro em microfibra colorida, alça removível e charm em couro. Estilo jovem e sofisticado.",
      preco: 2300,
      precoFormatado: "R$ 2.300,00",
      imagens: [
        "./img/bolsas/neonoe-1.jpg",
        "./img/bolsas/neonoe-2.jpg",
        "./img/bolsas/neonoe-3.jpg"
      ],
      dimensoes: "26 × 26 × 17,5 cm",
      disponivel: true
    },
    {
      id: 6, 
      nome: "COLAR TIFFANY HEART", 
      categoria: "joias", 
      marca: "Tiffany & Co.",
      descricao: "Colar em prata 925 com pingente de coração. Design clássico, perfeito para presentear. Acompanha caixa original e certificado.",
      preco: 3200,
      precoFormatado: "R$ 3.200,00",
      imagens: [
        "./img/joias/tiffany-heart-1.jpg",
        "./img/joias/tiffany-heart-2.jpg",
        "./img/joias/tiffany-heart-3.jpg"
      ],
      dimensoes: "Corrente: 45 cm",
      disponivel: true
    },
    {
      id: 7, 
      nome: "ANEL SOLITÁRIO DIAMANTE", 
      categoria: "joias", 
      marca: "Cartier",
      descricao: "Anel em ouro branco 18k com diamante central de 0.5ct. Lapidação brilhante, certificado GIA incluso. Luxo eterno.",
      preco: 8500,
      precoFormatado: "R$ 8.500,00",
      imagens: [
        "./img/joias/anel-diamante-1.jpg",
        "./img/joias/anel-diamante-2.jpg"
      ],
      dimensoes: "Aro: 17 (ajustável)",
      disponivel: true
    },
    {
      id: 8, 
      nome: "LENÇO SEDA GUCCI", 
      categoria: "acessorios", 
      marca: "Gucci",
      descricao: "Nossa coleção de lenços pode ser usada nas bolsas, no cabelo, em looks, deixam seus acessórios mais bonitos e charmosos.",
      preco: 650,
      precoFormatado: "A partir de R$ 650,00",
      imagens: [
        "./img/acessórios/lencos 1.png",
        "./img/acessórios/lencos 2.png",
        "./img/acessórios/lencos 3.png"

      ],
      dimensoes: "90 × 90 cm",
      disponivel: true
    },
    {
      id: 9, 
      nome: "ÓCULOS SOL PRADA", 
      categoria: "acessorios", 
      marca: "Prada",
      descricao: "Óculos de sol com armação em acetato preto, lentes polarizadas UV400. Design cat-eye moderno. Estojo rígido incluso.",
      preco: 1800,
      precoFormatado: "R$ 1.800,00",
      imagens: [
        "./img/acessorios/oculos-prada-1.jpg",
        "./img/acessorios/oculos-prada-2.jpg",
        "./img/acessorios/oculos-prada-3.jpg"
      ],
      dimensoes: "Lente: 55 mm",
      disponivel: true
    },
    {
      id: 10, 
      nome: "CARTEIRA LV MONOGRAM", 
      categoria: "acessorios", 
      marca: "Louis Vuitton",
      descricao: "Carteira compacta em canvas Monogram. 6 slots para cartões, compartimento para notas e bolso com zíper para moedas.",
      preco: 1350,
      precoFormatado: "R$ 1.350,00",
      imagens: [
        "./img/acessorios/carteira-lv-1.jpg",
        "./img/acessorios/carteira-lv-2.jpg",
        "./img/acessorios/carteira-lv-3.jpg",
        "./img/acessorios/carteira-lv-4.jpg"
      ],
      dimensoes: "11 × 9 × 2 cm",
      disponivel: true
    },
    {
      id: 11, 
      nome: "PALM SPRINGS LV", 
      categoria: "mochilas",
      marca: "Louis Vuitton",
      descricao: "Opções masculinas e femininas para qualquer ocasião, desde tamanhos menores e mais compactos à modelos maiores e mais espaçosos.",
      preco: 1800,
      precoFormatado: "A partir de R$ 1.800,00",
      variacoes: [
        { tamanho: "P", preco: "R$ 1.800,00" },
        { tamanho: "M", preco: "R$ 2.200,00" },
        { tamanho: "G", preco: "R$ 2.400,00" }
      ],
      observacao: "Demais modelos a partir de R$ 2.300,00",
      imagens: [
        "./img/acessórios/mochial 2.png", 
        "./img/acessórios/mochila 1.png",
        "./img/acessórios/mochila 3.png"
      ],
      dimensoes: "P, M, G",
      disponivel: true
    },
    {
      id: 12, 
      nome: "MALA DE MÃO LV", 
      categoria: "acessorios",
      marca: "Louis Vuitton",
      descricao: "Viajar com segurança e exclusividade é a experiência que uma mala de grife proporciona.",
      preco: 3900,
      precoFormatado: "R$ 3.900,00",
      imagens: [
        "./img/acessórios/malas 3.png"
      ],
      dimensoes: "Mala de mão",
      disponivel: true
    },
    {
      id: 13, 
      nome: "MALA DE RODINHA LV", 
      categoria: "acessorios",
      marca: "Louis Vuitton",
      descricao: "Viajar com segurança e exclusividade é a experiência que uma mala de grife proporciona.",
      preco: 7000,
      precoFormatado: "R$ 7.000,00",
      imagens: [
        "./img/img/malas 1.png", 
        "./img/img/malas 2.png"
      ],
      dimensoes: "Mala de rodinha",
      disponivel: true
    },
    {
      id: 14, 
      nome: "TÊNIS EXCLUSIVOS", 
      categoria: "tenis",
      descricao: "Modelos super confortáveis e lançamentos exclusivos.",
      preco: 1500,
      precoFormatado: "A partir de R$ 1.500,00",
      imagens: [
        "./img/acessórios/tenis 1.png", 
        "./img/acessórios/tenis 2.png", 
        "./img/acessórios/tenis 3.png"
      ],
      disponivel: true
    },
    {
      id: 15, 
      nome: "TÊNIS SAMBA", 
      categoria: "tenis",
      descricao: "Modelos super confortáveis e lançamentos exclusivos.",
      preco: 450,
      precoFormatado: "A partir de R$ 450,00",
      imagens: [
        "./img/acessórios/samba 1.png", 
        "./img/acessórios/samba 2.png", 
        "./img/acessórios/samba 3.png"
      ],
      disponivel: true
    },
    {
      id: 16, 
      nome: "FLATS", 
      categoria: "acessorios",
      descricao: "Flats super confortáveis, para você usar na praia, na piscina ou com um look despojado, sem perder a elegância.",
      preco: 1600,
      precoFormatado: "R$ 1.600,00",
      imagens: [
        "./img/acessórios/flats 1.png", 
        "./img/acessórios/flats 2.png", 
        "./img/acessórios/flats 3.png"
      ],
      disponivel: true
    },
    {
      id: 17, 
      nome: "MEIAS DE GRIFE", 
      categoria: "acessorios", 
      descricao: "Seja para deixar o look mais estiloso, ou mais confortável as meias de grife são clássicas e únicas.",
      preco: 450,
      precoFormatado: "A partir de R$ 450,00",
      imagens: [
        "./img/acessórios/meias 1.png", 
        "./img/acessórios/meias 2.png", 
        "./img/acessórios/meias 3.png"
      ],
      disponivel: true
    }
  ].map(produto => ({
    ...produto,
    precoFormatado: produto.precoFormatado || `R$ ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }));

  // =============================================
  // GERENCIAMENTO DE ESTADO
  // =============================================
  const state = {
    currentFilter: 'todos',
    isLoading: false,
    currentProductId: null
  };

  // =============================================
  // CRIAR CARD DE PRODUTO (OTIMIZADO)
  // =============================================
  async function createProductCard(p) {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.dataset.id = p.id;
    card.dataset.currentImgIndex = 0;

    // Pré-carregar primeira imagem
    const firstImageSrc = await loadImage(p.imagens[0], p.nome);

    card.innerHTML = `
      <div class="produto-card-img-container">
        <div class="produto-card-img" onclick="abrirGaleria(${p.id})" tabindex="0" role="button" aria-label="Ver galeria de ${p.nome}">
          <img src="${firstImageSrc}" alt="${p.nome}" loading="lazy" data-src="${p.imagens[0]}">
          ${p.imagens.length > 1 ? `
            <div class="multi-imagem-indicator">
              <i class="fas fa-images"></i> ${p.imagens.length}
            </div>
          ` : ''}
          ${!p.disponivel ? `<div class="produto-indisponivel">Indisponível</div>` : ''}
        </div>
        ${p.imagens.length > 1 ? `
          <div class="produto-navegacao">
            <button class="nav-btn nav-prev" onclick="mudarImagemProduto(${p.id}, -1, event)" aria-label="Imagem anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn nav-next" onclick="mudarImagemProduto(${p.id}, 1, event)" aria-label="Próxima imagem">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        ` : ''}
      </div>
      <div class="produto-card-info">
        <div class="produto-card-categoria">${p.marca || 'Luxo'}</div>
        <h3 class="produto-card-nome">${p.nome}</h3>
        <p class="produto-card-descricao">${p.descricao}</p>
        <div class="produto-card-preco">${p.precoFormatado}</div>
        <div class="produto-card-acoes">
          <button class="btn-card adicionar-whatsapp" data-id="${p.id}" ${!p.disponivel ? 'disabled' : ''}>
            <i class="fab fa-whatsapp"></i> ${p.disponivel ? 'Comprar' : 'Indisponível'}
          </button>
          <button class="btn-card detalhes" data-id="${p.id}">Detalhes</button>
        </div>
      </div>
    `;

    return card;
  }

  // =============================================
  // CARREGAR PRODUTOS (OTIMIZADO)
  // =============================================
  window.loadProducts = async function(filter = 'todos') {
    const grid = $('#produtos-grid');
    if (!grid) return;

    state.isLoading = true;
    state.currentFilter = filter;

    // Mostrar loading
    grid.innerHTML = '<div class="loading-products"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>';

    try {
      const filtrados = filter === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === filter);

      // Limpar grid
      grid.innerHTML = '';

      if (filtrados.length === 0) {
        grid.innerHTML = '<div class="no-products">Nenhum produto encontrado nesta categoria.</div>';
        return;
      }

      // Carregar produtos de forma assíncrona
      const productCards = await Promise.all(
        filtrados.map(p => createProductCard(p))
      );

      productCards.forEach(card => grid.appendChild(card));
      setupProductEvents();

    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      grid.innerHTML = '<div class="error-products">Erro ao carregar produtos. Tente novamente.</div>';
    } finally {
      state.isLoading = false;
    }
  };

  // =============================================
  // EVENTOS DOS BOTÕES (OTIMIZADO)
  // =============================================
  function setupProductEvents() {
    // Eventos WhatsApp
    $$('.adicionar-whatsapp:not([disabled])').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const p = produtos.find(x => x.id == id);
        
        if (!p || !p.disponivel) {
          mostrarToast('Produto indisponível no momento');
          return;
        }

        const msg = encodeURIComponent(
          `Olá! Tenho interesse no produto:\n\n` +
          `*${p.nome}*\n` +
          `${p.marca ? `${p.marca}\n` : ''}` +
          `${p.precoFormatado}\n\n` +
          `Poderia me ajudar com mais informações?`
        );
        
        window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank');
        mostrarToast('Produto enviado para o WhatsApp!');
        
        // Tracking de conversão (simulado)
        trackConversion('whatsapp_click', p.id);
      };
    });

    // Eventos Detalhes
    $$('.detalhes').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const p = produtos.find(x => x.id == id);
        
        if (p) {
          abrirModalDetalhes(p);
        }
      };
    });
  }

  // =============================================
  // MODAL DE DETALHES (NOVO)
  // =============================================
  function abrirModalDetalhes(p) {
    const modal = document.createElement('div');
    modal.className = 'modal detalhes-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
      <div class="modal-content detalhes-content">
        <span class="close">&times;</span>
        <div class="detalhes-container">
          <div class="detalhes-imagens">
            <div class="detalhes-imagem-principal">
              <img src="${p.imagens[0]}" alt="${p.nome}" id="detalhes-imagem-principal">
            </div>
            ${p.imagens.length > 1 ? `
              <div class="detalhes-miniaturas">
                ${p.imagens.map((img, index) => `
                  <img src="${img}" alt="${p.nome} - Imagem ${index + 1}" 
                       class="miniatura ${index === 0 ? 'active' : ''}"
                       onclick="mudarImagemDetalhes('${img}', this)">
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="detalhes-info">
            <h2>${p.nome}</h2>
            <div class="detalhes-marca">${p.marca || 'Luxo'}</div>
            <div class="detalhes-preco">${p.precoFormatado}</div>
            <p class="detalhes-descricao">${p.descricao}</p>
            ${p.dimensoes ? `<div class="detalhes-dimensoes"><strong>Dimensões:</strong> ${p.dimensoes}</div>` : ''}
            ${p.variacoes ? `
              <div class="detalhes-variacoes">
                <strong>Variações:</strong>
                ${p.variacoes.map(v => `<div>${v.tamanho}: ${v.preco}</div>`).join('')}
              </div>
            ` : ''}
            ${p.observacao ? `<div class="detalhes-observacao">${p.observacao}</div>` : ''}
            <div class="detalhes-actions">
              <button class="btn-whatsapp-detalhes" onclick="comprarWhatsApp(${p.id})" ${!p.disponivel ? 'disabled' : ''}>
                <i class="fab fa-whatsapp"></i> ${p.disponivel ? 'Comprar no WhatsApp' : 'Indisponível'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Fechar modal
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }

  // =============================================
  // GALERIA DE IMAGENS (OTIMIZADA)
  // =============================================
  window.abrirGaleria = async function(id) {
    const p = produtos.find(x => x.id === id);
    if (!p) return;

    state.currentProductId = id;
    const modal = $('#image-modal');
    const img = $('#modal-image');
    const card = $(`.produto-card[data-id="${id}"]`);
    let index = card ? parseInt(card.dataset.currentImgIndex || 0) : 0;

    // Mostrar loading na imagem
    img.classList.add('loading');
    
    // Carregar imagem com fallback
    const imageSrc = await loadImage(p.imagens[index], p.nome);
    img.src = imageSrc;
    img.alt = p.nome;
    img.classList.remove('loading');

    // Atualizar controles
    const oldControls = modal.querySelector('.galeria-controles');
    if (oldControls) oldControls.remove();

    if (p.imagens.length > 1) {
      const controls = document.createElement('div');
      controls.className = 'galeria-controles';
      controls.innerHTML = `
        <button class="galeria-prev" onclick="mudarImagemGaleria(-1)" aria-label="Imagem anterior">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="galeria-contador">${index + 1} / ${p.imagens.length}</span>
        <button class="galeria-next" onclick="mudarImagemGaleria(1)" aria-label="Próxima imagem">
          <i class="fas fa-chevron-right"></i>
        </button>
      `;
      modal.querySelector('.image-modal-content').appendChild(controls);
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  };

  window.mudarImagemGaleria = async function(dir) {
    if (!state.currentProductId) return;
    
    const p = produtos.find(x => x.id === state.currentProductId);
    const contador = $('#image-modal .galeria-contador');
    const img = $('#modal-image');
    
    if (!contador || !img) return;

    let currentIndex = parseInt(contador.textContent.split(' ')[0]) - 1;
    let newIndex = currentIndex + dir;
    
    if (newIndex < 0) newIndex = p.imagens.length - 1;
    if (newIndex >= p.imagens.length) newIndex = 0;

    // Mostrar loading
    img.classList.add('loading');
    
    // Carregar nova imagem
    const imageSrc = await loadImage(p.imagens[newIndex], p.nome);
    img.src = imageSrc;
    img.classList.remove('loading');
    
    contador.textContent = `${newIndex + 1} / ${p.imagens.length}`;
  };

  window.mudarImagemProduto = async function(id, dir, e) {
    e.stopPropagation();
    const p = produtos.find(x => x.id === id);
    const card = e.target.closest('.produto-card');
    const img = card.querySelector('img');
    
    if (!card || !img) return;

    let currentIndex = parseInt(card.dataset.currentImgIndex || 0);
    let newIndex = currentIndex + dir;
    
    if (newIndex < 0) newIndex = p.imagens.length - 1;
    if (newIndex >= p.imagens.length) newIndex = 0;

    // Mostrar loading
    img.classList.add('loading');
    
    // Carregar nova imagem
    const imageSrc = await loadImage(p.imagens[newIndex], p.nome);
    img.src = imageSrc;
    img.classList.remove('loading');
    
    card.dataset.currentImgIndex = newIndex;
  };

  window.mudarImagemDetalhes = async function(src, element) {
    const mainImg = $('#detalhes-imagem-principal');
    const miniaturas = $$('.miniatura');
    
    if (!mainImg) return;

    // Mostrar loading
    mainImg.classList.add('loading');
    
    // Carregar nova imagem
    const imageSrc = await loadImage(src, mainImg.alt);
    mainImg.src = imageSrc;
    mainImg.classList.remove('loading');
    
    // Atualizar miniaturas ativas
    miniaturas.forEach(m => m.classList.remove('active'));
    element.classList.add('active');
  };

  // =============================================
  // FUNÇÃO DE COMPRA VIA WHATSAPP
  // =============================================
  window.comprarWhatsApp = function(id) {
    const p = produtos.find(x => x.id == id);
    
    if (!p || !p.disponivel) {
      mostrarToast('Produto indisponível no momento');
      return;
    }

    const msg = encodeURIComponent(
      `Olá! Gostaria de comprar:\n\n` +
      `*${p.nome}*\n` +
      `${p.marca ? `${p.marca}\n` : ''}` +
      `${p.precoFormatado}\n\n` +
      `Podemos finalizar a compra?`
    );
    
    window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank');
    mostrarToast('Redirecionando para o WhatsApp!');
    
    // Fechar modal de detalhes se estiver aberto
    const modal = $('.detalhes-modal');
    if (modal) modal.remove();
    
    trackConversion('whatsapp_purchase', p.id);
  };

  // =============================================
  // MODAIS (OTIMIZADO)
  // =============================================
  function setupModals() {
    // Fechar modais ao clicar fora ou no X
    $$('.modal').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.classList.contains('close')) {
          closeModal(modal);
        }
      });
    });

    // Modal WhatsApp
    $('#open-whatsapp')?.addEventListener('click', e => {
      e.preventDefault();
      openModal($('#whatsapp-modal'));
    });

    // Tecla ESC para fechar modais
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        $$('.modal').forEach(modal => {
          if (modal.style.display === 'flex') {
            closeModal(modal);
          }
        });
      }
    });
  }

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    if (modal.id === 'image-modal') {
      state.currentProductId = null;
    }
  }

  // =============================================
  // MENU MOBILE (OTIMIZADO)
  // =============================================
  function setupMobileMenu() {
    const hamburger = $('#hamburger');
    const nav = $('#nav');
    
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
      hamburger.classList.toggle('is-active');
      
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    $$('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // =============================================
  // SCROLL & BOTÃO TOPO (OTIMIZADO)
  // =============================================
  function setupScroll() {
    const btn = $('#back-to-top');
    if (!btn) return;

    let scrollTimeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const isVisible = window.scrollY > 300;
        btn.classList.toggle('visible', isVisible);
        btn.setAttribute('aria-hidden', !isVisible);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      btn.blur(); // Remover foco após clique
    });
  }

  // =============================================
  // FILTROS (OTIMIZADO)
  // =============================================
  function setupFiltros() {
    $$('.filtro-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Atualizar estado dos botões
        $$('.filtro-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        
        // Carregar produtos
        const filter = btn.dataset.filter;
        loadProducts(filter);
        
        // Scroll para produtos
        const produtosSection = $('#produtos');
        if (produtosSection) {
          const headerH = $('header').offsetHeight;
          window.scrollTo({ 
            top: produtosSection.offsetTop - headerH - 20, 
            behavior: 'smooth' 
          });
        }
      });
    });
  }

  // =============================================
  // NAVEGAÇÃO (OTIMIZADO)
  // =============================================
  function setupNavigation() {
    // Delegation de eventos para melhor performance
    document.addEventListener('click', e => {
      const link = e.target.closest('nav li, .footer-links a, .nav-link');
      if (!link) return;

      e.preventDefault();
      
      const target = link.dataset.target || link.getAttribute('href')?.slice(1);
      if (target) {
        showSection(target);
      }
    });
  }

  window.showSection = function(id) {
    // Esconder todas as seções
    $$('section').forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-hidden', 'true');
    });

    // Mostrar seção alvo
    const target = $(`#${id}`);
    if (target) {
      target.classList.add('active');
      target.setAttribute('aria-hidden', 'false');
      
      // Scroll para seção
      const headerH = $('header').offsetHeight;
      window.scrollTo({ 
        top: target.offsetTop - headerH - 20, 
        behavior: 'smooth' 
      });
    }

    // Fechar menu mobile se estiver aberto
    $('#nav')?.classList.remove('active');
    $('#hamburger')?.classList.remove('is-active');
    $('#hamburger')?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // =============================================
  // TOAST NOTIFICATIONS (OTIMIZADO)
  // =============================================
  window.mostrarToast = function(msg, type = 'success') {
    // Remover toast existente
    const existingToast = $('#toast');
    if (existingToast) existingToast.remove();

    // Criar novo toast
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);

    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto-remover após 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 300);
    }, 3000);
  };

  // =============================================
  // TRACKING DE CONVERSÕES (SIMULADO)
  // =============================================
  function trackConversion(type, productId) {
    // Em um ambiente real, aqui iria Google Analytics, Facebook Pixel, etc.
    console.log(`Conversão: ${type} - Produto ID: ${productId}`);
    
    // Simular envio para analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', type, {
        'event_category': 'engagement',
        'event_label': `product_${productId}`,
        'value': productId
      });
    }
  }

  // =============================================
  // LAZY LOADING DE IMAGENS
  // =============================================
  function setupLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            loadImage(src, img.alt).then(loadedSrc => {
              img.src = loadedSrc;
              img.removeAttribute('data-src');
            });
          }
          
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    // Observar imagens com data-src
    $$('img[data-src]').forEach(img => observer.observe(img));
  }

  // =============================================
  // LOADING (OTIMIZADO)
  // =============================================
  function setupLoading() {
    const loading = $('#loading');
    if (!loading) return;

    // Simular tempo de carregamento
    const minTime = LOADING_TIME;
    const startTime = Date.now();

    const hideLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minTime - elapsed);
      
      setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
          if (loading.parentNode) loading.remove();
          // Iniciar lazy loading após carregamento
          setupLazyLoading();
        }, 500);
      }, remaining);
    };

    // Esperar pelo carregamento da página
    if (document.readyState === 'complete') {
      hideLoading();
    } else {
      window.addEventListener('load', hideLoading);
    }
  }

  // =============================================
  // INICIALIZAÇÃO COMPLETA
  // =============================================
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({ 
        duration: 800, 
        once: true,
        offset: 50
      });
    }

    // Configurar todos os módulos
    setupLoading();
    setupNavigation();
    setupMobileMenu();
    setupModals();
    setupScroll();
    setupFiltros();
    
    // Carregar produtos iniciais
    loadProducts('todos');
    
    // Configurar service worker (se disponível)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registrado'))
        .catch(err => console.log('Service Worker não registrado', err));
    }
  });

  // =============================================
  // TRATAMENTO DE ERROS GLOBAIS
  // =============================================
  window.addEventListener('error', (e) => {
    console.error('Erro global:', e.error);
    // Em produção, enviar para serviço de tracking de erros
  });

  // Exportar para uso global (se necessário)
  window.PatricinhaLuxury = {
    produtos,
    loadProducts,
    showSection,
    mostrarToast,
    comprarWhatsApp
  };


})();
