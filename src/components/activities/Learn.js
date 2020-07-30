import React from "react"
import NewsStories from './NewsStories';


// var url = 'http://newsapi.org/v2/top-headlines?' +
//             'sources=techcrunch&' +

// var req = new Request(url);  

class Learn extends React.Component {
  state = {
    allNews: []
  }

  componentDidMount() {
    this.fetchNews()
  }

  fetchNews = () => {
    fetch('http://localhost:3002/api/v1/user_activities/activities/news')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        this.setState({
          allNews: data
        })
      })
  }
  
  render() {
    console.log(this.state)
    return(
      <div>
        <h1>Learn</h1>
        <NewsStories allNews={this.state.allNews}/>
      </div>
    )
  }
}
export default Learn