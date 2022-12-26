import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor (){
        super();

        this.state={
            article : [],
            loading : false,
            page:1

        }
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=1"
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({article : parsedData.article})
    }

    handlePreclick= async ()=>{
      console.log('pre')

      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page-1}`
        let data = await fetch(url);
        let parsedData= await data.json();

      this.setState({
        article : parsedData.article,
        page:this.state.page-1
      })
    }
    handleNxtclick= async ()=>{
        console.log('next')
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0&page=${this.state.page+1}`
        let data = await fetch(url);
        let parsedData= await data.json();

      this.setState({
        article : parsedData.article,
        page:this.state.page+1
      })
    }

  render() {
    return (
      <div className="container my-3">

        <h2 className='my-3 text-center'>Top Headlines</h2>

        <div className="row">
            {this.state.article && this.state.article.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url}/>
               </div>
            })}

            <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-primary mx-1" onClick={this.handlePreclick}> &larr; Previous</button>
              <button  type="button" className="btn btn-primary mx-1" onClick={this.handleNxtclick}>Next &rarr; </button>
            </div>

        </div>

       
      </div>
    )
  }
}

export default News
