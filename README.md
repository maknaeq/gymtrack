# GymTrack

## Version Française

### Prérequis

- **Node.js** (v18 ou supérieur recommandé)
- **Bun** (runtime JavaScript, [installer ici](https://bun.sh))
- **PostgreSQL** (ou base de données compatible)
- **Prisma** (ORM, configuration incluse)

### Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/maknaeq/gymtrack.git
   cd gymtrack
   ```

2. **Installer les dépendances** :

   ```bash
   bun install
   ```

3. **Configurer l'environnement** :

   - Créez un fichier `.env.local` à la racine du projet et ajoutez les lignes suivantes :
     ```env
     NEXTAUTH_URL=http://localhost:3000
     DATABASE_URL=your_postgresql_database_url
     NEXTAUTH_SECRET=your_secret_key
     ```

4. **Configurer la base de données** :

   - Exécutez les migrations Prisma :
     ```bash
     npx prisma migrate dev
     ```
   - Optionnellement, insérez des données de test :
     ```bash
     npx prisma db seed
     ```

5. **Construire le projet** :

   ```bash
   bun run build
   ```

6. **Lancer le serveur de développement** :

   ```bash
   bun run start
   ```

7. **Accéder à l'application** :
   - Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000).

### Dépannage

- **Erreur UntrustedHost** :
  Si vous voyez une erreur "UntrustedHost", assurez-vous que `trustHost: true` est défini dans la configuration de `NextAuth`.
- **Erreur de validation Prisma** :
  Vérifiez votre `DATABASE_URL` et assurez-vous que les migrations sont correctement appliquées.

---

## English Version

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Bun** (JavaScript runtime, [install here](https://bun.sh))
- **PostgreSQL** (or compatible database)
- **Prisma** (ORM, set up included)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/maknaeq/gymtrack.git
   cd gymtrack
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Configure the environment**:

   - Create a `.env.local` file in the root directory and add the following:
     ```env
     NEXTAUTH_URL=http://localhost:3000
     DATABASE_URL=your_postgresql_database_url
     NEXTAUTH_SECRET=your_secret_key
     ```

4. **Set up the database**:

   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Optionally, seed the database:
     ```bash
     npx prisma db seed
     ```

5. **Build the project**:

   ```bash
   bun run build
   ```

6. **Start the development server**:

   ```bash
   bun run start
   ```

7. **Access the application**:
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Troubleshooting

- **UntrustedHost Error**:
  If you encounter the "UntrustedHost" error, ensure `trustHost: true` is set in your `NextAuth` configuration.
- **Prisma Validation Error**:
  Verify your `DATABASE_URL` and ensure migrations are applied correctly.
