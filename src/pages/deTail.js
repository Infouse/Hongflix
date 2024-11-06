import React, { useEffect } from 'react';
import store from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Detail.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const DeTail = () => {
  const { dataCtrl, movieDetailPage, tvDetailPage, movieId ,tvId,similar,setMovieId} = store();
  const { state } = useLocation();
  const data = state === 'movieDetail' ? movieDetailPage : tvDetailPage || {};
  const naviGate = useNavigate();
  useEffect(() => {
    dataCtrl({ type: state });
    dataCtrl({ type: 'similar', id: movieId || tvId }); 
  }, [movieId, tvId, state]);
  const movieGate = (itemid)=>{
    setMovieId(itemid);
    window.scrollTo(0,0);
    naviGate('/deTail', { state: 'movieDetail' });
}
console.log(similar)

  return (
    <div className='detailPage'>
      {Object.keys(data).length === 0 ? (
        null
      ) : (
        <>
          <div
            className='banner'
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${data.poster_path}")`,
            }}
          >
          </div>
          <ul className='contentBox'>
            <li className='posterBox'>
              <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.title || data.name} />
            </li>
            <li className='textBox'>
              <h2 className='contentTitle'>{data.title || data.name}</h2>
              <div className='genresBox'>
                {data.genres.map((item, idx) => (
                  <span className='detailCate' key={idx}>{item.name}</span>
                ))
                }
              </div>
              {/* 여기 편집해야함 */}
              <span className='overviewText'>{data.overview}</span>
              <h3>Casts</h3>
              <div className='imgContainer'>
                {state === 'movieDetail' ? (
                  Array.isArray(data.casts?.cast) && data.casts.cast.slice(0, 5).map((item, idx) => (
                    <div key={idx} className='imgBox'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt={item.name || 'No name'} />
                      <span>{item.name || 'No name'}</span>
                    </div>
                  ))
                ) :
                (
                  Array.isArray(data.production_companies) && data.aggregate_credits.cast.slice(0, 5).map((item, idx) => (
                    <div key={idx} className='imgBox'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt={item.name || 'No logo'} />
                      <span>{item.name || 'No name'}</span>
                    </div>
                  ))
                )
                }
              </div>
            </li>
          </ul>
        </>
      )}
      <ul>
      {Object.keys(data).length !== 0 ? (
          data.videos.results.slice(0,4).map((item, idx) => (
            <li className='videosContainer' key={idx}>
              <p className='videosText'>{item.name}</p>
              <div className='videoWrapper'>
              <iframe className='videoBox'
              src={`https://www.youtube.com/embed/${item.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.name}
              /> 
              </div>
            </li>
          ))
        ) : <li className='sorry'>죄송합니다 아직 업로도된 비디오가 없습니다.</li>}
      </ul>
      <div className='similarContainer'>
      <p className='similarText'>similar</p>
      <Swiper
            spaceBetween={10}
            slidesPerView={5} 
          >
          {
            Array.isArray(similar) && similar.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <ul>
                      {/* backdrop_path : null 일때 일반 div만 넣기 (집가서) */}
                      <li key={idx}
                      onClick={()=>movieGate(item.id)}
                      className='similarList'>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}alt={`${item.title} 포스터`}/>
                      </li>
                      <li>
                        <span className='similarTitle'>{item.name || item.title}</span>
                      </li>
                    </ul>
                  </SwiperSlide>
            ))
          }
      </Swiper>
      </div>
    </div>
  );
};

export default DeTail;
