import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.css']
})
export class HangmanGameComponent implements OnInit {

  secretWord;
  hiddenWord;
  guessLetter;

  constructor() { }

  ngOnInit() {
  	this.secretWord = "secret";
  	//show word places as dashes
  	this.hiddenWord = "";
  	for(let i=0; i<this.secretWord.length;i++){
  		this.hiddenWord+="*";
  	}
  }

  guess() {
  	let guessLetter = this.guessLetter;
  	this.guessLetter = "";
  	for (let i=0;i<this.secretWord.length;i++) {
	  if (this.secretWord[i] == guessLetter) {
	 	this.hiddenWord = this.hiddenWord.substr(0,i) + guessLetter + this.hiddenWord.substr(i+1);   
	  }
	}
  }

}
