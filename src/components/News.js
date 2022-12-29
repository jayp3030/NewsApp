import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps={
      pageSize:9,
      country:'in'
    }

    static propTypes={
      pageSize:PropTypes.number,
      country:PropTypes.string

    }

    constructor (){
        super();

        this.state={
            article : [],
            loading : false,
            page:1

        }
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({article : parsedData.articles ,
           totalResults:parsedData.totalResults,
           loading:false
          })
    }

    handlePreclick= async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();

      this.setState({
        article : parsedData.articles,
        page:this.state.page-1,
        loading:false
      })
    }
    handleNxtclick= async ()=>{
       
        if( !this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){}
        else{
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData= await data.json();
           this.setState({
            article : parsedData.articles,
            page:this.state.page+1,
            loading:false
         })
        }
            
       
    }

  render() {
    return (
      <div className="container my-3">

        <h2 className='my-3 text-center'>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
            {!this.state.loading && this.state.article.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url}/>
               </div>
            })}

            <div className="container my-3 d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-primary mx-1" onClick={this.handlePreclick}> &larr; Previous</button>
              <button  disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary mx-1" onClick={this.handleNxtclick}>Next &rarr; </button>
            </div>

        </div>

       
      </div>
    )
  }
}

export default News
