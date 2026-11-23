(function (global) {
  'use strict';

  var icons = {
    'arrow-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    'briefcase': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
    'car': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
    'circle-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>',
    'compass': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></svg>',
    'concierge-bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"/><path d="M20 16a8 8 0 1 0-16 0"/><path d="M12 4v4"/><path d="M10 4h4"/></svg>',
    'crown': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>',
    'gauge': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    'headphones': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
    'house': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>',
    'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
    'message-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>',
    'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',
    'plane-landing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 22h20"/><path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"/></svg>',
    'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',
    'shield-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    'sparkles': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>',
    'user-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>',
    'x': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
  };

  global.AGIAD_DATA = {
    logoPath: 'assets/images/logo.png',
    heroBgPath: 'assets/images/hero-bg.jpg',
    primaryWhatsapp: '201111114917',
    primaryDisplay: '+20 111 1114917',
    email: 'agiad.travel@gmail.com',
    contactDesks: [
      {
        id: 'primary',
        display: '+20 111 1117726',
        raw: '201111117726',
        label: { en: 'Reservations Desk 1', ar: 'مكتب الحجوزات ١' }
      },
      {
        id: 'secondary',
        display: '+20 111 1114917',
        raw: '201111114917',
        label: { en: 'Reservations Desk 2', ar: 'مكتب الحجوزات ٢' }
      },
      {
        id: 'vip',
        display: '+20 100 0204050',
        raw: '201000204050',
        label: { en: '24/7 VIP Concierge', ar: 'خدمة كبار الشخصيات 24/7' }
      }
    ],
    categories: ['all', 'Luxury Sedan', 'VIP Van', 'SUV'],
    vehicles: [
      {
        id: 'mercedes-e-class',
        name: { en: 'Mercedes-Benz E-Class', ar: 'مرسيدس بنز الفئة E200' },
        category: 'Luxury Sedan',
        categoryLabel: { en: 'Luxury Sedan', ar: 'سيدان فاخرة' },
        badgeLabel: { en: 'Executive Sedan', ar: 'سيدان تنفيذية' },
        description: {
          en: 'Refined cabin comfort for Cairo business meetings, diplomatic transfers, and seamless airport arrivals.',
          ar: 'أعلى مستويات الراحة والعزل الصوتي لاجتماعات الأعمال في القاهرة والتنقلات الدبلوماسية واستقبال المطارات.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'Professional Chauffeur', ar: 'سائق خاص محترف' },
        image: 'assets/images/mercedes-e-class.jpeg',
        featured: true,
        whatsappPhone: '201111114917'
      },
      {
        id: 'mercedes-v-class',
        name: { en: 'Mercedes-Benz V-Class', ar: 'مرسيدس بنز الفئة V300' },
        category: 'VIP Van',
        categoryLabel: { en: 'VIP Van', ar: 'فان VIP' },
        badgeLabel: { en: 'VIP MPV', ar: 'فان VIP' },
        description: {
          en: 'Spacious royal lounge seating ideal for delegations, families, and airport arrivals with generous luggage room.',
          ar: 'مقصورة ملكية واسعة بمقاعد جلدية منفصلة تناسب الوفود الرسمية، العائلات، واستقبالات المطار الفاخرة.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: '7 Seats · VIP Luggage', ar: '7 مقاعد · مساحة حقائب VIP' },
        image: 'assets/images/mercedes-v-class.jpg',
        featured: true,
        whatsappPhone: '201111114917'
      },
      {
        id: 'range-rover-sport',
        name: { en: 'Range Rover Sport', ar: 'رينج روفر سبورت' },
        category: 'SUV',
        categoryLabel: { en: 'SUV', ar: 'دفع رباعي SUV' },
        badgeLabel: { en: 'Luxury SUV', ar: 'دفع رباعي فاخر' },
        description: {
          en: 'Commanding presence and effortless poise across Cairo boulevards, North Coast highways, and El Gouna.',
          ar: 'حضور استثنائي وأداء رياضي رفيع على طرق العاصمة والطرق الساحلية للساحل الشمالي والجونة.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'All-Terrain Performance', ar: 'أداء رياضي لكافة الطرق' },
        image: 'assets/images/range-rover-sport.jpg',
        featured: true,
        whatsappPhone: '201111114917'
      },
      {
        id: 'mercedes-e-class-executive',
        name: { en: 'Mercedes-Benz E-Class', ar: 'مرسيدس بنز الفئة E' },
        category: 'Luxury Sedan',
        categoryLabel: { en: 'Luxury Sedan', ar: 'سيدان فاخرة' },
        badgeLabel: { en: 'Executive Edition', ar: 'الإصدار التنفيذي' },
        description: {
          en: 'Executive-trimmed flagship sedan tailored for C-suite roadshows, diplomatic protocol, and private events.',
          ar: 'فئة تنفيذية مجهزة بأعلى المواصفات لرحلات كبار التنفيذيين والبروتوكول الدبلوماسي والمناسبات الخاصة.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'Executive Package', ar: 'باقة تنفيذية متكاملة' },
        image: 'assets/images/mercedes-e-class-executive.jpeg',
        featured: false,
        whatsappPhone: '201111114917'
      },
      {
        id: 'kia-sportage',
        name: { en: 'Kia Sportage', ar: 'كيا سبورتاج الحديثة' },
        category: 'SUV',
        categoryLabel: { en: 'SUV', ar: 'دفع رباعي SUV' },
        badgeLabel: { en: 'Modern SUV', ar: 'SUV عائلية عملية' },
        description: {
          en: 'Versatile modern crossover delivering agile city handling, comfort, and efficiency for daily or long-term trips.',
          ar: 'سيارة كروس أوفر حديثة وعملية توفر راحة ممتازة واقتصادية في استهلاك الوقود للتنقلات اليومية والعائلية.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'Practical & Fuel Efficient', ar: 'عملية واقتصادية' },
        image: 'assets/images/kia-sportage.jpg',
        featured: false,
        whatsappPhone: '201111114917'
      },
      {
        id: 'jetour-t2',
        name: { en: 'Jetour T2', ar: 'جيتور T2' },
        category: 'SUV',
        categoryLabel: { en: 'SUV', ar: 'دفع رباعي SUV' },
        badgeLabel: { en: 'Adventure SUV', ar: 'SUV متعددة الاستخدامات' },
        description: {
          en: 'Rugged luxury SUV combining bold presence with smooth comfort for Cairo boulevards, Giza excursions, and Red Sea highways.',
          ar: 'سيارة دفع رباعي عصرية تجمع بين الحضور القوي والراحة الفائقة لشوارع القاهرة وجولات الجيزة والطرق الساحلية.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'All-Terrain SUV', ar: 'دفع رباعي لجميع الطرق' },
        image: 'assets/images/jetour-t2.jpeg',
        featured: false,
        whatsappPhone: '201111114917'
      },
      {
        id: 'mercedes-s-class',
        name: { en: 'Mercedes-Benz S-Class', ar: 'مرسيدس بنز الفئة S' },
        category: 'Luxury Sedan',
        categoryLabel: { en: 'Luxury Sedan', ar: 'سيدان فاخرة' },
        badgeLabel: { en: 'Flagship Sedan', ar: 'سيدان ملكية' },
        description: {
          en: 'First-class flagship limousine offering whisper-quiet cabin luxury for diplomatic convoys, VIP arrivals, and executive travel.',
          ar: 'قمة الفخامة الألمانية بمقصورة هادئة ومساحة خلفية رحبة لمواكب كبار الشخصيات والوفود الدبلوماسية واستقبالات المطار.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'Flagship VIP Chauffeur', ar: 'فئة كبار الشخصيات بسائق خاص' },
        image: 'assets/images/mercedes-s-class.jpeg',
        featured: false,
        whatsappPhone: '201111114917'
      },
      {
        id: 'hyundai-elantra',
        name: { en: 'Hyundai Elantra', ar: 'هيونداي إلنترا' },
        category: 'Luxury Sedan',
        categoryLabel: { en: 'Sedan', ar: 'سيدان' },
        badgeLabel: { en: 'Comfort Sedan', ar: 'سيدان مريحة' },
        description: {
          en: 'Smooth, modern sedan ideal for daily city transfers, airport pickups, and private sightseeing tours across Cairo and Giza.',
          ar: 'سيدان حديثة ومريحة مثالية للتنقلات اليومية في القاهرة واستقبالات المطارات والجولات السياحية الخاصة.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: 'City & Tour Comfort', ar: 'راحة مثالية للمدينة والجولات' },
        image: 'assets/images/hyundai-elantra.jpeg',
        featured: false,
        whatsappPhone: '201111114917'
      },
      {
        id: 'kia-carnival',
        name: { en: 'Kia Carnival', ar: 'كيا كارنيفال' },
        category: 'VIP Van',
        categoryLabel: { en: 'VIP Van', ar: 'فان VIP' },
        badgeLabel: { en: 'Family & VIP MPV', ar: 'فان عائلي و VIP' },
        description: {
          en: 'Spacious multi-passenger luxury MPV with wide sliding access and generous luggage capacity for families and airport groups.',
          ar: 'سيارة عائلية فاخرة متعددة المقاعد بمساحة واسعة للركاب والأمتعة تناسب العائلات والمجموعات واستقبالات المطار.'
        },
        driverNote: { en: 'Available With Professional Chauffeur', ar: 'متاح بسائق خاص محترف' },
        specHighlight: { en: '7+ Seats · Spacious Cabin', ar: '7+ مقاعد · مقصورة واسعة' },
        image: 'assets/images/kia-carnival.jpeg',
        featured: false,
        whatsappPhone: '201111114917'
      }
    ],
    services: [
      {
        id: 'chauffeur',
        index: '01',
        tag: { en: '01 · Chauffeur', ar: '٠١ · سائق خاص' },
        title: { en: 'Rental With Driver', ar: 'تأجير سيارات بسائق خاص' },
        subtitle: { en: 'Professional chauffeurs', ar: 'سائقون محترفون ومدربون' },
        description: {
          en: 'Navigate Cairo and beyond effortlessly with vetted, protocol-trained chauffeurs. Ideal for seamless city-to-city transit and executive schedules.',
          ar: 'تنقل في القاهرة ومختلف المحافظات بسهولة وأمان مع سائقين معتمدين وخبراء بالمسارات والبروتوكول الدولي.'
        },
        highlights: {
          en: [
            'Multilingual chauffeurs trained in executive etiquette',
            'Full airport, hotel, and intercity route mastery'
          ],
          ar: [
            'سائقون محترفون ومدربون بأعلى معايير اللياقة والبروتوكول',
            'تغطية شاملة للمطارات والفنادق والتنقل بين المحافظات'
          ]
        },
        image: 'assets/images/service-chauffeur.jpg',
        iconName: 'user-check',
        whatsappPhone: '201111114917'
      },
      {
        id: 'tourist-pyramids',
        index: '02',
        tag: { en: '02 · Heritage', ar: '٠٢ · جولات وتراث' },
        title: { en: 'Tourist & Pyramids Transfers', ar: 'استقبال المطارات وجولات الأهرامات' },
        subtitle: { en: 'Curated sightseeing & airport pickups', ar: 'استقبال VIP مخصص وجولات سياحية خاصة' },
        description: {
          en: 'Seamless VIP meet-and-greet at Cairo International Airport and private, climate-controlled excursions to the Giza Plateau, Grand Egyptian Museum, and Red Sea resorts.',
          ar: 'خدمة استقبال وترحيب حصرية بمطار القاهرة الدولي ومطارات مصر، وجولات خاصة مكيفة لأهرامات الجيزة والمتحف المصري الكبير ومنتجعات البحر الأحمر.'
        },
        highlights: {
          en: [
            'VIP arrival greeting at Cairo, Sphinx, Borg El Arab & Red Sea airports',
            'Private tours to Giza Pyramids, Saqqara, and Grand Egyptian Museum'
          ],
          ar: [
            'استقبال VIP فوري في مطارات القاهرة وسفنكس وبرج العرب والغردقة وشرم الشيخ',
            'جولات سياحية خاصة ومكيفة للأهرامات وسقارة والمتحف المصري الكبير'
          ]
        },
        image: 'assets/images/service-tourist-pyramids.jpg',
        iconName: 'plane-landing',
        whatsappPhone: '201111114917'
      },
      {
        id: 'business-vip',
        index: '03',
        tag: { en: '03 · Executive', ar: '٠٣ · كبار الشخصيات' },
        title: { en: 'Business & VIP Transportation', ar: 'تنقل كبار الشخصيات ورجال الأعمال' },
        subtitle: { en: 'Executive & diplomatic-grade service', ar: 'خدمات تنفيذية ودبلوماسية رفيعة المستوى' },
        description: {
          en: 'Dedicated fleet coordination for embassies, C-suite roadshows, and high-profile summits. Prioritizing strict confidentiality, synchronized convoy timing, and priority routing.',
          ar: 'تنسيق أساطيل متكاملة للوفود الدبلوماسية واجتماعات كبار رجال الأعمال، مع التزام تام بالسرية والأمان والانضباط الزمني الصارم.'
        },
        highlights: {
          en: [
            'Synchronized convoy coordination for summits and embassies',
            'Privacy-tinted fleet with strict confidentiality protocols'
          ],
          ar: [
            'تنسيق مواكب متكاملة للمؤتمرات والوفود والسفارات',
            'سيارات بزجاج معتم ومعايير سرية وأمان تنفيذية'
          ]
        },
        image: 'assets/images/service-business-vip.jpg',
        iconName: 'crown',
        whatsappPhone: '201111114917'
      }
    ],
    translations: {
      brandName: { en: 'AGIAD', ar: 'أجياد' },
      brandTagline: { en: 'Luxury Car Rental', ar: 'لتأجير السيارات الفاخرة' },
      slogan: { en: 'Your Journey. Our Priority.', ar: 'رحلتكم. أولويتنا.' },
      nav: {
        home: { en: 'Home', ar: 'الرئيسية' },
        services: { en: 'Services', ar: 'خدماتنا' },
        fleet: { en: 'Fleet', ar: 'الأسطول' }
      },
      aria: {
        primaryNav: { en: 'Primary navigation', ar: 'التنقل الرئيسي' },
        mobileNav: { en: 'Mobile bottom navigation', ar: 'شريط التنقل السفلي' },
        langSelector: { en: 'Language selector', ar: 'اختيار اللغة' },
        toggleMenu: { en: 'Toggle menu', ar: 'القائمة' },
        filterByCat: { en: 'Filter fleet by category', ar: 'تصفية حسب الفئة' }
      },
      titles: {
        home: {
          en: 'AGIAD Luxury Car Rental | Your Journey. Our Priority.',
          ar: 'أجياد لتأجير السيارات الفاخرة | رحلتكم أولويتنا'
        },
        services: {
          en: 'Services | AGIAD Luxury Car Rental Egypt',
          ar: 'خدماتنا | أجياد لتأجير السيارات الفاخرة'
        },
        fleet: {
          en: 'Fleet Selection | AGIAD Luxury Car Rental Egypt',
          ar: 'تشكيلة أسطولنا | أجياد لتأجير السيارات الفاخرة'
        }
      },
      whatsappMessages: {
        general: {
          en: 'Hello AGIAD, I would like to inquire about a luxury vehicle reservation.',
          ar: 'مرحباً أجياد، أود الاستفسار عن حجز سيارة فاخرة.'
        },
        homeCta: {
          en: 'Hello AGIAD, I would like to reserve a luxury vehicle or request rates.',
          ar: 'مرحباً أجياد، أود حجز سيارة فاخرة أو الاستفسار عن الأسعار.'
        },
        servicesCta: {
          en: 'Hello AGIAD, I would like to book a luxury transportation service.',
          ar: 'مرحباً أجياد، أود حجز خدمة تنقل فاخرة.'
        },
        fleetConcierge: {
          en: 'Hello AGIAD, I am looking for a specific vehicle or custom arrangement from your full fleet.',
          ar: 'مرحباً أجياد، أبحث عن طراز محدد أو خدمة خاصة من أسطولكم.'
        }
      },
      home: {
        heroEyebrow: { en: 'The Premier Mobility in Egypt', ar: 'الخدمة الأرقى للتنقل في مصر' },
        heroTitlePrefix: { en: 'AGIAD — Your Journey.', ar: 'أجياد —' },
        heroTitleAccent: { en: 'Our Priority.', ar: 'رحلتكم أولويتنا' },
        exploreFleet: { en: 'Explore Fleet', ar: 'استكشف الأسطول' },
        bookWhatsapp: { en: 'Book via WhatsApp', ar: 'احجز عبر واتساب' },
        featuredEyebrow: { en: '01 · Curated Selection', ar: '٠١ · تشكيلة مختارة' },
        featuredTitle: { en: 'Featured Fleet Selection', ar: 'أسطولنا المميز' },
        viewAllFleet: { en: 'View Full Fleet (9 Vehicles)', ar: 'عرض الأسطول الكامل (9 سيارات)' },
        standardEyebrow: { en: '02 · The AGIAD Standard', ar: '٠٢ · معايير أجياد' },
        standardTitle: { en: 'Precision Mobility Across Egypt', ar: 'دقة التنقل في مصر' },
        standardBody: {
          en: 'Whether arriving at Cairo International Airport or traveling between Alexandria, El Gouna, and Luxor, AGIAD delivers punctual, discreet, and immaculately maintained vehicles.',
          ar: 'سواء كنتم قادمين عبر مطار القاهرة الدولي أو تنتقلون بين الإسكندرية والجونة والأقصر، تقدم أجياد أعلى معايير الالتزام بالمواعيد والسرية التامة مع سيارات معتنى بها بدقة فائقة.'
        },
        standardsCards: [
          {
            title: { en: 'Private Chauffeur Service', ar: 'خدمة السائق الخاص' },
            desc: {
              en: 'Multilingual, protocol-trained chauffeurs dedicated to punctual and discreet travel.',
              ar: 'سائقون محترفون يتحدثون لغات متعددة ومدربون على أعلى معايير اللباقة والالتزام.'
            },
            icon: 'car'
          },
          {
            title: { en: '24/7 Concierge', ar: 'كونسيرج 24/7' },
            desc: {
              en: 'Dedicated round-the-clock support for itinerary adjustments, route planning, and special requests.',
              ar: 'فريق دعم متفانٍ على مدار الساعة لمساعدتكم في تخطيط الرحلات وتعديل المواعيد فوراً.'
            },
            icon: 'headphones'
          },
          {
            title: { en: 'Airport Transfers', ar: 'استقبال وتوديع المطارات' },
            desc: {
              en: 'Seamless VIP meet-and-greet service with real-time flight tracking at all major Egyptian airports.',
              ar: 'خدمة استقبال وترحيب راقية مع متابعة دقيقة لمواعيد الرحلات في كافة المطارات المصرية.'
            },
            icon: 'plane-landing'
          }
        ],
        servicesEyebrow: { en: '03 · Tailored Services', ar: '٠٣ · خدمات مخصصة' },
        servicesTitle: { en: 'Bespoke Transportation', ar: 'تنقل فاخر يناسب متطلباتكم' },
        servicesOverview: [
          {
            title: { en: 'Tourist', ar: 'سياحة وجولات خاصة' },
            desc: {
              en: 'Private day trips to the Pyramids of Giza, Saqqara, Luxor temples, and Red Sea resorts in complete comfort.',
              ar: 'رحلات يومية خاصة لأهرامات الجيزة، سقارة، معابد الأقصر، وشواطئ البحر الأحمر بأعلى درجات الرفاهية.'
            },
            icon: 'compass'
          },
          {
            title: { en: 'Business', ar: 'تنقل الأعمال' },
            desc: {
              en: 'Punctual corporate mobility for executives, roadshows, conferences, and embassy delegations across Cairo.',
              ar: 'حلول تنقل دقيقة لرجال الأعمال، المؤتمرات، وجولات العمل الرسمية وسفارات الدول.'
            },
            icon: 'briefcase'
          },
          {
            title: { en: 'VIP Transportation', ar: 'نقل كبار الشخصيات والبروتوكول' },
            desc: {
              en: 'Discreet, high-security chauffeur service with flagship vehicles for dignitaries, celebrities, and private events.',
              ar: 'خدمة ليموزين وسائقين مدربين بأعلى درجات الخصوصية والأمان للشخصيات المرموقة والفعاليات الكبرى.'
            },
            icon: 'crown'
          }
        ],
        ctaEyebrow: { en: 'Ready to Depart', ar: 'جاهزون للانطلاق' },
        ctaTitle: { en: 'Reserve Your Chauffeur or Vehicle Today', ar: 'احجز سيارتك أو سائقك الخاص اليوم' },
        ctaBody: {
          en: 'Connect directly with our 24/7 concierge team on WhatsApp for instant availability, bespoke quotes, and seamless booking.',
          ar: 'تواصلوا مباشرة مع فريق خدمة العملاء عبر واتساب للتحقق الفوري من التوفر والحصول على عروض أسعار حصرية.'
        }
      },
      fleet: {
        eyebrow: { en: '01 · Curated Fleet', ar: '٠١ · تشكيلة الأسطول المختارة' },
        title: { en: 'Our Fleet Selection', ar: 'تشكيلة أسطولنا' },
        subtitle: {
          en: 'A curated selection from our fleet. Additional vehicles and custom requests are available upon inquiry.',
          ar: 'مجموعة مختارة بعناية من أسطولنا الفاخر. سيارات إضافية وطلبات خاصة متاحة عند الطلب.'
        },
        showingLabel: { en: 'Showing', ar: 'المتاح حالياً' },
        vehicleSingular: { en: 'Vehicle', ar: 'سيارة' },
        vehiclePlural: { en: 'Vehicles', ar: 'سيارات' },
        searchPlaceholder: { en: 'Search vehicle or category...', ar: 'ابحث عن سيارة أو فئة...' },
        categories: {
          all: { en: 'All', ar: 'الكل' },
          'Luxury Sedan': { en: 'Luxury Sedan', ar: 'سيدان فاخرة' },
          'VIP Van': { en: 'VIP Van', ar: 'فان VIP' },
          SUV: { en: 'SUV', ar: 'دفع رباعي SUV' }
        },
        bookBtn: { en: 'Inquire / Book on WhatsApp', ar: 'استفسر / احجز عبر واتساب' },
        emptyTitle: { en: 'No matching vehicles found', ar: 'لم يتم العثور على سيارات مطابقة' },
        emptyDesc: {
          en: 'Reset your filter or reach out to our concierge desk for custom vehicle requests.',
          ar: 'يمكنك إعادة ضبط الفلتر أو التواصل مع فريق الكونسيرج لطلبات السيارات الخاصة.'
        },
        resetFilter: { en: 'Show All Vehicles', ar: 'عرض كل السيارات' },
        conciergeEyebrow: { en: 'Bespoke Concierge', ar: 'خدمة الكونسيرج الخاصة' },
        conciergeTitle: { en: 'Looking for a specific vehicle?', ar: 'تبحث عن طراز محدد أو طلب خاص؟' },
        conciergeSubtitle: {
          en: 'More models and VIP convoy arrangements are available in our full fleet.',
          ar: 'طرازات وتجهيزات إضافية لوفود كبار الشخصيات متوفرة في أسطولنا الكامل.'
        },
        conciergeBtn: { en: 'Contact on WhatsApp', ar: 'تواصل عبر واتساب' }
      },
      services: {
        eyebrow: { en: '01 · Bespoke Mobility', ar: '٠١ · خدمات تنقل فاخرة ومخصصة' },
        title: { en: 'Our Premium Services', ar: 'خدماتنا الاستثنائية' },
        subtitle: {
          en: 'An integrated ecosystem of luxury hospitality and executive mobility designed for business leaders, families, and distinguished visitors across Egypt.',
          ar: 'منظومة متكاملة من خدمات الضيافة والتنقل الراقي، مصممة بعناية لتلبي تطلعات رجال الأعمال والعائلات وضيوف مصر الكرام.'
        },
        sectionTitle: { en: 'Three Pillars of Egyptian Luxury', ar: 'ثلاثة ركائز للفخامة والراحة' },
        inquireBtn: { en: 'Inquire via WhatsApp', ar: 'استفسر عبر واتساب' },
        standardsEyebrow: { en: 'AGIAD Royal Standards', ar: 'معايير أجياد الملكية' },
        standardsTitle: { en: 'Why Clients Choose AGIAD', ar: 'لماذا يختار عملاؤنا أجياد؟' },
        standardsSubtitle: {
          en: 'Uncompromising commitment to excellence fitting distinguished guests.',
          ar: 'التزام راسخ بالتميز والاحترافية التي تليق بنخبة الضيوف.'
        },
        royalStandards: [
          {
            title: { en: '100% Punctuality', ar: 'دقة المواعيد' },
            highlight: { en: '100% On-Time', ar: 'بنسبة 100%' },
            desc: {
              en: 'Strict schedule adherence with arrival prior to booked time.',
              ar: 'التزام صارم بالحضور قبل الموعد المحدد.'
            },
            icon: 'clock'
          },
          {
            title: { en: 'Modern & Sanitized', ar: 'أسطول حديث' },
            highlight: { en: 'Agency Condition', ar: 'ومعقم بالكامل' },
            desc: {
              en: 'Ultra-hygienic preparation and certified inspection before every trip.',
              ar: 'نظافة فائقة وفحص فني دوري لكل رحلة.'
            },
            icon: 'sparkles'
          },
          {
            title: { en: 'Privacy & Safety', ar: 'أمان وخصوصية' },
            highlight: { en: 'Confidential', ar: 'مطلقة وسرية' },
            desc: {
              en: 'Privacy tinted glass and absolute confidentiality guaranteed.',
              ar: 'زجاج معتم وسرية تامة لرحلاتك التنفيذية.'
            },
            icon: 'lock'
          },
          {
            title: { en: '24/7 Concierge', ar: 'فريق دعم' },
            highlight: { en: 'Always Available', ar: 'وكونسيرج 24/7' },
            desc: {
              en: 'Dedicated personal mobility assistant available round the clock.',
              ar: 'مساعد مخصص جاهز لأي متطلبات طوال الوقت.'
            },
            icon: 'headphones'
          }
        ]
      },
      footer: {
        quickLinks: { en: 'Quick Links', ar: 'روابط سريعة' },
        contactTitle: { en: 'Direct Concierge & Inquiries', ar: 'بيانات التواصل الموحدة' },
        copyright: {
          en: '© 2026 AGIAD Luxury Car Rental Egypt. All rights reserved.',
          ar: '© 2026 جميع الحقوق محفوظة لشركة أجياد لتأجير السيارات الفاخرة.'
        },
        description: {
          en: 'Your premier gateway for bespoke mobility, chauffeur services, and luxury SUVs across Egypt.',
          ar: 'بوابتك الحصرية للتنقل الراقي وخدمات الليموزين وسيارات الدفع الرباعي في جمهورية مصر العربية.'
        }
      }
    },
    icons: icons
  };
})(window);
