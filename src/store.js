import axios from 'axios'
import {create} from 'zustand'

const instance = axios.create({
  baseURL : 'https://api.themoviedb.org/3',
  params : {
    api_key : "f89a6c1f22aca3858a4ae7aef10de967",
    } 
})

function dataGet(url){
  return instance.get(url);
}


const store = create((set,get) => ({
  popular : [],
  topRated : [],
  upcoming : [],
  tvTopRated : [],
  searchResults : [],
  moviePage : [],
  tvPage : [],
  movieDetailPage : [],
  tvDetailPage: [],
  similar : [],
  movieId : null,
  tvId : null,
  pageNum : 1,

  resetStore: () => set({
    searchResults: [],
    moviePage: [],
    tvPage: [],
    movieDetailPage: [],
    tvDetailPage : [],
    pageNum: 1,
    
  }),
  setMovieId:(id)=>set({
    movieId:id
  }),
  
  setTvId:(id)=>set({
    tvId:id
  }),
  
  setPageNum: () => set((state) => ({
    pageNum: state.pageNum + 1,
  })),
  resetPageNum: () => set({ pageNum: 1 }),

  
  dataCtrl :async function (action) {
    let res;
    let res2; 
    const { pageNum } = get();
    const {movieId} = get();
    const {tvId} = get();
    switch (action.type) {
      case 'getData' : 
      const [popularResponse, topRatedResponse, upcomingResponse, tvtopRatedRes] =  await Promise.all([
        dataGet('/movie/popular'),
        dataGet('/movie/top_rated'),
        dataGet('/movie/upcoming'),
        dataGet('/tv/top_rated'),
      ])
      
      set({
        popular : popularResponse.data.results,
        topRated : topRatedResponse.data.results,
        upcoming : upcomingResponse.data.results,
        tvTopRated : tvtopRatedRes.data.results,
      })
      break;
    
      case 'search' : 
      res = await instance.get(`/search/movie`,{params : {query : action.query}})
      res2 = await instance.get(`/search/tv`,{params : {query : action.query}})
      set({
        searchResults: [res.data.results,res2.data.results]
      });
      break;

      case 'movie' : 
        res = await instance.get("/movie/popular",{params : {page : pageNum }})
        set((state)=>({
          moviePage : [...state.moviePage, ...res.data.results,]
        }))
        break;
        
      case 'tv' : 
        res = await instance.get("/tv/top_rated",{params : {page : pageNum}})
        console.log(pageNum)
        set((state)=>({
          tvPage : [...state.tvPage, ...res.data.results]
        }))
        break;

      case 'movieDetail' :   
        res = await instance.get(`/movie/${movieId}`,{
          params : {append_to_response : "videos,images,casts"}
        });
        set({
          movieDetailPage : res.data
        })
        break;
        
      case 'tvDetail' : 
        res = await instance.get(`/tv/${tvId}`,{
          params : {append_to_response : "videos,images,casts,aggregate_credits"}
        });
        set({
          tvDetailPage : res.data
        })
      break;
      
      case 'similar' :
        const id = movieId || tvId;
        const type = movieId ? 'movie' : 'tv';
        res = await instance.get(`/${type}/${id}/similar`); 
        set({
          similar : res.data.results
        }) 
        break;
        default:
          throw new Error(`Unhandled action type: ${action.type}`)
    }   
  }
}))

export default store