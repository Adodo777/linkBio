# LinkBio

Une application web moderne pour créer une page de profil personnalisée avec liens, images et thème personnalisable.

## Démarrage rapide

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd linkBio
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
ADMIN_EMAIL=votre@email.com
ADMIN_PASSWORD=votre_mot_de_passe
```

### 3. Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### 4. Accéder à l'administration

1. Allez sur `http://localhost:3000/admin/login`
2. Connectez-vous avec votre email et mot de passe
3. Personnalisez votre page :
   - Profil et image
   - Liens et boutons
   - Couleurs et thème
   - Section de confiance

## Fonctionnalités

- ✨ Interface moderne et responsive
- 🎨 Thème personnalisable
- 🔐 Administration sécurisée
- 📱 Optimisé pour mobile
- 🚀 Construit avec Next.js et TypeScript

## Technologies

- Next.js 16
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook Form

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
