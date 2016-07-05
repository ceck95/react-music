import React,{Component} from 'react'
import {Grid , Row , Col,Panel} from 'react-bootstrap'
import CSSModules from 'react-css-modules';
import styles from '../public/stylesheets/MusicStyle.css'
import { Link } from 'react-router'
class AppIndex extends Component{
  render(){
    const img = require('../public/images/button.png')
    const img_bg = require('../public/images/bg.jpg')
    document.body.style.backgroundImage = "url("+img_bg+")"
    return(
      <Grid fluid>
        <Row className="show-grid">
          <Col md={2} mdOffset={5} >
            <Link to="/music">
              <div styleName='image-play'>
                <img src={img}/>
              </div>
            </Link>
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default CSSModules(AppIndex, styles);
