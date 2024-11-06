import React, { useEffect, useState } from 'react'
import '../styles/reset.scss'
import '../styles/List.scss'
import store from '../store'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const MovieList = () => {
  const {dataCtrl,  searchResults, moviePage, tvPage, pageNum, setPageNum,setMovieId, resetStore,setTvId} = store();
  const {state} = useLocation();
  let data=[];
  const [query,setQuery] = useState()

  switch (state) {
    case 'search': 
      data = searchResults;       
      break;
    case 'movies' : 
      data =  moviePage
      break;
    case 'tv' : 
      data = tvPage;
      break;
      default:
      throw new Error('error')
  }  
  
  useEffect(() => {
    resetStore();
    dataCtrl({ type: 'movie' });
    dataCtrl({ type: 'tv' });
  }, [state]);

  useEffect(()=>{
    if (pageNum > 1) {
      dataCtrl({type:'movie'})
      dataCtrl({type:'tv'})
    }
  }, [state,pageNum])

  const naviGate = useNavigate();
  const searchData = ()=>{
    dataCtrl({type:'search', query});
    naviGate('/movielist',{state:'search'})
  }
  
  console.log(state)
  return (
    <div className='listBg'>
      {
        state==="movies"  ? <h2>Movie</h2> :
        state==="tv" ? <h2>Tv</h2> :
        state==="search" ? <h2>검색결과</h2>:
        null
      }
      <div className='searchBtn'>
        <input type='text' 
        placeholder="제목을 입력하세요"
        className="searchInput"
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            searchData();
          }
        }}/>
        <input type='button'
        onClick={searchData}
        value="검색"/>
      </div>
      {/* 서치데이터 코드 */}
      <ul className='listBox'>
        {
           data.length === 2 ? (
            <>
              {Array.isArray(data) && data.length === 2 ?<h2>MOVIE</h2>:
              null
              }
            <li className="listBox">
             {data[0].map((item, idx) => (
                <div key={item.id} className='searchList' onClick={setMovieId}>
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title || item.name} />
                  <h3>{item.title || item.name}</h3>
                </div>
              ))}
              </li>
              <h2>TV</h2>
              <li className="listBox">
              {data[1].map((item, idx) => (
                <div key={item.id} className='searchList'>
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title || item.name} />
                  <h3>{item.title || item.name}</h3>
                </div>
              ))}
              </li>
          </>
        ) :
        // 서치데이터 코드 끝
        // tv or movie list 코드
         (
           data.map((item,idx)=> (
             <Link to='/deTail' state={state === 'tv' ?
               "tvDetail" : 
               state ==='movies' ?  
               "movieDetail"
              :null
             } key={idx}>
              <li className="" key={idx} onClick={()=> state === 'movies' ? 
                setMovieId(item.id) : 
                state === 'tv' ? 
                setTvId(item.id) : null}>
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title || item.name} />
                <h2>{item.title || item.name}</h2>
              </li>
            </Link>
        )))
        }
      </ul>
      {
        state === "tv" || state === "movies" ?<button className="moreBtn" onClick={()=>setPageNum()}>더보기</button> :
        null
      } 
    </div>
  )
}

export default MovieList