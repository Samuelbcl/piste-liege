/**
 * data/steps.js
 * Données de l'itinéraire — modifiez ce fichier pour ajouter/modifier des étapes.
 *
 * Champs :
 *   id        — identifiant unique (lettre)
 *   type      — "boat" | "museum" | "bar" | "food" | "church" | "poi" | "alley" | "group"
 *   icon      — nom d'icône Tabler (sans le préfixe "ti-")
 *   time      — horaire affiché
 *   name      — nom de l'étape
 *   addr      — adresse affichée
 *   lat/lng   — coordonnées GPS réelles (pour Google Maps)
 *   x/y       — position sur la carte SVG (0-400 / 0-340)
 *   anec      — anecdote affichée dans le popup
 *   enigme    — texte de l'énigme (optionnel — omis = pause)
 *   answer    — tableau de réponses acceptées (en minuscules)
 *   hint      — indice affiché sur demande
 *   pts       — points attribués si résolue
 *   tag       — "e" (énigme) | "g" (groupé) | "p" (pause) | "i" (info)
 */

const STEPS = [
  {
    id: "A", type: "boat", icon: "ship", time: "13h00",
    name: "Navette fluviale — Guillemins",
    addr: "Quai de Fragnée, Liège",
    lat: 50.6244, lng: 5.5667, x: 40, y: 232,
    anec: "La navette fluviale longe la Meuse depuis les Guillemins jusqu'au Quai Godfroid Kurth, en face du musée Curtius. C'est exactement l'angle qu'avaient les marchands qui approvisionnaient le palais de Jean Curtius au XVIIe siècle.",
    tag: "i"
  },
  {
    id: "B", type: "museum", icon: "building-arch", time: "~13h25",
    name: "Débarquement — Quai Godfroid Kurth",
    addr: "Quai Godefroid Kurth 6, Liège",
    lat: 50.6458, lng: 5.5869, x: 100, y: 168,
    anec: "Depuis ce quai, la façade en briques rouges et calcaire blanc du Grand Curtius est immédiatement visible. Godfroid Kurth (1847–1916) était un historien liégeois, père de l'historiographie belge.",
    enigme: "Devant le musée Curtius, les initiales «I·C» sont répétées sur la façade. Que signifie le «I», sachant que le bâtisseur s'appelait Jean Curtius en français mais signait en latin ?",
    answer: ["joannes", "johannes", "jean", "io"],
    hint: "En latin médiéval, le prénom Jean s'écrit avec un I.",
    pts: 15, tag: "e"
  },
  {
    id: "C", type: "bar", icon: "coffee", time: "~14h10",
    name: "Les 3 Coups",
    addr: "Rue de la Boucherie 9, Liège",
    lat: 50.6456, lng: 5.5779, x: 148, y: 208,
    anec: "Ancien repaire du chef liégeois Robert Lesenne, Les 3 Coups doit son nom aux trois coups frappés sur le plancher de scène avant le lever de rideau. Cadre architectural exceptionnel — bistrot gastronomique dans une ancienne salle.",
    tag: "p"
  },
  {
    id: "D", type: "church", icon: "building-church", time: "~14h40",
    name: "Église Saint-Barthélemy",
    addr: "Place Saint-Barthélemy 8, Liège",
    lat: 50.6479, lng: 5.5829, x: 192, y: 148,
    anec: "Cette collégiale romane du XIIe siècle abrite les fonts baptismaux de Renier de Huy (1107–1118), chef-d'œuvre de l'art mosan coulé en laiton selon la technique de la cire perdue.",
    enigme: "Les fonts reposent sur des bœufs — douze à l'origine, dix aujourd'hui. Que sont devenus les deux manquants, et à quelle période furent-ils perdus ?",
    answer: ["révolution", "revolution", "1794", "fondus", "réquisition", "métal", "canon"],
    hint: "La Révolution française a traversé Liège en 1794 et réquisitionné les métaux.",
    pts: 15, tag: "e"
  },
  {
    id: "E", type: "group", icon: "arrows-join", time: "~15h10",
    name: "Vignette + Hubart",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6485, lng: 5.5816, x: 228, y: 140,
    anec: "L'impasse de la Vignette évoque les vignes des coteaux de la Citadelle. L'impasse Hubart tire son nom d'une famille bourgeoise liégeoise propriétaire de plusieurs bâtisses XVIIIe.",
    enigme: "Défi groupé : dans la Vignette, quel est le matériau dominant des façades ? Dans Hubart, quel type de fenêtres observe-t-on ? Quel siècle ces deux éléments évoquent-ils ensemble ?",
    answer: ["17", "18", "xviie", "xviiie", "dix-sept", "dix-huit", "1700", "1600"],
    hint: "Briques et calcaire de la Vignette, fenêtres à meneaux de Hubart — entre 1600 et 1780.",
    pts: 10, tag: "g"
  },
  {
    id: "F", type: "group", icon: "arrows-join", time: "~15h35",
    name: "Anges · Venta · Couronne",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6479, lng: 5.5799, x: 258, y: 158,
    anec: "Ces trois impasses se trouvent à quelques mètres l'une de l'autre. Elles partagent pavés, murs de briques et silence soudain malgré la ville toute proche.",
    enigme: "Défi collectif : parcourez les trois impasses (des Anges, Venta, de la Couronne). Cherchez un élément végétal — lierre, plante grimpante, mousse — dans chacune. Y en a-t-il une où cet élément est absent ?",
    answer: ["venta", "couronne", "anges", "aucune", "toutes", "lierre", "toutes les trois", "aucune des trois"],
    hint: "Le lierre est très présent dans ces ruelles humides.",
    pts: 10, tag: "g"
  },
  {
    id: "G", type: "alley", icon: "door-enter", time: "~15h50",
    name: "Impasse des Ursulines",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6475, lng: 5.5778, x: 272, y: 122,
    anec: "Son nom rappelle le couvent des Ursulines supprimé en 1796 par la Révolution. Les religieuses enseignaient aux jeunes filles liégeoises.",
    enigme: "Quel était le rôle principal des Ursulines dans la société liégeoise d'Ancien Régime, et qu'est devenu leur couvent après 1796 ?",
    answer: ["enseignement", "école", "éducation", "jeunes filles", "instruction", "vendu", "supprimé", "nationalisé"],
    hint: "Les Ursulines étaient dédiées à l'éducation des filles. La Révolution a supprimé les ordres et vendu leurs biens.",
    pts: 10, tag: "e"
  },
  {
    id: "H", type: "alley", icon: "door-enter", time: "~16h00",
    name: "Impasse Dropier",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6479, lng: 5.5795, x: 284, y: 100,
    anec: "'Dropier' est la forme wallonne de 'drapier'. Ce métier médiéval était l'un des plus prospères de Liège, carrefour des routes flamandes et rhénanes.",
    enigme: "Comment dit-on 'drapier' en wallon, et quelle matière première ce commerce traitait-il principalement à Liège au Moyen Âge ?",
    answer: ["laine", "drap", "dropier", "drapier", "tissu", "toile", "lainier", "textile"],
    hint: "La laine venait des Ardennes et des Pays-Bas.",
    pts: 10, tag: "e"
  },
  {
    id: "I", type: "alley", icon: "door-enter", time: "~16h10",
    name: "Impasse Pomme Pourrie",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6480, lng: 5.5796, x: 296, y: 134,
    anec: "'Pomme Pourrie' serait une déformation wallonne de 'Pomme d'Or' — ancienne enseigne d'auberge médiévale. En wallon liégeois, les voyelles évoluent phonétiquement.",
    enigme: "'Pomme Pourrie' est la déformation de quel mot ou expression d'origine ? Quel phénomène linguistique du wallon liégeois explique cette transformation ?",
    answer: ["pomme d'or", "pom d'or", "or", "phonétique", "wallon", "enseigne", "auberge", "déformation"],
    hint: "Pensez aux enseignes d'auberge médiévales et à l'évolution des voyelles en wallon.",
    pts: 10, tag: "e"
  },
  {
    id: "J", type: "alley", icon: "door-enter", time: "~16h20",
    name: "Cour Saint-Antoine",
    addr: "Rue Hors-Château, Liège",
    lat: 50.6476, lng: 5.5811, x: 308, y: 158,
    anec: "La Cour Saint-Antoine est l'une des plus spacieuses du quartier — une vraie cour fermée. Elle doit son nom à une chapelle dédiée à saint Antoine de Padoue.",
    enigme: "Dans la Cour Saint-Antoine, cherchez une niche votive ou représentation religieuse sur les murs. À quel saint est-elle dédiée, et à quelle hauteur approximative est-elle placée ?",
    answer: ["antoine", "saint antoine", "padoue", "vierge", "marie", "premier", "deuxième", "2m", "3m", "mur", "hauteur"],
    hint: "Les niches votives liégeoises sont encastrées entre le 1er et le 2e étage des façades.",
    pts: 10, tag: "e"
  },
  {
    id: "K", type: "poi", icon: "stairs-up", time: "~16h30",
    name: "Montagne de Bueren",
    addr: "Montagne de Bueren 25, Liège",
    lat: 50.6481, lng: 5.5774, x: 320, y: 95,
    anec: "L'escalier fut taillé en 1374 pour les soldats de la Citadelle. Ses 374 marches offrent une vue panoramique sur Liège. Au sommet se trouve un mémorial aux soldats de 1914.",
    enigme: "Au sommet, le mémorial de 1914 porte une dédicace. À quel corps d'armée ou régiment liégeois est-il principalement dédié ?",
    answer: ["chasseurs ardennais", "chasseurs", "lanciers", "volontaires", "liégeois", "gardes civiques"],
    hint: "Des soldats d'élite belges liés aux forêts ardennaises.",
    pts: 15, tag: "e"
  },
  {
    id: "L", type: "poi", icon: "tower", time: "~17h00",
    name: "Tour des Vieux Joncs",
    addr: "Rue du Palais / Rue Pierreuse, Liège",
    lat: 50.6468, lng: 5.5743, x: 332, y: 130,
    anec: "Cette tour octogonale, attestée dès 1423, appartenait à la commanderie teutonique de Liège. Son nom vient d'Alden Biesen — 'vieux joncs' en vieux néerlandais. Elle renferme un escalier à vis de 44 marches.",
    enigme: "La Tour des Vieux Joncs appartient à l'ordre des chevaliers teutoniques. Cet ordre fut fondé au XIIe siècle lors des croisades dans quelle ville de Terre sainte ?",
    answer: ["saint-jean-d'acre", "acre", "saint jean", "saint-jean", "palestine", "jérusalem", "terre sainte"],
    hint: "Un port de Terre sainte, aujourd'hui en Israël, où des chevaliers allemands fondèrent un hôpital.",
    pts: 15, tag: "e"
  },
  {
    id: "M", type: "bar", icon: "glass-full", time: "~17h30",
    name: "Green Mill",
    addr: "Rue du Palais 60/A, Liège",
    lat: 50.6467, lng: 5.5743, x: 336, y: 232,
    anec: "Bar caché au fond d'une allée, décoré dans l'esprit Prohibition américaine des années 20–30. Cocktails soignés sous 10€. Note parfaite 5/5 sur Google (36 avis). La Tour des Vieux Joncs est à deux pas.",
    tag: "p"
  },
  {
    id: "N", type: "food", icon: "tools-kitchen-2", time: "~18h00",
    name: "Marché sicilien — Place Saint-Lambert",
    addr: "Place Saint-Lambert, Liège",
    lat: 50.6456, lng: 5.5736, x: 148, y: 234,
    anec: "La place Saint-Lambert est dominée par le Perron — colonne médiévale surmontée d'une pomme de pin dorée, symbole de la liberté liégeoise.",
    enigme: "Le Perron est surmonté d'une pomme de pin dorée. Quel est le cri populaire wallon qui signifie 'Vive Liège !' ?",
    answer: ["al bia liège", "al bia", "bia liège", "a bia", "vive liège"],
    hint: "Expression wallonne qui commence par 'Al'.",
    pts: 10, tag: "e"
  },
  {
    id: "O", type: "bar", icon: "glass-cocktail", time: "~19h30",
    name: "The Workshop of Gin",
    addr: "Rue du Pont 5, Liège",
    lat: 50.6457, lng: 5.5772, x: 172, y: 250,
    anec: "Plus de 200 gins en stock, dégustations guidées selon vos préférences. Ouvert depuis 16h (mer–sam), depuis 11h le dimanche.",
    tag: "p"
  }
];
