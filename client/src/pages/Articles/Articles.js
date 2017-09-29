import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input } from "../../components/Form";
import API from "./../../utils/API";
import APInyt from "../../utils/APInyt";
// import createFragment from 'react-addons-create-fragment';

class Articles extends Component {
  // Initialize this.state.articles as an empty array
  state = {
    searchterm: "",
    numberofrecords: 5,
    startyear: "",
    endyear: "",
    articles: [],
    savedarticles: []
  };

  componentDidMount() {
    this.searchArticles();
  }

  searchArticles = () => {
    API.getArticles()
    .then( res => {this.setState({ savedarticles: res.data })})
      // .then(res => this.setState({ articles: res.data.response.docs, headline: "", byline: "", snippet: "" }))
    .catch(err => console.log(err));
  };

  // handle form input
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.headline && this.state.byline) {
  //     API.saveArticle({
  //       headline: this.state.headline,
  //       byline: this.state.byline,
  //       snippet: this.state.snippet
  //     })
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  //   }
  // };

    // search NYT for articles
    handleFormSubmit = event => {
      // When the form is submitted, prevent its default behavior, get recipes update the recipes state
      event.preventDefault();
      let articles = []
      if (this.state.searchterm) {
        APInyt.search(this.state.searchterm,
                      this.state.numberofrecords,
                      this.state.startyear,
                      this.state.endyear
                      )
          .then(res => { 
            articles = res.data.response.docs
            this.setState(articles);
          })
          .catch(err => console.log(err));
      } 
    };

  // Add code here to get all articles from the database and save them to this.state.articles

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <div className="panel panel-primary">
              <div className="panel-heading changeme">
                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>  Search Parameters</strong></h3>
              </div>
              <div className="panel-body">
                <form>
                  <label htmlFor="searchterm">Search Term:</label>
                  <Input name="searchterm"
                    value={this.state.searchterm}
                    onChange={this.handleInputChange}
                    placeholder="Search Term" />
                  <label htmlFor="numberofrecords">Number of Records:</label>
                  <select name="numberofrecords"
                    value={this.state.numberofrecords}
                    onChange={this.handleInputChange}
                    className="form-control"
                    id="num-records-select">
                    <option value="1">1</option>
                    <option value="5" >5</option>
                    <option value="10">10</option>
                  </select>
                  <label htmlFor="startyear">Start Year (optional - must be 4 digit year):</label>
                  <Input name="startyear"
                    value={this.state.startyear}
                    onChange={this.handleInputChange}
                    placeholder="Start Year" />
                  <label htmlFor="endyear">End Year (optional - must be 4 digit year):</label>
                  <Input name="endyear"
                    value={this.state.endyear}
                    onChange={this.handleInputChange}
                    placeholder="End Year" />
                  <button type="submit"
                    className="btn btn-default"
                    onClick={this.handleFormSubmit}
                    id="run-search"><i className="fa fa-search"></i> Search</button>
                  {"     "}
                  <button type="button" className="btn btn-default" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button>
                </form>
              </div>
            </div>
            <form>
              {/* <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn>Submit Article</FormBtn> */}
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.link}>
                      <strong>
                        <h2>{article.headline}</h2>
                        <h3>{article.byline}</h3>
                        <p>{article.snippet}</p>
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        {/* Results */}
        <Row>
            <Col size="md-12">
             <div className="panel panel-primary">
               <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa fa-table"></i>  Top Articles</strong></h3>
              </div>
              <div className="panel-body" id="well-section">
                {this.state.articles.length ? (
                  <List>
                    {this.state.articles.slice(0, this.state.numberofrecords).map((article,index) => (
                      <ListItem key={article._id}>
                        <h3>{article.headline.main}</h3>
                        <a href={article.web_url}>{article.web_url} </a>
                        <h3>{article.pub_date}</h3>
                        <button type="submit"
                          className="btn btn-default"
                          onClick={() => this.handleArticleSave({title: article.headline.main, 
                                                                byline: article.headline.byline.original,
                                                                snippet: article.snippet,
                                                                link: article.web_url})}
                          id="saveArticle"><i className="fa fa-search"></i> Save</button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                    <h3>No Results to Display</h3>
                  )}
              </div>
             </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
