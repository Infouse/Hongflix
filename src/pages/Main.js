import React, { useEffect, useState } from 'react'
import '../styles/reset.scss'
import '../styles/Main.scss'
import store from '../store'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../componet/modal';


const Main = () => {
  const {dataCtrl, popular, topRated, upcoming,setTvId, tvTopRated,setMovieId, movieDetail,movieId } = store();
  const [query,setQuery] = useState('');
  const naviGate = useNavigate();
  const [modalSwitch, setModalSwitch] = useState(false);
useEffect(()=>{
  dataCtrl({type:'getData'})
},[modalSwitch])
const handleModal = (itemid)=>{
  setMovieId(itemid)
  setModalSwitch(!modalSwitch);
}


const searchData = ()=>{
  dataCtrl({type:'search', query});
  window.scrollTo(0,0);
  naviGate('/movielist',{state:'search'});
}

const movieGate = (itemid)=>{
    setMovieId(itemid);
    window.scrollTo(0,0);
    naviGate('/deTail', { state: 'movieDetail' });
}
const tvGate = (itemid)=>{
  setTvId(itemid);
  window.scrollTo(0,0);
  naviGate('/deTail', { state: 'tvDetail' });
}


  return (
    <div className='mainBox'>
      {/* Swiper 시작 */}
      <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1} 
      autoplay={{ 
        delay: 5000, 
        disableOnInteraction: false 
      }}
      loop={true}
    >
      {popular.map((item,idx)=>(
        <SwiperSlide key={idx} className='slideBox'>
          <div className='bgBox' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${item.backdrop_path}")`}}>
            <div className='flexBox' >
              <div className='textBox'>
                <h2 className='movieTitle'>{item.title}</h2>
                <span className='overviewText'>{item.overview}</span>
                <div className='btnBox'>
                  <button onClick={()=>{movieGate(item.id)}}>상세보기</button> 
                  <button onClick={()=>{
                    handleModal(item.id)
                  }}>트레일러 보기</button>
                </div>
              </div>
              <div className='mainBoxImg'>
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}alt={`${item.title} 포스터`} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))
      }
      </Swiper>
    {/* Search 시작 */}
      <h2 className='mainStartTitle'>영화 검색</h2>
      <div className='mainSearchBox'>
        <input 
        type='text' 
        className='mainSearch' 
        onChange={(e)=>setQuery(e.target.value)} 
        placeholder='궁금한 영화를 검색해보세요'
        onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            searchData();
          }
        }}/> 
        <input type='button' value="검색" onClick={searchData} className='mainButton'/>
      </div>
      {/* 리스트 시작 */}
      <div className='movieTvList'>
        <div
        className='movieListBox'>
          <h2>Trending Movies</h2>
          <Link className='movieListLink' to='/movieList' state="movies">View more</Link>
        </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={5} 
          >
            <ul>
              {
                popular.map((item,idx)=>(
                  <SwiperSlide key={idx}>
                    <li key={idx}
                  onClick={()=>movieGate(item.id)}
                    className='mainList'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}alt={`${item.title} 포스터`}/>
                    </li>
                    <li>
                      <span>{item.title}</span>
                    </li>
                  </SwiperSlide>
                ))
              }
              </ul>
        </Swiper>
      </div>

      <div className='movieTvList'>
        <div className='movieListBox'>  
          <h2>Movie TopRated</h2>
          <Link className='movieListLink' to='/movieList' state="movies">View more</Link>
        </div>
        <ul>
          <Swiper
            spaceBetween={10}
            slidesPerView={5} 
          >
              {
                topRated.map((item,idx)=>(
                  <SwiperSlide key={idx}>
                    <li key={idx}
                    onClick={()=>movieGate(item.id)}
                    className='mainList'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}alt={`${item.title} 포스터`}/>
                    </li>
                    <li>
                      <span>{item.title}</span>
                    </li>
                  </SwiperSlide>
                ))
              }
          </Swiper>
        </ul>
      </div>
      <div className='movieTvList'>
        <div className='movieListBox'>
          <h2>영화 신작</h2>
          <Link className='movieListLink' to='/movieList' state="movies">View more</Link>
        </div>
        <ul>
          <Swiper
            spaceBetween={10}
            slidesPerView={5} 
          >
              {
                upcoming.map((item,idx)=>(
                  <SwiperSlide key={idx}>
                  <li key={idx}
                  onClick={()=>movieGate(item.id)}
                  className='mainList'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={`${item.title} 포스터`}/>
                  </li>
                  <li>
                    <span>{item.title}</span>
                  </li>
                  </SwiperSlide>
                ))
              }
          </Swiper>
        </ul>
      </div>
      <div className='movieTvList'>
        <div className='movieListBox'>
            <h2>TV TopRated</h2>
            <Link className='movieListLink' to='/movieList' state="movies">View more</Link>
          </div>
        <ul>
          <Swiper
            spaceBetween={10}
            slidesPerView={5} 
          >
              {
                tvTopRated.map((item,idx)=>(
                  <SwiperSlide key={idx}>
                  <li key={idx}
                  onClick={()=>tvGate(item.id)}
                  className='mainList'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={`${item.title} 포스터`}/>
                  </li>
                  <li>
                    <span>{item.name}</span>
                  </li>
                  </SwiperSlide>
                ))
              }
          </Swiper>
        </ul>
      </div>
      {
        modalSwitch === true ? <Modal modalSwitch={modalSwitch} setModalSwitch ={setModalSwitch}/>
        : null
      }
      </div>
  )
}

export { Main }