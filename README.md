# Piste liégeoise — Jeu de piste

Application web mobile pour une excursion d'une journée à Liège.

## Structure du projet

```
piste-liegeoise/
├── index.html          ← page principale
├── assets/
│   ├── css/
│   │   └── style.css   ← tous les styles
│   └── js/
│       └── app.js      ← logique de l'application
├── data/
│   └── steps.js        ← données des étapes (à modifier)
└── README.md
```

## Lancer en local (VS Code)

### Option 1 — Live Server (recommandé)
1. Installer l'extension **Live Server** dans VS Code
2. Clic droit sur `index.html` → **Open with Live Server**
3. S'ouvre dans le navigateur à `http://127.0.0.1:5500`

### Option 2 — Python (sans extension)
```bash
cd piste-liegeoise
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Modifier les étapes

Tout se passe dans **`data/steps.js`**.

### Ajouter une étape
Copier un bloc existant et modifier les champs :
```js
{
  id: "P",                          // lettre unique
  type: "poi",                      // boat | museum | bar | food | church | poi | alley | group
  icon: "building",                 // icône Tabler (sans "ti-")
  time: "~20h00",
  name: "Nom de l'étape",
  addr: "Adresse complète, Liège",
  lat: 50.6450, lng: 5.5750,        // coordonnées GPS réelles
  x: 200, y: 200,                   // position sur la carte SVG (0-400 / 0-340)
  anec: "Anecdote affichée dans le popup.",
  enigme: "Texte de l'énigme ?",    // supprimer cette ligne pour une pause sans énigme
  answer: ["réponse1", "réponse2"], // en minuscules, toutes les variantes acceptées
  hint: "Texte de l'indice.",
  pts: 10,                          // points attribués
  tag: "e"                          // e = énigme | g = défi groupé | p = pause | i = info
}
```

### Modifier une réponse acceptée
Dans le tableau `answer`, ajouter les variantes en minuscules :
```js
answer: ["joannes", "johannes", "jean", "io", "ioannes"]
```

### Ajuster la position sur la carte
Les coordonnées `x` et `y` placent le marqueur sur la carte SVG (viewBox 0-400 / 0-340).
Modifiez-les pour espacer visuellement les étapes proches.

## Déployer en ligne

### Netlify (gratuit, permanent)
1. Aller sur [netlify.com](https://netlify.com)
2. "Sites" → glisser-déposer le dossier `piste-liegeoise`
3. Obtenir un lien `xxx.netlify.app` → renommable

### Vercel (gratuit, permanent)
```bash
npm install -g vercel
cd piste-liegeoise
vercel
```

### tiiny.host (gratuit, 3 jours)
Zipper le dossier → glisser sur [tiiny.host](https://tiiny.host)

## Itinéraire

| Étape | Lieu | Heure | Type |
|-------|------|-------|------|
| A | Navette fluviale — Guillemins | 13h00 | Info |
| B | Quai Godfroid Kurth / Curtius | ~13h25 | Énigme |
| C | Les 3 Coups | ~14h10 | Pause |
| D | Église Saint-Barthélemy | ~14h40 | Énigme |
| E | Vignette + Hubart | ~15h10 | Défi groupé |
| F | Anges · Venta · Couronne | ~15h35 | Défi groupé |
| G | Impasse des Ursulines | ~15h50 | Énigme |
| H | Impasse Dropier | ~16h00 | Énigme |
| I | Impasse Pomme Pourrie | ~16h10 | Énigme |
| J | Cour Saint-Antoine | ~16h20 | Énigme |
| K | Montagne de Bueren | ~16h30 | Énigme |
| L | Tour des Vieux Joncs | ~17h00 | Énigme |
| M | Green Mill | ~17h30 | Pause |
| N | Marché sicilien — Place Saint-Lambert | ~18h00 | Énigme |
| O | The Workshop of Gin | ~19h30 | Pause |

**Total : 12 énigmes — 145 pts maximum**
