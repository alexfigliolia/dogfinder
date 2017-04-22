import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <div className={this.props.classes} id="cart">
        <div>
          <h1>Saved Pups</h1>
          <div className="saved-dogs">
            {
              this.props.savedDogs.map(function(dog, i){
                return (
                  <div className="saved-dog" key={i} data-id={dog.dogid}>
                    <img src={dog.dogimg} alt="saved dog"/>
                    <h2>{dog.dog}</h2>
                    <button data-id={dog.dogid} data-dbid={dog._id} className="remove-dog"></button>
                  </div>
                );
              })
            }
          </div>
          <div className='bc'>
            <button onClick={this.props.cartToggle}>Back</button>
            <button onClick={this.props.compareToggle}>Saved Dogs</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;

