import React from "react"
import NewsCard from './NewsCard'
import Container from 'react-bootstrap/Container'

class NewsStories extends React.Component {
   
state= {
  startIndex: 0
}

  renderNewsCards = () => {
    return this.props.allNews.articles.slice(this.state.startIndex, this.state.startIndex + 3).map((article, index) => 
      <NewsCard 
        key={index}
        article={article}
        index={index}
      />
    )
  }
   
  updateIndex = () => {
    let newIndex = this.state.startIndex + 3
    this.setState({ startIndex: newIndex >= this.props.allNews.articles.length ? 0 : newIndex })
  }
   
  render(){
    console.log(this.props)
    return (
      <>
      <div>
        <h1>Top Tech News</h1>
            {this.props.allNews.status === "ok" ?
              <Container>
                {this.renderNewsCards()}
              </Container> : null
            } 
        <button className="learn-button" onClick={this.updateIndex}>Learn More</button>
      </div>
      <div className="news-footer"></div>
      </>
    
    )
  }
}
export default NewsStories;
