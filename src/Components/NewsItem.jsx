import React from 'react'

//6d5176da4d5e44ad82569ed071ac285d

const NewsItem = (props) => {

  let {title, description, imgUrl, newsUrl, author, date, source} = props;
  return (
    <div className='my-3'>
      <div className="card">
        {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: "1"}}>{source}</span> */}
        <span className="badge rounded-pill bg-danger" 
              style={{display:'flex',
                      justifyContent: 'flex-end',
                      position: 'absolute',
                      right : '0'
                      }}> 
        {source} 
        </span>
        <img src={imgUrl?imgUrl:"https://static.theprint.in/wp-content/uploads/2023/03/Superconductor-Final.png"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text1">{description}...</p>
          <div className="description my-3">
            <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
          </div>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem