/* Razcom – patch : drapeaux réels (section Destinations), traduction FR / EN / ES, suppression de « Leur parcours »
   À placer juste avant </body>, APRÈS les deux <script> existants :  <script src="razcom-patch.js"></script> */
(function () {
  const g = id => document.getElementById(id);

  /* 1) Suppression de la section « Leur parcours » (stories) + visionneuse */
  const sto = g('sto'); if (sto) sto.closest('section').remove();
  const sv = g('sv'); if (sv) sv.remove();
  window.cs = () => {};
  /* Renumérotation : FAQ 09, Contact 10 */
  document.querySelectorAll('.kicker').forEach(k => k.childNodes.forEach(n => {
    if (n.nodeType == 3) n.nodeValue = n.nodeValue.replace('10 · FAQ', '09 · FAQ').replace('11 · Contact', '10 · Contact');
  }));

  /* Icône avion manquante dans le sprite */
  const sp = document.querySelector('svg[style*="display:none"]');
  if (sp && !g('plane')) sp.insertAdjacentHTML('beforeend', '<symbol id="plane" viewBox="0 0 24 24"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></symbol>');

  /* 2) Dictionnaire  [FR, EN, ES]  ( ~ = saut de ligne dans les titres ) */
  const T = [
    [`Razcom – Votre envol vers l'Europe`, `Razcom – Your flight to Europe`, `Razcom – Tu vuelo hacia Europa`],
    [`Razcom accompagne vos projets d'études, d'expatriation, d'affaires et de tourisme vers l'Europe. Expertise consulaire, suivi humain, départs confirmés.`, `Razcom supports your study, relocation, business and travel projects to Europe. Consular expertise, personal follow-up, confirmed departures.`, `Razcom acompaña tus proyectos de estudios, expatriación, negocios y turismo hacia Europa. Experiencia consular, seguimiento humano, salidas confirmadas.`],
    // Navigation
    [`Accueil`, `Home`, `Inicio`], [`Services`, `Services`, `Servicios`], [`Méthode`, `Method`, `Método`], [`Destinations`, `Destinations`, `Destinos`], [`Partenaires`, `Partners`, `Socios`], [`Contact`, `Contact`, `Contacto`],
    [`Réponse sous 24 h`, `Reply within 24 h`, `Respuesta en 24 h`], [`Démarrer mon projet`, `Start my project`, `Iniciar mi proyecto`],
    [`Razcom · Votre envol vers l'Europe`, `Razcom · Your flight to Europe`, `Razcom · Tu vuelo hacia Europa`],
    // Hero
    [`Votre envol~vers l'Europe`, `Your flight~to Europe`, `Tu vuelo~hacia Europa`],
    [`Études, expatriation, affaires ou tourisme — Razcom transforme votre projet en réalité, avec une expertise consulaire et un accompagnement humain à chaque étape.`, `Studies, relocation, business or tourism — Razcom turns your project into reality, with consular expertise and a human touch at every step.`, `Estudios, expatriación, negocios o turismo — Razcom convierte tu proyecto en realidad, con experiencia consular y un acompañamiento humano en cada etapa.`],
    [`Découvrir nos services`, `Discover our services`, `Descubre nuestros servicios`],
    [`+100 clients accompagnés`, `+100 clients supported`, `+100 clientes acompañados`], [`4.9/5, 98 % de satisfaction`, `4.9/5, 98% satisfaction`, `4,9/5, 98 % de satisfacción`],
    [`Visa obtenu`, `Visa granted`, `Visa obtenido`], [`Dès le 1ᵉʳ dépôt`, `From the 1st application`, `Desde la 1.ª solicitud`], [`Départ confirmé`, `Departure confirmed`, `Salida confirmada`],
    // Manifeste
    [`Le manifeste`, `The manifesto`, `El manifiesto`], [`On ne vend pas des billets.`, `We don't sell tickets.`, `No vendemos billetes.`], [`On prépare des départs.`, `We prepare departures.`, `Preparamos salidas.`],
    [`Razcom n'est pas une agence de plus. C'est un carnet de vol : chaque projet y est consigné, chaque étape validée, chaque départ préparé avec la rigueur d'un équipage et la chaleur d'un proche.`, `Razcom isn't just another agency. It's a flight log: every project is recorded, every step validated, every departure prepared with the rigor of a crew and the warmth of a loved one.`, `Razcom no es una agencia más. Es un cuaderno de vuelo: cada proyecto queda registrado, cada etapa validada, cada salida preparada con el rigor de una tripulación y la calidez de un allegado.`],
    [`Découvrir la méthode`, `Discover the method`, `Descubre el método`], [`Prendre rendez-vous`, `Book an appointment`, `Pedir una cita`],
    [`Départ`, `Departure`, `Salida`], [`confirmé`, `confirmed`, `confirmada`], [`Depuis`, `From`, `Desde`],
    [`Et partout où vos projets nous appellent.`, `And wherever your projects take us.`, `Y allí donde tus proyectos nos llamen.`], [`Engagement`, `Commitment`, `Compromiso`],
    [`Un conseiller dédié, un dossier rigoureux, zéro fausse promesse.`, `A dedicated advisor, a rigorous file, zero false promises.`, `Un asesor dedicado, un expediente riguroso, cero falsas promesas.`],
    // Services
    [`01 · Nos services`, `01 · Our services`, `01 · Nuestros servicios`], [`Des solutions~sur mesure`, `Tailor-made~solutions`, `Soluciones~a medida`],
    [`De l'orientation à l'installation, nous couvrons chaque étape de votre mobilité vers l'Europe avec rigueur et humanité.`, `From guidance to settling in, we cover every step of your move to Europe with rigor and humanity.`, `Desde la orientación hasta la instalación, cubrimos cada etapa de tu movilidad hacia Europa con rigor y humanidad.`],
    [`Expertise`, `Expertise`, `Experiencia`], [`Europe & International`, `Europe & International`, `Europa e Internacional`],
    [`Études en Europe`, `Study in Europe`, `Estudios en Europa`], [`Orientation, admission et visa étudiant, de A à Z.`, `Guidance, admission and student visa, from A to Z.`, `Orientación, admisión y visado de estudiante, de la A a la Z.`],
    [`Voyage d'affaires`, `Business travel`, `Viaje de negocios`], [`Formalités et stratégie pour entreprendre en Europe.`, `Formalities and strategy to do business in Europe.`, `Trámites y estrategia para emprender en Europa.`],
    [`Expatriation`, `Relocation`, `Expatriación`], [`Analyse et assistance pour une installation durable.`, `Analysis and assistance for a lasting move.`, `Análisis y asistencia para una instalación duradera.`],
    [`Tourisme`, `Tourism`, `Turismo`], [`Conditions d'entrée et séjour réussi partout en Europe.`, `Entry requirements and a successful stay anywhere in Europe.`, `Condiciones de entrada y una estancia exitosa en toda Europa.`],
    [`Stages pro`, `Internships`, `Prácticas profesionales`], [`Démarches et orientation adaptées à votre profil.`, `Procedures and guidance tailored to your profile.`, `Trámites y orientación adaptados a tu perfil.`],
    [`Billetterie`, `Ticketing`, `Billetes`], [`Vols au meilleur tarif, voyage sans stress.`, `Flights at the best price, stress-free travel.`, `Vuelos al mejor precio, viaje sin estrés.`],
    [`Bourses`, `Scholarships`, `Becas`], [`Visa business`, `Business visa`, `Visado de negocios`], [`Long séjour`, `Long stay`, `Larga estancia`], [`Installation`, `Settling in`, `Instalación`], [`Assurance`, `Insurance`, `Seguro`], [`Conventions`, `Agreements`, `Convenios`], [`Entreprises`, `Companies`, `Empresas`], [`Comparateur`, `Comparison tool`, `Comparador`], [`Flexibilité`, `Flexibility`, `Flexibilidad`], [`Sur mesure`, `Tailor-made`, `A medida`],
    // Parcours
    [`03 · Votre parcours en Europe`, `03 · Your journey in Europe`, `03 · Tu recorrido por Europa`],
    [`De votre première idée à votre nouvelle vie.`, `From your first idea to your new life.`, `De tu primera idea a tu nueva vida.`],
    [`Six grandes étapes, balisées et suivies par un conseiller dédié : cliquez sur une image pour découvrir le contenu de chaque escale.`, `Six major steps, mapped out and followed by a dedicated advisor: click an image to discover what each stop involves.`, `Seis grandes etapas, señalizadas y seguidas por un asesor dedicado: haz clic en una imagen para descubrir el contenido de cada escala.`],
    [`Étape`, `Step`, `Etapa`], [`Objectifs`, `Goals`, `Objetivos`], [`Calendrier`, `Timeline`, `Calendario`], [`Budget`, `Budget`, `Presupuesto`],
    [`Définir votre projet`, `Define your project`, `Define tu proyecto`], [`Études, tourisme, affaires ou expatriation.`, `Studies, tourism, business or relocation.`, `Estudios, turismo, negocios o expatriación.`],
    [`Nous cernons vos objectifs, votre calendrier et vos priorités pour poser des bases claires dès le premier échange.`, `We clarify your goals, timeline and priorities to set clear foundations from the very first conversation.`, `Aclaramos tus objetivos, tu calendario y tus prioridades para sentar bases claras desde el primer intercambio.`],
    [`Choisir votre destination`, `Choose your destination`, `Elige tu destino`], [`Découvrir les possibilités selon votre profil.`, `Explore the options that fit your profile.`, `Descubre las posibilidades según tu perfil.`],
    [`Pays, programmes et délais : nous comparons avec vous les options réalistes et les plus adaptées à votre situation.`, `Countries, programs and timelines: we compare realistic options with you, the ones best suited to your situation.`, `Países, programas y plazos: comparamos contigo las opciones realistas y las más adaptadas a tu situación.`],
    [`Pays`, `Countries`, `Países`], [`Programmes`, `Programs`, `Programas`], [`Délais`, `Timelines`, `Plazos`],
    [`Préparer votre dossier`, `Prepare your file`, `Prepara tu expediente`], [`Rassembler et vérifier les documents.`, `Gather and verify the documents.`, `Reunir y verificar los documentos.`],
    [`Chaque pièce est listée, rassemblée puis contrôlée avec rigueur avant tout dépôt auprès des autorités.`, `Every document is listed, gathered and carefully checked before any submission to the authorities.`, `Cada documento se enumera, se reúne y se controla con rigor antes de cualquier presentación ante las autoridades.`],
    [`Passeport`, `Passport`, `Pasaporte`], [`Justificatifs`, `Supporting documents`, `Justificantes`], [`Vérification`, `Verification`, `Verificación`],
    [`Effectuer les démarches`, `Complete the procedures`, `Realiza los trámites`], [`Accompagnement dans les formalités.`, `Guidance through the formalities.`, `Acompañamiento en las formalidades.`],
    [`Rendez-vous, dépôt et suivi : nous vous guidons dans les formalités jusqu'à la décision.`, `Appointments, submission and follow-up: we guide you through the formalities until the decision.`, `Citas, presentación y seguimiento: te guiamos en los trámites hasta la decisión.`],
    [`Consulat`, `Consulate`, `Consulado`], [`Dépôt`, `Submission`, `Presentación`], [`Suivi`, `Follow-up`, `Seguimiento`],
    [`Préparer votre départ`, `Prepare your departure`, `Prepara tu salida`], [`Billet, logement et organisation.`, `Tickets, housing and organization.`, `Billete, alojamiento y organización.`],
    [`Réservation du billet, recherche de logement et préparatifs pratiques pour partir l'esprit tranquille.`, `Ticket booking, housing search and practical preparations so you can leave with peace of mind.`, `Reserva del billete, búsqueda de alojamiento y preparativos prácticos para partir con tranquilidad.`],
    [`Billet`, `Ticket`, `Billete`], [`Arrivée`, `Arrival`, `Llegada`],
    [`Commencer votre nouvelle vie`, `Start your new life`, `Empieza tu nueva vida`], [`Arrivée et installation.`, `Arrival and settling in.`, `Llegada e instalación.`],
    [`Nous restons à vos côtés à l'arrivée pour faciliter votre installation et vos premières démarches sur place.`, `We stay by your side on arrival to make your settling in and first local procedures easier.`, `Seguimos a tu lado a la llegada para facilitar tu instalación y tus primeros trámites en destino.`],
    // Chiffres
    [`02 · Résultats`, `02 · Results`, `02 · Resultados`], [`Des chiffres~qui décollent`, `Numbers~that take off`, `Cifras~que despegan`],
    [`Depuis Paris et Madrid, nous transformons chaque année les projets de centaines d'Africains en départs réussis.`, `From Paris and Madrid, every year we turn the projects of hundreds of Africans into successful departures.`, `Desde París y Madrid, cada año convertimos los proyectos de cientos de africanos en salidas exitosas.`],
    [`Parler à un conseiller`, `Talk to an advisor`, `Hablar con un asesor`], [`Clients accompagnés`, `Clients supported`, `Clientes acompañados`], [`Taux de satisfaction`, `Satisfaction rate`, `Índice de satisfacción`], [`Destinations couvertes`, `Destinations covered`, `Destinos cubiertos`], [`Services spécialisés`, `Specialized services`, `Servicios especializados`],
    // Méthode
    [`04 · Notre méthode`, `04 · Our method`, `04 · Nuestro método`], [`Quatre escales~vers le départ`, `Four stopovers~to departure`, `Cuatro escalas~hacia la salida`],
    [`De la première prise de contact à votre envol, chaque étape est balisée, expliquée et suivie par un conseiller dédié.`, `From first contact to takeoff, every step is mapped out, explained and followed by a dedicated advisor.`, `Desde el primer contacto hasta tu despegue, cada etapa está señalizada, explicada y supervisada por un asesor dedicado.`],
    [`Conseillère Razcom`, `Razcom advisor`, `Asesora Razcom`], [`Clients satisfaits`, `Satisfied clients`, `Clientes satisfechos`], [`Visa dès le 1ᵉʳ dépôt`, `Visa from the 1st application`, `Visado desde la 1.ª solicitud`],
    [`Semaine 1`, `Week 1`, `Semana 1`], [`Prise de contact`, `First contact`, `Primer contacto`], [`Consultation gratuite pour présenter votre projet à nos conseillers et cadrer vos objectifs.`, `Free consultation to present your project to our advisors and define your goals.`, `Consulta gratuita para presentar tu proyecto a nuestros asesores y definir tus objetivos.`],
    [`Semaine 1–2`, `Week 1–2`, `Semana 1–2`], [`Analyse du profil`, `Profile analysis`, `Análisis del perfil`], [`Évaluation de votre situation et identification des meilleures options selon votre projet.`, `Assessment of your situation and identification of the best options for your project.`, `Evaluación de tu situación e identificación de las mejores opciones según tu proyecto.`],
    [`Semaine 2–5`, `Week 2–5`, `Semana 2–5`], [`Montage du dossier`, `File preparation`, `Preparación del expediente`], [`Constitution rigoureuse et vérification de chaque document requis pour le consulat.`, `Rigorous compilation and verification of every document required by the consulate.`, `Elaboración rigurosa y verificación de cada documento exigido por el consulado.`],
    [`Jusqu'au départ`, `Until departure`, `Hasta la salida`], [`Suivi et réussite`, `Follow-up and success`, `Seguimiento y éxito`], [`Accompagnement jusqu'à l'obtention du visa, la réservation du billet et votre départ.`, `Support until your visa is granted, your ticket is booked and you depart.`, `Acompañamiento hasta la obtención del visado, la reserva del billete y tu salida.`],
    // Pourquoi
    [`05 · Pourquoi Razcom`, `05 · Why Razcom`, `05 · Por qué Razcom`], [`Votre succès est~notre engagement`, `Your success is~our commitment`, `Tu éxito es~nuestro compromiso`],
    [`Avec Razcom, vous ne partez pas seul : vous partez préparé, entouré d'experts dédiés à votre réussite.`, `With Razcom, you don't leave alone: you leave prepared, surrounded by experts dedicated to your success.`, `Con Razcom no viajas solo: viajas preparado, rodeado de expertos dedicados a tu éxito.`],
    [`Accompagnement personnalisé`, `Personalized support`, `Acompañamiento personalizado`], [`Analyse approfondie de votre profil et suivi individuel à chaque étape.`, `In-depth analysis of your profile and individual follow-up at every step.`, `Análisis a fondo de tu perfil y seguimiento individual en cada etapa.`],
    [`Expertise consulaire reconnue`, `Recognized consular expertise`, `Experiencia consular reconocida`], [`Des conseillers qui maîtrisent les procédures de chaque consulat européen.`, `Advisors who master the procedures of every European consulate.`, `Asesores que dominan los procedimientos de cada consulado europeo.`],
    [`Transparence totale`, `Total transparency`, `Transparencia total`], [`Pas de frais cachés, pas de fausses promesses. Un accompagnement honnête.`, `No hidden fees, no false promises. Honest support.`, `Sin costes ocultos, sin falsas promesas. Un acompañamiento honesto.`],
    [`Résultats prouvés`, `Proven results`, `Resultados comprobados`], [`+100 clients accompagnés avec 98 % de satisfaction à travers l'Europe.`, `+100 clients supported with 98% satisfaction across Europe.`, `+100 clientes acompañados con un 98 % de satisfacción en toda Europa.`],
    // Destinations
    [`06 · Explorez`, `06 · Explore`, `06 · Explora`], [`Quelle destination~pour vous ?`, `Which destination~is right for you?`, `¿Qué destino~es el tuyo?`],
    [`Parcourez nos destinations phares ou sélectionnez-en deux pour ouvrir leur carnet de vol et comparer les délais côte à côte.`, `Browse our flagship destinations or select two to open their flight log and compare timelines side by side.`, `Explora nuestros destinos estrella o selecciona dos para abrir su cuaderno de vuelo y comparar los plazos lado a lado.`],
    [`Sélectionnez une destination pour ouvrir le carnet`, `Select a destination to open the log`, `Selecciona un destino para abrir el cuaderno`], [`Choisissez une 2ᵉ destination pour comparer`, `Choose a 2nd destination to compare`, `Elige un 2.º destino para comparar`],
    [`Destination`, `Destination`, `Destino`], [`Délai de visa`, `Visa processing time`, `Plazo del visado`], [`Langue`, `Language`, `Idioma`], [`Coût de la vie`, `Cost of living`, `Coste de vida`], [`Dossier ouvert`, `File open`, `Expediente abierto`],
    [`France`, `France`, `Francia`], [`Espagne`, `Spain`, `España`], [`Allemagne`, `Germany`, `Alemania`], [`Belgique`, `Belgium`, `Bélgica`], [`Suisse`, `Switzerland`, `Suiza`], [`Pays-Bas`, `Netherlands`, `Países Bajos`], [`Italie`, `Italy`, `Italia`], [`Autriche`, `Austria`, `Austria`], [`Suède`, `Sweden`, `Suecia`], [`Irlande`, `Ireland`, `Irlanda`], [`Grèce`, `Greece`, `Grecia`], [`Pologne`, `Poland`, `Polonia`], [`Danemark`, `Denmark`, `Dinamarca`], [`Finlande`, `Finland`, `Finlandia`], [`Norvège`, `Norway`, `Noruega`], [`Tchéquie`, `Czechia`, `Chequia`], [`Croatie`, `Croatia`, `Croacia`],
    [`Français`, `French`, `Francés`], [`Espagnol`, `Spanish`, `Español`], [`Allemand`, `German`, `Alemán`], [`Portugais`, `Portuguese`, `Portugués`], [`Néerlandais`, `Dutch`, `Neerlandés`], [`Italien`, `Italian`, `Italiano`], [`FR / NL`, `FR / NL`, `FR / NL`],
    // Partenaires
    [`07 · Nos partenaires`, `07 · Our partners`, `07 · Nuestros socios`], [`Écoles et centres~partenaires`, `Partner schools~and centers`, `Escuelas y centros~asociados`],
    [`Nous travaillons main dans la main avec des établissements reconnus en Espagne. Téléchargez leur brochure pour découvrir programmes, coûts et conditions d'admission.`, `We work hand in hand with recognized institutions in Spain. Download their brochure to discover programs, costs and admission requirements.`, `Trabajamos codo con codo con centros reconocidos en España. Descarga su folleto para conocer programas, costes y condiciones de admisión.`],
    [`Programme phare`, `Flagship program`, `Programa estrella`], [`Votre avenir`, `Your future`, `Tu futuro`], [`commence ici`, `starts here`, `empieza aquí`], [`Construisez votre avenir en Espagne`, `Build your future in Spain`, `Construye tu futuro en España`],
    [`Stages en entreprises et multinationales`, `Internships in companies and multinationals`, `Prácticas en empresas y multinacionales`], [`Formations diplômantes et qualifiantes`, `Degree and qualification programs`, `Formaciones con título y cualificantes`], [`Cours de langue intensifs`, `Intensive language courses`, `Cursos de idiomas intensivos`], [`Présentiel ou en ligne`, `In person or online`, `Presencial u online`],
    [`Pour plus d'infos`, `For more information`, `Para más información`],
    [`Tous les centres`, `All centers`, `Todos los centros`], [`Business`, `Business`, `Negocios`], [`Formation diplômante`, `Degree program`, `Formación con título`], [`Formation professionnelle`, `Vocational training`, `Formación profesional`],
    [`Langue intensive`, `Intensive language`, `Idioma intensivo`], [`Business et langue`, `Business and language`, `Negocios e idioma`], [`Formation pro (FP)`, `Vocational training (FP)`, `Formación profesional (FP)`], [`Formation pro`, `Vocational training`, `Formación profesional`],
    [`Espagnol pour étrangers, Murcia`, `Spanish for foreigners, Murcia`, `Español para extranjeros, Murcia`], [`Gestion, marketing et espagnol, Alicante`, `Management, marketing and Spanish, Alicante`, `Gestión, marketing y español, Alicante`], [`Cycles de formation professionnelle, Murcia`, `Vocational training cycles, Murcia`, `Ciclos de formación profesional, Murcia`], [`FP officielle, présentiel et en ligne`, `Official FP, in person and online`, `FP oficial, presencial y online`], [`Formation qualifiante`, `Qualifying program`, `Formación cualificante`],
    [`Site à confirmer`, `Website to be confirmed`, `Web por confirmar`], [`Brochure`, `Brochure`, `Folleto`],
    [`Brochure générale disponible : FOLLETO_GUAY_SPANISH_SCHOOL_ES_EN.pdf (Español / English)`, `General brochure available: FOLLETO_GUAY_SPANISH_SCHOOL_ES_EN.pdf (Español / English)`, `Folleto general disponible: FOLLETO_GUAY_SPANISH_SCHOOL_ES_EN.pdf (Español / English)`],
    // Témoignages
    [`08 · Ils l'ont vécu`, `08 · They lived it`, `08 · Lo vivieron`], [`Ce que disent~nos clients`, `What our~clients say`, `Lo que dicen~nuestros clientes`],
    [`J'ai intégré une université en France en 3 mois. Un accompagnement impeccable du début à la fin.`, `I got into a university in France in 3 months. Flawless support from start to finish.`, `Ingresé en una universidad en Francia en 3 meses. Un acompañamiento impecable de principio a fin.`],
    [`Mon dossier visa business monté avec précision. Visa obtenu du premier coup, sans stress.`, `My business visa file was put together with precision. Visa granted on the first try, no stress.`, `Mi expediente de visado de negocios se preparó con precisión. Visado obtenido a la primera, sin estrés.`],
    [`Razcom m'a accompagné dans tout mon projet. Je suis aujourd'hui installé en Belgique.`, `Razcom supported me throughout my entire project. I'm now settled in Belgium.`, `Razcom me acompañó en todo mi proyecto. Hoy estoy instalado en Bélgica.`],
    [`Brochure reçue en 5 minutes, dossier monté en une semaine. Rapide et sérieux.`, `Brochure received in 5 minutes, file prepared in a week. Fast and professional.`, `Folleto recibido en 5 minutos, expediente preparado en una semana. Rápido y serio.`],
    [`Master informatique, Paris`, `Master's in Computer Science, Paris`, `Máster en Informática, París`], [`Entrepreneuse, Barcelone`, `Entrepreneur, Barcelona`, `Emprendedora, Barcelona`], [`Ingénieur, Bruxelles`, `Engineer, Brussels`, `Ingeniero, Bruselas`], [`Étudiante, Lisbonne`, `Student, Lisbon`, `Estudiante, Lisboa`],
    // CTA
    [`Prêt au départ ?`, `Ready for departure?`, `¿Listo para la salida?`], [`Embarquement~immédiat.`, `Boarding~now.`, `Embarque~inmediato.`], [`DÉPART`, `DEPARTURE`, `SALIDA`],
    [`Réservez votre consultation dès aujourd'hui et transformez votre projet en réalité. Sans engagement.`, `Book your consultation today and turn your project into reality. No commitment.`, `Reserva tu consulta hoy y convierte tu proyecto en realidad. Sin compromiso.`],
    [`Réserver une séance`, `Book a session`, `Reservar una sesión`], [`Voir les services`, `See the services`, `Ver los servicios`], [`Porte · A24`, `Gate · A24`, `Puerta · A24`], [`Classe · Ambition`, `Class · Ambition`, `Clase · Ambición`], [`Statut · Confirmé`, `Status · Confirmed`, `Estado · Confirmado`],
    // Quiz
    [`Pas sûr par où commencer ?`, `Not sure where to start?`, `¿No sabes por dónde empezar?`], [`Trouvez votre voie en 30 secondes`, `Find your path in 30 seconds`, `Encuentra tu camino en 30 segundos`],
    [`Quel est votre projet ?`, `What is your project?`, `¿Cuál es tu proyecto?`], [`Dans quel délai souhaitez-vous partir ?`, `How soon do you want to leave?`, `¿En qué plazo quieres partir?`],
    [`Moins de 2 mois`, `Less than 2 months`, `Menos de 2 meses`], [`De 2 à 6 mois`, `2 to 6 months`, `De 2 a 6 meses`], [`Plus de 6 mois`, `More than 6 months`, `Más de 6 meses`],
    [`Réserver mon appel gratuit`, `Book my free call`, `Reservar mi llamada gratuita`], [`Recommencer`, `Start over`, `Empezar de nuevo`],
    // Budget
    [`Estimation`, `Estimate`, `Estimación`], [`Votre budget mensuel estimé`, `Your estimated monthly budget`, `Tu presupuesto mensual estimado`],
    [`Ajustez les curseurs selon votre style de vie pour estimer votre coût mensuel sur place.`, `Adjust the sliders to your lifestyle to estimate your monthly cost on site.`, `Ajusta los controles según tu estilo de vida para estimar tu coste mensual en destino.`],
    [`Logement`, `Housing`, `Alojamiento`], [`Transport`, `Transport`, `Transporte`], [`Nourriture`, `Food`, `Alimentación`], [`Total estimé / mois`, `Estimated total / month`, `Total estimado / mes`], [`Coût de vie moyen à Paris, France`, `Average cost of living in Paris, France`, `Coste de vida medio en París, Francia`],
    // FAQ
    [`09 · FAQ`, `09 · FAQ`, `09 · FAQ`], [`Questions~fréquentes`, `Frequently asked~questions`, `Preguntas~frecuentes`], [`Tout ce que vous voulez savoir avant de partir.`, `Everything you want to know before you go.`, `Todo lo que quieres saber antes de partir.`], [`Une autre question ?`, `Another question?`, `¿Otra pregunta?`],
    [`Combien de temps faut-il pour obtenir un visa ?`, `How long does it take to get a visa?`, `¿Cuánto tiempo se tarda en obtener un visado?`], [`Cela dépend du pays et du type de visa : de 2 à 10 semaines en moyenne. Nous vous donnons une estimation précise après l'analyse de votre profil.`, `It depends on the country and visa type: 2 to 10 weeks on average. We give you a precise estimate after analyzing your profile.`, `Depende del país y del tipo de visado: de 2 a 10 semanas de media. Te damos una estimación precisa tras analizar tu perfil.`],
    [`La première consultation est-elle payante ?`, `Is the first consultation paid?`, `¿La primera consulta es de pago?`], [`Non, la consultation de prise de contact est gratuite et sans engagement.`, `No, the initial consultation is free and without obligation.`, `No, la consulta inicial es gratuita y sin compromiso.`],
    [`Garantissez-vous l'obtention du visa ?`, `Do you guarantee the visa?`, `¿Garantizan la obtención del visado?`], [`Aucun conseiller ne peut garantir une décision consulaire. Nous montons un dossier rigoureux pour maximiser vos chances.`, `No advisor can guarantee a consular decision. We build a rigorous file to maximize your chances.`, `Ningún asesor puede garantizar una decisión consular. Preparamos un expediente riguroso para maximizar tus posibilidades.`],
    [`Quels documents dois-je préparer ?`, `Which documents do I need to prepare?`, `¿Qué documentos debo preparar?`], [`Passeport, justificatifs d'études ou professionnels et ressources financières. Nous vous remettons la liste exacte selon votre destination.`, `Passport, proof of studies or employment, and financial resources. We give you the exact list for your destination.`, `Pasaporte, justificantes de estudios o profesionales y recursos económicos. Te entregamos la lista exacta según tu destino.`],
    [`Puis-je être accompagné depuis Cotonou ?`, `Can I be supported from Cotonou?`, `¿Puedo ser acompañado desde Cotonú?`], [`Oui, nous accompagnons nos clients à distance et en présentiel, depuis Cotonou, Paris et Madrid.`, `Yes, we support our clients remotely and in person, from Cotonou, Paris and Madrid.`, `Sí, acompañamos a nuestros clientes a distancia y de forma presencial, desde Cotonú, París y Madrid.`],
    // Contact
    [`10 · Contact`, `10 · Contact`, `10 · Contacto`], [`Parlons de~votre projet`, `Let's talk about~your project`, `Hablemos de~tu proyecto`],
    [`Nos conseillers répondent à toutes vos questions et vous orientent vers la meilleure solution.`, `Our advisors answer all your questions and guide you to the best solution.`, `Nuestros asesores responden a todas tus preguntas y te orientan hacia la mejor solución.`],
    [`Téléphone et WhatsApp`, `Phone and WhatsApp`, `Teléfono y WhatsApp`], [`Horaires`, `Opening hours`, `Horario`], [`Lun–Ven 9h–18h, Sam 9h–13h`, `Mon–Fri 9am–6pm, Sat 9am–1pm`, `Lun–Vie 9:00–18:00, Sáb 9:00–13:00`],
    [`Envoyez-nous un message`, `Send us a message`, `Envíanos un mensaje`], [`Prénom et nom`, `First and last name`, `Nombre y apellidos`], [`Téléphone`, `Phone`, `Teléfono`], [`Type de projet`, `Project type`, `Tipo de proyecto`],
    [`Décrivez votre projet, vos questions, votre situation`, `Describe your project, your questions, your situation`, `Describe tu proyecto, tus preguntas, tu situación`], [`Vérification anti-robot`, `Anti-robot check`, `Verificación anti-robot`],
    [`Envoyer mon message`, `Send my message`, `Enviar mi mensaje`], [`Message envoyé`, `Message sent`, `Mensaje enviado`],
    [`Réponse sous 24 h ouvrées. Vos données restent confidentielles.`, `Reply within 24 business hours. Your data remains confidential.`, `Respuesta en 24 h laborables. Tus datos son confidenciales.`], [`Merci ! Nous vous répondons sous 24 h ouvrées.`, `Thank you! We will reply within 24 business hours.`, `¡Gracias! Te respondemos en 24 h laborables.`], [`Vérification incorrecte, réessayez.`, `Incorrect check, please try again.`, `Verificación incorrecta, inténtalo de nuevo.`],
    // Marquee & footer
    [`Prêt pour votre envol ?`, `Ready for takeoff?`, `¿Listo para despegar?`], [`Études`, `Studies`, `Estudios`], [`Visa`, `Visa`, `Visado`],
    [`Votre partenaire de confiance pour tous vos projets de mobilité vers l'Europe depuis l'Afrique.`, `Your trusted partner for all your mobility projects from Africa to Europe.`, `Tu socio de confianza para todos tus proyectos de movilidad desde África hacia Europa.`],
    [`Agence`, `Agency`, `Agencia`], [`Pourquoi nous`, `Why us`, `Por qué nosotros`], [`Notre méthode`, `Our method`, `Nuestro método`], [`Écoles partenaires`, `Partner schools`, `Escuelas asociadas`], [`Newsletter`, `Newsletter`, `Boletín`],
    [`Nos conseils sur l'immigration et les études en Europe.`, `Our tips on immigration and studying in Europe.`, `Nuestros consejos sobre inmigración y estudios en Europa.`], [`Votre email`, `Your email`, `Tu correo`], [`Merci, vous êtes inscrit`, `Thanks, you're subscribed`, `Gracias, ya estás suscrito`],
    [`© 2026 Razcom. Tous droits réservés.`, `© 2026 Razcom. All rights reserved.`, `© 2026 Razcom. Todos los derechos reservados.`], [`Mentions légales`, `Legal notice`, `Aviso legal`], [`Confidentialité`, `Privacy`, `Privacidad`],
    [`Besoin d'aide pour votre projet ? Je réponds en quelques minutes.`, `Need help with your project? I reply within minutes.`, `¿Necesitas ayuda con tu proyecto? Respondo en pocos minutos.`], [`Écrire sur WhatsApp`, `Write on WhatsApp`, `Escribir por WhatsApp`],
    [`Menu`, `Menu`, `Menú`], [`Fermer`, `Close`, `Cerrar`], [`Précédent`, `Previous`, `Anterior`], [`Suivant`, `Next`, `Siguiente`], [`Nouveau calcul`, `New calculation`, `Nuevo cálculo`], [`Discuter`, `Chat`, `Chatear`], [`S'inscrire`, `Subscribe`, `Suscribirse`]
  ];
  const M = {}; T.forEach(r => M[r[0]] = r);
  const IX = { fr: 0, en: 1, es: 2 };
  const norm = s => s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const qt = (l, s) => l == 'en' ? '“' + s + '”' : '« ' + s + ' »';

  function lookup(s, l) {
    const r = M[s]; if (r) return r[IX[l]];
    let m;
    if ((m = s.match(/^« (.*) »$/)) && M[m[1]]) return qt(l, M[m[1]][IX[l]]);
    if ((m = s.match(/^([\d–]+) sem\.$/))) return l == 'en' ? m[1] + ' wks' : m[1] + ' sem.';
    if ((m = s.match(/^Question (\d) sur 2$/))) return l == 'en' ? 'Question ' + m[1] + ' of 2' : 'Pregunta ' + m[1] + ' de 2';
    if ((m = s.match(/^Un projet « (.*) » vous correspond$/))) return l == 'en' ? 'A “' + m[1] + '” project is right for you' : 'Un proyecto «' + m[1] + '» es lo que necesitas';
    if ((m = s.match(/^Avec un horizon « (.*) », nous démarrons.*$/))) return l == 'en'
      ? 'With a “' + m[1] + '” horizon, we start with a full analysis of your profile to build your file from scratch. Book a free call with an advisor to get started.'
      : 'Con un horizonte de «' + m[1] + '», empezamos con un análisis completo de tu perfil para construir tu expediente desde cero. Reserva una llamada gratuita con un asesor para empezar.';
    return null;
  }

  let lang = 'fr', busy = false;
  try { lang = localStorage.getItem('rz-lang') || 'fr'; } catch (e) {}
  if (!IX.hasOwnProperty(lang)) lang = 'fr';

  function doText(n) {
    if (n.__fr === undefined) {
      if (lang == 'fr') return;
      const s = norm(n.nodeValue); if (!s) return;
      if (lookup(s, lang) == null) return;
      n.__fr = n.nodeValue; n.__k = s;
    }
    const t = lang == 'fr' ? null : lookup(n.__k, lang);
    n.nodeValue = t == null ? n.__fr : n.__fr.match(/^\s*/)[0] + t + n.__fr.match(/\s*$/)[0];
  }
  function frOf(el) {
    if (el.__fr) return el.__fr;
    const c = el.cloneNode(true); c.querySelectorAll('br').forEach(b => b.replaceWith('~'));
    return (el.__fr = norm(c.textContent));
  }
  function doSplit(el) {
    if (lang == 'fr' && !el.__fr) return;
    const fr = frOf(el), r = M[fr], t = lang == 'fr' || !r ? fr : r[IX[lang]];
    let k = 0;
    el.innerHTML = t.split('~').map(p => p.split(/(\s+)/).map(w => w.trim() ? `<span class="w"><span style="--i:${k++}">${w}</span></span>` : ' ').join('')).join('<br>');
  }
  function doAttr(el) {
    ['placeholder', 'aria-label'].forEach(a => {
      if (!el.hasAttribute || !el.hasAttribute(a)) return;
      const k = '__a_' + a;
      if (el[k] === undefined) {
        if (lang == 'fr') return;
        const s = norm(el.getAttribute(a)); if (!s || lookup(s, lang) == null) return;
        el[k] = el.getAttribute(a);
      }
      const t = lang == 'fr' ? null : lookup(norm(el[k]), lang);
      el.setAttribute(a, t == null ? el[k] : t);
    });
  }
  function apply(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => { const p = n.parentElement; return (!p || /^(SCRIPT|STYLE)$/.test(p.tagName) || p.closest('[data-split]')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    const a = []; while (w.nextNode()) a.push(w.currentNode); a.forEach(doText);
    const q = root.matches('[data-split]') ? [root] : []; root.querySelectorAll('[data-split]').forEach(e => q.push(e)); q.forEach(doSplit);
    doAttr(root); root.querySelectorAll('[placeholder],[aria-label]').forEach(doAttr);
  }

  /* 3) Vrais drapeaux (flagcdn.com) dans la section Destinations */
  const FL = { FR: ['fr', 'France'], ES: ['es', 'España'], DE: ['de', 'Deutschland'], PT: ['pt', 'Portugal'], BE: ['be', 'Belgique'], CH: ['ch', 'Suisse'], NL: ['nl', 'Nederland'], IT: ['it', 'Italia'] };
  function flags() {
    document.querySelectorAll('#dest .cc, #cmp .bp .rounded-full').forEach(s => {
      const f = FL[s.textContent.trim()]; if (!f || s.querySelector('img')) return;
      const sq = s.classList.contains('cc');
      s.innerHTML = `<img src="https://flagcdn.com/w80/${f[0]}.png" srcset="https://flagcdn.com/w160/${f[0]}.png 2x" alt="${f[1]}" loading="lazy" class="${sq ? 'w-full h-full rounded-full object-cover' : 'h-4 w-6 rounded-[3px] object-cover'}">`;
      if (!sq) s.style.opacity = 1;
    });
  }

  /* 4) Sélecteur de langue */
  function mk(cls) {
    const d = document.createElement('div');
    d.className = 'lsw flex items-center rounded-full border border-white/20 overflow-hidden shrink-0 ' + cls;
    d.innerHTML = ['fr', 'en', 'es'].map(l => `<button type="button" data-l="${l}" class="px-2.5 py-1.5 text-[11px] font-semibold tracking-wider transition" aria-label="${l.toUpperCase()}">${l.toUpperCase()}</button>`).join('');
    d.onclick = e => { const b = e.target.closest('button'); if (b) setLang(b.dataset.l); };
    return d;
  }
  function upd() {
    document.querySelectorAll('.lsw button').forEach(b => { const on = b.dataset.l == lang; b.classList.toggle('bg-lime', on); b.classList.toggle('text-black', on); b.classList.toggle('text-white/70', !on); });
  }
  const T0 = document.title, meta = document.querySelector('meta[name="description"]'), D0 = meta ? meta.content : '';
  function setLang(l) {
    lang = l; try { localStorage.setItem('rz-lang', l); } catch (e) {}
    busy = true;
    document.documentElement.lang = l;
    document.title = l == 'fr' ? T0 : (lookup(T0, l) || T0);
    if (meta) meta.content = l == 'fr' ? D0 : (lookup(D0, l) || D0);
    apply(document.body); flags(); upd();
    busy = false; obs.takeRecords();
  }

  const obs = new MutationObserver(ms => {
    if (busy) return; busy = true;
    ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType == 3) { const p = n.parentElement; if (p && !/^(SCRIPT|STYLE)$/.test(p.tagName) && !p.closest('[data-split]')) doText(n); }
      else if (n.nodeType == 1) apply(n);
    }));
    flags(); busy = false; obs.takeRecords();
  });

  const right = document.querySelector('#hbar > div:last-child'); if (right) right.prepend(mk(''));
  const mm = g('mm'); if (mm) mm.insertBefore(mk('self-start text-[13px]'), mm.querySelector('a'));
  obs.observe(document.body, { childList: true, subtree: true });
  setLang(lang);
})();
