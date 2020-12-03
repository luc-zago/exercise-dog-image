import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.getFirstLetterToUpperCase = this.getFirstLetterToUpperCase.bind(this);
    this.getRace = this.getRace.bind(this);
    this.requestDogPic = this.requestDogPic.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.newPic = this.newPic.bind(this);
    this.state = {
      dogpic: undefined,
    }
  }

  getFirstLetterToUpperCase(string) {
    const firstLetter = string[0].toUpperCase();
    const stringWithoutFirstLetter = string.slice(1, string.length);
    return `${firstLetter}${stringWithoutFirstLetter}`;
  }

  getRace(string) {
    const slice = string.slice(30, string.length -1);
    const index = slice.indexOf('/');
    const secondIndex = slice.indexOf('-');
    if (secondIndex === -1) {
      const race = slice.slice(0, index);
      const raceWithFirstLetterInUpperCase = this.getFirstLetterToUpperCase(race);
      return alert(`Enjoy this wonderful ${raceWithFirstLetterInUpperCase}!`);
    }
    const raceFirstString = slice.slice(0, secondIndex);
    const raceLastString = slice.slice(secondIndex +2, index);
    const raceFirstStringWithFirstLetterInUpperCase = this.getFirstLetterToUpperCase(raceFirstString);
    const raceLastStringWithFirstLetterInUpperCase = this.getFirstLetterToUpperCase(raceLastString);
    const race = `${raceFirstStringWithFirstLetterInUpperCase} ${raceLastStringWithFirstLetterInUpperCase}`
    alert(`Enjoy this wonderful ${race}`)
  }

  requestDogPic() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        const { message } = data;
        const terrier = message.includes('terrier');
        if (terrier === false) {
          localStorage.setItem('image', message);
          this.setState({ dogpic: message });
          this.getRace(message);
        };
      });
  }

  componentDidMount() {
    this.requestDogPic();
  }

  renderImage(image) {
    return (
      <div>
        <img src={ image } alt="dog" />
      </div>
    );
  }

  renderLoading() {
    return (<h1>Loading...</h1>);
  }

  newPic() {
    this.setState({ dogpic: undefined });
    this.requestDogPic();
  }

  render() {
    const { dogpic } = this.state;
  return (
    <div className="App">
      { dogpic ? this.renderImage(dogpic) : this.renderLoading() }
      <div className="button">
        <button type="button" onClick={ this.newPic }>New picture!</button>
      </div>
    </div>
    );
  }
}

export default App;
