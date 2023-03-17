import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll  from 'react-infinite-scroller'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
    
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setLoading(false)
    console.log(props.apiKey)

    setArticles(parsedData.articles)
    console.log(articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - TimesNow`
    updateNews(page);
  }, [])
  
  const handlePreviousClick = async () => {

    updateNews(page - 1); //here as setState is not called state is same as previous
    setPage(page - 1);
  }

  const handleNextClick = async () => {
      
      updateNews(page + 1);
      setPage(page + 1);
  }

  return (
    <div className='container my-3'>
      <h1 className='text-center headline'>TimesNow - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner/>}
      <div className="row">
      {!loading && articles.map((element)=>{
        return <div className="col-md-4 col-sm-6" key={element.url}>
        {/* Ternary Operator is used to ensure that description is not null so that we can slice it */}
        <NewsItem title={element.title} description={element.description?element.description.slice(0, 88):""} newsUrl={element.url}
        imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
      </div>
      })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>          
        <button disabled={Math.ceil(totalResults/props.pageSize)<=page}type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </div>
  )
}

export default News