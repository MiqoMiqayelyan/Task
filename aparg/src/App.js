import React, { Component } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import {API_KEY} from './API_KEY';

class App extends Component {
    state = {
      name: [],
      firstImgUrls: [],
      secondImgUrls: [],
      basket1: 'First Result',
      basket2: 'Second Result',
      draggedImg: {},
      completedImg: [],
    }

  getFirstImgUrls = (e) => {
    e.preventDefault(); //Fix auto-update error
    let value = e.target.elements[0].value; //get input values
    if(value === '') //check is value empti or not 
    { alert('Please write someting')}
    else{ 
      value = value.split(' ');// make the value array
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${value[0]}&max_upload_date=5&group_id=&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((data) => {
        //maping data urls
        data.photos.photo.length = 5;
        var newList = data.photos.photo.map((pir) => {
            let imgs=  `https://farm${pir.farm}.staticflickr.com/${pir.server}/${pir.id}_${pir.secret}.jpg` //get the img urls
            return(
                <img src={imgs} alt={pir.farm}/>  //create img teg with api photos
            )
          });
        // cahnge state properties     
        this.setState({
          name: value[0],
          firstImgUrls: newList,
          basket1: value[0],
        })
      });
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${value[1]}&max_upload_date=5&group_id=&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((data) => {
        //maping data urls
        data.photos.photo.length = 5;
        var newList = data.photos.photo.map((pir) => {
            let imgs=  `https://farm${pir.farm}.staticflickr.com/${pir.server}/${pir.id}_${pir.secret}.jpg` //get the img urls
            return(
                <img src={imgs} alt={pir.farm}/>  //create img teg with api photos
            )
          });
        // cahnge state properties     
        this.setState({
          name: value[0],
          secondImgUrls: newList,
          basket2: value[1],
        })
    }) 
  }
}
// get drag img in state
onDrag = (event, img) => {
  event.preventDefault(); //Fix auto-update error
  this.setState({
    draggedImg: img
  });
}
// check if img over basket
onDragOver = (event) => {
  event.preventDefault();//Fix auto-update error
}
// put img in complete
onDrop = (event) => {
  const { completedImg, draggedImg, firstImgUrls } = this.state;
  this.setState({
    completedImg: [...completedImg, draggedImg],
    firstImgUrls: firstImgUrls.filter(i =>i.props.src !== draggedImg),
    draggedImg: {},
  })
}
  render() {
   console.log(this.state.firstImgUrls)
    return (
      <div className="App">
        <Search 
        getFirstImgUrls = {this.getFirstImgUrls}
        />
        <div className="img-list">
          <div className='first-serch-result'>
          {this.state.firstImgUrls.map((i,index) =>{
              return(
                <div 
                  draggable   
                  key={index}
                  onDrag={(event) => this.onDrag(event, i.props.src)}
                  
                >
                <img 
                  alt={i.type} 
                  src={i.props.src} 
                />
                </div>
              )}
            )}
          </div>
          <div className='second-serch-result'>
          {this.state.secondImgUrls.map((i,index) =>{
              return(
                <div 
                  draggable   
                  key={index}
                  onDrag={(event) => this.onDrag(event, i.props.src)}
                >
                <img 
                  alt={i.type} 
                  src={i.props.src} 
                />
                </div>
              )}
            )}
          </div>
            
        </div>
      <div className='droppable'  
          onDrop={event => this.onDrop(event)}  
      >
        <div className="baskets">
              <div className="basket1"  
                onDragOver={event => this.onDragOver(event)}
              >
                  {this.state.basket1}
              </div>
            <div className="basket2">{this.state.basket2}</div>
        </div>
            <div className='done'>
            {this.state.completedImg.map((task, index) =>
            <div key={index}>
              <img src={task} alt={task.index}/>
            </div>
            )}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
