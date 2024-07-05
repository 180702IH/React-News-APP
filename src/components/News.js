import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static defualtProps = {
        country: "us",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `News App-${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        //props.setProgress(30);
        let parsedData = await data.json();
        //props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=189b4750c4604d8fb6b302430c22072e&page=1&pagesize=${props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.updateNews();
    }
    handlePrev = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=189b4750c4604d8fb6b302430c22072e&page=${this.state.page - 1}&pageSize=${props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNext = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=189b4750c4604d8fb6b302430c22072e&page=${this.state.page + 1}&pageSize=${props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
    };

    render() {
        return (
            <>
                {/* <div className="container my-3"> */}
                <h1 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url} >
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                        imgurl={element.urlToImage ? element.urlToImage : "https://image.cnbcfm.com/api/v1/image/107424009-1717518893938-gettyimages-1793868499-mt1_3670_kbzajluk.jpeg?v=1717592839&w=1920&h=1080"} newsurl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-1 my-1" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={Math.ceil(this.state.totalResults / this.props.pagesize) < this.state.page + 1} type="button" className="btn btn-dark mx-1 my-1" onClick={this.handleNext}>Next &rarr;</button>
                </div>
                {/* </div> */}
            </>
        )
    }
}

export default News




// import React, { useEffect, useState } from 'react'
// import Newsitem from './Newsitem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';



// const News = (props) => {

//     const [articles, setarticles] = useState([])
//     const [loading, setloading] = useState(true)
//     const [page, setpage] = useState(1)
//     const [totalResults, settotalResults] = useState(0)
//     // document.title = `News App-${capitalizeFirstLetter(props.category)}`;

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     const updateNews = async () => {
//         props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
//         setloading(true)
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         setarticles(parsedData.articles)
//         settotalResults(parsedData.totalResults)
//         setloading(false)
//         props.setProgress(100);
//     }
//     useEffect(() => {
//         updateNews();
//     })

//     const handlePrev = async () => {
//         setpage(page - 1)
//         updateNews();
//     }
//     const handleNext = async () => {
//         setpage(page + 1)
//         updateNews();
//     }

//     const fetchMoreData = async () => {
//         setpage(page + 1)
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         setarticles(articles.concat(parsedData.articles))
//         settotalResults(parsedData.totalResults)
//         setloading(false)
//     };

//     return (
//         <>
//             {/* <div className="container my-3"> */}
//             <h1 className="text-center">Top {capitalizeFirstLetter(props.category)} Headlines</h1>
//             {loading && <Spinner />}
//             <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner />}>
//                 <div className="container">
//                     <div className="row">
//                         {articles.map((element) => {
//                             return <div className="col-md-4" key={element.url} >
//                                 <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
//                                     imgurl={element.urlToImage ? element.urlToImage : "https://image.cnbcfm.com/api/v1/image/107424009-1717518893938-gettyimages-1793868499-mt1_3670_kbzajluk.jpeg?v=1717592839&w=1920&h=1080"} newsurl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
//                             </div>
//                         })}
//                     </div>
//                 </div>
//             </InfiniteScroll>
//             <div className="container d-flex justify-content-between">
//                 <button disabled={page <= 1} type="button" className="btn btn-dark mx-1 my-1" onClick={handlePrev}>&larr; Previous</button>
//                 <button disabled={Math.ceil(totalResults / props.pagesize) < page + 1} type="button" className="btn btn-dark mx-1 my-1" onClick={handleNext}>Next &rarr;</button>
//             </div>
//             {/* </div> */}
//         </>
//     )
// }

// News.defaultProps = {
//     country: "us",
//     pageSize: 8,
//     category: "general"
// }
// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
// }

// export default News