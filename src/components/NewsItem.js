import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title , description , imgUrl , newsUrl} = this.props

    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={imgUrl ? imgUrl:'https://cdn.zeebiz.com/sites/default/files/2022/12/27/218230-m1.jpg'} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
