import React from 'react'
import Card from 'react-bootstrap/Card'


class NewsCard extends React.Component {
  render() {
    console.log(this.props)
    return(
          <Card>
            <Card.Body>
              <Card.Title>
                <a href={this.props.article.url}>{this.props.article.title}</a>
              </Card.Title>
              <Card.Text>{this.props.article.description}</Card.Text>
            </Card.Body>
          </Card>
    )
  }
}

export default NewsCard
