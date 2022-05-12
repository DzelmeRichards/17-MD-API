import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import CharactersPage from './Pages/CharactersPage/CharactersPage';
import EpisodesPage from './Pages/EpisodesPage/EpisodesPage';
import LocationsPage from './Pages/LocationsPage/LocationsPage';
import Page404 from './Pages/Page404/Page404';
import Header from './Components/Header/Header';
import CharacterPage from './Pages/CharacterPage/CharacterPage';
import EpisodePage from './Pages/EpisodePage/EpisodePage';
import LocationPage from './Pages/LocationPage/LocationPage';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/characters" />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/episodes/:id" element={<EpisodePage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/locations/:id" element={<LocationPage />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </Router>
);

export default App;
