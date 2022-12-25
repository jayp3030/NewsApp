import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    article= [
        {
          "source": { "id": "bbc-sport", "name": "BBC Sport" },
          "author": null,
          "title": "'£10 worth of salmon?' England's cricketers play Secret Santa",
          "description": "Freya Davies, Alice Davidson-Richards, Nat Sciver and Katherine Brunt share what they would buy their teammates for Secret Santa.",
          "url": "http://www.bbc.co.uk/sport/cricket/64050783",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/BAD6/production/_128103874_secretsanta.png",
          "publishedAt": "2022-12-25T09:22:25.4026845Z",
          "content": "The build-up to Christmas for England's women is slightly different - and warmer - to usual. \r\nThey played the last game of their eight-match series against the West Indies on 22 December, and arrive… [+5362 chars]"
        },
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          "publishedAt": "2020-04-27T11:41:47Z",
          "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
          "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
          "publishedAt": "2020-03-30T15:26:05Z",
          "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
      ]

    constructor (){
        super();

        this.state={
            article : this.article,
            loading : false

        }
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=6947d7f2cc734c64b4aa2f60d0fd8eb0"

        let data = await fetch(url);
        let parsedData= await data.json();

        this.setState({article : parsedData.article})
    }

  render() {
    return (
      <div className="container my-3">

        <h2 className='my-3 text-center'>Top Headlines</h2>

        <div className="row">

            {this.state.article && this.state.article.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
               </div>
            })}

        </div>

       
      </div>
    )
  }
}

export default News
