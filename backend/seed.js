const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://db:27017/quizdb';

// --- Définition des Schémas ---
const Category = mongoose.model('Category', new mongoose.Schema({
    nom: { type: String, unique: true }
}));

const Question = mongoose.model('Question', new mongoose.Schema({
    text: String,
    imageUrl: String,
    options: [String],
    correctAnswer: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    stats: {
        askedNb: { type: Number, default: 0 },
        correctNb: { type: Number, default: 0 },
        correctRate: { type: Number, default: 0 }
    }
}));

// --- Définition des Données fixtures ---
const seedData = [
  {
    text: "Quel est ce monument célèbre ?",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500",
    options: ["Tour Eiffel", "Empire State Building", "Burj Khalifa", "Tour de Pise"],
    correctAnswer: "Tour Eiffel",
    categoryNames: ["Monument","Geographie","Histoire"]
  },
  {
    text: "Quel langage est représenté par ce logo ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
    categoryNames: ["Informatique"]
  },
  {
    text: "Quel pokémon est représenté sur cette image ?",
    imageUrl: "https://www.pokepedia.fr/images/f/f9/Wailmer-RS.png",
    options: ["Oyacata", "Wailmer", "Laggron", "Wailord"],
    correctAnswer: "Wailmer",
    categoryNames: ["Pokemon","Jeux-videos"]
  },
  {
    text: "Quel pays est représenté sur cette carte ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Europe_location_SMO_alt.png",
    options: ["Italie", "Vatican", "Andorre", "Saint-Marin"],
    correctAnswer: "Saint-Marin",
    categoryNames: ["Geographie","Pays"]
  },
  {
    text: "Quel fruit est représenté sur cette image ?",
    imageUrl: "https://masalchi.fr/images/epice-bio/138/1613470378/big/combava-bio-epice-bio.jpg",
    options: ["Citron vert", "Combava", "Kaki", "Cédratier"],
    correctAnswer: "Combava",
    categoryNames: ["Fruits","Nature"]
  },
  {
    text: "Quel est la capitale du Danemark ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/960px-Flag_of_Denmark.svg.png",
    options: ["Helsinki", "Oslo", "Copenhague", "Stockholm"],
    correctAnswer: "Copenhague",
    categoryNames: ["Geographie","Capitale"]
  },
  {
    text: "Quel est cette personne ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
    options: ["Beethoven", "Mozart", "Vivaldi", "Chopin"],
    correctAnswer: "Beethoven",
    categoryNames: ["Histoire","Musique"]
  },
  {
    text: "Quel est cet instrument ?",
    imageUrl: "https://conservatoire.toulouse.fr/wp-content/uploads/sites/10/2023/11/Violoncelle.jpg",
    options: ["Violon", "Violoncelle", "Alto", "Contrebasse"],
    correctAnswer: "Violoncelle",
    categoryNames: ["Instrument","Musique","Art"]
  },
  {
    text: "Qui a peint cette oeuvre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    options: ["Delacroix", "Friedrich", "Runge", "Cole"],
    correctAnswer: "Friedrich",
    categoryNames: ["Art","Peinture"]
  },
  {
    text: "Combien d'heure dorment les koalas par jour ?",
    imageUrl: "https://cdn.pixabay.com/photo/2011/09/28/23/19/koala-9960_960_720.jpg",
    options: ["Entre 14h et 16h", "Entre 16h et 18h", "Entre 18h et 20h", "Entre 20h et 22h"],
    correctAnswer: "Entre 18h et 20h",
    categoryNames: ["Animaux","Nature"]
  },
  {
    text: "Quelle est l'année de sortie de Minecraft ?",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjM4MzE0MGItY2U4OS00MTU5LTgwNWUtYzMxZjMzMTQ5Yjg1XkEyXkFqcGc@._V1_.jpg",
    options: ["2004", "2005", "2007", "2009"],
    correctAnswer: "2009",
    categoryNames: ["Informatique","Jeux-videos"]
  },
  {
    text: "Quel est le pays représenté par ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
    options: ["Kosovo", "Kiribati", "Kirghizistan", "Koweït"],
    correctAnswer: "Kosovo",
    categoryNames: ["Geographie","Drapeaux"]
  },
  {
    text: "Quel est ce monument situé à Athènes ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/800px-The_Parthenon_in_Athens.jpg",
    options: ["Le Colisée", "Le Parthénon", "L'Alhambra", "L'Acropole de Rhodes"],
    correctAnswer: "Le Parthénon",
    categoryNames: ["Geographie", "Monument", "Histoire"]
  },
  {
    text: "Quel est le nom de ce tableau célèbre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/757px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    options: ["Le Cri", "La Nuit étoilée", "Impression, soleil levant", "Guernica"],
    correctAnswer: "La Nuit étoilée",
    categoryNames: ["Art", "Peinture"]
  },
  {
    text: "Quel pays possède ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/512px-Flag_of_Switzerland.svg.png",
    options: ["Autriche", "Malte", "Suisse", "Danemark"],
    correctAnswer: "Suisse",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "De quel film d'animation provient ce personnage ?",
    imageUrl: "https://ghiblishop.fr/wp-content/uploads/2021/10/219_webedia-articles_8c6_a76_0d9872338f047ec9f5072cdf36_1513702-l-univers-d-harry-potter-a-son-magicobus-orig-1-1.jpeg",
    options: ["Le Voyage de Chihiro", "Mon Voisin Totoro", "Ponyo sur la falaise", "Princesse Mononoké"],
    correctAnswer: "Mon Voisin Totoro",
    categoryNames: ["Cinema", "Animation"]
  },
  {
    text: "Quelle est la capitale du Japon ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg",
    options: ["Osaka", "Kyoto", "Séoul", "Tokyo"],
    correctAnswer: "Tokyo",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quel est ce langage de programmation ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png",
    options: ["Ruby", "Python", "Swift", "PHP"],
    correctAnswer: "Python",
    categoryNames: ["Informatique"]
  },
  {
    text: "Quel est ce mammifère marin ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg",
    options: ["Requin", "Dauphin", "Orque", "Baleine bleue"],
    correctAnswer: "Orque",
    categoryNames: ["Animaux", "Nature"]
  },
  {
    text: "Qui a sculpté cette œuvre ?",
    imageUrl: "https://www.musee-rodin.fr//sites/default/files/2021-04/jm_5550.jpg",
    options: ["Michel-Ange", "Rodin", "Bernini", "Donatello"],
    correctAnswer: "Rodin",
    categoryNames: ["Art", "Histoire"]
  },
  {
    text: "Quelle est la monnaie utilisée dans ce pays ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
    options: ["Livre Sterling", "Euro", "Yen", "Dollar"],
    correctAnswer: "Dollar",
    categoryNames: ["Geographie", "Economie"]
  },
  {
    text: "Quel est cet instrument à cordes frappées ?",
    imageUrl: "https://drop.philharmoniedeparis.fr/CMFM/CMFM000000200/158208-_CMIM000023622_LD.jpg",
    options: ["Harpe", "Clavecin", "Piano", "Guitare"],
    correctAnswer: "Clavecin",
    categoryNames: ["Instrument", "Musique", "Art"]
  },
  {
    text: "Quel célèbre physicien est représenté ici ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/374px-Albert_Einstein_Head.jpg",
    options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Marie Curie"],
    correctAnswer: "Albert Einstein",
    categoryNames: ["Histoire", "Science"]
  },
  {
    text: "Quel pays est connu pour cette pyramide ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg",
    options: ["Mexique", "Égypte", "Pérou", "Soudan"],
    correctAnswer: "Égypte",
    categoryNames: ["Geographie", "Monument", "Histoire"]
  },
  {
    text: "Quel est ce composant informatique ?",
    imageUrl: "https://m.media-amazon.com/images/I/614y6FroB-L._AC_UF1000,1000_QL80_.jpg",
    options: ["Disque dur", "Mémoire vive", "Processeur", "Carte graphique"],
    correctAnswer: "Disque dur",
    categoryNames: ["Informatique"]
  },
  {
    text: "Quelle est la capitale de l'Australie ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Parliament_House_Canberra_Night.jpg/800px-Parliament_House_Canberra_Night.jpg",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale du Canada ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Ottawa_-_ON_-_Parliament_Hill.jpg/800px-Ottawa_-_ON_-_Parliament_Hill.jpg",
    options: ["Toronto", "Montréal", "Vancouver", "Ottawa"],
    correctAnswer: "Ottawa",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Corée du Sud ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Lotte_World_Tower_and_Seoul_skyline.jpg/800px-Lotte_World_Tower_and_Seoul_skyline.jpg",
    options: ["Busan", "Pyongyang", "Séoul", "Incheon"],
    correctAnswer: "Séoul",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale du Brésil ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Congresso_Nacional_do_Brasil_2014.jpg/800px-Congresso_Nacional_do_Brasil_2014.jpg",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: "Brasília",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale du Portugal ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lisbon_as_seen_from_the_Tagus_river.jpg/800px-Lisbon_as_seen_from_the_Tagus_river.jpg",
    options: ["Porto", "Lisbonne", "Faro", "Coimbra"],
    correctAnswer: "Lisbonne",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de l'Islande ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Reykjavik_Skyline.jpg/800px-Reykjavik_Skyline.jpg",
    options: ["Reykjavik", "Oslo", "Helsinki", "Bergen"],
    correctAnswer: "Reykjavik",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de l'Argentine ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Buenos_Aires_-_Obelisco.jpg/800px-Buenos_Aires_-_Obelisco.jpg",
    options: ["Santiago", "Montevideo", "Buenos Aires", "Lima"],
    correctAnswer: "Buenos Aires",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Grèce ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Athens_Acropolis.jpg/800px-Athens_Acropolis.jpg",
    options: ["Sparte", "Héraklion", "Athènes", "Thessalonique"],
    correctAnswer: "Athènes",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale du Vietnam ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Temple_of_Literature_Hanoi_01.jpg/800px-Temple_of_Literature_Hanoi_01.jpg",
    options: ["Ho Chi Minh Ville", "Hanoï", "Huế", "Da Nang"],
    correctAnswer: "Hanoï",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de l'Égypte ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Cairo_Tower_at_Night.jpg/800px-Cairo_Tower_at_Night.jpg",
    options: ["Alexandrie", "Louxor", "Le Caire", "Gizeh"],
    correctAnswer: "Le Caire",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Thaïlande ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Wat_Arun_Bangkok_Thailand.jpg/800px-Wat_Arun_Bangkok_Thailand.jpg",
    options: ["Phuket", "Chiang Mai", "Bangkok", "Pattaya"],
    correctAnswer: "Bangkok",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de l'Afrique du Sud ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Cape_Town_Waterfront.jpg/800px-Cape_Town_Waterfront.jpg",
    options: ["Johannesburg", "Le Cap", "Durban", "Pretoria"],
    correctAnswer: "Pretoria",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Pologne ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Warszawa_Centrum.jpg/800px-Warszawa_Centrum.jpg",
    options: ["Cracovie", "Gdańsk", "Varsovie", "Wrocław"],
    correctAnswer: "Varsovie",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Nouvelle-Zélande ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Wellington_Harbour_Night.jpg/800px-Wellington_Harbour_Night.jpg",
    options: ["Auckland", "Christchurch", "Wellington", "Queenstown"],
    correctAnswer: "Wellington",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quelle est la capitale de la Turquie ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ankara_at_night.jpg/800px-Ankara_at_night.jpg",
    options: ["Istanbul", "Antalya", "Ankara", "Izmir"],
    correctAnswer: "Ankara",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "À quel pays appartient ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/900px-Flag_of_South_Korea.svg.png",
    options: ["Japon", "Corée du Sud", "Thaïlande", "Chine"],
    correctAnswer: "Corée du Sud",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays est représenté par ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/960px-Flag_of_Australia_%28converted%29.svg.png?20250528082742",
    options: ["Royaume-Uni", "Nouvelle-Zélande", "Australie", "Fidji"],
    correctAnswer: "Australie",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Reconnaissez-vous le drapeau de ce pays d'Amérique du Sud ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/1000px-Flag_of_Uruguay.svg.png",
    options: ["Argentine", "Grèce", "Uruguay", "Salvador"],
    correctAnswer: "Uruguay",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays possède ce drapeau avec une feuille d'érable ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1000px-Flag_of_Canada_%28Pantone%29.svg.png",
    options: ["États-Unis", "Canada", "Liban", "Pérou"],
    correctAnswer: "Canada",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "À quel pays appartient ce drapeau bicolore ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/960px-Flag_of_Ukraine.svg.png?20230624202942",
    options: ["Suède", "Pologne", "Ukraine", "Kazakhstan"],
    correctAnswer: "Ukraine",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel est ce pays dont le drapeau contient un cèdre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/900px-Flag_of_Lebanon.svg.png",
    options: ["Liban", "Chypre", "Syrie", "Jordanie"],
    correctAnswer: "Liban",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays d'Afrique possède ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/900px-Flag_of_South_Africa.svg.png",
    options: ["Kenya", "Sénégal", "Nigeria", "Afrique du Sud"],
    correctAnswer: "Afrique du Sud",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Saurez-vous identifier ce drapeau européen ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1000px-Flag_of_Germany.svg.png",
    options: ["Belgique", "Allemagne", "Autriche", "Pays-Bas"],
    correctAnswer: "Allemagne",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "À quel pays appartient ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1000px-Flag_of_Bangladesh.svg.png",
    options: ["Japon", "Palau", "Bangladesh", "Laos"],
    correctAnswer: "Bangladesh",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays nordique possède ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/960px-Flag_of_Finland.svg.png?20230220191416",
    options: ["Suède", "Norvège", "Islande", "Finlande"],
    correctAnswer: "Finlande",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays d'Amérique Centrale utilise ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Cuba.svg/960px-Flag_of_Cuba.svg.png?20231030040603",
    options: ["Porto Rico", "Cuba", "République Dominicaine", "Chili"],
    correctAnswer: "Cuba",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Reconnaissez-vous le drapeau de ce pays asiatique ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/900px-Flag_of_Singapore.svg.png",
    options: ["Malaisie", "Indonésie", "Singapour", "Turquie"],
    correctAnswer: "Singapour",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "À quel pays appartient ce drapeau tricolore ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/900px-Flag_of_the_Netherlands.svg.png",
    options: ["Luxembourg", "France", "Pays-Bas", "Russie"],
    correctAnswer: "Pays-Bas",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays possède ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/900px-Flag_of_Tunisia.svg.png",
    options: ["Maroc", "Algérie", "Tunisie", "Libye"],
    correctAnswer: "Tunisie",
    categoryNames: ["Geographie", "Drapeaux"]
  },
  {
    text: "Quel pays possède ce drapeau unique ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/960px-Flag_of_Brazil.svg.png?20240809055211",
    options: ["Portugal", "Mexique", "Brésil", "Colombie"],
    correctAnswer: "Brésil",
    categoryNames: ["Geographie", "Drapeaux"]
  },
{
    text: "Quel est ce monument emblématique de l'Empire Khmer ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Angkor_Wat_Morning_View_2024.jpg/800px-Angkor_Wat_Morning_View_2024.jpg",
    options: ["Borobudur", "Angkor Wat", "Bagan", "Louxor"],
    correctAnswer: "Angkor Wat",
    categoryNames: ["Monument", "Histoire", "Geographie"]
  },
  {
    text: "Quel est le nom de ce fruit tropical à l'odeur très forte ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Durian.JPG/800px-Durian.JPG",
    options: ["Jackfruit", "Mangoustan", "Durian", "Ramboutan"],
    correctAnswer: "Durian",
    categoryNames: ["Fruits", "Nature"]
  },
  {
    text: "Qui est le créateur du World Wide Web (WWW) ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/440px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
    options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Alan Turing"],
    correctAnswer: "Tim Berners-Lee",
    categoryNames: ["Informatique", "Histoire"]
  },
  {
    text: "De quelle peinture célèbre ce détail est-il extrait ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28crop%29.jpg/800px-Michelangelo_-_Creation_of_Adam_%28crop%29.jpg",
    options: ["La Cène", "L'École d'Athènes", "La Création d'Adam", "Le Jugement Dernier"],
    correctAnswer: "La Création d'Adam",
    categoryNames: ["Art", "Peinture", "Histoire"]
  },
  {
    text: "Quel est ce Pokémon de type Spectre/Poison ?",
    imageUrl: "https://www.pokepedia.fr/images/e/e0/Ectoplasma-RFVF.png",
    options: ["Spectrum", "Ectoplasma", "Fantominus", "Ténéfix"],
    correctAnswer: "Ectoplasma",
    categoryNames: ["Pokemon"]
  },
  {
    text: "Dans quel pays se trouve ce monument naturel appelé 'Le Pain de Sucre' ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sugarloaf_Mountain_and_Botafogo_Bay.jpg/800px-Sugarloaf_Mountain_and_Botafogo_Bay.jpg",
    options: ["Colombie", "Brésil", "Portugal", "Mexique"],
    correctAnswer: "Brésil",
    categoryNames: ["Geographie", "Pays", "Nature"]
  },
  {
    text: "Quel est cet instrument traditionnel de la famille des bois ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Bassoon_front_view.png/300px-Bassoon_front_view.png",
    options: ["Hautbois", "Basson", "Clarinette", "Flûte de Pan"],
    correctAnswer: "Basson",
    categoryNames: ["Musique", "Instrument"]
  },
  {
    text: "De quel film d'animation est tiré ce château ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/fr/5/5b/Le_Ch%C3%A2teau_ambulant.jpg",
    options: ["Le Château dans le ciel", "Le Château ambulant", "Princesse Mononoké", "Kiki la petite sorcière"],
    correctAnswer: "Le Château ambulant",
    categoryNames: ["Cinema", "Animation"]
  },
  {
    text: "Quelle est la capitale de l'Iran ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Azadi_Tower_at_night_2.jpg/800px-Azadi_Tower_at_night_2.jpg",
    options: ["Bagdad", "Damas", "Téhéran", "Riyad"],
    correctAnswer: "Téhéran",
    categoryNames: ["Geographie", "Capitale"]
  },
  {
    text: "Quel pays possède ce drapeau comportant un dragon ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Flag_of_Bhutan.svg/1000px-Flag_of_Bhutan.svg.png",
    options: ["Népal", "Bhoutan", "Pays de Galles", "Vietnam"],
    correctAnswer: "Bhoutan",
    categoryNames: ["Geographie", "Drapeaux", "Pays"]
  },
  {
    text: "Quel est ce mammifère connu pour être le plus lent au monde ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bradypus.jpg/800px-Bradypus.jpg",
    options: ["Koala", "Paresseux", "Loris lent", "Tortue"],
    correctAnswer: "Paresseux",
    categoryNames: ["Animaux", "Nature"]
  },
  {
    text: "Dans quel jeu vidéo explore-t-on la région de Hyrule ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/fr/b/bd/The_Legend_of_Zelda_Logo.png",
    options: ["Final Fantasy", "The Legend of Zelda", "Genshin Impact", "Skyrim"],
    correctAnswer: "The Legend of Zelda",
    categoryNames: ["Jeux-videos"]
  },
  {
    text: "Qui a formulé la théorie de la relativité générale ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/374px-Albert_Einstein_Head.jpg",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
    correctAnswer: "Albert Einstein",
    categoryNames: ["Science", "Histoire"]
  },
  {
    text: "Quelle monnaie est gérée par la Banque Centrale Européenne (BCE) ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Euro_symbol_black.svg/512px-Euro_symbol_black.svg.png",
    options: ["Franc Suisse", "Livre Sterling", "Euro", "Yen"],
    correctAnswer: "Euro",
    categoryNames: ["Economie"]
  },
  {
    text: "Quel type de mémoire informatique est représenté par cette barrette ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Kingston_DDR3_RAM.jpg/800px-Kingston_DDR3_RAM.jpg",
    options: ["Disque Dur", "RAM", "ROM", "Cache"],
    correctAnswer: "RAM",
    categoryNames: ["Informatique"]
  }
];

// --- Fonction du Seeding ---
async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connecté à MongoDB pour le seeding...");
    
    await Category.deleteMany({}); // Nettoie la base Category
    await Question.deleteMany({}); // Nettoie la base Question

    // Utilisation de for...of pour gérer l'asynchrone (await) correctement
    for (const data of seedData) {
      const categoryIds = [];

      // Traitement des catégories une par une
      for (const catName of data.categoryNames) {
        // On cherche si la catégorie existe déjà
        let categoryDoc = await Category.findOne({ nom: catName });
                
        // Si elle n'existe pas, on la crée
        if (!categoryDoc) {
          categoryDoc = await Category.create({ nom: catName });
        }

        categoryIds.push(categoryDoc._id);
      }

      await Question.create({
        text: data.text,
        imageUrl: data.imageUrl,
        options: data.options,
        correctAnswer: data.correctAnswer,
        categories: categoryIds, // On passe le tableau d'IDs
        stats: { askedNb: 0, correctNb: 0, correctRate: 0 }
      });
    }
    
    console.log("Base de données peuplée avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors du seeding :", err);
    process.exit(1);
  }
}

seed();
