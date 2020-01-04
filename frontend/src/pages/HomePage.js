import React, { Component } from "react";
import BasePage from './BasePage';
import {Card, CardBody, CardTitle, CardText} from "reactstrap"
import axios from '../axiosInstance';

const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    axios
      .get("/api/fame/")
      .then(res => {
        this.setState({ loading: false, user: res.data})
      })
      .catch(err => console.log(err));
  }

  render() {
    let user = this.state.user
    return (
      <BasePage loading={this.state.loading} header="15 Seconds Of Fame" {... this.props} >
        { user &&
          <Card>
            <CardBody>
              <CardTitle className="h2 text-center">
                {user.title} {user.first_name} {user.last_name}
                {
                  user.resident_type !== 'U' && <span><br /> {user.resident_type}</span>
                }
              </CardTitle>
              <hr />
              <CardText>
                {user.year && <span>Year: {user.year}<br /></span> }
                {(user.home_city || user.state || user.country) && <span>Hometown: {user.home_city && user.home_city + ","} {user.state && user.state} {user.country}<br /></span> }
                {user.homepage && <span>URL: <a href={withHttp(user.homepage)}>{user.homepage}</a><br /></span> }
                Favorite {user.favorite_category}: {user.favorite_item}
              </CardText>
              {
                user.quote && <div>
                  <hr />
                  <CardText>
                    "{user.quote}"
                  </CardText>
                </div>
              }
            </CardBody>
          </Card>
        }
      </BasePage>
    );
  }
}
export default HomePage;
