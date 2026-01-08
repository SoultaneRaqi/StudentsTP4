# ⚡ Redux Toolkit Cheat Sheet

Ce document résume les concepts clés, le flux de données et l'implémentation de Redux Toolkit (RTK) dans une application React.

---

## 1. Le Concept Global (Pourquoi Redux ?)

Redux est une bibliothèque de gestion d'état (**State Management**).
Au lieu que chaque composant gère son propre état (et doive le passer via des props sur 10 niveaux), **tout l'état de l'application est stocké dans un endroit unique** appelé le **Store**.

### Le Flux de Données (Unidirectionnel)
Le données ne tournent que dans un seul sens. C'est la règle d'or.

1.  **View (UI)** : L'utilisateur clique sur un bouton.
2.  **Dispatch** : Le composant envoie une demande.
3.  **Action** : La demande contient un *type* (quoi faire) et un *payload* (données).
4.  **Reducer** : Une fonction reçoit l'action et modifie l'état.
5.  **Store** : L'état est mis à jour.
6.  **Selector** : Les composants abonnés reçoivent les nouvelles données et se rafraîchissent.

---

## 2. Vocabulaire Essentiel

| Terme | Définition Simple | Analogie |
| :--- | :--- | :--- |
| **Store** | L'objet JavaScript géant qui contient TOUT l'état de l'app. | La Banque |
| **Slice** | Une partie découpée du store (ex: `studentsSlice`, `authSlice`). | Un guichet spécifique |
| **Action** | Un objet décrivant un événement `{ type: 'add', payload: data }`. | Un bordereau de dépôt |
| **Reducer** | La fonction qui calcule le nouvel état selon l'action. | Le guichetier qui fait le calcul |
| **Dispatch** | La fonction pour envoyer une action au store. | Poster la lettre |
| **Selector** | Fonction pour extraire une donnée précise du store. | Consulter son solde |

---

## 3. Implémentation en 4 Étapes

### Étape 1 : Créer le Slice (`createSlice`)
C'est ici qu'on définit l'état initial et la logique.

```javascript
// features/students/studentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentsSlice = createSlice({
  name: 'students',
  initialState: [], // État de départ
  reducers: {
    // Action: addStudent
    addStudent: (state, action) => {
      // Avec Toolkit, on peut écrire comme si on modifiait directement (mutable)
      // C'est géré par Immer.js en arrière-plan pour rester immuable.
      state.push(action.payload);
    },
    deleteStudent: (state, action) => {
      // payload contient l'ID à supprimer
      return state.filter(s => s.id !== action.payload);
    }
  }
});

// Export des Actions (pour les composants) et du Reducer (pour le store)
export const { addStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
```


Étape 2 : Configurer le Store (configureStore)
On rassemble tous les slices ici.

```JavaScript

// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer, // On nomme la part du gâteau "students"
  },
});

```

Étape 3 : Fournir le Store (Provider)
On enveloppe l'application pour que React voie Redux.


```JavaScript

// main.jsx
import { Provider } from 'react-redux';
import { store } from './app/store';

<Provider store={store}>
  <App />
</Provider>
```

Étape 4 : Utiliser dans les Composants (Hooks)
A. Lire les données (useSelector)

```JavaScript

import { useSelector } from 'react-redux';

const Component = () => {
  // state.students correspond à la clé définie dans le store.js
  const students = useSelector((state) => state.students);
  
  return <div>{students.length} étudiants</div>;
};
```

B. Modifier les données (useDispatch)

```JavaScript

import { useDispatch } from 'react-redux';
import { addStudent } from '../features/students/studentsSlice';

const Component = () => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newStudent = { id: 1, name: "Ali" };
    // On "dispatch" l'action
    dispatch(addStudent(newStudent));
  };
};

```


**4. Questions**

```t
Q: Quelle est la différence entre Redux "Classique" et Redux Toolkit ? 

R: Redux Toolkit (RTK) est la version moderne officielle. Il simplifie la configuration (moins de code boilerplate), inclut des outils de dev par défaut, et permet d'écrire des reducers plus simples (grâce à Immer).
```
```t
Q: Pourquoi l'état doit-il être immuable ? 

R: Pour que React puisse détecter les changements rapidement. Si on modifie l'objet directement sans créer de copie, React ne saura pas qu'il doit re-rendre le composant. RTK gère cela pour nous.
```
```t
Q: C'est quoi le payload ? 


R: C'est la donnée transportée par l'action. Si l'action est "AJOUTER_ETUDIANT", le payload est l'objet étudiant lui-même.
```