import React, { Component } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { PhotoList } from './components/photoList/PhotoList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: [],
      firstImgUrls: [],
      secondImgUrls: [],
      basket1: null,
      basket2: null
    }
  }

  getFirstImgUrls = (e) => {
    e.preventDefault(); //Fix auto-update error
    let value = e.target.elements[0].value; //get input values 
    value = value.split(' ');
    console.log(value);
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=184d2ef8b3e0c24f3db00c8eee568c2e&text=${value[0]}&max_upload_date=5&group_id=&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then((data) => {
      var newList = data.photos.photo.map((pir) => {
            let imgs=  `https://farm${pir.farm}.staticflickr.com/${pir.server}/${pir.id}_${pir.secret}.jpg`
            return(
                <img src={imgs}/>
            )
          }); 
      this.setState({
        name: value[0],
        firstImgUrls: newList,
        basket1: value[0],
        basket2: value[1]
      })
    });
}

  render() {
   let firstImgUrls =  {
     start: [],
     end: []
   }; 
   console.log(this.state.firstImgUrls)
   this.state.firstImgUrls.forEach((i) => {
    firstImgUrls[i.type].push(
      <div>
        <img src={i.props.src}
            draggable
            className='draggable'
        />
      </div> 
      );
   })
    return (
      <div className="App">
        <Search 
        getFirstImgUrls = {this.getFirstImgUrls}
        />
        <PhotoList 
          firstPhotoList = {this.state.firstImgUrls}
          firstImgAlt = {this.state.name}
        />
      <div className='droppable'>
        <div className="baskets">
            <div className="basket1">{this.state.basket1}</div>
            <div className="basket2">{this.state.basket2}</div>
        </div>
            <div className='groupe'>
                {firstImgUrls.end}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
