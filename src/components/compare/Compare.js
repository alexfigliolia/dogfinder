import React, { Component } from 'react';

class Compare extends Component {
  render() {
    return (
      <div className={this.props.classes} id="compare">
        <div>
          <h1>Compare Pups</h1>
          <div className='cc'>
            {
              this.props.savedDogs.map(function(dog, i){
                return (
                  <div className='dog-to-compare' key={i}>
                    <div className="ccimage">
                      <img src={dog.dogimg} alt="dog" />
                    </div>
                    <div className='nameinfo'>
                      <h3>{dog.dogsize}</h3>
                      <h2>{dog.dog}</h2>
                      <h3>{dog.doggender}</h3>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Compare;
