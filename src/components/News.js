import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps={
      pageSize:9,
      country:'in',
      category :""
    }

    static propTypes={
      pageSize:PropTypes.number,
      country:PropTypes.string,
      category: PropTypes.string

    }

    constructor (props){
        super(props);

        this.state={
            articles : [],
            loading : true,
            page:1,
            totalResults:0

        }
        document.title=`NewsApp-${this.props.category ? this.props.category : 'General'}`
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?q=${this.props.category}&country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({articles : parsedData.articles ,
           totalResults:parsedData.totalResults,
           loading:false
          })
    }

    fetchMoreData = async () => {
        this.setState({page : this.state.page+1})

        // if err check &page of url 
        let url=`https://newsapi.org/v2/top-headlines?q=${this.props.category}&country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({articles :this.state.articles.concat(parsedData.articles) ,
           totalResults:parsedData.totalResults,
          })
        
    };

    // handlePreclick= async ()=>{
    //   let url=`https://newsapi.org/v2/top-headlines?q=${this.props.category}&country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData= await data.json();

    //   this.setState({
    //     articles : parsedData.articles,
    //     page:this.state.page-1,
    //     loading:false
    //   })
    // }
    // handleNxtclick= async ()=>{
       
    //     if( !this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){}
    //     else{
    //       let url=`https://newsapi.org/v2/top-headlines?q=${this.props.category}&country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //         this.setState({loading:true})
    //         let data = await fetch(url);
    //         let parsedData= await data.json();
    //        this.setState({
    //         articles : parsedData.articles,
    //         page:this.state.page+1,
    //         loading:false
    //      })
    //     }
            
       
    // }

  render() {
    return (
      
      <>
        <h2 className='my-3 text-center'>Top Headlines On {this.props.category ? this.props.category : 'General'}</h2>
        { this.state.loading && <Spinner />}
        <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.articles.length !== this.state.totalResults}
                  loader={<Spinner />}
                >

            <div className="container">      
              <div className="row">
                  {this.state.articles.map((element , index)=>{
                      return <div className="col-md-4" key={index} >
                      <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} author={element.author} time={element.publishedAt} newsUrl={element.url}/>
                    </div>
                  })}
              </div>
            </div>
        </InfiniteScroll>

            {/* <div className="container my-3 d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-primary mx-1" onClick={this.handlePreclick}> &larr; Previous</button>
              <button  disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary mx-1" onClick={this.handleNxtclick}>Next &rarr; </button>
            </div> */}
      </> 
    
    )
  }
}

export default News
