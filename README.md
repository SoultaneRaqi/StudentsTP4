# Gestion d'Étudiants - Application React & Redux

Ce projet est une application Web développée avec **React** permettant de gérer une liste d'étudiants (CRUD). Elle implémente **Redux Toolkit** pour la gestion de l'état global et **React Router** pour la navigation.

## 📋 Fonctionnalités

1.  **Visualisation** : Afficher la liste complète des étudiants.
2.  **Navigation** : Système de routing pour accéder aux détails (:id) et aux formulaires.
3.  **Ajout** : Formulaire de création avec validation (Nom > 3 caractères, Niveau S1/S2/S3).
4.  **Modification** : Édition d'un étudiant existant via son ID.
5.  **Suppression** : Retrait d'un étudiant de la liste globale.
6.  **Détails** : Page dédiée affichant les informations d'un étudiant spécifique via URL dynamique.

## 🛠 Technologies Utilisées

* **React** (Vite) : Bibliothèque d'interface utilisateur.
* **Redux Toolkit** : Gestionnaire d'état global (Store, Slices).
* **React-Redux** : Connecteur pour lier React au store Redux (`useSelector`, `useDispatch`).
* **React Router DOM** : Gestion des routes et de la navigation SPA (Single Page Application).

## 🚀 Installation et Démarrage

Pré-requis : Avoir **Node.js** installé sur votre machine.

1.  **Cloner le projet ou extraire les fichiers** :
    ```bash
    git clone <url_du_repo>
    cd nom-du-projet
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

4.  **Accéder à l'application** :
    Ouvrez votre navigateur sur `http://localhost:5173` (ou le port indiqué).

---

## 📂 Architecture du Projet

Le projet suit une structure modulaire pour une meilleure maintenance :

```text
src/
|-- app/
|   |-- store.js          # Configuration du Store Redux global
|
|-- features/
|   |-- students/
|       |-- studentsSlice.js # Définition du State, Reducers et Actions
|
|-- components/
|   |-- StudentList.jsx   # Affichage du tableau des étudiants
|   |-- StudentForm.jsx   # Formulaire unique pour Ajout et Édition
|   |-- StudentDetail.jsx # Page de détail (Route dynamique)
|
|-- App.jsx               # Configuration des Routes
|-- main.jsx              # Point d'entrée (Providers Redux & Router)

```
**💡 Guide Technique (Explication du Code)**

**1. Gestion de l'État (Redux Toolkit)**
```text
L'état de l'application est centralisé dans le Store.

Slice (studentsSlice.js) : Regroupe l'état initial (tableau d'étudiants) et les fonctions de modification (Reducers).

Actions : addStudent, updateStudent, deleteStudent sont générées automatiquement par createSlice.

Immutabilité : Redux Toolkit utilise Immer en interne, ce qui nous permet d'écrire du code comme state.push(...) tout en gardant l'état immuable.
```

**2. Intégration React-Redux**
```text
Les composants interagissent avec le store via des Hooks :

useSelector : Utilisé dans StudentList pour lire le tableau des étudiants depuis le store.

useDispatch : Utilisé dans StudentForm et StudentList pour envoyer (dispatch) des actions (ex: supprimer un étudiant).
```


**3. Routage (React Router)**

```text
L'application est une SPA (Single Page Application) :

Le composant <BrowserRouter> englobe l'application dans main.jsx.

Les routes sont définies dans App.jsx (/, /add, /student/:id).

Navigation : On utilise <Link> pour les liens internes (évite le rechargement de page) et useNavigate pour les redirections programmatiques (après la soumission du formulaire).

Routes Dynamiques : Le hook useParams permet de récupérer l'ID de l'URL (ex: /student/2) pour afficher les bonnes données.
```

**4. Validation des Formulaires**
```text
La validation est gérée localement dans StudentForm.jsx avant l'envoi vers Redux. Si le nom est trop court ou le niveau incorrect, un état local error est mis à jour pour afficher un message à l'utilisateur.
```text


