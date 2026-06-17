import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingBag, 
  ChefHat, 
  Plus, 
  Minus,
  Edit2, 
  Trash2, 
  X, 
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
  Upload,
  Ticket,
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
  Filter,
  LogOut,
  Mail,
  Lock
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

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
    available: true,
    ingredients: 'Peito de frango, batata doce, brócolis, cenoura, azeite de oliva, sal, alho, ervas finas.',
    calories: '404kcal',
    carbs: '48g',
    proteins: '46g',
    totalFats: '4g',
    saturatedFats: '0g',
    transFats: '0g',
    fiber: '8g',
    sodium: '400mg'
  },
  {
    id: 2,
    name: 'Frango Desfiado com Purê de Batata Doce e Legumes (450g)',
    description: 'Versão família! Frango desfiado temperado e suculento com purê cremoso de batata doce e legumes frescos no vapor.',
    price: 27.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Peito de frango, batata doce, brócolis, cenoura, azeite de oliva, sal, alho, ervas finas.',
    calories: '808kcal',
    carbs: '96g',
    proteins: '92g',
    totalFats: '8g',
    saturatedFats: '0g',
    transFats: '0g',
    fiber: '16g',
    sodium: '800mg'
  },
  {
    id: 3,
    name: 'Escondidinho de Frango Moído com Batata Doce (225g)',
    description: 'Escondidinho fit com frango moído temperado coberto com cremoso purê de batata doce. Low carb e proteico.',
    price: 19.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1551186547-640a34bba46c?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Peito de frango moído, batata doce, leite desnatado, alho, cebola, sal, cheiro verde.',
    calories: '380kcal',
    carbs: '35g',
    proteins: '42g',
    totalFats: '3g'
  },
  {
    id: 4,
    name: 'Macarrão com Frango Desfiado (225g)',
    description: 'Macarrão integral al dente com frango desfiado temperado. Prato equilibrado e muito saboroso.',
    price: 19.50,
    category: 'Frango',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Macarrão integral, peito de frango desfiado, molho de tomate caseiro, alho, cebola, azeite de oliva, sal.',
    calories: '420kcal',
    carbs: '52g',
    proteins: '40g',
    totalFats: '5g'
  },
  // --- Patinho ---
  {
    id: 5,
    name: 'Patinho Desfiado com Arroz Integral e Legumes (225g)',
    description: 'Patinho desfiado ao molho levinho com arroz integral soltinho e mix de legumes frescos. Rico em proteína e fibras.',
    price: 25.50,
    category: 'Patinho',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Carne bovina (patinho), arroz integral, brócolis, cenoura, cebola, alho, azeite, sal.',
    calories: '390kcal',
    carbs: '44g',
    proteins: '48g',
    totalFats: '6g'
  },
  {
    id: 6,
    name: 'Escondidinho de Mandioca com Patinho Moído (450g)',
    description: 'Escondidinho gourmet com purê rústico de mandioca e recheio generoso de patinho moído temperado. Conforto em cada garfada.',
    price: 33.50,
    category: 'Patinho',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Mandioca cozida, carne bovina (patinho moído), leite desnatado, alho, cebola, sal, cheiro verde.',
    calories: '780kcal',
    carbs: '88g',
    proteins: '96g',
    totalFats: '12g'
  },
  // --- Gourmet ---
  {
    id: 7,
    name: 'Penne com Frango ao Molho Branco (225g)',
    description: 'Macarrão penne integral com frango desfiado em tiras, coberto com nosso exclusivo molho branco zero lactose. Sofisticado e saudável.',
    price: 24.90,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Macarrão penne integral, peito de frango, leite zero lactose, creme de leite light zero lactose, noz-moscada, sal, alho.',
    calories: '450kcal',
    carbs: '50g',
    proteins: '42g',
    totalFats: '7g'
  },
  {
    id: 8,
    name: 'Nhoque de Batata Doce com Frango Desfiado (225g)',
    description: 'Nhoque artesanal de batata doce com frango desfiado ao molho especial. Uma experiência gastronômica fit.',
    price: 22.50,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Batata doce, farinha de arroz, peito de frango, molho de tomate caseiro, alho, cebola, sal.',
    calories: '410kcal',
    carbs: '46g',
    proteins: '38g',
    totalFats: '4g'
  },
  {
    id: 9,
    name: 'Strogonoff de Frango com Arroz Branco (225g)',
    description: 'Strogonoff fit de frango com molho cremoso ao estilo brasileiro, acompanhado de arroz branco e batata palha zero.',
    price: 30.50,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Peito de frango, arroz branco, creme de leite light zero lactose, molho de tomate, cogumelos, sal.',
    calories: '460kcal',
    carbs: '40g',
    proteins: '44g',
    totalFats: '10g'
  },
  // --- Salgados & Doces ---
  {
    id: 10,
    name: 'Mini Pizza Calabresa com Requeijão Integral',
    description: 'Mini pizza artesanal com massa integral, calabresa e requeijão cremoso. Perfeita para um lanche proteico e saboroso.',
    price: 15.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Farinha integral, calabresa artesanal magra, requeijão light, molho de tomate, orégano, sal.',
    calories: '280kcal',
    carbs: '22g',
    proteins: '18g',
    totalFats: '8g'
  },
  {
    id: 11,
    name: 'Mini Torta Fit de Frango Integral',
    description: 'Mini torta com massa integral crocante, recheada com frango temperado. Snack fit e proteico para qualquer hora.',
    price: 13.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Farinha integral, peito de frango desfiado, ricota light, alho, cebola, azeite, sal.',
    calories: '240kcal',
    carbs: '18g',
    proteins: '16g',
    totalFats: '6g'
  },
  {
    id: 12,
    name: 'Mini Torta de Pistache Zero Açúcar',
    description: 'Mini torta premium de pistache, zero açúcar e adoçada naturalmente. Para quem não abre mão do doce sem culpa.',
    price: 17.90,
    category: 'Salgados & Doces',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    available: true,
    ingredients: 'Pistache moído, leite de amêndoas, adoçante natural xilitol, farinha de aveia, essência de baunilha.',
    calories: '260kcal',
    carbs: '12g',
    proteins: '8g',
    totalFats: '14g'
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
  }
];

// Função para comprimir e redimensionar a imagem via Canvas
const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function App() {
  // --- Estados Principais ---
  const [view, setView] = useState('store'); // 'store' ou 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'menu', 'orders', 'categories', 'settings'

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('cleanfood_products');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map(sp => {
        const initial = INITIAL_PRODUCTS.find(ip => ip.id === sp.id);
        if (initial) {
          return {
            ...initial,
            ...sp,
            ingredients: sp.ingredients || initial.ingredients || '',
            calories: sp.calories || initial.calories || '',
            carbs: sp.carbs || initial.carbs || '',
            proteins: sp.proteins || initial.proteins || '',
            totalFats: sp.totalFats || initial.totalFats || '',
            saturatedFats: sp.saturatedFats || initial.saturatedFats || '',
            transFats: sp.transFats || initial.transFats || '',
            fiber: sp.fiber || initial.fiber || '',
            sodium: sp.sodium || initial.sodium || ''
          };
        }
        return sp;
      });
    }
    return INITIAL_PRODUCTS;
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

  // --- Estados de Cupons de Desconto ---
  const [coupons, setCoupons] = useState(() => {
    const stored = localStorage.getItem('cleanfood_coupons');
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        code: 'PRIMEIRACOMPRA',
        description: '10% de desconto na primeira compra',
        percentage: 10,
        scope: 'all',
        productIds: [],
        active: true
      }
    ];
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutDeliveryType, setCheckoutDeliveryType] = useState('delivery');
  
  // Estados para gerenciamento de cupons no admin
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [isEditingCoupon, setIsEditingCoupon] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [selectedCouponProducts, setSelectedCouponProducts] = useState([]);
  const [couponScope, setCouponScope] = useState('all');
  const [selectedWeekdays, setSelectedWeekdays] = useState([0, 1, 2, 3, 4, 5, 6]);

  // Estados para gerenciamento de alimentos por grama no admin
  const [formPricedByGrams, setFormPricedByGrams] = useState(false);
  const [formWeightBasis, setFormWeightBasis] = useState(100);
  const [formWeightOptions, setFormWeightOptions] = useState([]);
  const [optWeightInput, setOptWeightInput] = useState('');
  const [optPriceInput, setOptPriceInput] = useState('');

  // Estado para quantidade em gramas selecionada no modal do cliente
  const [detailWeight, setDetailWeight] = useState(100);

  // --- Estados do Carrinho e Checkout ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null); // Para mostrar tela de sucesso

  // --- Estados da Vitrine ---
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  const [showLoader, setShowLoader] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => sessionStorage.getItem('cleanfood_admin_logged') === 'true');
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isSupabaseAuthenticated, setIsSupabaseAuthenticated] = useState(false);
  const [supabaseLoading, setSupabaseLoading] = useState(isSupabaseConfigured);

  const loadDataFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setSupabaseLoading(false);
      return;
    }
    setSupabaseLoading(true);
    try {
      // 1. Configurações
      const { data: dbSettings, error: settingsError } = await supabase
        .from('store_settings')
        .select('*')
        .maybeSingle();

      if (settingsError) throw settingsError;

      if (!dbSettings) {
        const defaultSettings = {
          id: 1,
          storeName: STORE_INFO.name,
          heroTitle: 'Comida de verdade, feita para você.',
          heroSubtitle: 'Marmitas artesanais, salgados e doces proteicos feitos com ingredientes selecionados. Peça agora e receba no conforto da sua casa em São Paulo.',
          deliveryFee: STORE_INFO.deliveryFee,
          whatsappNumber: STORE_INFO.whatsapp
        };
        const { error: seedSettingsErr } = await supabase
          .from('store_settings')
          .insert([defaultSettings]);
        if (seedSettingsErr) console.error('Erro ao semear configurações no Supabase:', seedSettingsErr);
        setStoreSettings(defaultSettings);
      } else {
        setStoreSettings(dbSettings);
      }

      // 2. Categorias (Sequencial para respeitar foreign key nos produtos)
      const { data: dbCategories, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (catError) throw catError;

      if (!dbCategories || dbCategories.length === 0) {
        const defaultCategories = ['Frango', 'Patinho', 'Gourmet', 'Salgados & Doces', 'Promoções'];
        const catInserts = defaultCategories.map(cat => ({ name: cat }));
        const { error: seedCatErr } = await supabase
          .from('categories')
          .insert(catInserts);
        if (seedCatErr) console.error('Erro ao semear categorias no Supabase:', seedCatErr);
        setCategories(defaultCategories);
      } else {
        setCategories(dbCategories.map(c => c.name));
      }

      // 3. Produtos
      const { data: dbProducts, error: prodError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (prodError) throw prodError;

      if (!dbProducts || dbProducts.length === 0) {
        const prodInserts = INITIAL_PRODUCTS.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          promoPrice: p.promoPrice || null,
          category: p.category,
          image: p.image,
          available: p.available ?? true,
          chefTip: p.chefTip ?? false,
          ingredients: p.ingredients || '',
          calories: p.calories || '',
          carbs: p.carbs || '',
          proteins: p.proteins || '',
          totalFats: p.totalFats || '',
          saturatedFats: p.saturatedFats || '',
          transFats: p.transFats || '',
          fiber: p.fiber || '',
          sodium: p.sodium || '',
          pricedByGrams: p.pricedByGrams ?? false,
          weightBasis: p.weightBasis || 100,
          weightOptions: p.weightOptions || []
        }));

        const { error: seedProdErr } = await supabase
          .from('products')
          .insert(prodInserts);
        if (seedProdErr) console.error('Erro ao semear produtos no Supabase:', seedProdErr);
        setProducts(INITIAL_PRODUCTS);
      } else {
        setProducts(dbProducts);
      }

      // 4. Cupons
      const { data: dbCoupons, error: coupError } = await supabase
        .from('coupons')
        .select('*')
        .order('id', { ascending: true });

      if (coupError) throw coupError;

      if (!dbCoupons || dbCoupons.length === 0) {
        const defaultCoupons = [
          {
            id: 1,
            code: 'PRIMEIRACOMPRA',
            description: '10% de desconto na primeira compra',
            percentage: 10,
            scope: 'all',
            productIds: [],
            active: true,
            weekdays: [0, 1, 2, 3, 4, 5, 6]
          }
        ];
        const { error: seedCoupErr } = await supabase
          .from('coupons')
          .insert(defaultCoupons);
        if (seedCoupErr) console.error('Erro ao semear cupons no Supabase:', seedCoupErr);
        setCoupons(defaultCoupons);
      } else {
        setCoupons(dbCoupons);
      }

      // 5. Pedidos (Apenas se estiver autenticado no Supabase para evitar erros de RLS)
      const { data: sessionData } = await supabase.auth.getSession();
      const hasSession = !!sessionData?.session;
      setIsSupabaseAuthenticated(hasSession);
      if (hasSession) {
        const { data: dbOrders, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('date', { ascending: false });

        if (ordersError) console.error('Erro ao buscar pedidos no Supabase:', ordersError);
        else setOrders(dbOrders || []);
      }

      setIsSupabaseConnected(true);
    } catch (err) {
      console.error('Erro ao conectar ou carregar dados do Supabase:', err);
    } finally {
      setSupabaseLoading(false);
    }
  }, []);

  // Carregar dados na montagem do componente
  useEffect(() => {
    loadDataFromSupabase();
  }, [loadDataFromSupabase]);

  // Listener para carregar/semeiar dados sempre que o usuário fizer login
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSupabaseAuthenticated(!!session);
      if (event === 'SIGNED_IN') {
        loadDataFromSupabase();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [loadDataFromSupabase]);

  useEffect(() => {
    if (!supabaseLoading) {
      const fadeTimer = setTimeout(() => {
        setFadeLoader(true);
      }, 500);

      const removeTimer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [supabaseLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsNavbarScrolled(true);
      } else {
        setIsNavbarScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Estados do Painel Admin (Filtros e Edição) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('Todos');
  const [orderStatusFilter, setOrderStatusFilter] = useState('Todos');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formImage, setFormImage] = useState('');
  const [imageSource, setImageSource] = useState('upload'); // 'upload' | 'url'

  // Nova categoria sendo adicionada
  const [newCatName, setNewCatName] = useState('');

  // Notificações de Sucesso Temporárias
  const [toastMessage, setToastMessage] = useState('');

  // --- Sincronização com LocalStorage ---
  useEffect(() => {
    localStorage.setItem('cleanfood_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.pricedByGrams && selectedProduct.weightOptions && selectedProduct.weightOptions.length > 0) {
        setDetailWeight(selectedProduct.weightOptions[0].weight);
      } else {
        setDetailWeight(selectedProduct.weightBasis || 100);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (!showForm) {
      setFormWeightOptions([]);
      setOptWeightInput('');
      setOptPriceInput('');
    }
  }, [showForm]);

  useEffect(() => {
    localStorage.setItem('cleanfood_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('cleanfood_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cleanfood_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem('cleanfood_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Limpar inputs de cupom quando fechar o modal
  useEffect(() => {
    if (!isCheckoutOpen) {
      setCouponCodeInput('');
      setCouponError('');
    }
  }, [isCheckoutOpen]);

  // Validar/remover cupom aplicado se o carrinho for modificado
  useEffect(() => {
    if (cart.length === 0) {
      setAppliedCoupon(null);
    } else if (appliedCoupon && appliedCoupon.scope === 'specific') {
      const hasEligibleProduct = cart.some(item => appliedCoupon.productIds?.includes(item.id));
      if (!hasEligibleProduct) {
        setAppliedCoupon(null);
        triggerToast('Cupom removido: nenhum produto elegível no carrinho.');
      }
    }
  }, [cart, appliedCoupon]);

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

  const getWeekdaysLabel = (weekdays) => {
    if (!weekdays || weekdays.length === 7 || weekdays.length === 0) {
      return 'Todos os dias';
    }
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)) {
      return 'Segunda a Sexta';
    }
    if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)) {
      return 'Fim de semana';
    }
    const sorted = [...weekdays].sort((a, b) => a - b);
    return sorted.map(d => dayNames[d]).join(', ');
  };

  const isCouponValidToday = (coupon) => {
    if (!coupon.weekdays || coupon.weekdays.length === 0) return true;
    const today = new Date().getDay();
    return coupon.weekdays.includes(today);
  };

  const getDetailProductPrice = (product, weight) => {
    if (!product) return 0;
    if (product.pricedByGrams) {
      if (product.weightOptions && product.weightOptions.length > 0) {
        const opt = product.weightOptions.find(o => o.weight === weight);
        if (opt) return opt.price;
      }
      return ((product.promoPrice || product.price) / (product.weightBasis || 100)) * weight;
    }
    return product.promoPrice || product.price;
  };

  const displayPriceLabel = (product) => {
    if (product.pricedByGrams) {
      if (product.weightOptions && product.weightOptions.length > 0) {
        return ` / ${product.weightOptions[0].weight}g`;
      }
      return ` / ${product.weightBasis || 100}g`;
    }
    return '';
  };

  // --- Funções do Carrinho ---
  const addToCart = (product, selectedWeight = null) => {
    if (product.pricedByGrams && !selectedWeight) {
      setSelectedProduct(product);
      return;
    }

    setCart(prev => {
      const isGrams = product.pricedByGrams;
      const weight = selectedWeight || (isGrams && product.weightOptions && product.weightOptions.length > 0 ? product.weightOptions[0].weight : (product.weightBasis || 100));
      const basePrice = product.promoPrice || product.price;
      
      let finalPrice = basePrice;
      if (isGrams) {
        if (product.weightOptions && product.weightOptions.length > 0) {
          const opt = product.weightOptions.find(o => o.weight === weight);
          finalPrice = opt ? opt.price : basePrice;
        } else {
          finalPrice = (basePrice / (product.weightBasis || 100)) * weight;
        }
      }
        
      const cartItemId = isGrams ? `${product.id}-${weight}` : String(product.id);
      
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { 
        ...product, 
        cartItemId, 
        price: finalPrice, 
        selectedWeight: isGrams ? weight : null, 
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const couponDiscount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.scope === 'all') {
      return cartTotal * (appliedCoupon.percentage / 100);
    }
    if (appliedCoupon.scope === 'specific') {
      return cart.reduce((sum, item) => {
        if (appliedCoupon.productIds?.includes(item.id)) {
          return sum + (item.price * item.quantity) * (appliedCoupon.percentage / 100);
        }
        return sum;
      }, 0);
    }
    return 0;
  })();

  const deliveryFee = checkoutDeliveryType === 'delivery' ? storeSettings.deliveryFee : 0;

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
        name: item.selectedWeight ? `${item.name} (${item.selectedWeight}g)` : item.name,
        price: item.price,
        quantity: item.quantity
      })),
      deliveryFee: deliveryFee,
      coupon: appliedCoupon ? {
        code: appliedCoupon.code,
        percentage: appliedCoupon.percentage,
        discount: couponDiscount
      } : null,
      total: Math.max(0, cartTotal + deliveryFee - couponDiscount),
      status: 'Pendente',
      notes: formData.get('custNotes') || ''
    };

    setOrders(prev => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      supabase.from('orders').insert([{
        id: newOrder.id,
        date: newOrder.date,
        customer: newOrder.customer,
        items: newOrder.items,
        deliveryFee: newOrder.deliveryFee,
        coupon: newOrder.coupon,
        total: newOrder.total,
        status: newOrder.status,
        notes: newOrder.notes
      }]).then(({ error }) => {
        if (error) console.error('Erro ao salvar pedido no Supabase:', error);
      });
    }

    setLastOrderDetails(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setCouponCodeInput('');
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
  
    const couponText = order.coupon 
      ? `-----------------------------------\n` +
        `🎟️ *Cupom:* ${order.coupon.code} (-${order.coupon.percentage}%)\n` +
        `💰 *Desconto:* -${formatPrice(order.coupon.discount)}\n`
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
      `💬 *Observações:* ${order.notes || 'Nenhuma'}\n` +
      `${couponText}` +
      `-----------------------------------\n` +
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
      promoPrice: formData.get('promoPrice') ? parseFloat(formData.get('promoPrice')) : null,
      category: formData.get('category'),
      image: (imageSource === 'upload' ? formImage : formData.get('image')) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: formData.get('available') === 'on',
      chefTip: formData.get('chefTip') === 'on',
      ingredients: formData.get('ingredients') || '',
      calories: formData.get('calories') || '',
      carbs: formData.get('carbs') || '',
      proteins: formData.get('proteins') || '',
      totalFats: formData.get('totalFats') || '',
      saturatedFats: formData.get('saturatedFats') || '',
      transFats: formData.get('transFats') || '',
      fiber: formData.get('fiber') || '',
      sodium: formData.get('sodium') || '',
      pricedByGrams: formPricedByGrams,
      weightBasis: formPricedByGrams ? formWeightBasis : null,
      weightOptions: formPricedByGrams ? formWeightOptions : []
    };

    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === newProduct.id ? newProduct : p));
      triggerToast('Produto atualizado com sucesso!');
    } else {
      setProducts(prev => [...prev, newProduct]);
      triggerToast('Novo produto cadastrado com sucesso!');
    }

    if (isSupabaseConfigured) {
      supabase.from('products').upsert([newProduct]).then(({ error }) => {
        if (error) console.error('Erro ao salvar produto no Supabase:', error);
      });
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
        if (isSupabaseConfigured) {
          supabase.from('products').update({ available: nextState }).eq('id', id).then(({ error }) => {
            if (error) console.error('Erro ao atualizar visibilidade do produto no Supabase:', error);
          });
        }
        return { ...p, available: nextState };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (id, name) => {
    if (confirm(`Tem certeza de que deseja excluir o produto "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
      triggerToast('Produto excluído com sucesso.');
      if (isSupabaseConfigured) {
        supabase.from('products').delete().eq('id', id).then(({ error }) => {
          if (error) console.error('Erro ao deletar produto no Supabase:', error);
        });
      }
    }
  };

  const openEditForm = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setFormImage(product.image || '');
    setImageSource(product.image?.startsWith('data:') ? 'upload' : 'url');
    setFormPricedByGrams(product.pricedByGrams || false);
    setFormWeightBasis(product.weightBasis || 100);
    setFormWeightOptions(product.weightOptions || []);
    setShowForm(true);
  };

  const handleAddWeightOption = () => {
    const w = parseInt(optWeightInput);
    const p = parseFloat(optPriceInput);
    if (isNaN(w) || w <= 0 || isNaN(p) || p <= 0) {
      alert('Por favor, insira valores válidos para peso (gramas) e preço (reais).');
      return;
    }
    if (formWeightOptions.some(o => o.weight === w)) {
      alert('Uma opção para este peso já existe!');
      return;
    }
    setFormWeightOptions(prev => [...prev, { weight: w, price: p }].sort((a, b) => a.weight - b.weight));
    setOptWeightInput('');
    setOptPriceInput('');
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

    if (isSupabaseConfigured) {
      supabase.from('categories').insert([{ name: formattedCat }]).then(({ error }) => {
        if (error) console.error('Erro ao salvar categoria no Supabase:', error);
      });
    }
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

      if (isSupabaseConfigured) {
        supabase.from('categories').delete().eq('name', catToDelete).then(({ error }) => {
          if (error) {
            console.error('Erro ao deletar categoria no Supabase:', error);
          } else if (count > 0) {
            const fallback = categories.find(c => c !== catToDelete) || 'Marmitas';
            supabase.from('products').update({ category: fallback }).eq('category', catToDelete).then(({ error: prodErr }) => {
              if (prodErr) console.error('Erro ao atualizar categoria dos produtos no Supabase:', prodErr);
            });
          }
        });
      }
    }
  };

  // --- Funções de Pedidos ---
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        triggerToast(`Pedido ${orderId} atualizado para: ${newStatus}`);
        if (isSupabaseConfigured) {
          supabase.from('orders').update({ status: newStatus }).eq('id', orderId).then(({ error }) => {
            if (error) console.error('Erro ao atualizar status do pedido no Supabase:', error);
          });
        }
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
    const filteredProducts = products.filter(p => {
      if (!p.available) return false;
      const matchCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchSearch = storeSearchTerm.trim() === '' || 
                          p.name.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(storeSearchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

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
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isNavbarScrolled ? 'nav-light shadow-sm' : 'bg-transparent border-transparent'}`} style={!isNavbarScrolled ? { borderBottom: 'none', backdropFilter: 'none' } : {}}>
          <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8 flex items-center justify-between" style={{ height: '80px' }}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img 
                src="/logo.jpg" 
                alt="Clean Foods Logo" 
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover shrink-0"
                style={{ border: '2px solid #fbbf24', boxShadow: '0 0 0 3px rgba(251,191,36,0.15)' }}
              />
              <div className="flex flex-col">
                <div className="font-black text-lg sm:text-2xl leading-none text-black tracking-tight font-display">Clean Foods</div>
                <div className="text-[10px] sm:text-sm font-black uppercase tracking-widest font-display" style={{ color: '#f59e0b', marginTop: '1px' }}>São Paulo</div>
              </div>
            </div>



            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('admin')}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-bold text-stone-500 hover:text-black hover:bg-stone-50 transition-all"
                title="Acessar Painel Administrador"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
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
              {cart.length > 0 && (
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black bg-stone-900 text-white hover:bg-stone-850 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-450" /> Finalizar Compra
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ====== HERO ====== */}
        <section className="relative overflow-hidden pt-[96px] pb-10 md:pb-14" style={{ background: '#FDF0A6' }}>
          {/* Subtle dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(180,140,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Soft yellow radial center glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251,191,36,0.06) 0%, transparent 75%)' }} />

          <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 md:px-16 text-center">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-4 animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-650" style={{ color: '#059669' }}>Aberto Agora</span>
                <span className="text-stone-300 text-xs font-black">·</span>
                <span className="text-[10px] font-black text-stone-600 tracking-wide">{STORE_INFO.hours}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-black mb-3.5 animate-fade-in-up delay-100 opacity-0-init"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', animationFillMode: 'forwards', color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {storeSettings.heroTitle.split(',').map((part, i) => (
                <span key={i} className={i === 1 ? "text-highlight-yellow mx-1" : ""}>
                  {part.trim()}
                  {i === 0 && ', '}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm leading-relaxed mb-6 max-w-xl mx-auto animate-fade-in-up delay-200 opacity-0-init"
              style={{ color: '#666', animationFillMode: 'forwards' }}>
              {storeSettings.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex justify-center gap-3 animate-fade-in-up delay-300 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
              <button
                onClick={() => { document.getElementById('our-menu-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black btn-yellow shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Ver o Cardápio
              </button>
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold btn-outline-dark hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </section>


        {/* ====== MENU SECTION ====== */}
        <section id="menu-section" className="py-20 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8" style={{ background: '#f7f7f7' }}>
          <div className="max-w-7xl mx-auto">

            {/* ====== BANNERS DE CUPONS ATIVOS ====== */}
            {coupons.filter(c => c.active && isCouponValidToday(c)).length > 0 && (
              <div className="mb-10 p-4 rounded-3xl bg-yellow-50 border-2 border-dashed border-yellow-300 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in shadow-xs">
                <div className="flex items-center gap-3 text-stone-850">
                  <div className="p-3 bg-yellow-450 text-stone-900 rounded-2xl">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-wide">Cupons Especiais Disponíveis</h4>
                    <p className="text-xs text-stone-600 font-medium">Use no checkout para obter descontos exclusivos!</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {coupons.filter(c => c.active && isCouponValidToday(c)).map(coupon => (
                    <div 
                      key={coupon.id} 
                      className="bg-white border border-yellow-300 rounded-xl py-1.5 px-3 flex items-center gap-2 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
                      onClick={() => {
                        navigator.clipboard?.writeText(coupon.code);
                        triggerToast(`Cupom ${coupon.code} copiado!`);
                      }}
                      title="Clique para copiar o código"
                    >
                      <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
                        Use <strong className="text-stone-900 font-black">{coupon.code}</strong> para obter <strong className="text-amber-600 font-black">{coupon.percentage}% OFF</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* Section header */}
            <div id="our-menu-section" className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="yellow-tag mb-3 inline-block">Nosso Cardápio</span>
                <h2 className="font-black font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#0a0a0a', lineHeight: 1.1, letterSpacing: '0.01em' }}>
                  Escolha o seu favorito
                </h2>
              </div>
              <div className="text-sm font-bold" style={{ color: '#aaa' }}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'prato' : 'pratos'} {activeCategory !== 'Todos' ? `em ${activeCategory}` : 'disponíveis'}
              </div>
            </div>

            {/* Category pills & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              {/* Category pills */}
              <div className="flex overflow-x-auto pb-1 md:pb-0 hide-scrollbar select-none w-full md:w-auto justify-start">
                <nav className="flex items-center gap-1.5 rounded-full px-2 py-1.5 shrink-0" style={{ background: '#f5f5f5' }}>
                  <img 
                    src="/logo.jpg" 
                    alt="Clean Foods Logo" 
                    className="w-7 h-7 rounded-full object-cover shrink-0 ml-0.5"
                    style={{ border: '1.5px solid #fbbf24', boxShadow: '0 0 0 2px rgba(251,191,36,0.1)' }}
                  />
                  {['Todos', ...categories].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-[11px] sm:text-xs transition-all duration-200 font-display whitespace-nowrap ${activeCategory === cat
                        ? 'bg-yellow-400 text-black shadow-sm font-bold'
                        : 'text-stone-500 hover:text-black hover:bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={storeSearchTerm}
                  onChange={(e) => setStoreSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-xs border border-stone-200 rounded-full outline-none focus:border-yellow-400 transition-all bg-white text-stone-850" 
                  placeholder="Buscar pratos por nome..." 
                  style={{ height: '36px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                />
                {storeSearchTerm && (
                  <button 
                    onClick={() => setStoreSearchTerm('')} 
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 rounded-3xl bg-white border border-stone-100">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#f5f5f5' }}>
                  <Search className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-black mb-1">Nenhum prato encontrado</h3>
                <p className="text-sm text-stone-400 max-w-xs mx-auto">
                  {storeSearchTerm 
                    ? `Não encontramos pratos para "${storeSearchTerm}". Tente outro termo.` 
                    : 'Não há pratos disponíveis nesta categoria no momento.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="product-card rounded-2xl overflow-hidden flex flex-col cursor-pointer animate-fade-in-up opacity-0-init"
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

                      {/* Price overlay */}
                      <div className="absolute bottom-3 left-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {product.pricedByGrams ? 'Fracionado' : (product.promoPrice ? 'Promoção' : 'a partir de')}
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          {product.pricedByGrams && product.weightOptions && product.weightOptions.length > 0 ? (
                            <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                              {formatPrice(product.weightOptions[0].price)}{displayPriceLabel(product)}
                            </span>
                          ) : product.promoPrice ? (
                            <>
                              <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                                {formatPrice(product.promoPrice)}{displayPriceLabel(product)}
                              </span>
                              <span className="text-xs text-stone-300 line-through" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                                {formatPrice(product.price)}{displayPriceLabel(product)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                              {formatPrice(product.price)}{displayPriceLabel(product)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add quick btn */}
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
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
                      <p className="text-xs mb-3 line-clamp-2 leading-relaxed flex-grow text-stone-500">
                        {product.description}
                      </p>

                      {/* Cupom do Produto */}
                      {(() => {
                        const productCoupon = coupons.find(c => c.active && isCouponValidToday(c) && c.scope === 'specific' && c.productIds?.includes(product.id));
                        if (!productCoupon) return null;
                        return (
                          <div className="flex items-center justify-center gap-1.5 bg-emerald-50/70 border border-dashed border-emerald-200 text-emerald-700 rounded-xl px-2.5 py-1.5 mb-3 text-[10px] font-black tracking-wider uppercase select-none">
                            <Ticket className="w-3 h-3 shrink-0 text-emerald-600 animate-none" /> Cupom: <span className="underline decoration-emerald-350 font-extrabold">{productCoupon.code}</span> (-{productCoupon.percentage}%)
                          </div>
                        );
                      })()}

                      {/* Informações Nutricionais Rápidas */}
                      {(product.calories || product.proteins || product.carbs) && (
                        <div className="flex items-center justify-around bg-stone-50 border border-stone-100 rounded-xl py-2 px-1 mb-4 mt-1">
                          {product.calories && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Kcal</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.calories.toLowerCase().replace('kcal', '').trim()}
                              </span>
                            </div>
                          )}
                          {product.calories && product.proteins && <div className="w-[1px] h-5 bg-stone-200" />}
                          {product.proteins && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Proteína</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.proteins}
                              </span>
                            </div>
                          )}
                          {product.proteins && product.carbs && <div className="w-[1px] h-5 bg-stone-200" />}
                          {product.carbs && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Carbo</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.carbs}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black btn-yellow shadow-xs mt-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Separator */}
          {products.filter(p => p.available && p.chefTip).length > 0 && (
            <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8">
              <div className="w-full h-[1px] bg-stone-200 my-16" />
            </div>
          )}

          {/* ====== DICA DO CHEFE ====== */}
          {products.filter(p => p.available && p.chefTip).length > 0 && (
            <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8 mb-16 animate-fade-in text-stone-850">
              <div className="mb-8">
                <span className="yellow-tag mb-3 inline-block">Dica do Chefe</span>
                <h3 className="font-black font-display text-2xl sm:text-3xl text-black leading-none tracking-tight">
                  Vai uma ajudinha aí?
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.available && p.chefTip).map((product) => (
                  <div
                    key={`chef-tip-${product.id}`}
                    onClick={() => setSelectedProduct(product)}
                    className="product-card rounded-2xl overflow-hidden flex flex-col cursor-pointer bg-white relative transition-all"
                    style={{ border: '2px solid #fbbf24' }}
                  >
                    {/* Star Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-950 font-display select-none border border-yellow-350 shadow-lg"
                        style={{ 
                          background: 'linear-gradient(135deg, #fef08a 0%, #facc15 50%, #eab308 100%)',
                          boxShadow: '0 6px 14px rgba(234, 179, 8, 0.45), inset 0 1.5px 0 rgba(255, 255, 255, 0.55)',
                          borderColor: '#fbbf24'
                        }}
                      >
                        <svg className="w-3 h-3 fill-stone-950 animate-pulse shrink-0" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Dica do Chefe
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: '200px', background: '#f5f5f5' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />

                      {/* Price Overlay */}
                      <div className="absolute bottom-3 left-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {product.promoPrice ? 'Promoção' : 'a partir de'}
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          {product.pricedByGrams && product.weightOptions && product.weightOptions.length > 0 ? (
                            <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                              {formatPrice(product.weightOptions[0].price)}{displayPriceLabel(product)}
                            </span>
                          ) : product.promoPrice ? (
                            <>
                              <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                                {formatPrice(product.promoPrice)}{displayPriceLabel(product)}
                              </span>
                              <span className="text-xs text-stone-300 line-through" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                                {formatPrice(product.price)}{displayPriceLabel(product)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-black text-white" style={{ lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                              {formatPrice(product.price)}{displayPriceLabel(product)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add Button */}
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center btn-yellow shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="text-sm font-black text-black mb-1.5 leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2 leading-relaxed flex-grow text-stone-500">
                        {product.description}
                      </p>

                      {/* Cupom do Produto */}
                      {(() => {
                        const productCoupon = coupons.find(c => c.active && isCouponValidToday(c) && c.scope === 'specific' && c.productIds?.includes(product.id));
                        if (!productCoupon) return null;
                        return (
                          <div className="flex items-center justify-center gap-1.5 bg-emerald-50/70 border border-dashed border-emerald-200 text-emerald-700 rounded-xl px-2.5 py-1.5 mb-3 text-[10px] font-black tracking-wider uppercase select-none">
                            <Ticket className="w-3 h-3 shrink-0 text-emerald-600 animate-none" /> Cupom: <span className="underline decoration-emerald-350 font-extrabold">{productCoupon.code}</span> (-{productCoupon.percentage}%)
                          </div>
                        );
                      })()}

                      {/* Informações Nutricionais Rápidas */}
                      {(product.calories || product.proteins || product.carbs) && (
                        <div className="flex items-center justify-around bg-stone-50 border border-stone-100 rounded-xl py-2 px-1 mb-4 mt-1">
                          {product.calories && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Kcal</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.calories.toLowerCase().replace('kcal', '').trim()}
                              </span>
                            </div>
                          )}
                          {product.calories && product.proteins && <div className="w-[1px] h-5 bg-stone-200" />}
                          {product.proteins && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Proteína</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.proteins}
                              </span>
                            </div>
                          )}
                          {product.proteins && product.carbs && <div className="w-[1px] h-5 bg-stone-200" />}
                          {product.carbs && (
                            <div className="text-center flex-1">
                              <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-extrabold mb-0.5">Carbo</span>
                              <span className="text-xs font-black text-stone-800">
                                {product.carbs}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black btn-yellow shadow-xs mt-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ====== INFO CARDS ====== */}
        <section className="py-20 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8 relative overflow-hidden" style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="yellow-tag mb-4 inline-block">Onde Nos Encontrar</span>
              <h2 className="font-black font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0a0a0a', letterSpacing: '0.01em' }}>
                Informações da Loja
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Horário */}
              <div className="info-card rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 btn-yellow">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <h4 className="font-black font-display mb-3 text-black text-base" style={{ letterSpacing: '0.02em' }}>Horários</h4>
                {STORE_INFO.hoursDetail.map(h => (
                  <div key={h.day} className="flex justify-between text-sm mb-2">
                    <span style={{ color: '#888' }}>{h.day}</span>
                    <span className="font-bold text-black">{h.time}</span>
                  </div>
                ))}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider" style={{ background: '#ecfdf5', color: '#047857', border: '1.5px solid #a7f3d0' }}>
                  <span className="relative flex h-1.5 w-1.5"><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span></span>
                  Aberto Agora
                </div>
              </div>

              {/* Localização */}
              <div className="info-card rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 btn-yellow">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-black font-display mb-3 text-black text-base" style={{ letterSpacing: '0.02em' }}>Localização</h4>
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
                <h4 className="font-black font-display mb-3 text-black text-base" style={{ letterSpacing: '0.02em' }}>Pagamentos</h4>
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
          <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-8 pt-16 pb-8">
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
                    <InstagramIcon className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} /> Instagram
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
                    { icon: <InstagramIcon className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />, content: STORE_INFO.instagramHandle, href: STORE_INFO.instagram },
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

        {/* ====== FLOATING CHECKOUT BAR ====== */}
        {cart.length > 0 && !isCartOpen && !isCheckoutOpen && view === 'store' && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg bg-stone-950/95 backdrop-blur-md text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between border border-stone-800 animate-fade-in">
            <div className="flex flex-col pl-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Seu Carrinho</span>
              <span className="text-sm font-black text-yellow-450">
                {cart.reduce((a, i) => a + i.quantity, 0)} {cart.reduce((a, i) => a + i.quantity, 0) === 1 ? 'item' : 'itens'} · {formatPrice(cartTotal)}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="px-4 py-2.5 rounded-2xl text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-900 transition-colors border border-stone-850"
              >
                Ver Carrinho
              </button>
              <button 
                onClick={() => setIsCheckoutOpen(true)} 
                className="px-5 py-2.5 rounded-2xl text-xs font-black bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1"
              >
                Finalizar Compra →
              </button>
            </div>
          </div>
        )}

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
                    <div key={item.cartItemId || item.id} className="flex gap-3 p-3 rounded-xl border border-stone-100 bg-stone-50">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black leading-tight line-clamp-2 mb-0.5">{item.name}</p>
                        {item.selectedWeight && (
                          <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mb-1 border border-amber-150">
                            Peso: {item.selectedWeight}g
                          </span>
                        )}
                        <p className="font-black text-sm text-black">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex items-center self-center">
                        <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-xl p-1 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId || String(item.id), -1)} 
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-rose-650 transition-colors"
                            title={item.quantity === 1 ? "Remover do Carrinho" : "Diminuir quantidade"}
                          >
                            {item.quantity > 1 ? <Minus className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                          </button>
                          <span className="text-xs font-black text-black px-1.5 min-w-[18px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId || String(item.id), 1)} 
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
                            title="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                    Finalizar Compra <CheckCircle2 className="w-5 h-5" />
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
                    <label className={`rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer border-2 transition-all ${
                      checkoutDeliveryType === 'delivery' ? 'border-yellow-400 bg-yellow-50' : 'border-stone-200'
                    }`}>
                      <input 
                        checked={checkoutDeliveryType === 'delivery'} 
                        onChange={() => setCheckoutDeliveryType('delivery')}
                        type="radio" 
                        name="deliveryType" 
                        value="delivery" 
                        className="w-4 h-4" 
                        style={{ accentColor: '#0a0a0a' }} 
                      />
                      <div>
                        <p className="text-sm font-bold text-black flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-stone-400" /> Entrega</p>
                        <p className="text-[11px] text-stone-500 font-medium">+ {formatPrice(storeSettings.deliveryFee)}</p>
                      </div>
                    </label>
                    <label className={`rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer border transition-all ${
                      checkoutDeliveryType === 'pickup' ? 'border-yellow-400 bg-yellow-50 border-2' : 'border-stone-200'
                    }`}>
                      <input 
                        checked={checkoutDeliveryType === 'pickup'} 
                        onChange={() => setCheckoutDeliveryType('pickup')}
                        type="radio" 
                        name="deliveryType" 
                        value="pickup" 
                        className="w-4 h-4" 
                        style={{ accentColor: '#0a0a0a' }} 
                      />
                      <div>
                        <p className="text-sm font-bold text-black flex items-center gap-1"><Store className="w-3.5 h-3.5 text-stone-400" /> Retirada</p>
                        <p className="text-[11px] text-stone-500 font-medium">Grátis</p>
                      </div>
                    </label>
                  </div>
                </div>

                {checkoutDeliveryType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400">Endereço de Entrega</label>
                    <textarea required={checkoutDeliveryType === 'delivery'} name="custAddress" rows="2" className="w-full p-3 text-sm rounded-xl outline-none transition-all border border-stone-200 focus:border-black bg-stone-50 resize-none" placeholder="Rua, Número, Bairro, Complemento..." />
                  </div>
                )}

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

                {/* Seção de Cupom de Desconto */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-stone-400 flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" /> Cupom de Desconto
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                        <span>Cupom <strong className="text-emerald-950 font-black">{appliedCoupon.code}</strong> aplicado ({appliedCoupon.percentage}% OFF)</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCodeInput('');
                          setCouponError('');
                        }} 
                        className="text-stone-500 hover:text-stone-900 font-bold underline transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={couponCodeInput}
                          onChange={(e) => {
                            setCouponCodeInput(e.target.value);
                            if (couponError) setCouponError('');
                          }}
                          className="flex-1 p-3 text-sm rounded-xl outline-none border border-stone-200 focus:border-black bg-stone-50 uppercase placeholder:normal-case font-bold" 
                          placeholder="Ex: PRIMEIRACOMPRA" 
                        />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setCouponError('');
                            
                            const code = couponCodeInput.trim().toUpperCase();
                            if (!code) return;
                            
                            const found = coupons.find(c => c.code.toUpperCase() === code);
                            if (!found) {
                              setCouponError('Cupom não encontrado.');
                              return;
                            }
                            if (!found.active) {
                              setCouponError('Este cupom está desativado.');
                              return;
                            }

                            // Validar dia da semana
                            if (!isCouponValidToday(found)) {
                              const dayNames = ['domingos', 'segundas-feiras', 'terças-feiras', 'quartas-feiras', 'quintas-feiras', 'sextas-feiras', 'sábados'];
                              const validDaysStr = found.weekdays && found.weekdays.length > 0
                                ? found.weekdays.map(d => dayNames[d]).join(', ')
                                : 'nenhum dia';
                              setCouponError(`Este cupom só é válido em: ${validDaysStr}.`);
                              return;
                            }
                            
                            // Se for específico, verificar pratos
                            if (found.scope === 'specific') {
                              const hasEligible = cart.some(item => found.productIds?.includes(item.id));
                              if (!hasEligible) {
                                setCouponError('Este cupom não se aplica aos itens no carrinho.');
                                return;
                              }
                            }
                            
                            setAppliedCoupon(found);
                            triggerToast(`Cupom ${found.code} aplicado com sucesso!`);
                          }}
                          className="px-5 py-3 rounded-xl text-xs font-black bg-stone-900 text-white hover:bg-stone-850 active:scale-95 transition-all shadow-md"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="rounded-xl p-4 bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex justify-between text-xs text-stone-500 font-medium">
                    <span>Itens ({cart.length})</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-stone-500 font-medium">
                    <span>Taxa de Entrega</span>
                    <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Grátis'}</span>
                  </div>

                  {appliedCoupon && couponDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-700 font-bold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" /> Desconto ({appliedCoupon.code})
                      </span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-stone-200">
                    <span className="font-bold text-black text-sm">Total</span>
                    <span className="text-xl font-black text-black">
                      {formatPrice(Math.max(0, cartTotal + deliveryFee - couponDiscount))}
                    </span>
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

        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" 
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelectedProduct(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-scale-in my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
              style={{ border: '1px solid #f0f0f0' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 flex items-center justify-between border-b border-stone-100 flex-shrink-0">
                <span className="yellow-tag">Detalhes do Produto</span>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content body - scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Image and Main Info */}
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden aspect-video md:aspect-square bg-stone-100 border border-stone-200">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        {categoryEmojis[selectedProduct.category] || '🍴'} {selectedProduct.category}
                      </span>
                      <h3 className="text-xl font-black text-black tracking-tight font-display mt-1">
                        {selectedProduct.name}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-2">
                        {selectedProduct.pricedByGrams ? (
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-black text-amber-600">
                                {formatPrice(getDetailProductPrice(selectedProduct, detailWeight))}
                              </span>
                              <span className="text-xs text-stone-400 font-bold">
                                para {detailWeight}g
                              </span>
                            </div>
                            {(!selectedProduct.weightOptions || selectedProduct.weightOptions.length === 0) && (
                              <span className="text-[10px] text-stone-450 font-bold block mt-0.5">
                                (Base: {formatPrice(selectedProduct.promoPrice || selectedProduct.price)} / {selectedProduct.weightBasis || 100}g)
                              </span>
                            )}
                          </div>
                        ) : selectedProduct.promoPrice ? (
                          <>
                            <span className="text-lg font-black text-amber-600">
                              {formatPrice(selectedProduct.promoPrice)}
                            </span>
                            <span className="text-xs text-stone-400 line-through">
                              {formatPrice(selectedProduct.price)}
                            </span>
                            <span className="bg-amber-100 text-amber-850 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                              Promoção
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-black text-amber-600">
                            {formatPrice(selectedProduct.price)}
                          </span>
                        )}
                      </div>
                      {(() => {
                        const productCoupon = coupons.find(c => c.active && isCouponValidToday(c) && c.scope === 'specific' && c.productIds?.includes(selectedProduct.id));
                        if (!productCoupon) return null;
                        return (
                          <div className="flex items-center gap-2 bg-emerald-50/70 border border-dashed border-emerald-200 text-emerald-700 rounded-xl px-3.5 py-2 mt-3 text-xs font-black tracking-wider uppercase select-none w-fit">
                            <Ticket className="w-4 h-4 shrink-0 text-emerald-600 animate-none" /> Cupom disponível: <span className="underline decoration-emerald-350 font-black text-emerald-900">{productCoupon.code}</span> (-{productCoupon.percentage}%)
                          </div>
                        );
                      })()}
                      <p className="text-xs text-stone-500 mt-4 leading-relaxed whitespace-pre-line">
                        {selectedProduct.description}
                      </p>

                      {selectedProduct.pricedByGrams && (
                        <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-4">
                          <label className="block text-xs font-black uppercase tracking-widest text-amber-800">
                            Escolha a Quantidade (Gramas)
                          </label>
                          
                          {selectedProduct.weightOptions && selectedProduct.weightOptions.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2.5">
                              {selectedProduct.weightOptions.map(opt => (
                                <button
                                  key={opt.weight}
                                  type="button"
                                  onClick={() => setDetailWeight(opt.weight)}
                                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                                    detailWeight === opt.weight 
                                      ? 'bg-yellow-400 text-stone-900 border-yellow-400 shadow-xs scale-[1.02]' 
                                      : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                  }`}
                                >
                                  <span className="text-sm font-black">{opt.weight}g</span>
                                  <span className="text-xs font-bold mt-0.5 opacity-90">{formatPrice(opt.price)}</span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <>
                              {/* Presets */}
                              <div className="flex flex-wrap gap-2">
                                {[100, 250, 500, 750, 1000].map(w => (
                                  <button
                                    key={w}
                                    type="button"
                                    onClick={() => setDetailWeight(w)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                      detailWeight === w 
                                        ? 'bg-yellow-400 text-stone-900 border-yellow-400 shadow-xs' 
                                        : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                    }`}
                                  >
                                    {w}g
                                  </button>
                                ))}
                              </div>
                              
                              {/* Slider */}
                              <div className="space-y-1">
                                <input
                                  type="range"
                                  min="50"
                                  max="2000"
                                  step="50"
                                  value={detailWeight}
                                  onChange={(e) => setDetailWeight(Number(e.target.value))}
                                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                />
                                <div className="flex justify-between text-[10px] text-stone-400 font-bold">
                                  <span>50g</span>
                                  <span>2.000g (2kg)</span>
                                </div>
                              </div>
                              
                              {/* Manual Input */}
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-stone-500 font-semibold">Quantidade manual:</span>
                                <div className="relative w-32">
                                  <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    value={detailWeight}
                                    onChange={(e) => {
                                      const val = Number(e.target.value);
                                      if (val >= 0) setDetailWeight(val);
                                    }}
                                    className="w-full pl-3 pr-8 py-1.5 text-xs font-bold border border-stone-200 rounded-xl outline-none focus:border-yellow-400 bg-white text-stone-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">
                                    g
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Ingredients & Nutritional Table */}
                  <div className="space-y-6">
                    {/* Ingredients Section */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-150">
                      <h4 className="text-xs font-black uppercase tracking-wider text-black font-display mb-2 flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-emerald-605" style={{ color: '#059669' }} /> Ingredientes
                      </h4>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {selectedProduct.ingredients || 'Ingredientes não declarados.'}
                      </p>
                    </div>

                    {/* Nutritional Table Section */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-150">
                      <h4 className="text-xs font-black uppercase tracking-wider text-black font-display mb-3 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-amber-600" /> Tabela Nutricional
                      </h4>
                      <div className="border border-stone-200 rounded-xl overflow-hidden">
                        {[
                          { label: 'Valor Energético', value: selectedProduct.calories },
                          { label: 'Carboidratos', value: selectedProduct.carbs },
                          { label: 'Proteínas', value: selectedProduct.proteins },
                          { label: 'Gorduras Totais', value: selectedProduct.totalFats },
                          { label: 'Gordura Saturada', value: selectedProduct.saturatedFats },
                          { label: 'Gordura Trans', value: selectedProduct.transFats },
                          { label: 'Fibra Alimentar', value: selectedProduct.fiber },
                          { label: 'Sódio', value: selectedProduct.sodium },
                        ].map((row, i) => (
                          <div 
                            key={row.label} 
                            className={`flex justify-between items-center px-3.5 py-2 text-xs border-b border-stone-200 last:border-0 ${
                              i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                            }`}
                          >
                            <span className="font-medium text-stone-500">{row.label}</span>
                            <span className="font-bold text-black">{row.value || 'Não informado'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-stone-100 bg-stone-50/50 flex flex-col-reverse sm:flex-row gap-3 flex-shrink-0">
                <button 
                  type="button" 
                  onClick={() => setSelectedProduct(null)} 
                  className="w-full sm:w-auto px-5 py-3 border border-stone-300 text-stone-600 font-semibold rounded-xl hover:bg-stone-100 transition-colors text-sm text-center"
                >
                  Voltar ao Cardápio
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    addToCart(selectedProduct, selectedProduct.pricedByGrams ? detailWeight : null);
                    setSelectedProduct(null);
                  }} 
                  className="flex-grow py-3 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 btn-yellow shadow-md"
                >
                  Adicionar ao Carrinho <ShoppingBag className="w-4 h-4" />
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
      <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col md:flex-row" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
              onClick={() => setAdminTab('coupons')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adminTab === 'coupons' 
                  ? 'bg-yellow-400 text-white shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" /> Cupons
            </button>

          </nav>

          {/* Rodapé da Sidebar */}
          <div className="p-4 border-t border-stone-800 bg-stone-950/40 space-y-2">
            <button 
              onClick={() => {
                setIsAdminLoggedIn(false);
                sessionStorage.removeItem('cleanfood_admin_logged');
                triggerToast('Sessão encerrada com sucesso.');
                setView('store');
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-stone-800 hover:bg-stone-750 text-rose-500 hover:text-rose-400 py-3 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" /> Encerrar Sessão
            </button>
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
                 adminTab === 'coupons' ? 'Cupons de Desconto' : ''}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {!isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-200 text-stone-700 border border-stone-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-stone-450" />
                    Modo de Demonstração (Sem Supabase conectado)
                  </span>
                ) : supabaseLoading ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-250 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Conectando ao Supabase...
                  </span>
                ) : isSupabaseConnected ? (
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-750 border border-emerald-250">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Supabase Conectado
                    </span>
                    {!isSupabaseAuthenticated && isAdminLoggedIn && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-55 text-amber-850 border border-amber-250">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                        ⚠️ Modo Fallback Local (Sem Autenticação Supabase - As alterações não salvarão no banco)
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-750 border border-rose-250">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Erro de Conexão com o Supabase
                  </span>
                )}
              </div>
            </div>
            {adminTab === 'menu' && (
              <button 
                onClick={() => {
                  setCurrentProduct(null);
                  setIsEditing(false);
                  setFormImage('');
                  setImageSource('upload');
                  setFormPricedByGrams(false);
                  setFormWeightBasis(100);
                  setShowForm(true);
                }}
                className="bg-yellow-400 hover:bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-md shadow-yellow-400/10 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Prato
              </button>
            )}

            {adminTab === 'coupons' && (
              <button 
                onClick={() => {
                  setCurrentCoupon(null);
                  setIsEditingCoupon(false);
                  setSelectedCouponProducts([]);
                  setCouponScope('all');
                  setSelectedWeekdays([0, 1, 2, 3, 4, 5, 6]);
                  setShowCouponForm(true);
                }}
                className="bg-yellow-400 hover:bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-md shadow-yellow-400/10 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Cupom
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
              {/* Estatísticas Rápidas do Cardápio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-3xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-400 block mb-0.5">Total de Pratos</span>
                    <span className="text-xl font-black text-stone-900">{products.length}</span>
                  </div>
                  <span className="p-2 bg-stone-50 border border-stone-150 rounded-xl text-stone-500">
                    <Layers className="w-4.5 h-4.5" />
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-3xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-400 block mb-0.5">Visíveis no Cardápio</span>
                    <span className="text-xl font-black text-stone-900">{products.filter(p => p.available).length}</span>
                  </div>
                  <span className="p-2 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-600">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-3xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-400 block mb-0.5">Dicas do Chefe</span>
                    <span className="text-xl font-black text-stone-900">{products.filter(p => p.chefTip).length}</span>
                  </div>
                  <span className="p-2 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                    <span className="text-sm font-bold">⭐</span>
                  </span>
                </div>
              </div>

              {/* Filtros e Busca */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                {/* Input de Busca */}
                <div className="relative flex-grow max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-550 transition-all bg-white text-stone-900 placeholder:text-stone-400" 
                    placeholder="Pesquisar por nome ou descrição..." 
                  />
                </div>

                {/* Filtro por Categoria */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-stone-400" />
                  <select 
                    value={adminCategoryFilter}
                    onChange={(e) => setAdminCategoryFilter(e.target.value)}
                    className="p-2.5 border border-stone-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-yellow-550 bg-white text-stone-950"
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
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-400 text-[10px] font-black uppercase tracking-wider">
                        <th className="p-4 pl-5">Foto & Nome</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Preço</th>
                        <th className="p-4 text-center">Ativo</th>
                        <th className="p-4 text-right pr-5">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150 text-sm">
                      {filteredAdminProducts.map(product => (
                        <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="p-4 pl-5 flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200/50 shadow-2xs shrink-0" />
                            <div>
                              <p className="font-bold text-stone-900 flex items-center gap-1.5 flex-wrap text-sm leading-normal">
                                {product.name}
                                {product.chefTip && (
                                  <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-250/50 shadow-3xs">
                                    ⭐ Dica do Chefe
                                  </span>
                                )}
                              </p>
                              <p className="text-stone-400 text-xs mt-0.5 max-w-sm line-clamp-1 leading-normal">{product.description}</p>
                              {/* Exibição resumida de macros no admin */}
                              {(product.calories || product.proteins || product.carbs) && (
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-400 font-bold">
                                  {product.calories && <span className="bg-stone-100 border border-stone-200/40 rounded px-1.5 py-0.5">🔥 {product.calories}</span>}
                                  {product.proteins && <span className="bg-stone-100 border border-stone-200/40 rounded px-1.5 py-0.5">💪 {product.proteins} Prot</span>}
                                  {product.carbs && <span className="bg-stone-100 border border-stone-200/40 rounded px-1.5 py-0.5">🍞 {product.carbs} Carbo</span>}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-bold border border-stone-200/40">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-4 text-stone-900">
                            {product.pricedByGrams && product.weightOptions && product.weightOptions.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {product.weightOptions.map(opt => (
                                  <span key={opt.weight} className="text-xxs font-bold text-stone-700 bg-stone-50 border border-stone-200/50 rounded px-1.5 py-0.5 w-fit">
                                    {opt.weight}g: <strong className="text-stone-950 font-black">{formatPrice(opt.price)}</strong>
                                  </span>
                                ))}
                              </div>
                            ) : product.promoPrice ? (
                              <div className="flex flex-col">
                                <span className="font-extrabold text-emerald-600 text-sm">
                                  {formatPrice(product.promoPrice)}{displayPriceLabel(product)}
                                </span>
                                <span className="text-[10px] text-stone-400 line-through">
                                  {formatPrice(product.price)}{displayPriceLabel(product)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-extrabold text-stone-950 text-sm">
                                {formatPrice(product.price)}{displayPriceLabel(product)}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {/* Switch de Visibilidade Inline */}
                            <button
                              type="button"
                              onClick={() => toggleProductVisibility(product.id)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                product.available ? 'bg-yellow-400' : 'bg-stone-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-2xs ring-0 transition duration-200 ease-in-out ${
                                  product.available ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </td>
                          <td className="p-4 text-right pr-5 space-x-0.5">
                            <button onClick={() => openEditForm(product)} className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors rounded-lg inline-flex" title="Editar">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id, product.name)} className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50/50 transition-colors rounded-lg inline-flex" title="Excluir">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAdminProducts.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-stone-400">Nenhum produto correspondente aos filtros.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal de Formulário (Novo/Editar Produto) */}
              {showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 md:p-6 max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                      <h2 className="text-lg font-bold text-stone-900">{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
                      <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin">
                      
                      {/* Seção 1: Informações Gerais */}
                      <div className="space-y-4 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/60">
                        <span className="block text-xxs font-extrabold uppercase tracking-widest text-stone-400 mb-1">Informações Gerais</span>
                        
                        <div>
                          <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Nome do Prato</label>
                          <input required name="name" type="text" defaultValue={currentProduct?.name} className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all bg-white font-semibold text-stone-900" placeholder="Ex: Salmão ao molho de maracujá" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Preço Original (de)</label>
                            <input required type="number" step="0.01" name="price" defaultValue={currentProduct?.price} className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white font-semibold text-stone-900" placeholder="29.90" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Preço Promo (por)</label>
                            <input type="number" step="0.01" name="promoPrice" defaultValue={currentProduct?.promoPrice} className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white font-semibold text-stone-900" placeholder="Ex: 19.90" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Categoria</label>
                            <select name="category" defaultValue={currentProduct?.category || categories[0]} className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white font-semibold text-stone-900">
                              {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Descrição do Prato</label>
                          <textarea required name="description" defaultValue={currentProduct?.description} rows="2" className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none bg-white leading-relaxed text-stone-700" placeholder="Descreva os detalhes do prato..."></textarea>
                        </div>

                        <div>
                          <label className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">Ingredientes</label>
                          <textarea name="ingredients" defaultValue={currentProduct?.ingredients} rows="2" className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none bg-white leading-relaxed text-stone-700" placeholder="Ex: Peito de frango, batata doce, legumes, sal, azeite..."></textarea>
                        </div>
                      </div>

                      {/* Seção 2: Precificação Fracionada */}
                      <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/60">
                        <span className="block text-xxs font-extrabold uppercase tracking-widest text-stone-400 mb-1">Precificação por Gramas</span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200/50 shadow-3xs">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFormPricedByGrams(prev => !prev)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                formPricedByGrams ? 'bg-yellow-400' : 'bg-stone-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  formPricedByGrams ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                            <label className="text-xs font-bold text-stone-700">Precificado por Gramas?</label>
                          </div>
                          
                          {formPricedByGrams && (
                            <div className="space-y-4 pt-2 border-t border-stone-150 w-full">
                              {/* Legado: Base de Peso */}
                              <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-stone-500">Peso Base Proporcional (g):</label>
                                <div className="relative w-24">
                                  <input 
                                    required={formPricedByGrams && formWeightOptions.length === 0}
                                    type="number" 
                                    min="1"
                                    value={formWeightBasis}
                                    onChange={(e) => setFormWeightBasis(Math.max(1, Number(e.target.value)))}
                                    className="w-full pl-3 pr-8 py-1.5 text-xs font-bold border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-550 bg-white text-stone-900" 
                                    placeholder="100"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">g</span>
                                </div>
                                <span className="text-[10px] text-stone-400 font-semibold">(Usado se não houver opções específicas)</span>
                              </div>

                              {/* Tabela/Opções Específicas de Gramas */}
                              <div className="space-y-2">
                                <label className="block text-xs font-black text-stone-700 uppercase tracking-wide">Opções de Gramas e Preços Específicos</label>
                                <p className="text-[10px] text-stone-400 font-medium">Ex: 26g por R$20. Cadastre cada opção com seu peso e preço exato.</p>
                                
                                {/* Inputs de Adicionar Opção */}
                                <div className="flex flex-wrap items-end gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200/50">
                                  <div>
                                    <label className="block text-[9px] font-black text-stone-400 uppercase mb-0.5">Peso (Gramas)</label>
                                    <div className="relative w-24">
                                      <input 
                                        type="number" 
                                        min="1"
                                        value={optWeightInput}
                                        onChange={(e) => setOptWeightInput(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddWeightOption();
                                          }
                                        }}
                                        className="w-full pl-3 pr-8 py-1.5 text-xs font-bold border border-stone-300 rounded-xl outline-none bg-white text-stone-900"
                                        placeholder="26"
                                      />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">g</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[9px] font-black text-stone-400 uppercase mb-0.5">Preço (R$)</label>
                                    <div className="relative w-24">
                                      <input 
                                        type="number" 
                                        step="0.01"
                                        min="0.01"
                                        value={optPriceInput}
                                        onChange={(e) => setOptPriceInput(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddWeightOption();
                                          }
                                        }}
                                        className="w-full pl-3 pr-8 py-1.5 text-xs font-bold border border-stone-300 rounded-xl outline-none bg-white text-stone-900"
                                        placeholder="20.00"
                                      />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-bold">R$</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleAddWeightOption}
                                    className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-sm"
                                  >
                                    Adicionar
                                  </button>
                                </div>

                                {/* Lista de Opções Cadastradas */}
                                {formWeightOptions.length > 0 ? (
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    {formWeightOptions.map((opt, index) => (
                                      <div 
                                        key={index} 
                                        className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-255 text-stone-800 rounded-xl text-xs font-bold shadow-3xs"
                                      >
                                        <span>{opt.weight}g = <strong className="text-stone-955 font-black">{formatPrice(opt.price)}</strong></span>
                                        <button
                                          type="button"
                                          onClick={() => setFormWeightOptions(prev => prev.filter((_, i) => i !== index))}
                                          className="text-rose-500 hover:text-rose-700 font-bold text-sm ml-1"
                                          title="Remover Opção"
                                        >
                                          &times;
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-[10px] text-stone-400 italic font-semibold p-2">Nenhuma opção de peso específica cadastrada. O cálculo será linear base/preço.</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Seção 3: Informação Nutricional */}
                      <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/60">
                        <span className="block text-xxs font-extrabold uppercase tracking-widest text-stone-400 mb-1">Informação Nutricional</span>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 bg-white p-3 rounded-xl border border-stone-200/50">
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Val. Energético</label>
                            <input name="calories" type="text" defaultValue={currentProduct?.calories} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 404kcal" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Carboidratos</label>
                            <input name="carbs" type="text" defaultValue={currentProduct?.carbs} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 48g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Proteínas</label>
                            <input name="proteins" type="text" defaultValue={currentProduct?.proteins} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 46g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Gord. Totais</label>
                            <input name="totalFats" type="text" defaultValue={currentProduct?.totalFats} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 4g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Gord. Saturada</label>
                            <input name="saturatedFats" type="text" defaultValue={currentProduct?.saturatedFats} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 0g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Gord. Trans</label>
                            <input name="transFats" type="text" defaultValue={currentProduct?.transFats} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 0g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Fibra Alim.</label>
                            <input name="fiber" type="text" defaultValue={currentProduct?.fiber} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 8g" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold text-stone-400 uppercase mb-0.5">Sódio</label>
                            <input name="sodium" type="text" defaultValue={currentProduct?.sodium} className="w-full p-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-stone-900" placeholder="Ex: 400mg" />
                          </div>
                        </div>
                      </div>

                      {/* Seção 4: Foto do Prato */}
                      <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/60">
                        <span className="block text-xxs font-extrabold uppercase tracking-widest text-stone-400 mb-1">Foto do Prato</span>
                        
                        {/* Seletor de Origem da Imagem */}
                        <div className="flex bg-stone-200/65 p-1 rounded-xl">
                          <button
                            type="button"
                            onClick={() => setImageSource('upload')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                              imageSource === 'upload'
                                ? 'bg-white text-stone-900 shadow-2xs'
                                : 'text-stone-500 hover:text-stone-900'
                            }`}
                          >
                            <Upload className="w-3.5 h-3.5" /> Fazer Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageSource('url')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                              imageSource === 'url'
                                ? 'bg-white text-stone-900 shadow-2xs'
                                : 'text-stone-500 hover:text-stone-900'
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> Link (URL)
                          </button>
                        </div>

                        {/* Conteúdo: Upload de Arquivo */}
                        {imageSource === 'upload' && (
                          <div className="space-y-3">
                            {formImage ? (
                              <div className="relative rounded-2xl overflow-hidden aspect-video border border-stone-200 bg-stone-50 flex items-center justify-center">
                                <img
                                  src={formImage}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormImage('')}
                                  className="absolute top-3 right-3 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-xl transition-colors shadow-lg"
                                  title="Remover Imagem"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-stone-300 hover:border-yellow-400 rounded-2xl cursor-pointer bg-white hover:bg-yellow-50/10 transition-all p-4 group text-center">
                                <div className="p-2.5 bg-stone-50 rounded-2xl shadow-3xs border border-stone-150 text-stone-400 group-hover:text-yellow-500 group-hover:border-yellow-250 transition-colors mb-2">
                                  <Upload className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-stone-700">Selecione uma foto do dispositivo</span>
                                <span className="text-[10px] text-stone-400 mt-1">PNG ou JPG (comprimido automaticamente)</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    
                                    if (!file.type.startsWith('image/')) {
                                      alert('Por favor, selecione apenas arquivos de imagem.');
                                      return;
                                    }
                                    
                                    try {
                                      const compressed = await compressImage(file);
                                      setFormImage(compressed);
                                    } catch (err) {
                                      console.error(err);
                                      alert('Erro ao processar imagem. Tente novamente.');
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        )}

                        {/* Conteúdo: Link de Imagem (URL) */}
                        {imageSource === 'url' && (
                          <div className="space-y-3">
                            <input
                              name="image"
                              type="url"
                              value={formImage && !formImage.startsWith('data:') ? formImage : ''}
                              onChange={(e) => setFormImage(e.target.value)}
                              className="w-full p-2.5 text-xs border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-stone-900 font-semibold"
                              placeholder="https://images.unsplash.com/..."
                            />
                            <p className="text-[10px] text-stone-400 mt-1">*Cole a URL de uma imagem hospedada na web para exibir a foto.</p>
                            
                            {formImage && !formImage.startsWith('data:') && (
                              <div className="relative rounded-2xl overflow-hidden aspect-video border border-stone-200 bg-stone-50 flex items-center justify-center">
                                <img
                                  src={formImage}
                                  alt="Preview URL"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Seção 5: Disponibilidade */}
                      <div className="flex flex-col gap-2.5 p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="available" name="available" defaultChecked={currentProduct ? currentProduct.available : true} className="w-4 h-4 text-yellow-400 rounded border-stone-300 focus:ring-yellow-500" />
                          <label htmlFor="available" className="text-xs font-bold text-stone-700">Disponível para venda imediata</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="chefTip" name="chefTip" defaultChecked={currentProduct ? currentProduct.chefTip : false} className="w-4 h-4 text-yellow-400 rounded border-stone-300 focus:ring-yellow-500" />
                          <label htmlFor="chefTip" className="text-xs font-bold text-stone-700 flex items-center gap-1">
                            ⭐ Dica do Chefe (Exibir em destaque no topo)
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-stone-100 mt-4 flex-shrink-0">
                        <button type="button" onClick={() => setShowForm(false)} className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 text-stone-600 font-bold rounded-xl hover:bg-stone-50 transition-colors text-xs text-center">Cancelar</button>
                        <button type="submit" className="w-full sm:w-auto px-5 py-2.5 bg-yellow-400 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-md text-xs text-center">Salvar Produto</button>
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

          {/* --- ABA 5: CUPONS --- */}
          {adminTab === 'coupons' && (
            <div className="space-y-6 animate-fade-in text-stone-850">
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-5">Cupom & Descrição</th>
                        <th className="p-5">Desconto</th>
                        <th className="p-5">Escopo</th>
                        <th className="p-5 text-center">Status (Ativo)</th>
                        <th className="p-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150 text-sm">
                      {coupons.map(coupon => (
                        <tr key={coupon.id} className="hover:bg-stone-50 transition-colors">
                          <td className="p-5">
                            <p className="font-bold text-stone-900 flex items-center gap-1.5">
                              <Ticket className="w-4 h-4 text-yellow-500 shrink-0" />
                              {coupon.code}
                            </p>
                            <p className="text-stone-500 text-xs mt-1">{coupon.description}</p>
                            <p className="text-xxs font-bold text-stone-400 mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" /> Válido: {getWeekdaysLabel(coupon.weekdays)}
                            </p>
                          </td>
                          <td className="p-5 font-bold text-stone-900">{coupon.percentage}%</td>
                          <td className="p-5 text-stone-600 font-semibold">
                            {coupon.scope === 'all' ? (
                              <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md text-xxs font-bold">Todos os Alimentos</span>
                            ) : (
                              <span className="bg-stone-100 text-amber-705 px-2 py-0.5 rounded-md text-xxs font-bold" style={{ color: '#d97706' }}>
                                {coupon.productIds?.length || 0} Alimento(s) Específico(s)
                              </span>
                            )}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                const nextState = !coupon.active;
                                setCoupons(prev => prev.map(c => {
                                  if (c.id === coupon.id) {
                                    triggerToast(`Cupom ${c.code} ${nextState ? 'ativado' : 'desativado'}`);
                                    return { ...c, active: nextState };
                                  }
                                  return c;
                                }));
                                if (isSupabaseConfigured) {
                                  supabase.from('coupons').update({ active: nextState }).eq('id', coupon.id).then(({ error }) => {
                                    if (error) console.error('Erro ao atualizar status do cupom no Supabase:', error);
                                  });
                                }
                              }}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                coupon.active ? 'bg-yellow-400' : 'bg-stone-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  coupon.active ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </td>
                          <td className="p-5 text-right space-x-1">
                            <button 
                              onClick={() => {
                                setCurrentCoupon(coupon);
                                setIsEditingCoupon(true);
                                setSelectedCouponProducts(coupon.productIds || []);
                                setCouponScope(coupon.scope || 'all');
                                setSelectedWeekdays(coupon.weekdays || [0, 1, 2, 3, 4, 5, 6]);
                                setShowCouponForm(true);
                              }} 
                              className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100" 
                              title="Editar"
                            >
                              <Edit2 className="w-4.5 h-4.5" />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Tem certeza de que deseja excluir o cupom "${coupon.code}"?`)) {
                                  setCoupons(prev => prev.filter(c => c.id !== coupon.id));
                                  triggerToast('Cupom excluído com sucesso.');
                                  if (isSupabaseConfigured) {
                                    supabase.from('coupons').delete().eq('id', coupon.id).then(({ error }) => {
                                      if (error) console.error('Erro ao excluir cupom no Supabase:', error);
                                    });
                                  }
                                }
                              }} 
                              className="p-2 text-stone-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-stone-100" 
                              title="Excluir"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {coupons.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-stone-450">Nenhum cupom cadastrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal de Formulário (Novo/Editar Cupom) */}
              {showCouponForm && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 md:p-6 max-w-lg w-full animate-fade-in max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                      <h2 className="text-lg font-bold text-stone-900">{isEditingCoupon ? 'Editar Cupom' : 'Criar Novo Cupom'}</h2>
                      <button 
                        onClick={() => setShowCouponForm(false)} 
                        className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const code = formData.get('code').toString().trim().toUpperCase();
                        
                        // Validar duplicados
                        const isDuplicate = coupons.some(c => c.code === code && (!isEditingCoupon || c.id !== currentCoupon.id));
                        if (isDuplicate) {
                          alert('Já existe um cupom cadastrado com este código!');
                          return;
                        }

                        if (selectedWeekdays.length === 0) {
                          alert('Selecione pelo menos um dia da semana para o cupom ser válido!');
                          return;
                        }

                        const newCoupon = {
                          id: isEditingCoupon ? currentCoupon.id : Date.now(),
                          code,
                          description: formData.get('description'),
                          percentage: parseInt(formData.get('percentage')),
                          scope: formData.get('scope'),
                          productIds: formData.get('scope') === 'specific' ? selectedCouponProducts : [],
                          weekdays: selectedWeekdays,
                          active: formData.get('active') === 'on'
                        };

                        if (isEditingCoupon) {
                          setCoupons(prev => prev.map(c => c.id === newCoupon.id ? newCoupon : c));
                          triggerToast('Cupom atualizado com sucesso!');
                        } else {
                          setCoupons(prev => [...prev, newCoupon]);
                          triggerToast('Cupom cadastrado com sucesso!');
                        }

                        if (isSupabaseConfigured) {
                          supabase.from('coupons').upsert([newCoupon]).then(({ error }) => {
                            if (error) console.error('Erro ao salvar cupom no Supabase:', error);
                          });
                        }

                        setShowCouponForm(false);
                      }} 
                      className="flex-1 overflow-y-auto space-y-4 pr-1 text-stone-850"
                    >
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Código do Cupom</label>
                        <input 
                          required 
                          name="code" 
                          type="text" 
                          defaultValue={currentCoupon?.code} 
                          className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all bg-white" 
                          placeholder="Ex: PRIMEIRACOMPRA" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Descrição</label>
                        <input 
                          required 
                          name="description" 
                          type="text" 
                          defaultValue={currentCoupon?.description} 
                          className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all bg-white" 
                          placeholder="Ex: 10% de desconto na primeira compra" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Desconto (%)</label>
                          <input 
                            required 
                            type="number" 
                            min="1" 
                            max="100" 
                            name="percentage" 
                            defaultValue={currentCoupon?.percentage || 10} 
                            className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white" 
                            placeholder="10" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Escopo</label>
                          <select 
                            name="scope" 
                            defaultValue={couponScope} 
                            onChange={(e) => setCouponScope(e.target.value)}
                            className="w-full p-3 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white font-semibold"
                          >
                            <option value="all">Todos os Alimentos</option>
                            <option value="specific">Alimentos Específicos</option>
                          </select>
                        </div>
                      </div>

                      {/* Checklist de alimentos se o escopo for específico */}
                      {couponScope === 'specific' && (
                        <div className="border-t border-stone-150 pt-3">
                          <label className="block text-xs font-bold text-stone-600 uppercase mb-2">
                            Selecione os Alimentos Elegíveis
                          </label>
                          <div className="border border-stone-200 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2 bg-stone-50">
                            {products.map(p => (
                              <label key={p.id} className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer hover:text-stone-900 transition-colors">
                                <input 
                                  type="checkbox" 
                                  checked={selectedCouponProducts.includes(p.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCouponProducts(prev => [...prev, p.id]);
                                    } else {
                                      setSelectedCouponProducts(prev => prev.filter(id => id !== p.id));
                                    }
                                  }}
                                  className="w-4 h-4 text-yellow-400 rounded border-stone-300 focus:ring-yellow-500" 
                                />
                                <span>{p.name} ({formatPrice(p.promoPrice || p.price)})</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dias da semana */}
                      <div className="border-t border-stone-150 pt-3">
                        <label className="block text-xs font-bold text-stone-600 uppercase mb-2">
                          Dias de Validade do Cupom
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 1, label: 'Seg' },
                            { value: 2, label: 'Ter' },
                            { value: 3, label: 'Qua' },
                            { value: 4, label: 'Qui' },
                            { value: 5, label: 'Sex' },
                            { value: 6, label: 'Sáb' },
                            { value: 0, label: 'Dom' }
                          ].map(day => {
                            const isSelected = selectedWeekdays.includes(day.value);
                            return (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedWeekdays(prev => prev.filter(d => d !== day.value));
                                  } else {
                                    setSelectedWeekdays(prev => [...prev, day.value]);
                                  }
                                }}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                                  isSelected 
                                    ? 'bg-yellow-400 text-stone-900 border-yellow-400 shadow-xs' 
                                    : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                }`}
                              >
                                {day.label}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1.5 font-medium">
                          {selectedWeekdays.length === 7 ? 'Válido todos os dias da semana.' : 
                           selectedWeekdays.length === 0 ? '⚠️ Selecione pelo menos um dia.' : 
                           `Válido em: ${getWeekdaysLabel(selectedWeekdays)}.`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                        <input 
                          type="checkbox" 
                          id="couponActive" 
                          name="active" 
                          defaultChecked={currentCoupon ? currentCoupon.active : true} 
                          className="w-4 h-4 text-yellow-400 rounded border-stone-300 focus:ring-yellow-500" 
                        />
                        <label htmlFor="couponActive" className="text-sm font-semibold text-stone-700">Cupom Ativo (Valendo)</label>
                      </div>

                      <div className="pt-5 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-stone-100 mt-4">
                        <button 
                          type="button" 
                          onClick={() => setShowCouponForm(false)} 
                          className="w-full sm:w-auto px-5 py-3 border border-stone-300 text-stone-600 font-semibold rounded-xl hover:bg-stone-50 transition-colors text-sm text-center"
                        >
                          Cancelar
                        </button>
                        <button 
                          type="submit" 
                          className="w-full sm:w-auto px-5 py-3 bg-yellow-400 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-md text-sm text-center"
                        >
                          Salvar Cupom
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
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

  function InstagramIcon(props) {
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Lilita+One&display=swap');
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
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-reverse { animation: spin-reverse 1.5s linear infinite; }
        @keyframes logo-breathe {
          0%, 100% { transform: scale(0.98); }
          50% { transform: scale(1.02); }
        }
        .animate-logo-breathe { animation: logo-breathe 2.5s ease-in-out infinite; }
        @keyframes loader-progress {
          0% { left: -40%; }
          100% { left: 100%; }
        }
        @keyframes particle-float-1 {
          0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.4; }
          50% { transform: translateY(-12px) scale(1.2); opacity: 0.9; }
        }
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(12px, -8px) scale(0.7); opacity: 0.3; }
        }
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0) scale(0.7); opacity: 0.3; }
          50% { transform: translate(-10px, -12px) scale(1.1); opacity: 0.8; }
        }
        .animate-particle-1 { animation: particle-float-1 3s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-float-2 4s ease-in-out infinite; }
        .animate-particle-3 { animation: particle-float-3 3.5s ease-in-out infinite; }
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
          background: #fbbf24 !important;
          color: #0a0a0a !important;
          border-color: #fbbf24 !important;
          box-shadow: 0 8px 20px rgba(251,191,36,0.38) !important;
          transform: translateY(-2px) scale(1.03) !important;
        }
        .cat-pill {
          background: #fefce8;
          color: #854d0e;
          border: 2px solid #fde68a;
          font-family: 'Lilita One', sans-serif;
          font-weight: normal;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 13.5px;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          padding: 10px 20px !important;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(251,191,36,0.06);
        }
        .cat-pill:hover:not(.cat-pill-active) {
          background: #fef08a;
          color: #78350f;
          border-color: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(251,191,36,0.15);
        }
        .cat-pill:active {
          transform: translateY(0) scale(0.96) !important;
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
          padding: 4px 12px;
          font-family: 'Lilita One', sans-serif;
          font-weight: normal;
          border-radius: 4px;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .font-display {
          font-family: 'Lilita One', sans-serif !important;
          font-weight: normal !important;
          text-transform: uppercase !important;
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
        {view === 'store' ? renderStorefront() : (isAdminLoggedIn ? renderAdminPanel() : <AdminLogin onLoginSuccess={() => { setIsAdminLoggedIn(true); sessionStorage.setItem('cleanfood_admin_logged', 'true'); }} onCancel={() => setView('store')} triggerToast={triggerToast} />)}
        {/* Loading Overlay */}
        {showLoader && (
          <div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-out"
            style={{ 
              opacity: fadeLoader ? 0 : 1,
              pointerEvents: fadeLoader ? 'none' : 'auto'
            }}
          >
            {/* Minimalist Logo & Spinner Container */}
            <div className="relative flex items-center justify-center w-80 h-80">
              {/* Single, thin, modern spinning progress circle */}
              <div 
                className="absolute w-full h-full rounded-full border-2 border-stone-100 border-t-yellow-400 animate-spin" 
                style={{ animationDuration: '0.8s' }} 
              />
              
              {/* Circular Logo with a clean, thin border and soft breathe animation */}
              <img 
                src="/logo.jpg" 
                alt="Clean Foods Logo" 
                className="absolute w-[84%] h-[84%] rounded-full object-cover shadow-sm border border-stone-150/50 animate-logo-breathe"
                style={{ borderColor: '#fbbf24' }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// --- COMPONENTE STANDALONE DE LOGIN DO ADMIN ---
function AdminLogin({ onLoginSuccess, onCancel, triggerToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSupabaseConfigured) {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!authError) {
        onLoginSuccess();
        triggerToast('Acesso autorizado via Supabase! Bem-vindo.');
        return;
      }

      // Se falhar no Supabase mas for a senha local padrão, permitimos fallback para fins de teste
      if (email === 'cleanfoods@sp.com' && password === 'naoseinao') {
        onLoginSuccess();
        triggerToast('Acesso autorizado (Fallback Local)! Bem-vindo.');
        return;
      }

      setError(authError.message || 'Erro de autenticação no Supabase.');
    } else {
      // Sem Supabase configurado, usa a senha local padrão (modo de demonstração)
      if (email === 'cleanfoods@sp.com' && password === 'naoseinao') {
        onLoginSuccess();
        triggerToast('Acesso autorizado (Modo Demo)! Bem-vindo.');
      } else {
        setError('E-mail ou senha incorretos.');
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-stone-900" 
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Bricolage Grotesque', sans-serif"
      }}
    >
      {/* Dark overlay with blur effect */}
      <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-md z-0" />

      {/* Login Card Container with Glassmorphism */}
      <div className="bg-white/92 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border border-white/20 relative z-10 space-y-6 animate-scale-in">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            {/* Soft decorative pulsing ring around logo */}
            <div className="absolute inset-[-6px] rounded-full border border-yellow-400/40 animate-spin-slow" style={{ animationDuration: '20s' }} />
            <img 
              src="/logo.jpg" 
              alt="Clean Foods Logo" 
              className="w-18 h-18 rounded-full mx-auto object-cover border-2 border-yellow-400 shadow-md"
            />
          </div>
          <h2 className="text-2xl font-black text-stone-950 tracking-tight font-display" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Painel Clean Foods
          </h2>
          <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest">
            Acesso Restrito à Administração
          </p>
        </div>

        {/* Form Block */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50/90 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-fade-in">
              <span className="shrink-0 flex h-2 w-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">
              E-mail de Acesso
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl outline-none border border-stone-200 focus:border-yellow-400 bg-white/50 focus:bg-white transition-all font-semibold text-stone-900" 
                placeholder="cleanfoods@sp.com" 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">
              Senha Secreta
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl outline-none border border-stone-200 focus:border-yellow-400 bg-white/50 focus:bg-white transition-all font-semibold text-stone-900" 
                placeholder="Digite sua senha..." 
              />
            </div>
          </div>

          {/* Actions Button Block */}
          <div className="pt-3 flex flex-col gap-2">
            <button 
              type="submit" 
              className="w-full py-3.5 text-stone-950 font-black rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer border-0"
              style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #facc15 100%)' }}
            >
              Entrar no Painel
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 font-bold rounded-xl text-sm transition-all text-center cursor-pointer bg-white/50 backdrop-blur-sm"
            >
              Voltar para a Loja
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
