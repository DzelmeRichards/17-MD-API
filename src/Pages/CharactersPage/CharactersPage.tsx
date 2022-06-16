import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Character } from '../../Models/CharacterModel';
import './charactersPage.scss';
import Button from '../../Components/Button/Button';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<String>();
  const [statusFilter, setStatusFilter] = useState<String>('all');
  const navigate = useNavigate();

  useEffect(() => {

  }, [statusFilter]);

  const getCharacters = async () => {
    const currentFilter = statusFilter === 'all' ? '' : `?status=${statusFilter}`;
    setErrorMessage('');

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${currentFilter}`);

      setCharacters(response.data.results);
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
    getCharacters();
  }, []);

  useEffect(() => {
    getCharacters();
  }, [statusFilter]);

  return (
    <div className="characters__container container-fluid">
      <div className="row center-xs">
        <div className="col-xs-6">
          <h1 className="characters__title">Characters Page</h1>
          <div className="characters__button-container">
            <Button onClick={() => setStatusFilter('')} text="All" />
            <Button onClick={() => setStatusFilter('Alive')} text="Alive" />
            <Button onClick={() => setStatusFilter('Dead')} text="Dead" />
            <Button onClick={() => setStatusFilter('unknown')} text="Unknown" />
          </div>
        </div>
      </div>
      <div className="row around-xs">
        {
        characters && characters.map(({
          id, name, status, species, gender, image, created,
        }) => (
          <div key={id} className="col-xs-3">
            <div className="characters__card">
              <img className="characters__img" src={image} alt="not-found" />
              <div className="characters__info-container">
                <span>
                  ID:
                  {' '}
                  {id}
                </span>
                <span>
                  Name:
                  {' '}
                  {name}
                </span>
                {status === 'Alive' && (
                <span className="character__status--alive">
                  Status:
                  {' '}
                  {status}
                </span>
                )}
                {status === 'Dead' && (
                <span className="character__status--dead">
                  Status:
                  {' '}
                  {status}
                </span>
                )}
                {status === 'unknown' && (
                <span className="character__status--unknown">
                  Status:
                  {' '}
                  {status}
                </span>
                )}
                <span>
                  Species:
                  {' '}
                  {species}
                </span>
                <span>
                  Gender:
                  {' '}
                  {gender}
                </span>
              </div>
              <div className="characters__read-more-btn-container">
                <Button onClick={() => navigate(`/characters/${id}`)} text="Read More" />
              </div>
            </div>
          </div>
        ))
          }
      </div>
      {errorMessage && (<span>{errorMessage}</span>)}
    </div>
  );
};

export default CharactersPage;
