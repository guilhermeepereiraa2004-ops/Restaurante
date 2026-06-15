import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ChefHat, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Leaf,
  Search,
  Tag,
  DollarSign,
  ClipboardList,
  BarChart3,
  TrendingUp,
  CreditCard,
  Truck,
  User,
  Phone,
  MapPin,
  AlertCircle,
  ShoppingCart,
  Calendar,
  Layers,
  ExternalLink,
  Store,
  Filter
} from 'lucide-react';

// Dados reais da empresa coletados do site original
const STORE_INFO = {
  name: 'Clean Foods São Paulo',
  tagline: 'Comida saudável de verdade, feita com carinho para você.',
  address: 'Av. Nazaré, 683 — Sala 13, Ipiranga, São Paulo — SP',
  addressShort: 'Ipiranga, São Paulo — SP',
  whatsapp: '5511990182848',
  whatsappDisplay: '(11) 99018-2848',
  instagram: 'https://www.instagram.com/cleanfoods.saopaulo',
  instagramHandle: '@cleanfoods.saopaulo',
  mapsUrl: 'https://maps.app.goo.gl/s9VHV8FRqpyvpgmB9',
  hours: 'Todos os dias, das 10h às 19h',
  hoursDetail: [
    { day: 'Segunda a Sexta', time: '10:00 – 19:00' },
    { day: 'Sábado e Domingo', time: '10:00 – 19:00' },
  ],
  paymentMethods: ['PIX', 'Transferência Bancária', 'MercadoPago'],
  deliveryFee: 8.00,
  cnpj: '66.719.007/0001-76',
};

const INITIAL_PRODUCTS = [
  // --- Frango ---
  {
    id: 1,
    name: 'Frango Desfiado com Purê de Batata Doce e Legumes (225g)',
    description: 'Frango desfiado temperado e suculento com purê cremoso de batata doce e legumes frescos no vapor. Saudável, nutritivo e delicioso.',
    price: 19.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 2,
    name: 'Frango Desfiado com Purê de Batata Doce e Legumes (450g)',
    description: 'Versão família! Frango desfiado temperado e suculento com purê cremoso de batata doce e legumes frescos no vapor.',
    price: 27.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 3,
    name: 'Escondidinho de Frango Moído com Batata Doce (225g)',
    description: 'Escondidinho fit com frango moído temperado coberto com cremoso purê de batata doce. Low carb e proteico.',
    price: 19.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1551186547-640a34bba46c?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 4,
    name: 'Macarrão com Frango Desfiado (225g)',
    description: 'Macarrão integral al dente com frango desfiado temperado. Prato equilibrado e muito saboroso.',
    price: 19.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  // --- Patinho ---
  {
    id: 5,
    name: 'Patinho Desfiado com Arroz Integral e Legumes (225g)',
    description: 'Patinho desfiado ao molho levinho com arroz integral soltinho e mix de legumes frescos. Rico em proteína e fibras.',
    price: 25.50,
    category: 'Patinho',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 6,
    name: 'Escondidinho de Mandioca com Patinho Moído (450g)',
    description: 'Escondidinho gourmet com purê rústico de mandioca e recheio generoso de patinho moído temperado. Conforto em cada garfada.',
    price: 33.50,
    category: 'Patinho',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  // --- Gourmet ---
  {
    id: 7,
    name: 'Penne com Frango ao Molho Branco (225g)',
    description: 'Macarrão penne integral com frango desfiado em tiras, coberto com nosso exclusivo molho branco zero lactose. Sofisticado e saudável.',
    price: 24.90,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 8,
    name: 'Nhoque de Batata Doce com Frango Desfiado (225g)',
    description: 'Nhoque artesanal de batata doce com frango desfiado ao molho especial. Uma experiência gastronômica fit.',
    price: 22.50,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 9,
    name: 'Strogonoff de Frango com Arroz Branco (225g)',
    description: 'Strogonoff fit de frango com molho cremoso ao estilo brasileiro, acompanhado de arroz branco e batata palha zero.',
    price: 30.50,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  // --- Salgados & Doces ---
  {
    id: 10,
    name: 'Mini Pizza Calabresa com Requeijão Integral',
    description: 'Mini pizza artesanal com massa integral, calabresa e requeijão cremoso. Perfeita para um lanche proteico e saboroso.',
    price: 15.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 11,
    name: 'Mini Torta Fit de Frango Integral',
    description: 'Mini torta com massa integral crocante, recheada com frango temperado. Snack fit e proteico para qualquer hora.',
    price: 13.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 12,
    name: 'Mini Torta de Pistache Zero Açúcar',
    description: 'Mini torta premium de pistache, zero açúcar e adoçada naturalmente. Para quem não abre mão do doce sem culpa.',
    price: 17.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  // --- Promoções ---
  {
    id: 13,
    name: 'Clean Pack — 5 Marmitas à Escolha',
    description: 'Escolha 5 marmitas do nosso cardápio e economize! Perfeito para a semana toda. Inclui marmitas das categorias Frango, Patinho ou Gourmet.',
    price: 89.90,
    category: 'Promoções',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 14,
    name: 'Clean Snacks — Kit 6 unidades',
    description: 'Kit com 6 unidades dos nossos mini salgados ou doces proteicos à sua escolha. Ideal para a semana de lanches saudáveis.',
    price: 84.00,
    category: 'Promoções',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    available: true
  },
];

export default function App() {
  // --- Estados Principais ---
  const [view, setView] = useState('store'); // 'store' ou 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'menu', 'orders', 'categories', 'settings'

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('cleanfood_products');
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem('cleanfood_categories');
    return stored ? JSON.parse(stored) : ['Frango', 'Patinho', 'Gourmet', 'Salgados & Doces', 'Promoções'];
  });

  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('cleanfood_orders');
    return stored ? JSON.parse(stored) : [];
  });

  const [storeSettings, setStoreSettings] = useState(() => {
    const stored = localStorage.getItem('cleanfood_settings');
    return stored ? JSON.parse(stored) : {
      storeName: STORE_INFO.name,
      heroTitle: 'Comida de verdade, feita para você.',
      heroSubtitle: 'Marmitas artesanais, salgados e doces proteicos feitos com ingredientes selecionados. Peça agora e receba no conforto da sua casa em São Paulo.',
      deliveryFee: STORE_INFO.deliveryFee,
      whatsappNumber: STORE_INFO.whatsapp
    };
  });

  // --- Estados do Carrinho e Checkout ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null); // Para mostrar tela de sucesso

  // --- Estados da Vitrine ---
  const [activeCategory, setActiveCategory] = useState('Todos');

  // --- Estados do Painel Admin (Filtros e Edição) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('Todos');
  const [orderStatusFilter, setOrderStatusFilter] = useState('Todos');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Nova categoria sendo adicionada
  const [newCatName, setNewCatName] = useState('');

  // Notificações de Sucesso Temporárias
  const [toastMessage, setToastMessage] = useState('');

  // --- Sincronização com LocalStorage ---
  useEffect(() => {
    localStorage.setItem('cleanfood_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cleanfood_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('cleanfood_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cleanfood_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Exibir toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- Formatação ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --- Funções do Carrinho ---
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- Ações de Checkout ---
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const deliveryType = formData.get('deliveryType');
    const deliveryFee = deliveryType === 'delivery' ? storeSettings.deliveryFee : 0;
    
    const newOrder = {
      id: `CF-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      customer: {
        name: formData.get('custName'),
        phone: formData.get('custPhone'),
        deliveryType: deliveryType,
        address: deliveryType === 'delivery' ? formData.get('custAddress') : 'Retirada no Balcão',
        paymentMethod: formData.get('paymentMethod'),
        changeAmount: formData.get('changeAmount') || ''
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      deliveryFee: deliveryFee,
      total: cartTotal + deliveryFee,
      status: 'Pendente',
      notes: formData.get('custNotes') || ''
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrderDetails(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const formatWhatsAppMessage = (order) => {
    const itemsText = order.items.map(item => `• ${item.quantity}x ${item.name} (${formatPrice(item.price)})`).join('\n');
    const deliveryText = order.customer.deliveryType === 'delivery' 
      ? `📍 *Entrega no Endereço:*\n${order.customer.address}\n🏍️ *Taxa de entrega:* ${formatPrice(order.deliveryFee)}` 
      : '🏪 *Retirada no Balcão*';
    
    const changeText = order.customer.paymentMethod === 'cash' && order.customer.changeAmount 
      ? `\n💵 *Troco para:* R$ ${order.customer.changeAmount}` 
      : '';
  
    const message = `*${storeSettings.storeName} - Novo Pedido!* 🍔🌱\n` +
      `-----------------------------------\n` +
      `🏷️ *Pedido:* ${order.id}\n` +
      `👤 *Cliente:* ${order.customer.name}\n` +
      `📞 *Telefone:* ${order.customer.phone}\n` +
      `-----------------------------------\n` +
      `🛒 *Itens:*\n${itemsText}\n` +
      `-----------------------------------\n` +
      `${deliveryText}\n` +
      `💳 *Pagamento:* ${order.customer.paymentMethod.toUpperCase()}${changeText}\n` +
      `💬 *Observações:* ${order.notes || 'Nenhuma'}\n\n` +
      `💰 *Total Geral:* ${formatPrice(order.total)}\n` +
      `-----------------------------------\n` +
      `Obrigado pelo seu pedido!`;
  
    return `https://api.whatsapp.com/send?phone=${storeSettings.whatsappNumber.replace(/\D/g, '')}&text=${encodeURIComponent(message)}`;
  };

  // --- Funções de Administração de Produtos ---
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: isEditing ? currentProduct.id : Date.now(),
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      image: formData.get('image') || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: formData.get('available') === 'on'
    };

    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === newProduct.id ? newProduct : p));
      triggerToast('Produto atualizado com sucesso!');
    } else {
      setProducts(prev => [...prev, newProduct]);
      triggerToast('Novo produto cadastrado com sucesso!');
    }
    
    setShowForm(false);
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const toggleProductVisibility = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.available;
        triggerToast(`Produto ${p.name} ${nextState ? 'exibido na vitrine' : 'removido da vitrine'}`);
        return { ...p, available: nextState };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (id, name) => {
    if (confirm(`Tem certeza de que deseja excluir o produto "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
      triggerToast('Produto excluído com sucesso.');
    }
  };

  const openEditForm = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };

  // --- Funções de Categorias ---
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    
    const formattedCat = newCatName.trim();
    if (categories.includes(formattedCat)) {
      alert('Esta categoria já existe!');
      return;
    }

    setCategories(prev => [...prev, formattedCat]);
    setNewCatName('');
    triggerToast(`Categoria "${formattedCat}" criada!`);
  };

  const handleDeleteCategory = (catToDelete) => {
    const count = products.filter(p => p.category === catToDelete).length;
    let message = `Tem certeza que deseja excluir a categoria "${catToDelete}"?`;
    if (count > 0) {
      message += `\n⚠️ Existem ${count} produtos cadastrados nesta categoria. Eles serão alterados para a categoria "${categories[0]}".`;
    }

    if (confirm(message)) {
      setCategories(prev => prev.filter(c => c !== catToDelete));
      if (count > 0) {
        const fallback = categories.find(c => c !== catToDelete) || 'Marmitas';
        setProducts(prev => prev.map(p => p.category === catToDelete ? { ...p, category: fallback } : p));
      }
      triggerToast(`Categoria "${catToDelete}" excluída.`);
    }
  };

  // --- Funções de Pedidos ---
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        triggerToast(`Pedido ${orderId} atualizado para: ${newStatus}`);
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  // --- Cálculos do Dashboard ---
  const dashboardStats = () => {
    const delivered = orders.filter(o => o.status === 'Entregue');
    const pendingCount = orders.filter(o => o.status === 'Pendente').length;
    const preparingCount = orders.filter(o => o.status === 'Em Preparo').length;
    const deliveryCount = orders.filter(o => o.status === 'Saiu para Entrega').length;
    
    const revenue = delivered.reduce((sum, o) => sum + o.total, 0);
    const count = delivered.length;
    const avgTicket = count > 0 ? revenue / count : 0;
    
    // Produtos mais vendidos
    const itemSales = {};
    orders.forEach(o => {
      if (o.status !== 'Cancelado') {
        o.items.forEach(i => {
          itemSales[i.name] = (itemSales[i.name] || 0) + i.quantity;
        });
      }
    });
    const popularItems = Object.entries(itemSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return {
      revenue,
      totalOrders: orders.filter(o => o.status !== 'Cancelado').length,
      avgTicket,
      pendingCount,
      preparingCount,
      deliveryCount,
      popularItems
    };
  };

  // --- RENDERIZAR VITRINE (STOREFRONT) ---
  const renderStorefront = () => {
    const filteredProducts = activeCategory === 'Todos'
      ? products.filter(p => p.available)
      : products.filter(p => p.category === activeCategory && p.available);

    const categoryEmojis = {
      'Todos': '🍽️',
      'Frango': '🍗',
      'Patinho': '🥩',
      'Gourmet': '👨‍🍳',
      'Salgados & Doces': '🫓',
      'Promoções': '🏷️',
    };

    return (
      <div key={view} className="min-h-screen" style={{ background: '#fff', color: '#0a0a0a' }}>

        {/* ====== NAVBAR ====== */}
        <header className="sticky top-0 z-40 nav-light">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '68px' }}>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Clean Foods Logo" 
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: '2px solid #fbbf24', boxShadow: '0 0 0 3px rgba(251,191,36,0.15)' }}
              />
              <div className="hidden sm:block">
                <div className="font-black text-sm leading-tight text-black tracking-tight">Clean Foods</div>
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>São Paulo</div>
              </div>
            </div>

            {/* Center nav */}
            <nav className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5" style={{ background: '#f5f5f5' }}>
              {['Todos', ...categories].slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeCategory === cat
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-500 hover:text-black hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('admin')}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-stone-500 hover:text-black transition-all"
              >
                <ChefHat className="w-3.5 h-3.5" /> Admin
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black btn-yellow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:block">Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-xs font-black w-5 h-5 flex items-center justify-center rounded-full bg-black text-white">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ====== HERO ====== */}
        <section className="relative overflow-hidden" style={{ background: '#FDF0A6', minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Subtle dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(180,140,0,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Soft yellow radial center glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(251,191,36,0.08) 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: content */}
              <div>
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 mb-8 animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full hero-pill">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#fbbf24' }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#fbbf24' }}></span>
                    </span>
                    <span className="text-xs font-bold text-black">Aberto Agora</span>
                    <span className="text-stone-300 text-xs">·</span>
                    <span className="text-xs font-semibold text-stone-500">{STORE_INFO.hours}</span>
                  </div>
                </div>

                {/* Headline */}
                <h1 className="font-black mb-6 animate-fade-in-up delay-100 opacity-0-init"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', animationFillMode: 'forwards', color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                  {storeSettings.heroTitle.split(',').map((part, i) => (
                    <span key={i}>
                      {i === 1
                        ? <><br /><span className="text-highlight-yellow">{part.trim()}</span></>  
                        : part}
                      {i === 0 && ','}
                    </span>
                  ))}
                </h1>

                <p className="text-base md:text-lg leading-relaxed mb-10 max-w-md animate-fade-in-up delay-200 opacity-0-init"
                  style={{ color: '#666', animationFillMode: 'forwards' }}>
                  {storeSettings.heroSubtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-14 animate-fade-in-up delay-300 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
                  <button
                    onClick={() => { document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-black btn-yellow"
                  >
                    <ShoppingBag className="w-4 h-4" /> Ver o Cardápio
                  </button>
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold btn-outline-dark"
                  >
                    <Phone className="w-4 h-4" /> WhatsApp
                  </a>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-10 animate-fade-in-up delay-400 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
                  {[
                    { value: '14+', label: 'Pratos' },
                    { value: '100%', label: 'Natural' },
                    { value: 'Zero', label: 'Lactose' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-black" style={{ fontSize: '2rem', lineHeight: 1, color: '#0a0a0a' }}>{stat.value}</div>
                      <div className="text-xs mt-1 font-bold uppercase tracking-widest" style={{ color: '#aaa' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image collage */}
              <div className="relative hidden lg:block animate-fade-in-up delay-200 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
                <div className="relative">
                  {/* Main image */}
                  <div className="rounded-3xl overflow-hidden" style={{ height: '420px', boxShadow: '0 32px 80px rgba(0,0,0,0.12)' }}>
                    <img
                      src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
                      alt="Prato saudável Clean Foods"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 hero-pill rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center btn-yellow">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-black">100% Natural</div>
                        <div className="text-[10px] text-stone-400 font-semibold">Sem conservantes</div>
                      </div>
                    </div>
                  </div>
                  {/* Top tag */}
                  <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-2.5" style={{ background: '#0a0a0a', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                    <div className="text-xs font-black" style={{ color: '#fbbf24' }}>Avenida Nazaré 683, sala 13, Ipiranga, São Paulo, SP</div>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </section>

        {/* ====== MENU SECTION ====== */}
        <section id="menu-section" className="py-20 px-6" style={{ background: '#f7f7f7' }}>
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="yellow-tag mb-3 inline-block">Nosso Cardápio</span>
                <h2 className="font-black" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#0a0a0a', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  Escolha o seu favorito
                </h2>
              </div>
              <div className="text-sm font-bold" style={{ color: '#aaa' }}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'prato' : 'pratos'} {activeCategory !== 'Todos' ? `em ${activeCategory}` : 'disponíveis'}
              </div>
            </div>

            {/* Category pills */}
            <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-2 mb-8 select-none">
              {['Todos', ...categories].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cat-pill whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === category ? 'cat-pill-active' : ''
                  }`}
                >
                  <span>{categoryEmojis[category] || '🍴'}</span>
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 rounded-3xl bg-white">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#f5f5f5' }}>
                  <ShoppingBag className="w-8 h-8" style={{ color: '#ccc' }} />
                </div>
                <h3 className="text-lg font-bold text-black mb-1">Nenhum prato disponível</h3>
                <p className="text-sm text-stone-400 max-w-xs mx-auto">Não há pratos disponíveis nesta categoria no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="product-card rounded-2xl overflow-hidden flex flex-col animate-fade-in-up opacity-0-init"
                    style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: '200px', background: '#f5f5f5' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img w-full h-full object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold glass-white">
                          {categoryEmojis[product.category] || '🍴'} {product.category}
                        </span>
                      </div>

                      {/* Price overlay */}
                      <div className="absolute bottom-3 left-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>a partir de</div>
                        <div className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{formatPrice(product.price)}</div>
                      </div>

                      {/* Add quick btn */}
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center btn-yellow shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-black text-black mb-1.5 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs mb-4 line-clamp-2 leading-relaxed flex-grow" style={{ color: '#888' }}>
                        {product.description}
                      </p>

                      {/* CTA */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black btn-dark mt-auto"
                      >
                        <Plus className="w-3 h-3" /> Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ====== INFO CARDS ====== */}
        <section className="py-20 px-6 relative overflow-hidden" style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="yellow-tag mb-4 inline-block">Onde Nos Encontrar</span>
              <h2 className="font-black" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0a0a0a', letterSpacing: '-0.03em' }}>
                Informações da Loja
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Horário */}
              <div className="info-card rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 btn-yellow">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <h4 className="font-black mb-3 text-black text-base">Horários</h4>
                {STORE_INFO.hoursDetail.map(h => (
                  <div key={h.day} className="flex justify-between text-sm mb-2">
                    <span style={{ color: '#888' }}>{h.day}</span>
                    <span className="font-bold text-black">{h.time}</span>
                  </div>
                ))}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#fef9c3', color: '#92400e', border: '1.5px solid #fde68a' }}>
                  <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#fbbf24' }}></span><span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#f59e0b' }}></span></span>
                  Aberto Agora
                </div>
              </div>

              {/* Localização */}
              <div className="info-card rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 btn-yellow">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-black mb-3 text-black text-base">Localização</h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>{STORE_INFO.address}</p>
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-stone-600 transition-colors"
                >
                  Abrir no Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Pagamento */}
              <div className="info-card rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 btn-yellow">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h4 className="font-black mb-3 text-black text-base">Pagamentos</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {STORE_INFO.paymentMethods.map(pm => (
                    <span key={pm} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: '#f5f5f5', color: '#333', border: '1px solid #e5e5e5' }}>
                      {pm}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium" style={{ color: '#aaa' }}>Pagamento 100% seguro e verificado</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer style={{ background: '#0a0a0a' }}>
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img 
                    src="/logo.jpg" 
                    alt="Clean Foods Logo" 
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: '2px solid #fbbf24' }}
                  />
                  <div>
                    <div className="text-white font-black text-base">Clean Foods</div>
                    <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#fbbf24' }}>São Paulo</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>{STORE_INFO.tagline}</p>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold btn-yellow"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={STORE_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold" style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    <SparklesIcon className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} /> Instagram
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h5 className="font-black text-xs mb-5 uppercase tracking-widest" style={{ color: '#fbbf24' }}>Contato</h5>
                <ul className="space-y-3">
                  {[
                    { icon: <MapPin className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />, content: STORE_INFO.address, href: STORE_INFO.mapsUrl },
                    { icon: <Phone className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />, content: STORE_INFO.whatsappDisplay, href: `https://wa.me/${STORE_INFO.whatsapp}` },
                    { icon: <ClockIcon className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />, content: STORE_INFO.hours, href: null },
                    { icon: <SparklesIcon className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />, content: STORE_INFO.instagramHandle, href: STORE_INFO.instagram },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 shrink-0">{item.icon}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="leading-relaxed transition-colors"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                          onMouseEnter={e => e.currentTarget.style.color='#fff'}
                          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}>
                          {item.content}
                        </a>
                      ) : (
                        <span className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.content}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pagamento */}
              <div>
                <h5 className="font-black text-xs mb-4 uppercase tracking-widest" style={{ color: '#fbbf24' }}>Pagamento</h5>
                <div className="flex flex-wrap gap-2">
                  {STORE_INFO.paymentMethods.map(pm => (
                    <span key={pm} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>{pm}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <p>© {new Date().getFullYear()} {STORE_INFO.name}. Todos os direitos reservados.</p>
              <p>CNPJ: {STORE_INFO.cnpj}</p>
            </div>
          </div>
        </footer>

        {/* ====== FLOATING MOBILE ADMIN ====== */}
        <button
          onClick={() => setView('admin')}
          className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center btn-yellow shadow-2xl transition-all hover:scale-110 active:scale-95"
        >
          <Settings className="w-6 h-6" />
        </button>

        {/* ====== CART DRAWER ====== */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
            <div className="w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right bg-white" style={{ borderLeft: '1px solid #f0f0f0' }}>
              <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <h2 className="text-lg font-black flex items-center gap-2 text-black">
                  <ShoppingCart className="w-5 h-5 text-stone-400" /> Seu Pedido
                  {cart.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-black text-white">
                      {cart.reduce((a, i) => a + i.quantity, 0)} {cart.reduce((a, i) => a + i.quantity, 0) === 1 ? 'item' : 'itens'}
                    </span>
                  )}
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#f5f5f5' }}>
                      <ShoppingBag className="w-8 h-8 text-stone-300" />
                    </div>
                    <p className="text-black text-sm font-bold">Seu carrinho está vazio</p>
                    <p className="text-xs mt-1 text-stone-400">Adicione pratos do cardápio</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-stone-100 bg-stone-50">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black leading-tight line-clamp-2 mb-0.5">{item.name}</p>
                        <p className="font-black text-sm text-black">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors border border-stone-200">
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-black text-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:bg-red-50 hover:text-red-500 transition-colors border border-stone-200">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-stone-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-sm text-stone-500">Subtotal</span>
                    <span className="text-2xl font-black text-black">{formatPrice(cartTotal)}</span>
                  </div>
                  <button
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 btn-yellow"
                  >
                    Finalizar Pedido <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====== CHECKOUT MODAL ====== */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in my-8 max-h-[90vh] flex flex-col" style={{ border: '1px solid #f0f0f0' }}>
              <div className="p-6 flex items-center justify-between border-b border-stone-100">
                <h3 className="text-lg font-black text-black flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-stone-400" /> Dados da Entrega
                </h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Seu Nome</label>
                    <input required name="custName" type="text" className="w-full p-3 text-sm rounded-xl outline-none transition-all border border-stone-200 focus:border-black bg-stone-50" placeholder="Ex: Maria Santos" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">WhatsApp</label>
                    <input required name="custPhone" type="tel" className="w-full p-3 text-sm rounded-xl outline-none transition-all border border-stone-200 focus:border-black bg-stone-50" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Tipo de Entrega</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer border-2 border-yellow-400 bg-yellow-50">
                      <input defaultChecked type="radio" name="deliveryType" value="delivery" className="w-4 h-4" style={{ accentColor: '#0a0a0a' }} />
                      <div>
                        <p className="text-sm font-bold text-black flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-stone-400" /> Entrega</p>
                        <p className="text-[11px] text-stone-500 font-medium">+ {formatPrice(storeSettings.deliveryFee)}</p>
                      </div>
                    </label>
                    <label className="rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer border border-stone-200 hover:border-stone-300 transition-all">
                      <input type="radio" name="deliveryType" value="pickup" className="w-4 h-4" style={{ accentColor: '#0a0a0a' }} />
                      <div>
                        <p className="text-sm font-bold text-black flex items-center gap-1"><Store className="w-3.5 h-3.5 text-stone-400" /> Retirada</p>
                        <p className="text-[11px] text-stone-500 font-medium">Grátis</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Endereço de Entrega</label>
                  <textarea required name="custAddress" rows="2" className="w-full p-3 text-sm rounded-xl outline-none transition-all border border-stone-200 focus:border-black bg-stone-50 resize-none" placeholder="Rua, Número, Bairro, Complemento..." />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Pagamento</label>
                    <select name="paymentMethod" className="w-full p-3 text-sm rounded-xl outline-none border border-stone-200 bg-stone-50 focus:border-black">
                      <option value="pix">PIX (Mais rápido)</option>
                      <option value="transferencia">Transferência</option>
                      <option value="mercadopago">MercadoPago</option>
                      <option value="dinheiro">Dinheiro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Troco para (R$)</label>
                    <input name="changeAmount" type="number" step="0.01" className="w-full p-3 text-sm rounded-xl outline-none border border-stone-200 bg-stone-50 focus:border-black" placeholder="50.00" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Observações</label>
                  <input name="custNotes" type="text" className="w-full p-3 text-sm rounded-xl outline-none border border-stone-200 bg-stone-50 focus:border-black" placeholder="Sem cebola, talher descartável..." />
                </div>

                <div className="rounded-xl p-4 bg-stone-50 border border-stone-200">
                  <div className="flex justify-between text-sm mb-2 text-stone-500">
                    <span>Itens ({cart.length})</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200">
                    <span className="font-bold text-black">Total</span>
                    <span className="text-xl font-black text-black">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => { setIsCheckoutOpen(false); setIsCartOpen(true); }} className="flex-1 py-3.5 rounded-xl text-sm font-bold text-stone-600 border border-stone-200 hover:bg-stone-50 transition-colors">
                    ← Voltar
                  </button>
                  <button type="submit" className="flex-[2] py-3.5 rounded-xl text-sm font-black btn-yellow">
                    Confirmar Pedido ✓
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ====== SUCCESS SCREEN ====== */}
        {lastOrderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-8 text-center animate-scale-in">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center btn-yellow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-black mb-1.5">Pedido Enviado! 🎉</h3>
              <p className="text-sm text-stone-500 mb-5">
                Pedido <strong className="text-black font-black">{lastOrderDetails.id}</strong> registrado com sucesso.
              </p>
              <div className="rounded-xl p-4 text-left text-xs mb-5 space-y-2 bg-stone-50 border border-stone-100">
                <p className="flex justify-between"><span className="text-stone-400">Cliente</span><span className="font-bold text-black">{lastOrderDetails.customer.name}</span></p>
                <p className="flex justify-between"><span className="text-stone-400">Tipo</span><span className="font-bold text-black">{lastOrderDetails.customer.deliveryType === 'delivery' ? '🚚 Entrega' : '🏪 Retirada'}</span></p>
                <p className="flex justify-between"><span className="text-stone-400">Pagamento</span><span className="font-bold text-black">{lastOrderDetails.customer.paymentMethod.toUpperCase()}</span></p>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="font-bold text-stone-500">Total</span>
                  <span className="font-black text-sm text-black">{formatPrice(lastOrderDetails.total)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={formatWhatsAppMessage(lastOrderDetails)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                  style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.2)' }}
                >
                  <Phone className="w-4 h-4" /> Enviar via WhatsApp
                </a>
                <button
                  onClick={() => setLastOrderDetails(null)}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-stone-500 border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  Fechar e Voltar ao Início
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  // --- RENDERIZAR PAINEL ADMINISTRATIVO ---
  const renderAdminPanel = () => {
    const stats = dashboardStats();

    // Filtros de Produtos para a aba "Cardápio"
    const filteredAdminProducts = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = adminCategoryFilter === 'Todos' || p.category === adminCategoryFilter;
      return matchSearch && matchCategory;
    });

    // Filtros de Pedidos para a aba "Pedidos"
    const filteredAdminOrders = orders.filter(o => {
      if (orderStatusFilter === 'Todos') return true;
      return o.status === orderStatusFilter;
    });

    return (
      <div className="min-h-screen bg-stone-100 font-sans text-stone-800 flex flex-col md:flex-row">
        {/* Sidebar Lateral */}
        <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 shrink-0">
          {/* Cabeçalho da Sidebar */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-yellow-400 animate-pulse" />
              <span className="text-lg font-bold text-white tracking-tight">Painel CleanFood</span>
            </div>
            <button 
              onClick={() => setView('store')}
              className="md:hidden p-1 hover:text-white"
              title="Voltar para Vitrine"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Navegação */}
          <nav className="flex-1 p-4 space-y-1.5">
            <button 
              onClick={() => setAdminTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'dashboard' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Geral (Dashboard)
            </button>
            <button 
              onClick={() => setAdminTab('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'menu' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" /> Cardápio (Itens)
            </button>
            <button 
              onClick={() => setAdminTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'orders' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <ClipboardList className="w-4 h-4" /> Pedidos
              </span>
              {orders.filter(o => o.status === 'Pendente').length > 0 && (
                <span className="bg-amber-500 text-stone-900 text-xxs font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {orders.filter(o => o.status === 'Pendente').length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setAdminTab('categories')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'categories' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4" /> Categorias
            </button>
            <button 
              onClick={() => setAdminTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'settings' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" /> Configurações
            </button>
          </nav>

          {/* Rodapé da Sidebar */}
          <div className="p-4 border-t border-stone-800 bg-stone-950/40">
            <button 
              onClick={() => setView('store')}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-stone-850 hover:bg-stone-800 text-yellow-400 hover:text-yellow-300 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para a Loja
            </button>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-h-screen">
          {/* Cabeçalho do Conteúdo */}
          <header className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Área Admin</span>
              <h1 className="text-2xl md:text-3xl font-black text-stone-900 mt-1">
                {adminTab === 'dashboard' ? 'Dashboard e Métricas' :
                 adminTab === 'menu' ? 'Gerenciamento do Cardápio' :
                 adminTab === 'orders' ? 'Controle de Pedidos' :
                 adminTab === 'categories' ? 'Categorias de Produtos' :
                 adminTab === 'settings' ? 'Configurações do Restaurante' : ''}
              </h1>
            </div>
            {adminTab === 'menu' && (
              <button 
                onClick={() => {
                  setCurrentProduct(null);
                  setIsEditing(false);
                  setShowForm(true);
                }}
                className="bg-yellow-400 hover:bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-md shadow-yellow-400/10 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Prato
              </button>
            )}
          </header>

          {/* Conteúdo das Abas com Key para evitar erros de renderização/tradução */}
          <div key={adminTab} className="w-full">
            {/* --- ABA 1: DASHBOARD --- */}
            {adminTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Cards Estatísticos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex items-center gap-4">
                  <div className="p-4 bg-yellow-100 text-stone-900 rounded-2xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Faturamento (Entregues)</span>
                    <span className="text-2xl font-black text-stone-900">{formatPrice(stats.revenue)}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex items-center gap-4">
                  <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Total de Pedidos</span>
                    <span className="text-2xl font-black text-stone-900">{stats.totalOrders}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex items-center gap-4">
                  <div className="p-4 bg-purple-50 text-purple-700 rounded-2xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Ticket Médio</span>
                    <span className="text-2xl font-black text-stone-900">{formatPrice(stats.avgTicket)}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex items-center gap-4">
                  <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl">
                    <ClockIcon className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Pedidos Pendentes</span>
                    <span className="text-2xl font-black text-stone-900">{stats.pendingCount + stats.preparingCount}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pedidos Ativos / Recentes */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-stone-900">Ações Rápidas - Pedidos Ativos</h3>
                    <button onClick={() => setAdminTab('orders')} className="text-stone-900 hover:text-yellow-800 text-xs font-bold flex items-center gap-0.5">
                      Ver todos <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orders.filter(o => o.status !== 'Entregue' && o.status !== 'Cancelado').slice(0, 5).map(order => (
                      <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-stone-50 rounded-2xl border border-stone-150 gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-800">{order.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xxs font-bold border ${
                              order.status === 'Pendente' ? 'bg-amber-100 text-amber-800 border-amber-250' : 'bg-blue-100 text-blue-800 border-blue-250'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">{order.customer.name} • {order.items.length} itens • {formatPrice(order.total)}</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          {order.status === 'Pendente' && (
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Em Preparo')}
                              className="w-full sm:w-auto px-4 py-2 bg-yellow-400 text-white rounded-xl text-xs font-bold hover:bg-stone-900"
                            >
                              Aceitar e Preparar
                            </button>
                          )}
                          {order.status === 'Em Preparo' && (
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Saiu para Entrega')}
                              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                            >
                              Enviar para Entrega
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {orders.filter(o => o.status !== 'Entregue' && o.status !== 'Cancelado').length === 0 && (
                      <div className="text-center py-8 text-stone-400 text-sm">
                        <CheckCircle2 className="w-10 h-10 mx-auto opacity-20 mb-2" />
                        Nenhum pedido pendente ou em preparação. Tudo em dia!
                      </div>
                    )}
                  </div>
                </div>

                {/* Mais Vendidos */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-6">
                  <h3 className="font-bold text-stone-900">Mais Vendidos</h3>
                  <div className="space-y-4">
                    {stats.popularItems.map(([name, qty], index) => (
                      <div key={name} className="flex items-center justify-between border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                            index === 0 ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-sm font-semibold text-stone-800">{name}</span>
                        </div>
                        <span className="text-xs text-stone-500 font-bold">{qty} unidades</span>
                      </div>
                    ))}
                    {stats.popularItems.length === 0 && (
                      <div className="text-center py-10 text-stone-400 text-sm">
                        Os dados aparecerão assim que os primeiros pedidos forem feitos.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- ABA 2: CARDÁPIO (PRODUTOS) --- */}
          {adminTab === 'menu' && (
            <div className="space-y-6 animate-fade-in">
              {/* Filtros e Busca */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                {/* Input de Busca */}
                <div className="relative flex-grow max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all bg-white" 
                    placeholder="Pesquisar por nome ou descrição..." 
                  />
                </div>

                {/* Filtro por Categoria */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-stone-400" />
                  <select 
                    value={adminCategoryFilter}
                    onChange={(e) => setAdminCategoryFilter(e.target.value)}
                    className="p-2 border border-stone-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  >
                    <option value="Todos">Todas as Categorias</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Tabela de Produtos */}
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-5">Foto & Nome</th>
                        <th className="p-5">Categoria</th>
                        <th className="p-5">Preço</th>
                        <th className="p-5 text-center">No Cardápio (Ativo)</th>
                        <th className="p-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150 text-sm">
                      {filteredAdminProducts.map(product => (
                        <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                          <td className="p-5 flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-14 h-14 rounded-2xl object-cover bg-stone-100 border shadow-xs" />
                            <div>
                              <p className="font-bold text-stone-900">{product.name}</p>
                              <p className="text-stone-550 text-xs mt-1 max-w-xs line-clamp-1">{product.description}</p>
                            </div>
                          </td>
                          <td className="p-5 text-stone-600 font-semibold">{product.category}</td>
                          <td className="p-5 font-bold text-stone-900">{formatPrice(product.price)}</td>
                          <td className="p-5 text-center">
                            {/* Switch de Visibilidade Inline */}
                            <button
                              type="button"
                              onClick={() => toggleProductVisibility(product.id)}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                product.available ? 'bg-yellow-400' : 'bg-stone-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  product.available ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </td>
                          <td className="p-5 text-right space-x-1">
                            <button onClick={() => openEditForm(product)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100" title="Editar">
                              <Edit2 className="w-4.5 h-4.5" />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id, product.name)} className="p-2 text-stone-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-stone-100" title="Excluir">
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAdminProducts.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-stone-450">Nenhum produto correspondente aos filtros.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal de Formulário (Novo/Editar Produto) */}
              {showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 md:p-6 max-w-lg w-full animate-fade-in max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                      <h2 className="text-lg font-bold text-stone-900">{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
                      <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-4 pr-1">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Nome do Prato</label>
                        <input required name="name" type="text" defaultValue={currentProduct?.name} className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all bg-white" placeholder="Ex: Salmão ao molho de maracujá" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Preço (R$)</label>
                          <input required type="number" step="0.01" name="price" defaultValue={currentProduct?.price} className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white" placeholder="29.90" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Categoria</label>
                          <select name="category" defaultValue={currentProduct?.category || categories[0]} className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white">
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Descrição / Ingredientes</label>
                        <textarea required name="description" defaultValue={currentProduct?.description} rows="3" className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none bg-white" placeholder="Descreva os ingredientes e detalhes do prato..."></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-1 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" /> Link da Foto (URL)
                        </label>
                        <input name="image" type="url" defaultValue={currentProduct?.image} className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-500" placeholder="https://images.unsplash.com/..." />
                        <p className="text-[10px] text-stone-400 mt-1">*Cole a URL de uma imagem hospedada na web para exibir a foto.</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                        <input type="checkbox" id="available" name="available" defaultChecked={currentProduct ? currentProduct.available : true} className="w-4 h-4 text-yellow-400 rounded border-stone-300 focus:ring-yellow-500" />
                        <label htmlFor="available" className="text-sm font-semibold text-stone-700">Disponível para venda imediata</label>
                      </div>

                      <div className="pt-5 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-stone-100 mt-4">
                        <button type="button" onClick={() => setShowForm(false)} className="w-full sm:w-auto px-5 py-3 border border-stone-300 text-stone-600 font-semibold rounded-xl hover:bg-stone-50 transition-colors text-sm text-center">Cancelar</button>
                        <button type="submit" className="w-full sm:w-auto px-5 py-3 bg-yellow-400 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-md text-sm text-center">Salvar Produto</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- ABA 3: PEDIDOS --- */}
          {adminTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              {/* Filtros de Status */}
              <div className="flex overflow-x-auto pb-2 gap-2 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
                {['Todos', 'Pendente', 'Em Preparo', 'Saiu para Entrega', 'Entregue', 'Cancelado'].map(status => {
                  const count = status === 'Todos' ? orders.length : orders.filter(o => o.status === status).length;
                  return (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        orderStatusFilter === status 
                          ? 'bg-stone-900 text-white' 
                          : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {status} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Grid de Pedidos */}
              {filteredAdminOrders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm">
                  <ClipboardList className="w-16 h-16 mx-auto text-stone-350 opacity-40 mb-4 animate-pulse" />
                  <h3 className="text-lg font-bold text-stone-800 mb-1">Nenhum pedido encontrado</h3>
                  <p className="text-stone-500 text-sm">Nenhum registro com o status selecionado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAdminOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
                      {/* Cabeçalho do Cartão de Pedido */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-md font-black text-stone-900">{order.id}</span>
                          <span className="text-xs text-stone-400 block mt-1 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {formatDate(order.date)}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          order.status === 'Pendente' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          order.status === 'Em Preparo' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          order.status === 'Saiu para Entrega' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          order.status === 'Entregue' ? 'bg-yellow-100 text-yellow-800 border-yellow-250' :
                          'bg-rose-100 text-rose-800 border-rose-250'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Informações do Cliente */}
                      <div className="text-xs space-y-1 bg-stone-50 p-3.5 rounded-2xl border border-stone-150">
                        <p className="flex items-center gap-1.5"><strong><User className="w-3.5 h-3.5 text-stone-500" /> Cliente:</strong> {order.customer.name}</p>
                        <p className="flex items-center gap-1.5"><strong><Phone className="w-3.5 h-3.5 text-stone-500" /> WhatsApp:</strong> {order.customer.phone}</p>
                        <p className="flex items-center gap-1.5"><strong><MapPin className="w-3.5 h-3.5 text-stone-500" /> Tipo:</strong> {order.customer.deliveryType === 'delivery' ? 'Entrega em Casa' : 'Retirada no Balcão'}</p>
                        {order.customer.deliveryType === 'delivery' && (
                          <p className="pl-5 text-stone-550 leading-relaxed"><strong>Endereço:</strong> {order.customer.address}</p>
                        )}
                        <p className="flex items-center gap-1.5"><strong><CreditCard className="w-3.5 h-3.5 text-stone-500" /> Pagamento:</strong> {order.customer.paymentMethod.toUpperCase()}</p>
                        {order.customer.paymentMethod === 'cash' && order.customer.changeAmount && (
                          <p className="pl-5 text-stone-550 font-bold">Precisa de troco para R$ {order.customer.changeAmount}</p>
                        )}
                        {order.notes && (
                          <p className="mt-2 text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-100 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> <em>Obs: "{order.notes}"</em></p>
                        )}
                      </div>

                      {/* Lista de Itens do Pedido */}
                      <div className="space-y-1.5 border-t border-stone-100 pt-3">
                        <span className="text-xxs font-bold text-stone-450 uppercase tracking-widest block mb-2">Itens Solicitados</span>
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-xs text-stone-700">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                        {order.deliveryFee > 0 && (
                          <div className="flex justify-between text-xs text-stone-500 border-t border-stone-100 pt-2">
                            <span>Taxa de Entrega</span>
                            <span>{formatPrice(order.deliveryFee)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-100 pt-2">
                          <span>Total Geral</span>
                          <span className="text-stone-900 text-md">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {/* Ações de Status */}
                      <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2">
                        {order.status === 'Pendente' && (
                          <>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Em Preparo')}
                              className="flex-grow px-3 py-2.5 bg-yellow-400 hover:bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                            >
                              Aceitar e Iniciar Preparo
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Cancelado')}
                              className="px-3 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold"
                            >
                              Recusar
                            </button>
                          </>
                        )}

                        {order.status === 'Em Preparo' && (
                          <>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Saiu para Entrega')}
                              className="flex-grow px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                            >
                              {order.customer.deliveryType === 'delivery' ? 'Pronto! Despachar para Entrega' : 'Pronto! Avisar para Retirada'}
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Cancelado')}
                              className="px-3 py-2.5 bg-stone-100 text-stone-500 hover:bg-stone-200 rounded-xl text-xs font-bold"
                            >
                              Cancelar Pedido
                            </button>
                          </>
                        )}

                        {order.status === 'Saiu para Entrega' && (
                          <>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Entregue')}
                              className="flex-grow px-3 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                            >
                              Confirmar Recebimento / Concluir
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Cancelado')}
                              className="px-3 py-2.5 bg-stone-100 text-stone-500 hover:bg-stone-200 rounded-xl text-xs font-bold"
                            >
                              Cancelar
                            </button>
                          </>
                        )}

                        {order.status === 'Entregue' && (
                          <div className="text-xs text-stone-900 bg-yellow-50 border border-yellow-100 rounded-xl py-2 px-3 flex items-center gap-1.5 w-full justify-center font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Pedido Concluído e Entregue
                          </div>
                        )}

                        {order.status === 'Cancelado' && (
                          <div className="text-xs text-rose-700 bg-rose-50 border border-rose-100 rounded-xl py-2 px-3 flex items-center gap-1.5 w-full justify-center font-bold">
                            <AlertCircle className="w-4 h-4" /> Pedido Cancelado
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- ABA 4: CATEGORIAS --- */}
          {adminTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              {/* Adicionar Categoria */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 h-fit space-y-4">
                <h3 className="font-bold text-stone-900">Nova Categoria</h3>
                <form onSubmit={handleAddCategory} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Nome da Categoria</label>
                    <input 
                      required 
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white" 
                      placeholder="Ex: Vegano" 
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-yellow-400 text-white rounded-xl text-sm font-bold hover:bg-stone-900 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Criar Categoria
                  </button>
                </form>
              </div>

              {/* Lista de Categorias */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 md:col-span-2 space-y-4">
                <h3 className="font-bold text-stone-900">Categorias Cadastradas</h3>
                <div className="divide-y divide-stone-150">
                  {categories.map((cat, index) => {
                    const productCount = products.filter(p => p.category === cat).length;
                    return (
                      <div key={cat} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                        <div>
                          <p className="font-bold text-stone-800">{cat}</p>
                          <p className="text-xs text-stone-500 mt-0.5">{productCount} {productCount === 1 ? 'produto cadastrado' : 'produtos cadastrados'}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Excluir Categoria"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* --- ABA 5: CONFIGURAÇÕES DA LOJA --- */}
          {adminTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 max-w-2xl animate-fade-in">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  setStoreSettings({
                    storeName: formData.get('storeName'),
                    heroTitle: formData.get('heroTitle'),
                    heroSubtitle: formData.get('heroSubtitle'),
                    deliveryFee: parseFloat(formData.get('deliveryFee')),
                    whatsappNumber: formData.get('whatsappNumber')
                  });
                  triggerToast('Configurações da loja salvas!');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Nome da Loja</label>
                  <input required name="storeName" type="text" defaultValue={storeSettings.storeName} className="w-full p-3 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 bg-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Título do Destaque (Hero)</label>
                  <input required name="heroTitle" type="text" defaultValue={storeSettings.heroTitle} className="w-full p-3 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 bg-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Subtítulo do Destaque (Hero)</label>
                  <textarea required name="heroSubtitle" rows="2" defaultValue={storeSettings.heroSubtitle} className="w-full p-3 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 resize-none bg-white"></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Taxa de Entrega Padrão (R$)</label>
                    <input required name="deliveryFee" type="number" step="0.01" defaultValue={storeSettings.deliveryFee} className="w-full p-3 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Número de WhatsApp (Com DDD, sem símbolos)</label>
                    <input required name="whatsappNumber" type="text" defaultValue={storeSettings.whatsappNumber} className="w-full p-3 text-sm border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Ex: 5511999999999" />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-150 flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-yellow-400 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-md text-sm"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </form>
            </div>
          )}
          </div>
        </main>

        {/* Notificação Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-850 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-yellow-450" /> {toastMessage}
          </div>
        )}
      </div>
    );
  };

  // --- SUB-COMPONENTES AUXILIARES ---
  function SparklesIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
        <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
        <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
      </svg>
    );
  }

  function ClockIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: #fff; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes slideInRight { from { transform: translateX(100%); opacity:0; } to { transform: translateX(0); opacity:1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes blobMove {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0) scale(1); }
          33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px,-15px) scale(1.05); }
          66% { border-radius: 70% 30% 50% 60% / 40% 50% 60% 40%; transform: translate(-10px, 12px) scale(0.97); }
        }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px 4px rgba(234,179,8,0.25); } 50% { box-shadow: 0 0 40px 10px rgba(234,179,8,0.45); } }

        .animate-slide-in-right { animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-float { animation: floatY 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        .animate-marquee { animation: marquee 28s linear infinite; }

        .blob { animation: blobMove 12s ease-in-out infinite; }
        .blob-delay { animation: blobMove 16s ease-in-out infinite; animation-delay: -5s; }
        .blob-delay2 { animation: blobMove 20s ease-in-out infinite; animation-delay: -9s; }

        .card-hover {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(234,179,8,0.15);
        }

        .yellow-glow { animation: glowPulse 2.5s ease-in-out infinite; }

        .glass-white {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .text-highlight-yellow {
          background: #fbbf24;
          padding: 0 6px;
          border-radius: 4px;
          color: #0a0a0a;
          display: inline;
        }

        .btn-yellow {
          background: #fbbf24;
          color: #0a0a0a;
          font-weight: 800;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-yellow:hover {
          background: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(234,179,8,0.4);
        }
        .btn-yellow:active { transform: translateY(0); }

        .btn-dark {
          background: #0a0a0a;
          color: #fff;
          font-weight: 700;
          border: none;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-dark:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .btn-dark:active { transform: translateY(0); }

        .btn-outline-dark {
          background: transparent;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
          font-weight: 700;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-outline-dark:hover {
          background: #0a0a0a;
          color: #fff;
          transform: translateY(-2px);
        }

        .hero-gradient {
          background: #ffffff;
        }

        .section-dark { background: #0d0d0d; }
        .section-mid { background: #111111; }
        .section-card { background: #161616; border: 1px solid rgba(255,255,255,0.07); }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E");
          opacity: 0.6;
        }

        .cat-pill-active {
          background: #0a0a0a;
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .cat-pill {
          background: #fff;
          color: #555;
          border: 1.5px solid #e5e5e5;
          transition: all 0.2s ease;
        }
        .cat-pill:hover:not(.cat-pill-active) {
          background: #f5f5f5;
          color: #0a0a0a;
          border-color: #ccc;
        }

        .product-card {
          background: #fff;
          border: 1.5px solid #f0f0f0;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }
        .product-card:hover {
          border-color: #fbbf24;
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(251,191,36,0.2);
        }
        .product-card:hover .product-img {
          transform: scale(1.06);
        }
        .product-img {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .nav-light {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid #f0f0f0;
        }

        .info-card {
          background: #fff;
          border: 1.5px solid #f0f0f0;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-color: #fbbf24;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
        }

        .footer-light { background: #0a0a0a; border-top: none; }

        .tape-strip {
          background: #0a0a0a;
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.05em;
          overflow: hidden;
          white-space: nowrap;
        }

        .yellow-tag {
          background: #fbbf24;
          color: #0a0a0a;
          display: inline-block;
          padding: 2px 10px;
          font-weight: 900;
          border-radius: 4px;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-pill {
          background: #fff;
          border: 1.5px solid #e8e8e8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .opacity-0-init { opacity: 0; }
      `}} />
      <div key={view} className="min-h-screen" style={{ background: '#fff', fontFamily: 'Bricolage Grotesque, sans-serif' }}>
        {view === 'store' ? renderStorefront() : renderAdminPanel()}
      </div>
    </>
  );
}
