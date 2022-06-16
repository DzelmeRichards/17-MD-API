/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { Episode } from '../../Models/EpisodeModel';
import './episodesPage.scss';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [search, setSearch] = useState<String>('');
  const [errorMessage, setErrorMessage] = useState<String>();
  const [inputValue, setInputValue] = useState<String>('');
  const navigate = useNavigate();

  const getEpisodes = async () => {
    const currentFilter = search === '' ? '' : `?name=${search}`;

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode${currentFilter}`);
      setEpisodes(response.data.results);
      setErrorMessage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    }
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  useEffect(() => {
    getEpisodes();
  }, [search]);

  return (
    <div className="episodes__container container-fluid">
      <div className="row center-xs">
        <div className="col-xs-6">
          <div
            className="episodes__form"
          >
            <input
              className="episodes__input"
              placeholder="Search by name"
              type="text"
              onChange={(e) => { setInputValue(e.target.value); }}
            />
            <Button
              text="Search"
              onClick={() => setSearch(inputValue)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {episodes && episodes.map(({
          id, name, air_date, episode, characters, url, created,
        }) => (
          <div key={id} className="col-xs-4">
            <div className="episodes__card">
              <p>
                ID:
                {' '}
                {id}
              </p>
              <p>
                Name:
                {' '}
                {name}
              </p>
              <p>
                Air date:
                {' '}
                {air_date}
              </p>
              <p>
                Episode:
                {' '}
                {episode}
              </p>
              <Button text="See More" onClick={() => navigate(`/episodes/${id}`)} />
            </div>
          </div>
        ))}
      </div>
      <div className="episodes__error-msg-container">
        {errorMessage && (<span>{errorMessage}</span>)}
      </div>
    </div>
  );
};

export default EpisodesPage;
