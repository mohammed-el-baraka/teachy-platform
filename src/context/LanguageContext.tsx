import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar' | 'es';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Demo Bar
    'demo.banner': 'Teachy Demo Preview — The full version and source code are available on GitHub',
    'demo.viewGithub': 'View on GitHub',
    'demo.badge': 'Demo Version',

    // Nav
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.liveSession': 'Live Session',
    'nav.myPath': 'My path',
    'nav.history': 'History',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.signIn': 'Sign in',
    'nav.getStarted': 'Get Started Free',
    'nav.myAccount': 'My account',
    'nav.logout': 'Sign Out',
    'nav.streak': 'Day Streak',
    'nav.hoursPracticed': 'Hours Practiced',
    'nav.lessonsDone': 'Lessons Done',

    // Hero Section
    'hero.badge': '1-on-1 Native Conversation Immersion',
    'hero.title.join': 'Join Our',
    'hero.title.online': 'Online',
    'hero.title.courses': 'Language Courses',
    'hero.subtitle': 'Our language courses are expertly designed to transform your verbal communication skills through live, personalized conversation practice with native certified tutors.',
    'hero.cta.register': 'Register Now',
    'hero.cta.watchDemo': 'Watch Demo Call',
    'hero.demoPhoneText': 'Contact us for an instant demo class:',
    'hero.liveTutorsReady': 'Live Tutors Ready',
    'hero.instantPractice': 'Instant 1-on-1 Practice',

    // Stats
    'stats.learners': '10,000+ Active Learners',
    'stats.learners.sub': 'Worldwide Community',
    'stats.tutors': '500+ Certified Tutors',
    'stats.tutors.sub': 'Native Language Experts',
    'stats.hours': '50,000+ Speaking Hours',
    'stats.hours.sub': 'Live Immersion Completed',
    'stats.satisfaction': '98% Fluency Rate',
    'stats.satisfaction.sub': 'Achieved Target CEFR Level',

    // Section 2: Method / Slides
    'method.badge': 'Our Pedagogical Edge',
    'method.title': 'Why Conversational Immersion Works Best',
    'method.subtitle': 'Ditch outdated grammar drills. Experience real neurological acceleration with daily spoken practice.',
    'method.card1.title': 'Spontaneous Dialogue',
    'method.card1.desc': 'Train your brain to think directly in your target language without mental translation delays.',
    'method.card2.title': 'Real-Time Accent Correction',
    'method.card2.desc': 'Get immediate, gentle phonetic tuning from certified native speakers on every sentence.',
    'method.card3.title': 'Tailored Subject Matter',
    'method.card3.desc': 'Discuss topics you genuinely care about: technology, business, travel, science, and culture.',

    // Interactive Demo / Classroom Preview
    'demo.section.badge': 'Interactive Virtual Classroom',
    'demo.section.title': 'Experience a Live 1-on-1 Lesson',
    'demo.section.subtitle': 'State-of-the-art interactive classroom featuring live video, dynamic AI speech transcription, real-time vocabulary notes, and instant pronunciation analytics.',
    'demo.btn.start': 'Launch Classroom Demo',
    'demo.btn.inCall': 'Classroom Active',
    'demo.call.status': 'Live 1-on-1 Session in Progress',

    // Courses Section on Home
    'courses.home.badge': 'Curated Language Curriculums',
    'courses.home.title': 'Find the Perfect Conversation Course',
    'courses.home.subtitle': 'Structured from foundational beginner dialogue to high-level executive debate.',
    'courses.filter.all': 'All',
    'courses.filter.english': 'English',
    'courses.filter.spanish': 'Spanish',
    'courses.filter.french': 'French',
    'courses.filter.german': 'German',
    'courses.filter.chinese': 'Mandarin',
    'courses.filter.arabic': 'Arabic',
    'courses.viewAll': 'View All 24+ Courses',

    // Tutors Section on Home
    'tutors.home.badge': 'World-Class Native Speakers',
    'tutors.home.title': 'Meet Your Certified Language Tutors',
    'tutors.home.subtitle': 'Every tutor is thoroughly vetted with certified teaching credentials and native fluency.',
    'tutors.bookTrial': 'Book Demo Session',
    'tutors.availableNow': 'Available Now',
    'tutors.offline': 'Offline',

    // Interactive Quiz / Level Test Teaser
    'quiz.badge': 'Quick 30-Second Fluency Test',
    'quiz.title': 'What is your current speaking challenge?',
    'quiz.opt1': 'I understand well when reading, but freeze when speaking.',
    'quiz.opt2': 'I want to eliminate my accent and sound like a native.',
    'quiz.opt3': 'I need conversational fluency for international career advancement.',
    'quiz.opt4': 'I am starting from scratch and want fast, practical basics.',
    'quiz.result': 'Great news! Our 1-on-1 native conversation method directly targets this challenge.',
    'quiz.cta': 'Get Personalized Lesson Plan',

    // CTA Banner
    'cta.title': 'Ready to Speak With Fluency & Confidence?',
    'cta.subtitle': 'Join thousands of learners achieving true conversational fluency with Teachy.',
    'cta.button': 'Claim Free 15-Min Demo Session',
    'cta.noCreditCard': 'No credit card required • Instant tutor match',

    // Footer
    'footer.brandDesc': 'Teachy connects ambitious language learners with certified native speakers for real-time 1-on-1 immersive conversation practice. Expertly designed to transform your verbal fluency.',
    'footer.instantDemo': 'Instant Demo Call',
    'footer.tutors247': 'Global 24/7 Live Tutors',
    'footer.coursesHeading': 'Language Courses',
    'footer.platformHeading': 'Platform',
    'footer.startSpeakingHeading': 'Start Speaking',
    'footer.freeClassText': 'Get your first 15-minute live conversation demo session for free with any native tutor.',
    'footer.claimFree': 'Claim Free Demo',
    'footer.rights': 'All rights reserved.',
    'footer.madeBy': 'Made by Mohammed El Baraka',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.demoFull': 'Full version on GitHub',

    // About Page
    'about.badge': 'Our Vision & Mission',
    'about.title': 'About',
    'about.subtitle': 'Teachy facilitates language learning by connecting ambitious learners with certified native speakers for personalized, interactive verbal immersion.',
    'about.cardTitle': 'Born to Solve the Real Spoken Language Barrier',
    'about.projectInfo': "Acte d'Entreprendre Project • Mohammed El Baraka • UM6P / EMINES School of Industrial Management",
    'about.p1': 'Traditional language learning often traps students in repetitive grammar drills and passive vocabulary lists. When it comes time to speak in real life — during interviews, travel, or international collaboration — learners freeze up due to lack of spontaneous practice.',
    'about.p2': 'Teachy bridges this gap by making 1-on-1 native conversation practice as intuitive and accessible as a single tap. Our expert curriculum ensures every minute spent in class directly compounds your verbal confidence and natural accent.',
    'about.founderTitle': 'Creator & Engineering Leadership',
    'about.founderDesc': 'Designed and developed by Mohammed El Baraka as an innovative platform for verbal mastery and high-impact educational technology.',
    'about.pillar1.title': 'Learner-Centric',
    'about.pillar1.desc': 'Tailored conversation topics adapted to your unique professional & personal interests.',
    'about.pillar2.title': 'Native Immersion',
    'about.pillar2.desc': 'Live speaking with verified native speakers who provide constructive, friendly feedback.',
    'about.pillar3.title': 'Measurable Fluency',
    'about.pillar3.desc': 'Detailed pronunciation scores, vocabulary notes, and CEFR roadmap tracking.',
    'about.joinBtn': 'Join Teachy Today',

    // Courses Page
    'coursesPage.badge': 'Interactive Curriculum',
    'coursesPage.title': 'Explore All Language Courses',
    'coursesPage.subtitle': 'From foundational pronunciation to advanced business fluency, choose your path and practice live with certified native tutors.',
    'coursesPage.searchPlaceholder': 'Search courses, topics, keywords...',
    'coursesPage.proficiencyLevel': 'Proficiency Level:',

    // Blog Page
    'blogPage.badge': 'Teachy Learning Insights',
    'blogPage.title': 'Language Tips & Stories',
    'blogPage.subtitle': 'Actionable advice, conversational science, and learning strategies curated by our native tutors.',
    'blogPage.practiceBtn': 'Practice with a tutor',

    // Classroom Page
    'classroom.title': 'Live Classroom Demo',
    'classroom.back': 'Back to Courses',
    'classroom.startCall': 'Start Live Call Demo',
    'classroom.endCall': 'End Session',
    'classroom.micOn': 'Mute Mic',
    'classroom.micOff': 'Unmute Mic',
    'classroom.camOn': 'Stop Camera',
    'classroom.camOff': 'Start Camera',
    'classroom.chat': 'Chat',
    'classroom.notes': 'Session Notes',
    'classroom.vocab': 'Vocabulary',
    'classroom.typeMessage': 'Type a message in the lesson...',
    'classroom.send': 'Send',
    'classroom.subtitles': 'Real-Time Subtitles & Pronunciation Feedback',

    // Auth
    'auth.welcomeBack': 'Welcome back to Teachy',
    'auth.signInDesc': 'Sign in to access your live courses and tutor roadmap.',
    'auth.createAccount': 'Create your account',
    'auth.signUpDesc': 'Start speaking fluently with 1-on-1 live native conversation.',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.targetLanguage': 'Target Language',
    'auth.nativeLanguage': 'Native Language',
    'auth.currentLevel': 'Current Proficiency Level',
    'auth.submitSignIn': 'Sign In to Teachy',
    'auth.submitSignUp': 'Create Account & Start Speaking',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
  },

  fr: {
    // Top Demo Bar
    'demo.banner': 'Aperçu Démo Teachy — La version complète et le code source sont disponibles sur GitHub',
    'demo.viewGithub': 'Voir sur GitHub',
    'demo.badge': 'Version Démo',

    // Nav
    'nav.home': 'Accueil',
    'nav.courses': 'Cours',
    'nav.liveSession': 'Session Direct',
    'nav.myPath': 'Mon parcours',
    'nav.history': 'Historique',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.signIn': 'Connexion',
    'nav.getStarted': 'Essai Gratuit',
    'nav.myAccount': 'Mon compte',
    'nav.logout': 'Déconnexion',
    'nav.streak': 'Jours consécutifs',
    'nav.hoursPracticed': 'Heures de pratique',
    'nav.lessonsDone': 'Leçons terminées',

    // Hero Section
    'hero.badge': 'Immersion 1-à-1 avec Locuteurs Natifs',
    'hero.title.join': 'Rejoignez Nos',
    'hero.title.online': 'Cours de Langues',
    'hero.title.courses': 'En Ligne',
    'hero.subtitle': 'Nos cours de langues sont conçus de manière experte pour transformer vos compétences en communication orale grâce à une pratique conversationnelle en direct avec des tuteurs natifs certifiés.',
    'hero.cta.register': "S'inscrire Maintenant",
    'hero.cta.watchDemo': 'Voir la Démo en Direct',
    'hero.demoPhoneText': 'Contactez-nous pour une démo instantanée :',
    'hero.liveTutorsReady': 'Tuteurs en Ligne Prêts',
    'hero.instantPractice': 'Pratique 1-à-1 Instantanée',

    // Stats
    'stats.learners': '10 000+ Apprenants Actifs',
    'stats.learners.sub': 'Communauté Mondiale',
    'stats.tutors': '500+ Tuteurs Certifiés',
    'stats.tutors.sub': 'Experts Natifs',
    'stats.hours': '50 000+ Heures Parlées',
    'stats.hours.sub': "D'immersion en Direct",
    'stats.satisfaction': '98% de Réussite',
    'stats.satisfaction.sub': 'Niveau CECRL Atteint',

    // Section 2: Method / Slides
    'method.badge': 'Notre Avantage Pédagogique',
    'method.title': "Pourquoi l'Immersion Conversationnelle Fonctionne le Mieux",
    'method.subtitle': 'Oubliez les exercices de grammaire passifs. Bénéficiez d’une accélération d’apprentissage grâce à la parole quotidienne.',
    'method.card1.title': 'Dialogue Spontané',
    'method.card1.desc': 'Entraînez votre cerveau à penser directement dans la langue cible sans traduction mentale.',
    'method.card2.title': "Correction d'Accent en Direct",
    'method.card2.desc': 'Recevez des ajustements phonétiques immédiats et bienveillants de locuteurs natifs à chaque phrase.',
    'method.card3.title': 'Sujets Personnalisés',
    'method.card3.desc': 'Échangez sur des sujets qui vous passionnent : tech, affaires, voyages, sciences et culture.',

    // Interactive Demo / Classroom Preview
    'demo.section.badge': 'Classe Virtuelle Interactive',
    'demo.section.title': 'Découvrez une Leçon 1-à-1 en Direct',
    'demo.section.subtitle': 'Une salle de classe interactive avec vidéo haute définition, transcription IA en temps réel, prise de notes de vocabulaire et analyse instantanée de prononciation.',
    'demo.btn.start': 'Lancer la Démo Classe',
    'demo.btn.inCall': 'Classe Active',
    'demo.call.status': 'Session 1-à-1 en Direct en Cours',

    // Courses Section on Home
    'courses.home.badge': 'Programmes de Langues',
    'courses.home.title': 'Trouvez le Cours Idéal pour Vous',
    'courses.home.subtitle': 'Du niveau débutant aux conversations d’affaires et débats avancés.',
    'courses.filter.all': 'Tous',
    'courses.filter.english': 'Anglais',
    'courses.filter.spanish': 'Espagnol',
    'courses.filter.french': 'Français',
    'courses.filter.german': 'Allemand',
    'courses.filter.chinese': 'Mandarin',
    'courses.filter.arabic': 'Arabe',
    'courses.viewAll': 'Voir Tous les 24+ Cours',

    // Tutors Section on Home
    'tutors.home.badge': 'Locuteurs Natifs Certifiés',
    'tutors.home.title': 'Rencontrez Vos Tuteurs de Langue',
    'tutors.home.subtitle': 'Chaque tuteur est certifié et sélectionné rigoureusement pour sa maîtrise pédagogique.',
    'tutors.bookTrial': 'Réserver une Séance',
    'tutors.availableNow': 'En Ligne',
    'tutors.offline': 'Hors Ligne',

    // Interactive Quiz / Level Test Teaser
    'quiz.badge': 'Test de Niveau en 30 Secondes',
    'quiz.title': 'Quel est votre principal défi à l’oral ?',
    'quiz.opt1': 'Je comprends bien à l’écrit, mais je bloque quand je dois parler.',
    'quiz.opt2': 'Je souhaite perfectionner mon accent et parler naturellement.',
    'quiz.opt3': 'J’ai besoin d’aisance pour booster ma carrière internationale.',
    'quiz.opt4': 'Je débute complètement et veux acquérir les bases rapidement.',
    'quiz.result': 'Excellente nouvelle ! Notre méthode conversationnelle 1-à-1 cible exactement ce besoin.',
    'quiz.cta': 'Obtenir mon Programme Personnalisé',

    // CTA Banner
    'cta.title': 'Prêt à Parler avec Aisance et Confiance ?',
    'cta.subtitle': 'Rejoignez des milliers d’apprenants qui atteignent une véritable fluidité avec Teachy.',
    'cta.button': 'Profiter de 15 Min Gratuites',
    'cta.noCreditCard': 'Aucune carte bancaire requise • Correspondance instantanée',

    // Footer
    'footer.brandDesc': 'Teachy connecte les apprenants ambitieux avec des locuteurs natifs certifiés pour des sessions immersives de conversation 1-à-1 en direct.',
    'footer.instantDemo': 'Démo Immédiate',
    'footer.tutors247': 'Tuteurs Mondiaux 24/7',
    'footer.coursesHeading': 'Cours de Langues',
    'footer.platformHeading': 'Plateforme',
    'footer.startSpeakingHeading': 'Commencer à Parler',
    'footer.freeClassText': 'Bénéficiez de votre première session démo de 15 minutes gratuite avec un tuteur natif.',
    'footer.claimFree': 'Réclamer la Démo Gratuite',
    'footer.rights': 'Tous droits réservés.',
    'footer.madeBy': 'Fait par Mohammed El Baraka',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': "Conditions d'Utilisation",
    'footer.cookies': 'Politique des Cookies',
    'footer.demoFull': 'Version complète sur GitHub',

    // About Page
    'about.badge': 'Notre Vision & Mission',
    'about.title': 'À Propos de',
    'about.subtitle': 'Teachy facilite l’apprentissage des langues en reliant les apprenants à des locuteurs natifs certifiés pour une immersion orale interactive.',
    'about.cardTitle': 'Conçu pour Briser la Barrière de l’Expression Orale',
    'about.projectInfo': "Projet Acte d'Entreprendre • Mohammed El Baraka • École de Management Industriel UM6P / EMINES",
    'about.p1': 'L’apprentissage traditionnel des langues enferme souvent les étudiants dans la théorie et les listes de vocabulaire passives. Au moment de s’exprimer, les apprenants hésitent par manque de pratique spontanée.',
    'about.p2': 'Teachy résout ce problème en rendant la conversation 1-à-1 avec des natifs aussi simple qu’un clic. Chaque minute passée renforce directement votre confiance et votre fluidité.',
    'about.founderTitle': 'Créateur & Direction Technique',
    'about.founderDesc': 'Conçu et développé par Mohammed El Baraka comme une plateforme innovante pour la maîtrise linguistique et la technologie éducative.',
    'about.pillar1.title': 'Centré sur l’Apprenant',
    'about.pillar1.desc': 'Sujets adaptés sur-mesure à vos objectifs personnels et professionnels.',
    'about.pillar2.title': 'Immersion Native',
    'about.pillar2.desc': 'Échanges en direct avec des tuteurs bienveillants et qualifiés.',
    'about.pillar3.title': 'Progrès Mesurables',
    'about.pillar3.desc': 'Suivi des scores de prononciation, vocabulaire et progression CECRL.',
    'about.joinBtn': 'Rejoindre Teachy Aujourd’hui',

    // Courses Page
    'coursesPage.badge': 'Curriculum Interactif',
    'coursesPage.title': 'Explorer Tous les Cours de Langues',
    'coursesPage.subtitle': 'De la prononciation fondamentale à la négociation professionnelle, choisissez votre parcours.',
    'coursesPage.searchPlaceholder': 'Rechercher un cours, un sujet...',
    'coursesPage.proficiencyLevel': 'Niveau de Compétence :',

    // Blog Page
    'blogPage.badge': 'Conseils & Recherches Teachy',
    'blogPage.title': 'Astuces Linguistiques & Articles',
    'blogPage.subtitle': 'Conseils pratiques, sciences de la conversation et méthodes élaborées par nos tuteurs.',
    'blogPage.practiceBtn': 'Pratiquer avec un tuteur',

    // Classroom Page
    'classroom.title': 'Démo Classe Virtuelle',
    'classroom.back': 'Retour aux Cours',
    'classroom.startCall': 'Démarrer l’Appel Démo',
    'classroom.endCall': 'Terminer la Session',
    'classroom.micOn': 'Couper Micro',
    'classroom.micOff': 'Activer Micro',
    'classroom.camOn': 'Arrêter Caméra',
    'classroom.camOff': 'Activer Caméra',
    'classroom.chat': 'Chat',
    'classroom.notes': 'Notes de Session',
    'classroom.vocab': 'Vocabulaire',
    'classroom.typeMessage': 'Écrivez un message...',
    'classroom.send': 'Envoyer',
    'classroom.subtitles': 'Sous-titres & Correction Phonétique en Direct',

    // Auth
    'auth.welcomeBack': 'Bienvenue sur Teachy',
    'auth.signInDesc': 'Connectez-vous pour retrouver vos cours et vos tuteurs.',
    'auth.createAccount': 'Créer votre compte',
    'auth.signUpDesc': 'Commencez à parler avec fluidité grâce à nos cours immersifs.',
    'auth.fullName': 'Nom Complet',
    'auth.email': 'Adresse E-mail',
    'auth.password': 'Mot de Passe',
    'auth.targetLanguage': 'Langue Cible',
    'auth.nativeLanguage': 'Langue Maternelle',
    'auth.currentLevel': 'Niveau Actuel',
    'auth.submitSignIn': 'Se Connecter',
    'auth.submitSignUp': 'Créer un Compte & Commencer',
    'auth.noAccount': 'Pas encore de compte ?',
    'auth.haveAccount': 'Vous avez déjà un compte ?',
  },

  ar: {
    // Top Demo Bar
    'demo.banner': 'معاينة تجريبية لمنصة Teachy — النسخة الكاملة والكود المصدري متوفران على GitHub',
    'demo.viewGithub': 'عرض على GitHub',
    'demo.badge': 'نسخة تجريبية',

    // Nav
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.liveSession': 'الجلسة المباشرة',
    'nav.myPath': 'مساري التعليمي',
    'nav.history': 'السجل',
    'nav.blog': 'المدونة',
    'nav.about': 'حول المنصة',
    'nav.signIn': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ مجاناً',
    'nav.myAccount': 'حسابي',
    'nav.logout': 'تسجيل الخروج',
    'nav.streak': 'أيام متتالية',
    'nav.hoursPracticed': 'ساعات التدريب',
    'nav.lessonsDone': 'الدروس المكتملة',

    // Hero Section
    'hero.badge': 'تدريب محادثة فردي 1-على-1 مع متحدثين أصليين',
    'hero.title.join': 'انضم إلى',
    'hero.title.online': 'دورات اللغات',
    'hero.title.courses': 'عبر الإنترنت',
    'hero.subtitle': 'صُممت دوراتنا بعناية لتطوير مهارات التواصل الشفهي لديك من خلال محادثات تفاعلية حية مع مدرسين أصليين معتمدين.',
    'hero.cta.register': 'سجل الآن',
    'hero.cta.watchDemo': 'شاهد العرض التجريبي',
    'hero.demoPhoneText': 'اتصل بنا للحصول على جلسة تجريبية فورية:',
    'hero.liveTutorsReady': 'مدرسون متاحون الآن',
    'hero.instantPractice': 'تدريب فردي فوري',

    // Stats
    'stats.learners': '+10,000 متعلم نشط',
    'stats.learners.sub': 'مجتمع عالمي',
    'stats.tutors': '+500 مدرس معتمد',
    'stats.tutors.sub': 'خبراء متحدثون أصليون',
    'stats.hours': '+50,000 ساعة تحدث',
    'stats.hours.sub': 'جلسات تدريب حية',
    'stats.satisfaction': '98% نسبة الطلاقة',
    'stats.satisfaction.sub': 'تحقيق المستوى المنشود',

    // Section 2: Method / Slides
    'method.badge': 'منهجيتنا التعليمية',
    'method.title': 'لماذا يعد الانغماس في المحادثة الطريقة الأسرع والأكثر فاعلية؟',
    'method.subtitle': 'تجاوز الحفظ التقليدي للقواعد واستمتع بطلاقة لسان سريعة عبر الممارسة اليومية المباشرة.',
    'method.card1.title': 'حوار تلقائي مباشر',
    'method.card1.desc': 'درب عقلك على التفكير باللغة المستهدفة دون تأخير الترجمة الذهنية.',
    'method.card2.title': 'تصحيح فوري للنطق واللكنة',
    'method.card2.desc': 'احصل على توجيهات صوتية فورية ودقيقة من متحدثين أصليين مع كل جملة.',
    'method.card3.title': 'مواضيع مخصصة لاهتماماتك',
    'method.card3.desc': 'ناقش ما يهمك: التكنولوجيا، ريادة الأعمال، السفر، الثقافة والعلوم.',

    // Interactive Demo / Classroom Preview
    'demo.section.badge': 'الفصل الافتراضي التفاعلي',
    'demo.section.title': 'جرب جلسة تدريب حية 1-على-1',
    'demo.section.subtitle': 'فصل تفاعلي متطور يضم مكالمات فيديو مباشرة، تفريغ صوتي فوري بالذكاء الاصطناعي، وملاحظات فورية لتحسين النطق.',
    'demo.btn.start': 'بدء الجلسة التجريبية',
    'demo.btn.inCall': 'الجلسة جارية الآن',
    'demo.call.status': 'جلسة فردية مباشرة قيد التشغيل',

    // Courses Section on Home
    'courses.home.badge': 'مناهج لغوية تفاعلية',
    'courses.home.title': 'اختر الدورة المناسبة لمستواك',
    'courses.home.subtitle': 'من المحادثات التأسيسية للمبتدئين وحتى مهارات الحوار المهني المتقدم.',
    'courses.filter.all': 'الكل',
    'courses.filter.english': 'الإنجليزية',
    'courses.filter.spanish': 'الإسبانية',
    'courses.filter.french': 'الفرنسية',
    'courses.filter.german': 'الألمانية',
    'courses.filter.chinese': 'الصينية',
    'courses.filter.arabic': 'العربية والدارجة',
    'courses.viewAll': 'استعرض كافة الدورات (+24)',

    // Tutors Section on Home
    'tutors.home.badge': 'مدرسون أصليون معتمدون',
    'tutors.home.title': 'تعرف على أفضل مدرسي اللغات',
    'tutors.home.subtitle': 'تم اختيار وتقييم جميع المدرسين لضمان أعلى مستويات الكفاءة والاحترافية.',
    'tutors.bookTrial': 'حجز جلسة تجريبية',
    'tutors.availableNow': 'متاح الآن',
    'tutors.offline': 'غير متصل',

    // Interactive Quiz / Level Test Teaser
    'quiz.badge': 'اختبار تحديد المستوى في 30 ثانية',
    'quiz.title': 'ما هو التحدي الأكبر بالنسبة لك عند التحدث؟',
    'quiz.opt1': 'أفهم القراءة والاستماع جيداً، لكني أتردد عند التحدث.',
    'quiz.opt2': 'أرغب في تحسين نبرتي والتحدث بلكنة طبيعية كالمتحدثين الأصليين.',
    'quiz.opt3': 'أحتاج إلى الطلاقة لتطوير مساري المهني والعمل الدولي.',
    'quiz.opt4': 'أبدأ من الصفر وأرغب في اكتساب الأساسيات بأسلوب عملي سريع.',
    'quiz.result': 'أخبار رائعة! منهجنا التفاعلي الفردي يعالج هذا التحدي بشكل مباشر وسريع.',
    'quiz.cta': 'احصل على خطتك التدريبية المخصصة',

    // CTA Banner
    'cta.title': 'هل أنت مستعد للتحدث بكل ثقة وطلاقة؟',
    'cta.subtitle': 'انضم إلى آلاف المتعلمين الذين يطورون لغتهم بثقة مع Teachy.',
    'cta.button': 'احصل على حصة تجريبية مجانية (15 دقيقة)',
    'cta.noCreditCard': 'لا يتطلب بطاقة ائتمان • اختيار فوري للمدرس',

    // Footer
    'footer.brandDesc': 'منصة Teachy تربط المتعلمين مع متحدثين أصليين معتمدين لتدريب محادثة فردي ومكثف ومباشر عبر الإنترنت.',
    'footer.instantDemo': 'جلسة تجريبية فورية',
    'footer.tutors247': 'مدرسون متاحون على مدار الساعة',
    'footer.coursesHeading': 'دورات اللغات',
    'footer.platformHeading': 'المنصة',
    'footer.startSpeakingHeading': 'ابدأ التحدث',
    'footer.freeClassText': 'احصل على حصتك التجريبية الأولى مجاناً لمدة 15 دقيقة مع أي مدرس معتمد.',
    'footer.claimFree': 'احجز الحصة المجانية',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.madeBy': 'صُنع بواسطة محمد البركة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.demoFull': 'النسخة الكاملة على GitHub',

    // About Page
    'about.badge': 'رؤيتنا ورسالتنا',
    'about.title': 'حول منصة',
    'about.subtitle': 'تهدف Teachy إلى كسر حاجز الحديث وتيسير تعلم اللغات عبر ربط المتعلمين بمتحدثين أصليين في بيئة تفاعلية حية.',
    'about.cardTitle': 'انطلقت لكسر حاجز التحدث باللغات الأجنبية',
    'about.projectInfo': "مشروع Acte d'Entreprendre • محمد البركة • جامعة محمد السادس متعددة التخصصات التقنية UM6P / EMINES",
    'about.p1': 'كثيراً ما تجعل الطرق التقليدية المتعلم أسيراً لحفظ القواعد دون ممارسة فعلية. عند الحاجة للتحدث في المقابلات أو العمل، يتردد المتعلم بسبب غياب التدريب التلقائي.',
    'about.p2': 'جاءت Teachy لتقدم الحل من خلال إتاحة المحادثة الفردية الحية بنقرة واحدة، لتضمن لك بناء ثقتك ونبرتك في كل دقيقة تدريب.',
    'about.founderTitle': 'المطور والقيادة الهندسية',
    'about.founderDesc': 'تم تصميم وتطوير المنصة بواسطة محمد البركة كحل تكنولوجي مبتكر في مجال تكنولوجيا التعليم والتمكن اللغوي.',
    'about.pillar1.title': 'متمحور حول المتعلم',
    'about.pillar1.desc': 'مواضيع مخصصة تلائم اهتماماتك الشخصية والمهنية.',
    'about.pillar2.title': 'انغماس حقيقي',
    'about.pillar2.desc': 'محادثات مباشرة مع متحدثين أصليين يقدمون نصائح دقيقة وودية.',
    'about.pillar3.title': 'نتائج قابلة للقياس',
    'about.pillar3.desc': 'تقييم فوري للنطق وملاحظات يومية وتتبع للمستوى اللغوي.',
    'about.joinBtn': 'انضم إلى Teachy الآن',

    // Courses Page
    'coursesPage.badge': 'المناهج التفاعلية',
    'coursesPage.title': 'استكشف كافة دورات اللغات',
    'coursesPage.subtitle': 'من المهارات الأساسية إلى الإتقان المهني المتقدم، اختر طريقك وتدرب مباشرة مع مدرسينا.',
    'coursesPage.searchPlaceholder': 'ابحث عن الدورات، المواضيع...',
    'coursesPage.proficiencyLevel': 'المستوى:',

    // Blog Page
    'blogPage.badge': 'مقالات وإرشادات تعليمية',
    'blogPage.title': 'نصائح وقصص لغوية',
    'blogPage.subtitle': 'إرشادات عملية وعلمية لتعزيز مهارات التحدث مقدمة من مدرسينا.',
    'blogPage.practiceBtn': 'تدرب مع مدرس الآن',

    // Classroom Page
    'classroom.title': 'الفصل الافتراضي التجريبي',
    'classroom.back': 'العودة للدورات',
    'classroom.startCall': 'بدء المكالمة التجريبية',
    'classroom.endCall': 'إنهاء الجلسة',
    'classroom.micOn': 'كتم الميكروفون',
    'classroom.micOff': 'تشغيل الميكروفون',
    'classroom.camOn': 'إيقاف الكاميرا',
    'classroom.camOff': 'تشغيل الكاميرا',
    'classroom.chat': 'المحادثة',
    'classroom.notes': 'ملاحظات الجلسة',
    'classroom.vocab': 'المفردات',
    'classroom.typeMessage': 'اكتب رسالة في الدرس...',
    'classroom.send': 'إرسال',
    'classroom.subtitles': 'تفريغ فوري وتصحيح صوتي مباشر',

    // Auth
    'auth.welcomeBack': 'مرحباً بك مجدداً في Teachy',
    'auth.signInDesc': 'سجل الدخول لمتابعة دوراتك وجلساتك التدريبية.',
    'auth.createAccount': 'إنشاء حساب جديد',
    'auth.signUpDesc': 'ابدأ التحدث بطلاقة من خلال جلسات محادثة مباشرة.',
    'auth.fullName': 'الاسم الكامل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.targetLanguage': 'اللغة المستهدفة',
    'auth.nativeLanguage': 'اللغة الأم',
    'auth.currentLevel': 'المستوى الحالي',
    'auth.submitSignIn': 'تسجيل الدخول',
    'auth.submitSignUp': 'إنشاء الحساب وبدء التعلم',
    'auth.noAccount': 'ليس لديك حساب بعد؟',
    'auth.haveAccount': 'لديك حساب بالفعل؟',
  },

  es: {
    // Top Demo Bar
    'demo.banner': 'Vista Previa Demo Teachy — La versión completa y el código fuente están en GitHub',
    'demo.viewGithub': 'Ver en GitHub',
    'demo.badge': 'Versión Demo',

    // Nav
    'nav.home': 'Inicio',
    'nav.courses': 'Cursos',
    'nav.liveSession': 'Sesión en Vivo',
    'nav.myPath': 'Mi Ruta',
    'nav.history': 'Historial',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.signIn': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar Gratis',
    'nav.myAccount': 'Mi Cuenta',
    'nav.logout': 'Cerrar Sesión',
    'nav.streak': 'Días en Racha',
    'nav.hoursPracticed': 'Horas Practicadas',
    'nav.lessonsDone': 'Lecciones Completadas',

    // Hero Section
    'hero.badge': 'Inmersión Conversacional 1 a 1 con Nativos',
    'hero.title.join': 'Únete a Nuestros',
    'hero.title.online': 'Cursos de Idiomas',
    'hero.title.courses': 'Online',
    'hero.subtitle': 'Nuestros cursos de idiomas están diseñados por expertos para transformar tus habilidades orales mediante práctica conversacional en vivo con tutores nativos certificados.',
    'hero.cta.register': 'Regístrate Ahora',
    'hero.cta.watchDemo': 'Ver Demostración',
    'hero.demoPhoneText': 'Contáctanos para una clase de demostración:',
    'hero.liveTutorsReady': 'Tutores Listos en Vivo',
    'hero.instantPractice': 'Práctica 1 a 1 Instantánea',

    // Stats
    'stats.learners': '+10,000 Estudiantes Activos',
    'stats.learners.sub': 'Comunidad Global',
    'stats.tutors': '+500 Tutores Certificados',
    'stats.tutors.sub': 'Expertos Nativos',
    'stats.hours': '+50,000 Horas Habladas',
    'stats.hours.sub': 'Inmersión en Vivo Realizada',
    'stats.satisfaction': '98% Tasa de Fluidez',
    'stats.satisfaction.sub': 'Nivel MCER Alcanzado',

    // Section 2: Method / Slides
    'method.badge': 'Nuestra Ventaja Pedagógica',
    'method.title': 'Por Qué la Inmersión Conversacional es la Más Rápida',
    'method.subtitle': 'Deja atrás la gramática pasiva. Experimenta un progreso acelerado mediante el habla diaria.',
    'method.card1.title': 'Diálogo Espontáneo',
    'method.card1.desc': 'Entrena tu mente para pensar directamente en el idioma objetivo sin traducir mentalmente.',
    'method.card2.title': 'Corrección de Acento al Instante',
    'method.card2.desc': 'Recibe retroalimentación fonética constructiva de hablantes nativos en cada frase.',
    'method.card3.title': 'Temas Personalizados',
    'method.card3.desc': 'Habla de temas que te apasionan: tecnología, negocios, viajes, ciencia y cultura.',

    // Interactive Demo / Classroom Preview
    'demo.section.badge': 'Aula Virtual Interactiva',
    'demo.section.title': 'Experimenta una Clase en Vivo 1 a 1',
    'demo.section.subtitle': 'Aula interactiva con video en vivo, transcripción por IA en tiempo real, notas de vocabulario y análisis fonético instantáneo.',
    'demo.btn.start': 'Iniciar Demo de Clase',
    'demo.btn.inCall': 'Clase en Curso',
    'demo.call.status': 'Sesión 1 a 1 en Vivo en Progreso',

    // Courses Section on Home
    'courses.home.badge': 'Planes de Idiomas',
    'courses.home.title': 'Encuentra el Curso Perfecto para Ti',
    'courses.home.subtitle': 'Desde diálogos básicos hasta conversaciones de negocios avanzadas.',
    'courses.filter.all': 'Todos',
    'courses.filter.english': 'Inglés',
    'courses.filter.spanish': 'Español',
    'courses.filter.french': 'Francés',
    'courses.filter.german': 'Alemán',
    'courses.filter.chinese': 'Chino',
    'courses.filter.arabic': 'Árabe',
    'courses.viewAll': 'Ver Todos los Cursos (+24)',

    // Tutors Section on Home
    'tutors.home.badge': 'Hablantes Nativos Certificados',
    'tutors.home.title': 'Conoce a tus Tutores de Idiomas',
    'tutors.home.subtitle': 'Todos los tutores cuentan con credenciales certificadas y fluidez nativa.',
    'tutors.bookTrial': 'Reservar Sesión Demo',
    'tutors.availableNow': 'Disponible Ahora',
    'tutors.offline': 'Desconectado',

    // Interactive Quiz / Level Test Teaser
    'quiz.badge': 'Test de Nivel en 30 Segundos',
    'quiz.title': '¿Cuál es tu principal desafío al hablar?',
    'quiz.opt1': 'Entiendo bien al leer, pero me bloqueo al intentar hablar.',
    'quiz.opt2': 'Quiero pulir mi acento y sonar natural como un nativo.',
    'quiz.opt3': 'Necesito fluidez para impulsar mi carrera internacional.',
    'quiz.opt4': 'Empiezo desde cero y quiero aprender las bases rápidamente.',
    'quiz.result': '¡Excelente! Nuestro método conversacional 1 a 1 ataca directamente este desafío.',
    'quiz.cta': 'Obtener Plan Personalizado',

    // CTA Banner
    'cta.title': '¿Listo para Hablar con Fluidez y Confianza?',
    'cta.subtitle': 'Únete a miles de alumnos que logran verdadera fluidez con Teachy.',
    'cta.button': 'Prueba Gratuita de 15 Minutos',
    'cta.noCreditCard': 'Sin tarjeta de crédito • Emparejamiento instantáneo',

    // Footer
    'footer.brandDesc': 'Teachy conecta a estudiantes ambiciosos con hablantes nativos certificados para prácticas conversacionales 1 a 1 en vivo.',
    'footer.instantDemo': 'Demo Inmediata',
    'footer.tutors247': 'Tutores Globales 24/7',
    'footer.coursesHeading': 'Cursos de Idiomas',
    'footer.platformHeading': 'Plataforma',
    'footer.startSpeakingHeading': 'Empieza a Hablar',
    'footer.freeClassText': 'Obtén tu primera sesión demo de 15 minutos gratis con cualquier tutor nativo.',
    'footer.claimFree': 'Reclamar Demo Gratis',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.madeBy': 'Hecho por Mohammed El Baraka',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.cookies': 'Política de Cookies',
    'footer.demoFull': 'Versión completa en GitHub',

    // About Page
    'about.badge': 'Nuestra Visión y Misión',
    'about.title': 'Acerca de',
    'about.subtitle': 'Teachy facilita el aprendizaje de idiomas conectando a los estudiantes con hablantes nativos certificados para una inmersión oral interactiva.',
    'about.cardTitle': 'Creado para Superar la Barrera de la Expresión Oral',
    'about.projectInfo': "Proyecto Acte d'Entreprendre • Mohammed El Baraka • Escuela de Gestión Industrial UM6P / EMINES",
    'about.p1': 'El aprendizaje tradicional suele encerrar a los estudiantes en ejercicios gramaticales y listas pasivas. Al momento de hablar, surge el bloqueo por falta de práctica espontánea.',
    'about.p2': 'Teachy resuelve esto haciendo que la conversación 1 a 1 con nativos esté al alcance de un solo clic, aumentando tu confianza en cada sesión.',
    'about.founderTitle': 'Creador y Dirección de Ingeniería',
    'about.founderDesc': 'Diseñado y desarrollado por Mohammed El Baraka como una plataforma innovadora para el dominio lingüístico y la tecnología educativa.',
    'about.pillar1.title': 'Centrado en el Alumno',
    'about.pillar1.desc': 'Temas adaptados a tus metas profesionales y personales.',
    'about.pillar2.title': 'Inmersión Nativa',
    'about.pillar2.desc': 'Conversaciones en vivo con tutores verificados y amigables.',
    'about.pillar3.title': 'Progreso Medible',
    'about.pillar3.desc': 'Puntajes de pronunciación, notas y seguimiento de nivel MCER.',
    'about.joinBtn': 'Únete a Teachy Hoy',

    // Courses Page
    'coursesPage.badge': 'Plan de Estudios Interactivo',
    'coursesPage.title': 'Explora Todos los Cursos de Idiomas',
    'coursesPage.subtitle': 'Desde pronunciación básica hasta fluidez en negocios avanzados.',
    'coursesPage.searchPlaceholder': 'Buscar cursos, temas...',
    'coursesPage.proficiencyLevel': 'Nivel de Habilidad:',

    // Blog Page
    'blogPage.badge': 'Artículos y Consejos Teachy',
    'blogPage.title': 'Consejos e Historias de Idiomas',
    'blogPage.subtitle': 'Consejos prácticos, ciencia de la conversación y estrategias de aprendizaje.',
    'blogPage.practiceBtn': 'Practicar con un tutor',

    // Classroom Page
    'classroom.title': 'Demo de Aula Virtual',
    'classroom.back': 'Volver a Cursos',
    'classroom.startCall': 'Iniciar Llamada Demo',
    'classroom.endCall': 'Terminar Sesión',
    'classroom.micOn': 'Silenciar Micrófono',
    'classroom.micOff': 'Activar Micrófono',
    'classroom.camOn': 'Detener Cámara',
    'classroom.camOff': 'Iniciar Cámara',
    'classroom.chat': 'Chat',
    'classroom.notes': 'Notas de Sesión',
    'classroom.vocab': 'Vocabulario',
    'classroom.typeMessage': 'Escribe un mensaje...',
    'classroom.send': 'Enviar',
    'classroom.subtitles': 'Subtítulos y Corrección Fonética en Tiempo Real',

    // Auth
    'auth.welcomeBack': 'Bienvenido de nuevo a Teachy',
    'auth.signInDesc': 'Inicia sesión para acceder a tus cursos y tutores.',
    'auth.createAccount': 'Crea tu cuenta',
    'auth.signUpDesc': 'Comienza a hablar con fluidez mediante conversación en vivo.',
    'auth.fullName': 'Nombre Completo',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.targetLanguage': 'Idioma Objetivo',
    'auth.nativeLanguage': 'Idioma Nativo',
    'auth.currentLevel': 'Nivel Actual',
    'auth.submitSignIn': 'Iniciar Sesión en Teachy',
    'auth.submitSignUp': 'Crear Cuenta y Comenzar',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.haveAccount': '¿Ya tienes una cuenta?',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('teachy_language') as Language;
    if (saved && ['en', 'fr', 'ar', 'es'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('teachy_language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
  }, [language, dir, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const currentDict = translations[language] || translations.en;
    if (currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    if (translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
