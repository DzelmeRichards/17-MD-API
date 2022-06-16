import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Loader from '../../Components/Loader/Loader';
import { Location } from '../../Models/LocationModel';
import { PageInfo } from '../../Models/PageInfo';
import './locationPage.scss';

const LocationPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState<Location>();
  const [currentPage, setCurrentPage] = useState<number>(Number(id));
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${currentPage}`);
      setLocation(response.data);
    } catch (error) {
      navigate('/locations');
    } finally {
      setLoading(false);
    }
  };

  const getPageInfo = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/location/');
    setPageInfo(response.data.info);
  };

  useEffect(() => {
    getPageInfo();
    if (id) {
      getLocation();
      navigate(`/locations/${currentPage}`);
    }
  }, [currentPage]);

  return (
    <div className="loaction__container">
      {loading && (<Loader />)}
      {location && (
        <div>
          <p>
            ID:
            {' '}
            {id}
          </p>
          <p>
            Name:
            {' '}
            {location.name}
          </p>
          <p>
            Type:
            {' '}
            {location.type}
          </p>
          <p>
            Dimension:
            {' '}
            {location.dimension}
          </p>
          <div className="location__prev-next-btn-container">
            {currentPage > 1 && (
            <Button
              text="<"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            />
            )}
            {pageInfo && currentPage < pageInfo?.count && (
            <Button
              text=">"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
