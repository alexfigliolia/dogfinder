import React, { Component } from 'react';
import Header from './components/header/Header.js';
import Banner from './components/banner/Banner.js';
import Search from './components/header/Search.js';
import List from './components/results/List.js';
import Listing from './components/results/Listing.js';
import Cart from './components/cart/Cart.js';
import Compare from './components/compare/Compare.js';
import jsonp from 'jsonp';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      "zip" : "2",
      "breed" : "",
      "gender" : "",
      "age" : "",
      "offset" : 24,
      "searchToggle" : true,
      "searchClasses" : "search",
      "iconClasses" : "search-icon search-icon-animate",
      "backClasses" : "back-to-results",
      "back2Classes" : "back2",
      "listClasses" : "result-list",
      "bannerClasses" : "banner",
      "heartClasses" : "heart",
      "cartClasses" : "cart",
      "cartToggle" : true,
      "dogs" : [],
      "loaderClasses" : "loader",
      "listingClasses" : "listing",
      "compareToggle" : true,
      "compareClasses" : "compare",
      "clickedDog" : [],
      "dogName" : "",
      "dogAge" : "",
      "dogGender" : "",
      "dogBreed" : [],
      "dogSize" : "",
      "dogPic" : "",
      "dogDesc" : "",
      "contactEmail" : "",
      "contactPhone" : "",
      "id" : "",
      "scrollPos" : 0,
      "errorClasses" : "error",
      data : []
    }
    this.loadDogsFromServer = this.loadDogsFromServer.bind(this);
  }
  
  loadDogsFromServer() {
    axios.get(this.props.url)
      .then(res => {
      this.setState({ data: res.data });
    })
  }
  
  handleDogSubmit(e) {
    e.target.innerHTML = '';
    e.target.classList.add('save-dog-animate');
    var dogs = this.state.data,
        id = e.target.dataset.id,
        name = e.target.dataset.name,
        img = this.state.dogPic,
        size = this.state.dogSize,
        gender = this.state.dogGender,
        dog = {
          dog : name,
          dogsize: size,
          doggender: gender,
          dogimg: img,
          dogid : id
        },
        update = dogs.concat(dog);
     setTimeout(function(){
        this.setState({ 
          data: update,
          "listingClasses" : "listing",
          "iconClasses" : "search-icon search-icon-animate",
          "backClasses" : "back-to-results",
          "listClasses" : "result-list results-list-show",
          "heartClasses" : "heart heart-pulse"
        });
      }.bind(this), 500);
    axios.post(this.props.url, dog)
      .then(res => {
        setTimeout(function(){
          this.setState({ 
            data: update,
            "listingClasses" : "listing",
            "iconClasses" : "search-icon search-icon-animate",
            "backClasses" : "back-to-results",
            "listClasses" : "result-list results-list-show",
            "heartClasses" : "heart heart-pulse"
          });
          this.backToResults();
        }.bind(this), 300);
        setTimeout(function(){
          document.getElementById('sd').innerHTML = 'Save to Cart';
          document.getElementById('sd').classList.remove('save-dog-animate');
        }, 700);
        setTimeout(function(){
          this.setState({
            "heartClasses" : "heart"
          });
        }.bind(this), 1000);
        console.log(res);
      })
      .catch(err => {
        console.error(err);
    });
  }

  handleDogDelete(e) {
    if(e.target.className === 'remove-dog') {
      var id = e.target.dataset.dbid;
      axios.delete('http://localhost:3001/api/dogs/' + id)
        .then(res => {
          console.log('Dog deleted');
        })
        .catch(err => {
          console.error(err);
        });
    }
 }

  componentDidMount(){
    this.loadDogsFromServer();
    setInterval(this.loadDogsFromServer, this.props.pollInterval);
    window.addEventListener("resize", resize);
    resize();
  }

  goHome(){
    this.setState({
      "listClasses" : "result-list",
      "bannerClasses" : "banner",
      "searchToggle" : true,
      "searchClasses" : "search",
      "iconClasses" : "search-icon search-icon-animate",
      "dogs" : []
    });
    setTimeout(function(){
      this.setState({
        "loaderClasses" : "loader"
      });
    }.bind(this), 600);
  }

  searchToggle(){
    if(this.state.searchToggle === true) {
      this.setState({
        "searchToggle" : false,
        "searchClasses" : "search search-show",
        "iconClasses" : "search-icon",
        "heartClasses" : "heart",
        "cartToggle" : true,
        "cartClasses" : "cart"
      });
    } else {
      this.setState({
        "searchToggle" : true,
        "searchClasses" : "search",
        "iconClasses" : "search-icon search-icon-animate"
      });
    }
  }

  cartToggle(){
    if(this.state.cartToggle === true){
      this.setState({
        "cartToggle" : false,
        "cartClasses" : "cart cart-show",
        "heartClasses" : "heart heart-open",
        "searchToggle" : true,
        "searchClasses" : "search",
        "iconClasses" : "search-icon search-icon-animate"
      });
    } else {
      this.setState({
        "cartToggle" : true,
        "cartClasses" : "cart",
        "heartClasses" : "heart"
      });
    }
  }

  compareToggle(){
    var sc = this.state.scrollPos;
    if(this.state.compareToggle === true 
    && this.state.listClasses === "result-list results-list-show"){
        
        this.setState({
          "cartToggle" : true,
          "cartClasses" : "cart",
          "heartClasses" : "heart"
        });
        setTimeout(function(){
          this.setState({
            "listClasses" : "result-list results-list-show results-list-hide"
          });
        }.bind(this), 500);
        setTimeout(function(){
          this.setState({
            "compareToggle" : false,
            "compareClasses" : "compare compare-show",
            "iconClasses" : "search-icon search-icon-animate search-icon-hide",
            "backClasses" : "back-to-results",
            "back2Classes" : "back2 back-to-results-show"

          });
          document.body.scrollTop = 0;
        }.bind(this), 750);

    } else if(this.state.compareToggle === true 
    && this.state.listClasses === "result-list"){
        
        this.setState({
          "cartToggle" : true,
          "cartClasses" : "cart",
          "heartClasses" : "heart"
        });
        setTimeout(function(){
          this.setState({
            "compareToggle" : false,
            "compareClasses" : "compare compare-show",
            "iconClasses" : "search-icon search-icon-animate search-icon-hide",
            "backClasses" : "back-to-results",
            "back2Classes" : "back2 back-to-results-show"
          });
        }.bind(this), 500);
        setTimeout(function(){
          document.body.scrollTop = 0;
        }, 750);

    } else if(this.state.compareToggle === true 
    && this.state.listClasses === "result-list results-list-show results-list-hide"){
        
        this.setState({
          "cartToggle" : true,
          "cartClasses" : "cart",
          "heartClasses" : "heart"
        });
        setTimeout(function(){
          this.setState({
            "compareToggle" : false,
            "compareClasses" : "compare compare-show",
            "iconClasses" : "search-icon search-icon-animate search-icon-hide",
            "backClasses" : "back-to-results",
            "back2Classes" : "back2 back-to-results-show"
          });
        }.bind(this), 500);
        setTimeout(function(){
          document.body.scrollTop = 0;
        }, 750);

    } else if( this.state.compareToggle === false 
    && this.state.listClasses === "result-list results-list-show results-list-hide" 
    && this.state.listingClasses === "listing listing-show" ) {
        
        this.setState({
          "compareToggle" : true,
          "compareClasses" : "compare",
          "listClasses" : "result-list results-list-show",
          "iconClasses" : "search-icon search-icon-animate search-icon-hide",
          "backClasses" : "back-to-results back-to-results-show",
          "back2Classes" : "back2"
        });
        setTimeout(function(){
          document.body.scrollTop = sc;
        }, 500);

    } else if( this.state.compareToggle === false 
    && this.state.listClasses === "result-list results-list-show results-list-hide" ) {
        
        this.setState({
          "compareToggle" : true,
          "compareClasses" : "compare",
          "listClasses" : "result-list results-list-show",
          "iconClasses" : "search-icon search-icon-animate",
          "backClasses" : "back-to-results",
          "back2Classes" : "back2"
        });
        setTimeout(function(){
          document.body.scrollTop = sc;
        }, 500);
    } else if( this.state.compareToggle === false 
    && this.state.listClasses === "result-list" ) {
        
        this.setState({
          "compareToggle" : true,
          "compareClasses" : "compare",
          "iconClasses" : "search-icon search-icon-animate",
          "backClasses" : "back-to-results",
          "back2Classes" : "back2"

        });
        setTimeout(function(){
          document.body.scrollTop = sc;
        }, 500);
    }
  }

  narrowSearch(zip, breed, age, gender){
    this.setState({
      "zip": zip,
      "breed" : breed,
      "gender" : gender,
      "age" : age
    }, this.transitionUI);
  }

  transitionUI(){
    this.searchToggle();
    this.getDogs();
  }

  backToResults(){
    var sc = this.state.scrollPos;
    this.setState({
      "listingClasses" : "listing",
      "iconClasses" : "search-icon search-icon-animate",
      "backClasses" : "back-to-results",
      "listClasses" : "result-list results-list-show"
    });
    setTimeout(function(){
      document.body.scrollTop = sc;
    }, 300);
  }

  showDog(e){
    if(e.target.className === 'dog' || e.target.className === 'image' || e.target.className === 'name' || e.target.tagName === 'IMG' || e.target.tagName === 'H3' || e.target.tagName === 'H2'){
      var index, dog, dogSize, breed, i, sc, dogBreed = '';
      sc = document.body.scrollTop;
      document.getElementById('listing').scrollTop = 0;
      if(e.target.tagName === 'H3' || e.target.tagName === 'H2' || e.target.tagName === 'IMG') {
        index = e.target.parentNode.parentNode.dataset.index;
        dog = this.state.dogs[index];
        if(dog[5].length > 0) {
          for(i = 0; i < dog[5].length; i++) {
            breed = dog[5][i];
            if (i === dog[5].length - 1){
              dogBreed += breed;
            } else {
              dogBreed += breed+'-';
            }
          }
        }
        if(dog[5].length === 0) {
          dogBreed = 'Unknown Breed';
        } 
        if(dog[4] === "S") {
          dogSize = "Small";
        }
        if(dog[4] === "M") {
          dogSize = "Medium";
        }
        if(dog[4] === 'L') {
          dogSize = "Large";
        }
        this.setState({
          "listingClasses" : "listing listing-show",
          "clickedDog" : dog,
          "dogName" : dog[0],
          "dogAge" : dog[3],
          "dogGender" : dog[2],
          "dogBreed" : dogBreed,
          "dogSize" : dogSize,
          "dogPic" : dog[1],
          "dogDesc" : dog[7],
          "contactEmail" : dog[10][2],
          "contactPhone" : dog[10][3],
          "id" : dog[11],
          "iconClasses" : "search-icon search-icon-animate search-icon-hide",
          "backClasses" : "back-to-results back-to-results-show",
          "listClasses" : "result-list results-list-show results-list-hide",
          "scrollPos" : sc
        });
      }
      if(e.target.className === 'image' || e.target.className === 'name') {
        index = e.target.parentNode.dataset.index;
        dog = this.state.dogs[index];
        if(dog[5].length > 0) {
          for(i = 0; i < dog[5].length; i++) {
            breed = dog[5][i];
            if (i === dog[5].length - 1){
              dogBreed += breed;
            } else {
              dogBreed += breed+'-';
            }
          }
        }
        if(dog[5].length === 0) {
          dogBreed = 'Unknown Breed';
        } 
        if(dog[4] === "S") {
          dogSize = "Small";
        }
        if(dog[4] === "M") {
          dogSize = "Medium";
        }
        if(dog[4] === 'L') {
          dogSize = "Large";
        }
        this.setState({
          "listingClasses" : "listing listing-show",
          "clickedDog" : dog,
          "dogName" : dog[0],
          "dogAge" : dog[3],
          "dogGender" : dog[2],
          "dogBreed" : dogBreed,
          "dogSize" : dogSize,
          "dogPic" : dog[1],
          "dogDesc" : dog[7],
          "contactEmail" : dog[10][2],
          "contactPhone" : dog[10][3],
          "id" : dog[11],
          "iconClasses" : "search-icon search-icon-animate search-icon-hide",
          "backClasses" : "back-to-results back-to-results-show",
          "listClasses" : "result-list results-list-show results-list-hide",
          "scrollPos" : sc
        });
      }
    }
  }

  getDogs(){
    document.body.scrollTop = 0;
    var self = this;
    self.setState({
      "dogs" : [],
      "loaderClasses" : "loader",
      "errorClasses" : "error"
    });
    setTimeout(function(){
      self.setState({
        "listClasses" : "result-list results-list-show",
        "bannerClasses" : "banner banner-hide"
      });
    }, 700);
    var zip = self.state.zip, breedUrl, genderUrl, age;
    if(this.state.breed !== null) {
      breedUrl = '&breed='+this.state.breed;
    } else {
      breedUrl = '';
    }
    if(this.state.gender !== null) {
      genderUrl = '&sex='+this.state.gender;
    } else {
      genderUrl = '';
    }
    if(this.state.age !== null) {
      age = '&age='+this.state.age;
    } else {
      age = '';
    }
    jsonp('https://api.petfinder.com/pet.find?location='+zip+'&format=json&output=full'+genderUrl+age+'&animal=dog'+breedUrl+'&offset=0&count=24&key=30ee8287679b46176ef7acfbfee70f33', null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data.petfinder.pets);
        if(data.petfinder.pets.pet === undefined) {
          self.setState({
            "errorClasses" : "error error-show",
            "loaderClasses" : "loader loader-hide"
          });
        } else {
          var d = [];
          for (var i = 0; i < data.petfinder.pets.pet.length; i++) {
            var a = [], image;
            var name = data.petfinder.pets.pet[i].name.$t;
            if(data.petfinder.pets.pet[i].media.photos !== undefined){
              image = data.petfinder.pets.pet[i].media.photos.photo[2].$t;
            } else {
              image = 'no image';
            }
            var age = data.petfinder.pets.pet[i].age.$t;
            var sex = data.petfinder.pets.pet[i].sex.$t;
            var size = data.petfinder.pets.pet[i].size.$t;
            var description = data.petfinder.pets.pet[i].description.$t;
            var facts = [];
            var id = data.petfinder.pets.pet[i].id.$t;
            var breeds = [];
            var contact = [];
            var city = data.petfinder.pets.pet[i].contact.city.$t;
            var state = data.petfinder.pets.pet[i].contact.state.$t;
            var email = data.petfinder.pets.pet[i].contact.email.$t;
            var phone = data.petfinder.pets.pet[i].contact.phone.$t;
            if(data.petfinder.pets.pet[i].options.option !== undefined){
              for(var h = 0; h < data.petfinder.pets.pet[i].options.option.length; h++){
                var fact = data.petfinder.pets.pet[i].options.option[h].$t;
                facts.push(fact);
              }
            }
            for(var j = 0; j < data.petfinder.pets.pet[i].breeds.breed.length; j++){
              var breed = data.petfinder.pets.pet[i].breeds.breed[j].$t;
              breeds.push(breed);
            }
            if(sex === 'M') {
              sex = 'Male';
            } else if(sex === 'F') {
              sex = 'Female';
            } else {
              sex = 'Unknown';
            }
            contact.push(city, state, email, phone);
            a.push(name, image, sex, age, size, breeds, facts, description, sex, age, contact, id);
            d.push(a);
          }
          self.setState({
            "dogs" : d,
            "loaderClasses" : "loader loader-hide"
          });
        }
      }
    });
  }

  moreDogs(){
    var self = this;
    self.setState({
      "loaderClasses" : "loader"
    });
    var zip = self.state.zip, breedUrl, genderUrl, age, offset = self.state.offset;
    if(this.state.breed !== null) {
      breedUrl = '&breed='+this.state.breed;
    } else {
      breedUrl = '';
    }
    if(this.state.gender !== null) {
      genderUrl = '&sex='+this.state.gender;
    } else {
      genderUrl = '';
    }
    if(this.state.age !== null) {
      age = '&age='+this.state.age;
    } else {
      age = '';
    }
    jsonp('https://api.petfinder.com/pet.find?location='+zip+'&format=json&output=full'+genderUrl+age+'&animal=dog'+breedUrl+'&offset='+offset+'&count=24&key=30ee8287679b46176ef7acfbfee70f33', null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data.petfinder.pets);
        var d = self.state.dogs;
        for (var i = 0; i < data.petfinder.pets.pet.length; i++) {
          var a = [];
          var image;
          var name = data.petfinder.pets.pet[i].name.$t;
          if(data.petfinder.pets.pet[i].media.photos !== undefined){
            image = data.petfinder.pets.pet[i].media.photos.photo[2].$t;
          } else {
            image = 'no image';
          }
          var age = data.petfinder.pets.pet[i].age.$t;
          var sex = data.petfinder.pets.pet[i].sex.$t;
          var size = data.petfinder.pets.pet[i].size.$t;
          var description = data.petfinder.pets.pet[i].description.$t;
          var facts = [];
          var breeds = [];
          var contact = [];
          var city = data.petfinder.pets.pet[i].contact.city.$t;
          var state = data.petfinder.pets.pet[i].contact.state.$t;
          var email = data.petfinder.pets.pet[i].contact.email.$t;
          var phone = data.petfinder.pets.pet[i].contact.phone.$t;
          if(data.petfinder.pets.pet[i].options.option !== undefined){
            for(var h = 0; h < data.petfinder.pets.pet[i].options.option.length; h++){
              var fact = data.petfinder.pets.pet[i].options.option[h].$t;
              facts.push(fact);
            }
          }
          for(var j = 0; j < data.petfinder.pets.pet[i].breeds.breed.length; j++){
            var breed = data.petfinder.pets.pet[i].breeds.breed[j].$t;
            breeds.push(breed);
          }
          if(sex === 'M') {
            sex = 'Male';
          } else if(sex === 'F') {
            sex = 'Female';
          } else {
            sex = 'Unknown';
          }
          contact.push(city, state, email, phone);
          a.push(name, image, sex, age, size, breeds, facts, description, sex, age, contact);
          d.push(a);
        }
        self.setState({
          "dogs" : d,
          "loaderClasses" : "loader loader-hide",
          "offset" : offset + 24
        });
      }
    });
  }

  render() {
    return (
      <div 
        className="App" 
        id='App'
        onClick={this.handleDogDelete.bind(this)} >

        <Header 
          goHome={this.goHome.bind(this)}
          searchToggle={this.searchToggle.bind(this)}
          classes={this.state.iconClasses}
          toHome={this.goHome}
          backClasses={this.state.backClasses}
          back2Classes={this.state.back2Classes}
          backToResults={this.backToResults.bind(this)}
          heartClasses={this.state.heartClasses}
          cartToggle={this.cartToggle.bind(this)}
          compareToggle={this.compareToggle.bind(this)} />

        <Search 
          classes={this.state.searchClasses}
          narrowSearch={this.narrowSearch.bind(this)} />

        <Banner 
          classes={this.state.bannerClasses}
          searchToggle={this.searchToggle.bind(this)} />

        <List 
          classes={this.state.listClasses}
          dogs={this.state.dogs}
          loaderClasses={this.state.loaderClasses} 
          getMore={this.moreDogs.bind(this)} 
          showDog={this.showDog.bind(this)}
          errorClasses={this.state.errorClasses} />

        <Listing 
          classes={this.state.listingClasses}
          name={this.state.dogName}
          age={this.state.dogAge}
          gender={this.state.dogGender}
          breed={this.state.dogBreed}
          size={this.state.dogSize}
          src={this.state.dogPic}
          description={this.state.dogDesc}
          email={this.state.contactEmail}
          phone={this.state.contactPhone}
          id={this.state.id}
          saveDog={this.handleDogSubmit.bind(this)} />

        <Cart 
          classes={this.state.cartClasses}
          savedDogs={this.state.data}
          cartToggle={this.cartToggle.bind(this)}
          compareToggle={this.compareToggle.bind(this)} />

        <Compare 
          classes={this.state.compareClasses}
          savedDogs={this.state.data} />

      </div>
    );
  }
}

export default App;

function resize(){
    var heights = window.innerHeight;
    var widths = window.innerWidth;
    document.getElementById("App").style.height = heights + "px";
    document.getElementById("App").style.width = widths + "px";
}