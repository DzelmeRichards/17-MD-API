import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Loader from '../../Components/Loader/Loader';
import { Episode } from '../../Models/EpisodeModel';
import { PageInfo } from '../../Models/PageInfo';
import './episodePage.scss';

const EpisodePage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const [currentPage, setCurrentPage] = useState<number>(Number(id));
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${currentPage}`);
      setEpisode(response.data);
    } catch (error) {
      navigate('/episodes');
    } finally {
      setLoading(false);
    }
  };

  const getPageInfo = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/episode/');
    setPageInfo(response.data.info);
  };

  useEffect(() => {
    getPageInfo();
    if (id) {
      getEpisode();
      navigate(`/episodes/${currentPage}`);
    }
  }, [currentPage]);

  return (
    <div className="episode__container">
      {loading && <Loader />}
      {episode && (
        <div>
          <p>
            ID:
            {' '}
            {id}
          </p>
          <p>
            Name:
            {' '}
            {episode.name}
          </p>
          <p>
            Air date:
            {' '}
            {episode.air_date}
          </p>
          <p>
            Episode:
            {' '}
            {episode.episode}
          </p>
          <div className="episode__prev-next-btn-container">
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

export default EpisodePage;
