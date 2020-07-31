import React from "react"
import NewsCard from './NewsCard'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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
        <h1 className="journal-form">Top Tech News</h1>
            {this.props.allNews.status === "ok" ?
              <Container>
                {this.renderNewsCards()}
              </Container> : 
              <Spinner className="news-spinner" animation="grow" variant="info" />
            } 
        <Button variant="link" className="routine-button" onClick={this.updateIndex}>Learn More</Button>
      </div>
      <div className="news-footer"></div>
      </>
    
    )
  }
}
export default NewsStories;
