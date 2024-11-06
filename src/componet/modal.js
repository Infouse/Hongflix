import React, { useEffect, useRef } from 'react'
import '../styles/Modal.scss'
import store from '../store'

const Modal = ({modalSwitch, setModalSwitch}) => {
  const {movieDetailPage,resetStore,dataCtrl} = store()
  const modalRef = useRef(null);
  const closeBtn = useRef(null);
  useEffect(()=>{
    dataCtrl({type:'movieDetail'})
  },[])

  const modalClose = (e)=>{
    resetStore();
    setModalSwitch(!modalSwitch);
  }
  const handleModalClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      modalClose();
    }
  };
  
  return (
    <div
    onClick={handleModalClose}
    className='bg'>
      <div ref={modalRef} 
      className="modalContainer">
        <button
          ref={closeBtn}
          onClick={modalClose}
          className='closeBtn'>X</button>
        <div className='modalWrapper'>
        {movieDetailPage && movieDetailPage.videos && movieDetailPage.videos.results && movieDetailPage.videos.results.length > 0 ? (
          <iframe
            className='modalIframe'
            src={`https://www.youtube.com/embed/${movieDetailPage.videos.results[0].key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movieDetailPage.videos.results[0].name}
          />
        ) : (
          null
        )}
        </div>
      </div>
    </div>
  )
}

export default Modal