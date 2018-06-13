import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Jumbotron from "./components/Jumbotron";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";
// import React from 'react';
// import { Jumbotron, Container } from 'reactstrap'; 

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to begin Game.";


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {

    // Make a copy of the state friends array to work with
    const friends = this.state.friends;

    // Filter for the clicked Friend
    const clickedFriend = friends.filter(Friend => Friend.id === id);

    // If the Friended image's clicked value is already true, 
    // do the game over actions
    if (clickedFriend[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Better luck next time... Thank's for Playing!"

      for (let i = 0; i < friends.length; i++) {
        friends[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ friends });

      // Otherwise, if clicked = false, and the user hasn't finished
    } else if (correctGuesses < 11) {

      // Set its value to true
      clickedFriend[0].clicked = true;

      // increment the appropriate counter
      correctGuesses++;

      clickMessage = "Keep going, you're doing great.";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }

      // Shuffle the array to be rendered in a random order
      friends.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.friends equal to the new friends array
      this.setState({ friends });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {

      // Set its value to true
      clickedFriend[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // Egg on the user to play again
      clickMessage = "Great Job, you got them all.";
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < friends.length; i++) {
        friends[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      friends.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.friends equal to the new friends array
      this.setState({ friends });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    }
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <Wrapper>


        <Jumbotron >
        <h1>Click Game</h1>

          <span  className="scoreSummary">
              {this.state.clickMessage} 
              <hr/>
            Correct Guesses: {this.state.correctGuesses}
            <br />
            Best Score: {this.state.bestScore}
          </span  >
          <br />
          
        </Jumbotron>


        {/* <Jumbotron>

        </Jumbotron> */}



        {this.state.friends.map(friend => (
          <FriendCard
            setClicked={this.setClicked}
            id={friend.id}
            key={friend.id}
            image={friend.image}

          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
