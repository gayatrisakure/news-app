import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title = `${capitaliseFirstLetter(props.category)} - NewsMonkey`;

    const capitaliseFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props){
    //     super(props);
        
    //     // this.state={
    //     //     articles : [],
    //     //     loading: false,
    //     //     page:1,
    //     //     totalResults : 0
    //     // }

      
    // }

    const updateNews = async() => {

        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e2eba10ebbe4ccf8f4334f3a13e1d90&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        
        // this.setState({
        //     articles : parsedData.articles,
        //     totalArticles: parsedData.totalResults, 
        //     loading: false,
            
        // })
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitaliseFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    }, [])

    // async componentDidMount(){
        
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e2eba10ebbe4ccf8f4334f3a13e1d90&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     articles : parsedData.articles,
    //     //     totalArticles: parsedData.totalResults, 
    //     //     loading: false
    //     // })
    //     this.updateNews();
    // }

    // const handlePrevClick = async ()=>{
    //     // console.log("Previous");

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e2eba10ebbe4ccf8f4334f3a13e1d90&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // console.log(parsedData);
        
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles : parsedData.articles,
    //     //     loading: false
    //     // })

    //     // this.setState({page: this.state.page - 1});
    //     setPage(page-1)
    //     this.updateNews()

    // }

    // const handleNextClick = async ()=>{
        

    //     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
    //     //     this.setState({loading: true});
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e2eba10ebbe4ccf8f4334f3a13e1d90&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json()
            
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles : parsedData.articles,
    //     //         loading: false
    //     //     })

    //     // this.setState({page: this.state.page + 1});
    //     setPage(page+1)
    //     this.updateNews();
        
    // }

    const fetchMoreData = async () => {

        // this.setState({page : this.state.page + 1});
        setPage(page+1)
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e2eba10ebbe4ccf8f4334f3a13e1d90&page=${this.state.page}&pageSize=${props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        // this.setState({
        //     articles : articles.concat(parsedData.articles),
        //     totalArticles: parsedData.totalResults, 
        //     loading: false,
            
        // })

    };

  
        // console.log("render")
        return (
            <>
                <h2 className="text-center" style={{margin: '34px 0px', marginTop: '90px'}}>NewsHuman - Top {capitaliseFirstLetter(props.category)} Headlines</h2>

                {loading && <spinner/>}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<spinner />}
                    >

                    <div className="container">
                
                    <div className="row">
                    {articles.map ((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title = {element.title?element.title.slice(0, 45):""} description= {element.description?element.description.slice(0, 90):""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date = {element.publishedAt} />
                                </div>                   
                    })}                    
                    </div>

                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                
            </>
        )
    
}

News.defaultProps = {
    country : 'in',
    pageSize: 6,
    category: 'general,'
}
News.defaultProps = {
    country : PropTypes.string,
    pageSize :PropTypes.number,
    category: PropTypes.string
}

export default News
