import React, { Component } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import {API_KEY} from './API_KEY';

class App extends Component {
    state = {
      firstImgUrls: [],
      secondImgUrls: [],
      basket1: 'First Result',
      basket2: 'Second Result',
      draggedImg: {},
      draggedImgClassName: {},
      droppedImg: [],
    }
  /*getSearchValues function is get input values and work with flickr API
    you can use promise.all but API didnt  give you
    special key, wich help you separate input results 
  */  
  getSearchValues = (e) => {
    e.preventDefault(); //Fix auto-update error
    let value = e.target.elements[0].value; //Get input values
    if(value === '' || value === ' ') //Check is value empti or is it have doble space 
    { alert('Please write someting')}
    else{ 
      // make the value array
      value = value.split(' ');
      //Finde frist search resul in fetch metod 
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${value[0]}&max_upload_date=5&group_id=&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((data) => {
        //maping data urls
        data = data.photos.photo
        data.length = 5;
        var imgList = data.map((pir) => {
            let imgs = `https://farm${pir.farm}.staticflickr.com/${pir.server}/${pir.id}_${pir.secret}.jpg` //get the img urls
            return(
                <img src={imgs} alt={pir.farm}/>  //create img teg with result photos
            )
          });
        // cahnge state properties     
        this.setState({
          firstImgUrls: imgList,
          basket1: value[0],
        })
      });
      //Finde second search resul in fetch metod
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${value[1]}&max_upload_date=5&group_id=&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((data) => {
        //maping data urls
        data = data.photos.photo
        data.length = 5;
        var imgList = data.map((pir) => {
            let imgs = `https://farm${pir.farm}.staticflickr.com/${pir.server}/${pir.id}_${pir.secret}.jpg` //get the img urls
            return(
                <img src={imgs} alt={pir.farm}/>//create img teg with result photos
            )
          });
        // change state properties     
        this.setState({
          secondImgUrls: imgList,
          basket2: value[1],
        })
    }) 
  }
}
// Put dragging img in state
onDrag = (event, img) => {
  event.preventDefault(); //Fix auto-update error
  this.setState({
    draggedImg: img,
    draggedImgClassName: event.target.className
  });
}
// Put img in dropping div
onDrop = () => {
  const { droppedImg, draggedImg, firstImgUrls ,secondImgUrls} = this.state;
  this.setState({
    droppedImg: [...droppedImg, draggedImg],
    firstImgUrls: firstImgUrls.filter(i =>i.props.src !== draggedImg),
    secondImgUrls: secondImgUrls.filter(i => i.props.src !== draggedImg),
    draggedImg: {},
  })
}
  render() {
    /*Check what  search result is dragging
      and put it in right brecket
    */
      if(this.state.draggedImgClassName === 'first'){
            var  onDragOverFirst = function(event ){
            event.preventDefault();//Fix auto-update error
          }
      }else{
          var onDragOverSecond = function(event){
          event.preventDefault();//Fix auto-update error
        }
      }
    
    return (
      <div className="App">
        <Search 
        getSearchValues = {this.getSearchValues}
        />
        <div className="img-list">
          <div className='first-serch-result'>
          {this.state.firstImgUrls.map((i,index) =>{
              return(
                <div 
                  draggable   
                  key={index}
                  onDrag={(event) => this.onDrag(event, i.props.src)}
                  className="first" 
                >
                <img 
                  alt={i.type} 
                  src={i.props.src}
                  className="first"  
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
                  className="second"  
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
                onDragOver={event =>{
                      if(this.state.draggedImgClassName === 'first'){
                        onDragOverFirst(event)
                      }
                  }
                }  
              >
                  {this.state.basket1}
              </div>
              <div className="basket2"
                onDragOver={event =>{
                      if(this.state.draggedImgClassName === 'second'){
                        onDragOverSecond(event)
                      }
                    }
                  } 
                >
                {this.state.basket2}
              </div>
        </div>
            <div className='done'>
                {this.state.droppedImg.map((i, index) =>
                  <div key={index}>
                    <img src={i} alt={i.index}/>
                  </div>
                )}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
