# LRZR Production — Portfolio

Site portfolio statique pour Axel / LRZR Production.
HTML/CSS/JS vanilla, zéro framework, déployable sur GitHub Pages.

---

## 🚀 Déploiement sur GitHub Pages — étape par étape

### Prérequis
- Un compte GitHub (gratuit)
- Git installé sur votre machine ([git-scm.com](https://git-scm.com))
- Un éditeur de texte (VS Code recommandé)

---

### Étape 1 — Créer un repository GitHub

1. Connectez-vous sur [github.com](https://github.com)
2. Cliquez sur **New repository** (bouton vert en haut à droite)
3. Nommez-le exactement : `lrzrprod.github.io`
   > ⚠️ Le nom du repo détermine l'URL finale : `https://lrzrprod.github.io`
   > Remplacez `lrzrprod` par votre nom d'utilisateur GitHub exact.
4. Laissez-le **Public** (requis pour GitHub Pages gratuit)
5. Ne cochez rien (ni README, ni .gitignore) — vous poussez du code existant
6. Cliquez **Create repository**

---

### Étape 2 — Initialiser et pousser le code

Ouvrez un terminal dans le dossier du projet, puis :

```bash
# Initialiser git
git init

# Ajouter tous les fichiers (y compris .nojekyll)
git add -A

# Premier commit
git commit -m "feat: initial portfolio"

# Relier à votre repo GitHub (remplacer VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_USERNAME.github.io.git

# Pousser sur la branche principale
git push -u origin main
```

> Si votre branche par défaut s'appelle `master` et non `main`, remplacez dans la dernière commande.

---

### Étape 3 — Activer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur l'onglet **Settings**
3. Dans le menu gauche, cliquez **Pages**
4. Sous **Source**, sélectionnez **Deploy from a branch**
5. Choisissez la branche `main` (ou `master`) et le dossier `/ (root)`
6. Cliquez **Save**

⏳ Le déploiement prend 1 à 3 minutes. Votre site sera ensuite disponible sur :
`https://VOTRE_USERNAME.github.io`

---

### Étape 4 — Vérifier que ça fonctionne

- Visitez `https://VOTRE_USERNAME.github.io`
- Vérifiez que le fichier `.nojekyll` est bien présent (il désactive le traitement Jekyll de GitHub qui pourrait ignorer certains fichiers commençant par `_`)

---

## ✏️ Personnaliser le contenu

### Où modifier quoi ?

| Ce que vous voulez changer | Où |
|---|---|
| Textes, titres, bio | `index.html` — commentaires `<!-- MODIFIER -->` |
| Couleurs, polices, espacements | `style.css` — section `:root` (variables CSS) |
| Photos du portfolio | `main.js` — tableau `PORTFOLIO_IMAGES` |
| Vidéos du portfolio | `main.js` — tableau `PORTFOLIO_VIDEOS` |
| Image de fond du hero | `style.css` — propriété `background-image` de `.hero` |
| Email de contact | `index.html` + clé Web3Forms |
| Réseaux sociaux | `index.html` — footer + section contact |
| Domaine personnalisé | Voir ci-dessous |

---

## 🔑 Configurer Web3Forms (formulaire de contact)

1. Allez sur [web3forms.com](https://web3forms.com)
2. Entrez votre adresse email et cliquez **Create Access Key**
3. Copiez la clé générée
4. Dans `index.html`, remplacez `YOUR_WEB3FORMS_ACCESS_KEY` par votre clé :
   ```html
   <input type="hidden" name="access_key" value="VOTRE_CLÉ_ICI" />
   ```
5. Testez en envoyant un message depuis votre site — vous devriez recevoir un email.

> Le plan gratuit Web3Forms inclut 250 soumissions/mois, sans publicité.

---

## 🌐 Domaine personnalisé (optionnel)

Pour utiliser `www.lrzrprod.fr` au lieu de `lrzrprod.github.io` :

1. Achetez votre domaine chez OVH, Namecheap, Gandi, etc.
2. Dans les DNS de votre domaine, ajoutez un enregistrement **CNAME** :
   - Nom : `www`
   - Valeur : `VOTRE_USERNAME.github.io`
3. Pour l'apex (`lrzrprod.fr` sans www), ajoutez 4 enregistrements **A** pointant vers les IPs GitHub :
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. Dans GitHub Pages Settings, renseignez votre domaine dans **Custom domain**
5. Cochez **Enforce HTTPS** (disponible après quelques minutes)
6. Mettez à jour les URLs dans `index.html` (canonical, og:url, Schema.org) et `sitemap.xml`

---

## 📸 Ajouter vos photos et vidéos

1. Placez vos images dans `assets/images/`
2. Mettez à jour les chemins dans `main.js` (tableaux `PORTFOLIO_IMAGES` et `PORTFOLIO_VIDEOS`)
3. Pour les vidéos YouTube, récupérez l'ID de votre vidéo dans l'URL :
   `https://www.youtube.com/watch?v=`**`VIDEO_ID`**
   Et construisez l'URL d'embed : `https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0`

### Recommandations images
- Format JPEG, qualité 80-85%
- Hero : 2400×1600px, < 500 Ko (compresser sur [squoosh.app](https://squoosh.app))
- Portfolio : 1200×800px minimum
- Vignettes vidéo : 800×450px (ratio 16:9)

---

## 📁 Structure du projet

```
/
├── index.html          ← Page principale (tout le site)
├── style.css           ← Styles complets
├── main.js             ← Logique JS (portfolio, lightbox, formulaire)
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← Directives crawlers
├── .nojekyll           ← Désactive Jekyll sur GitHub Pages
├── README.md           ← Ce fichier
└── assets/
    ├── images/         ← Vos images (voir .gitkeep pour les conventions)
    └── videos/         ← Vidéos locales si nécessaire (voir .gitkeep)
```

---

## 🔄 Mettre à jour le site

Après chaque modification :

```bash
git add -A
git commit -m "update: description de vos changements"
git push
```

Le site se met à jour automatiquement en 1-2 minutes.

---

## 📄 Licence

© Axel / LRZR Production. Tous droits réservés.
