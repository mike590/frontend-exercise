import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shows from './shows';
import './application.scss';

class ShowsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShow: {},
      deviceWidth: window.innerWidth,
    };
  }

  componentWillMount() {
  // Dispatch an action to update deviceWidth whenever the window is resized
    window.addEventListener('resize', this.handleWindowResize);
    this.props.match.params.id && this.checkUrl();
  }

  checkUrl = () => {
    const { id } = this.props.match.params;
    const currentShow = this.findShow(id);
    this.setState(() => { return { currentShow }; });
  }

  handleWindowResize = () => {
    const deviceWidth = window.innerWidth;
    this.setState(() => {
      return {
        deviceWidth,
      };
    });
  }

  findShow = (id) => {
    let currentShow = {};
    shows.map((show) => {
      if (show.id == id) {
        currentShow = show;
        return show;
      }
    });
    return currentShow;
  }

  handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const currentShow = this.findShow(id);
    this.setState(() => { return { currentShow }; });
  }

  render() {
    return (
      <div>
        <container>
          <header>
            <h1>Vice Shows</h1>
          </header>
          {this.state.deviceWidth >= 980 ?
            <section>
              <ul>
                {Object.keys(shows).map(key => (
                  <Link to={`/${shows[key].id}`} onClick={this.handleClick.bind(this)} key={shows[key].id} data-id={shows[key].id}>
                    <img
                      src={shows[key].product_image_url}
                      alt={shows[key].title}
                      key={shows[key].id}
                    />
                  </Link>
                ))}
              </ul>
            </section>
            :
            <div />
          }
          <sectionTwo>
            {this.state.currentShow.id > 0 ?
              <div>
                <img
                  src={this.state.currentShow.product_image_url}
                  alt={this.state.currentShow.title}
                  width="400px"
                  height="500px"
                />
                <p>{this.state.currentShow.episodes} episodes</p>
                <h3>{this.state.currentShow.title}</h3>
              </div>
              :
              <div />
            }
          </sectionTwo>
          {this.state.deviceWidth < 980 ?
            <section>
              <ul>
                {Object.keys(shows).map(key => (
                  <Link to={`/${shows[key].id}`} onClick={this.handleClick.bind(this)} key={shows[key].id} data-id={shows[key].id}>
                    <img
                      src={shows[key].product_image_url}
                      alt={shows[key].title}
                      key={shows[key].id}
                      width="100px"
                      height="100px"
                    />
                  </Link>
                ))}
              </ul>
            </section>
            :
            <div />
          }
        </container>
      </div>
    );
  }
}

export default ShowsComponent;
