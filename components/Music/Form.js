import React,{Component} from 'react'
import {FormGroup,FormControl,Button,Row,Col} from 'react-bootstrap'
import Spinner from 'react-spin';
class Form extends Component{
  constructor(props,context){
    super(props,context)
    this.state = {
      textSearch:'',
      valueSubmit:'Tìm kiếm',
      isLoading: false,
      htmlEffect:'',
      status_validate:null
    }
  }
  handleChange(e){
    this.setState({
      textSearch:e.target.value
    })
  }
  handelSubmit(e){
    e.preventDefault()
    var spinCfg = {
     width: 12,
     radius: 35,
     scale:1,
     top:'50%',
     length:0,
     position: 'fixed'
     // ...
   };
   if(!this.state.textSearch){
     this.setState({
       status_validate:'error'
     })
   }else if(this.state.textSearch == '.'){
    this.setState({
      status_validate:'error'
    })
   }else{
     this.setState({
         valueSubmit: 'Đang kiếm ...',
         status_validate:'success',
         isLoading: true,
         htmlEffect: <Spinner config={spinCfg} />
     })
     this.props.childrenActionMusic(this.state.textSearch)
     }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      valueSubmit: 'Tìm kiếm',
      isLoading: false,
      status_validate:null,
      htmlEffect:'',
      textSearch:''
    })
  }
  render(){
    return(
      <form onSubmit={this.handelSubmit.bind(this)}>
        <Row className='show-grid'>
          <Col md={9}>
            <FormGroup validationState={this.state.status_validate}>
              <FormControl
                type='text'
                value={this.state.textSearch}
                placeholder='Tên bài hát'
                onChange={this.handleChange.bind(this)}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
          <Col md={3}>
            <Button type="submit" className='custom-hover-button' disabled={this.state.isLoading} block>
              {this.state.valueSubmit}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.state.htmlEffect}
          </Col>
        </Row>
      </form>
    )
  }
}
export default Form
