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
    categoryNames: ["Monument"]
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
    categoryNames: ["Pokemon"]
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
    categoryNames: ["Fruits"]
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
    categoryNames: ["Histoire"]
  },
  {
    text: "Quel est cet instrument ?",
    imageUrl: "https://conservatoire.toulouse.fr/wp-content/uploads/sites/10/2023/11/Violoncelle.jpg",
    options: ["Violon", "Violoncelle", "Alto", "Contrebasse"],
    correctAnswer: "Violoncelle",
    categoryNames: ["Instrument"]
  },
  {
    text: "Qui a peint cette oeuvre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    options: ["Delacroix", "Friedrich", "Runge", "Cole"],
    correctAnswer: "Friedrich",
    categoryNames: ["Art"]
  },
  {
    text: "Combien d'heure dorment les koalas par jour ?",
    imageUrl: "https://cdn.pixabay.com/photo/2011/09/28/23/19/koala-9960_960_720.jpg",
    options: ["Entre 14h et 16h", "Entre 16h et 18h", "Entre 18h et 20h", "Entre 20h et 22h"],
    correctAnswer: "Entre 18h et 20h",
    categoryNames: ["Animaux"]
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
    categoryNames: ["Instrument", "Musique"]
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
