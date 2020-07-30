import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class NewsCard extends React.Component {
  render() {
    console.log(this.props)
    return(
        <Card>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col>
                  <Card.Title>
                    <a href={this.props.article.url}>{this.props.article.title}</a>
                  </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col>{this.props.index % 2 === 0 && <img src={this.props.article.urlToImage} alt="Card image" className="news-image"/>}</Col>
                <Col><Card.Text className='new-text'>{this.props.article.description}</Card.Text></Col>
                <Col>{this.props.index % 2 !== 0 && <img src={this.props.article.urlToImage} alt="Card image" className="news-image"/>}</Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
    )
  }
}

export default NewsCard
