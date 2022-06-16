import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './locationsPage.scss';
import { Location } from '../../Models/LocationModel';
import Button from '../../Components/Button/Button';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<String>();
  const navigate = useNavigate();

  const getLocations = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
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
    getLocations();
  }, []);

  return (
    <div className="episodes__container container-fluid">
      <div className="row">
        {locations && locations.map(({
          id, name, type, dimension, residents,
        }) => (
          <div key={id} className="col-xs-3">
            <div className="locations__card">
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
                Type:
                {' '}
                {type}
              </p>
              <p>
                Dimension:
                {' '}
                {dimension}
              </p>
              <Button text="See More" onClick={() => navigate(`/locations/${id}`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
