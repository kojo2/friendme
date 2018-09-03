import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WordsearchComponent implements OnInit {

  words = ['BEHAVIOUR',
    'ARMY',
    'BY',
    'THUMB',
    'TRAVEL',
    'COLOUR',
    'OFFICER',
    'BRIEF',
    'QUICK',
    'DURING'];

  originalWords = this.words;

  letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  usedWords = [];

  usedGridRefs = [];

  currentWordIndex = 0;

  wordsToTryAgain = [];

  counter=0;

  highlighting = false;
  previousGridRef=0;
  previousGridRefX = 0;
  previousGridRefY = 0;

  endpoint = 1;

  color = "yellow";

  constructor() { }

  ngOnInit() {
    this.CreateBlocks();
    this.MainLoop();
    this.clickEventListener();
  }

  CreateBlocks() {
    var i=0;
    document.write("<br>");
    for(var y=0; y<10; y++){
      for(var x=0;x<10;x++){
        document.write("<div class='block' id='block"+i+"'>"+this.ChooseRandomLetter()+"</div>");
        i++
      }
      document.write("<br>");
    }
  }

  ChooseDirection() {
    return Math.round(Math.random()*3);
  }

  MainLoop() {
    for(let k=0;k<this.words.length;k++){

      let direction = this.ChooseDirection();

      let oldGridRef;
    
      let gridRef = Math.round((Math.random()*99)+1);
    
      let word;
    
      word = this.words[this.currentWordIndex];
    
    
      switch(direction){
        case 0:
          //right
          //check if word length is going to fit
          var endOfRow = Math.ceil((gridRef+1)/10)*10;
          // if not keep moving it left until it does
          while ((gridRef+word.length)>endOfRow){
            gridRef--;
          }
          oldGridRef = gridRef;
          for(let i=0;i<word.length;i++){
            if(this.usedGridRefs.indexOf(gridRef)==-1){
              $("#block"+gridRef).html(word[i]);
              this.usedGridRefs.push(gridRef);
              if(this.usedWords.indexOf(word)==-1){
                this.usedWords.push(word);
                let wttaIndex = this.wordsToTryAgain.indexOf(word);
                if(wttaIndex>-1)
                  this.wordsToTryAgain.splice(wttaIndex,1);
              }
              //$("#block"+gridRef).css({"background-color":"pink"});
              gridRef++;
            }else{
              // if we are trying to go over another word -> delete all the letters that came before this one
              // set gridRef back to what it was at the beginning of the word loop
              gridRef = oldGridRef;
              // pop the word off the end of the usedWords array 
              this.usedWords.pop();
              this.wordsToTryAgain.push(word);
              // go through the previous letters 
              for(let k=0; k<i; k++){
                // and get rid of the letter that has been written to them
                $("#block"+gridRef).html(this.ChooseRandomLetter());
                // go to next letter (up to i which is where the letter that crosses another word is)
                gridRef++;
              }
              // break the loop on this word as it's not going to fit where we were trying to put it
              break;
            }
          }
          break;
        case 1:
          //left
          var begOfRow = Math.ceil((gridRef-1)/10)*10;
          while ((gridRef-word.length)<begOfRow){
            gridRef++;
          }
          oldGridRef = gridRef;
          for(let i=0;i<word.length;i++){
            if(this.usedGridRefs.indexOf(gridRef)==-1){
              $("#block"+gridRef).html(word[i]);
              this.usedGridRefs.push(gridRef);
              if(this.usedWords.indexOf(word)==-1){
                this.usedWords.push(word);
                let wttaIndex = this.wordsToTryAgain.indexOf(word);
                if(wttaIndex>-1)
                  this.wordsToTryAgain.splice(wttaIndex,1);
              }
              //$("#block"+gridRef).css({"background-color":"green"});
              gridRef--;
            }else{
              // if we are trying to go over another word -> delete all the letters that came before this one
              // set gridRef back to what it was at the beginning of the word loop
              gridRef = oldGridRef;
              // pop the word off the end of the usedWords array 
              this.usedWords.pop();
              this.wordsToTryAgain.push(word);
              // go through the previous letters 
              for(let k=0; k<i; k++){
                // and get rid of the letter that has been written to them
                $("#block"+gridRef).html(this.ChooseRandomLetter());
                // go to next letter (up to i which is where the letter that crosses another word is)
                gridRef--;
              }
              // break the loop on this word as it's not going to fit where we were trying to put it
              break;
            }
            
          }
          break;
        case 2:
          //up
          let top = gridRef.toString()[1];
          /*//$("#block"+gridRef).css({"background-color":"red"});
          $("#block"+top).css({"background-color":"blue"});*/
          while ((gridRef-(word.length*10))<parseFloat(top)){
            gridRef+=10;
          }
          oldGridRef = gridRef;
          // pop the word off the end of the usedWords array 
          for(let i=0;i<word.length;i++){
            if(this.usedGridRefs.indexOf(gridRef)==-1){
              $("#block"+gridRef).html(word[i]);
              this.usedGridRefs.push(gridRef);
              if(this.usedWords.indexOf(word)==-1){
                this.usedWords.push(word);
                let wttaIndex = this.wordsToTryAgain.indexOf(word);
                if(wttaIndex>-1)
                  this.wordsToTryAgain.splice(wttaIndex,1);
              }
              //$("#block"+gridRef).css({"background-color":"red"});
              gridRef-=10;
            }else{
              // if we are trying to go over another word -> delete all the letters that came before this one
              // set gridRef back to what it was at the beginning of the word loop
              gridRef = oldGridRef;
              // pop the word off the end of the usedWords array 
              this.usedWords.pop();
              this.wordsToTryAgain.push(word);
              // go through the previous letters 
              for(let k=0; k<i; k++){
                // and get rid of the letter that has been written to them
                $("#block"+gridRef).html(this.ChooseRandomLetter());
                // go to next letter (up to i which is where the letter that crosses another word is)
                gridRef-=10;
              }
              // break the loop on this word as it's not going to fit where we were trying to put it
              break;
            }
          }
          break;
        case 3:
          //down
          let bottom;
          if(gridRef>10){
            bottom = "9"+gridRef.toString()[1];
          }else{
            bottom = "9"+gridRef.toString();
          }
          while ((gridRef+(word.length*10))>bottom){
            gridRef-=10;
          }
          oldGridRef = gridRef;
          // pop the word off the end of the usedWords array 
          for(let i=0;i<word.length;i++){
            if(this.usedGridRefs.indexOf(gridRef)==-1){
              $("#block"+gridRef).html(word[i]);
              this.usedGridRefs.push(gridRef);
              if(this.usedWords.indexOf(word)==-1){
                this.usedWords.push(word);
                let wttaIndex = this.wordsToTryAgain.indexOf(word);
                if(wttaIndex>-1)
                  this.wordsToTryAgain.splice(wttaIndex,1);
              }
              //$("#block"+gridRef).css({"background-color":"orange"});
              gridRef+=10;
            }else{
              // if we are trying to go over another word -> delete all the letters that came before this one
              // set gridRef back to what it was at the beginning of the word loop
              gridRef = oldGridRef;
              // pop the word off the end of the usedWords array 
              this.usedWords.pop();
              this.wordsToTryAgain.push(word);
              // go through the previous letters 
              for(let k=0; k<i; k++){
                // and get rid of the letter that has been written to them
                $("#block"+gridRef).html(this.ChooseRandomLetter());
                // go to next letter (up to i which is where the letter that crosses another word is)
                gridRef+=10;
              }
              // break the loop on this word as it's not going to fit where we were trying to put it
              break;
            }
          }
          break;
      }
      
      this.currentWordIndex++;
    }
    if(this.wordsToTryAgain.length>0){
      this.words = this.wordsToTryAgain;
      this.currentWordIndex = 0;
      if(this.counter<3){
        console.log("counter: "+this.counter);
        this.counter++;
        this.MainLoop();
      }else{
        return;
      }
    }
    return;
  }

  HighlightSquare(gridRef){
    $("#block"+gridRef).addClass("highlighted");
  }

  RemoveHighlightSquare(gridRef){
    $("#block"+gridRef).removeClass("highlighted");
  }

  clickEventListener() {
    let thisObj = this;
    $(".block").click(function(){
      console.log("FIRING AGAIN");
      let gridRef = parseInt($(this).attr("id").split("block")[1]);
      thisObj.HighlightSquare(gridRef);
      let gridRefX = (gridRef%10)+1;
      let gridRefY = Math.ceil(gridRef/10);
      console.log("gridRef: "+gridRef+" - gridRefX: "+gridRefX+" - gridRefY: "+gridRefY);
      if(thisObj.endpoint==1){
        thisObj.previousGridRef = 0;
        thisObj.color="yellow";
        thisObj.endpoint=2;
      }
      else if(thisObj.endpoint==2){
        thisObj.color="yellow";
        thisObj.endpoint=1;
      }
      if(thisObj.previousGridRef>0){
        let diff = gridRef - thisObj.previousGridRef;
        let diffX = gridRefX - thisObj.previousGridRefX;
        let diffY = gridRefY - thisObj.previousGridRefY;
        console.log("diffX: "+diffX+" - diffY: "+diffY);
        let checkedLetters = [];
        if(diffX==0){
          //legal vertical move
          if(diffY>0){
            for(var t=thisObj.previousGridRef;t<=gridRef;t+=10){
              thisObj.HighlightSquare(t);
              // check if the letters are a word
              checkedLetters.push($("#block"+t).html());
            }
            let checkedWord = checkedLetters.join("");
            let checkedWordBackwards = checkedLetters.reverse().join("");
            console.log("checkedWord: "+checkedWord);
            console.log("checkedwordBackwards: "+checkedWordBackwards);
            // check each word to see if it matches either checkedWord or checkedWordBackwards
            let foundWord = "";
            let found = false;
            let words = thisObj.removeDuplicates(thisObj.originalWords);
            words.forEach((word)=>{
              console.log("now checking: "+word);
              if(word == checkedWord){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else if(word==checkedWordBackwards){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else{
                console.log(word+" not found");
                console.log("found was: "+found);
                console.log(words);
              }
            });
            console.log("found: "+found);
            if(found){
              alert("correct! the word was "+foundWord);
            }else{
              alert("that was not a word");
              for(let o=thisObj.previousGridRef;o<=gridRef;o+=10){
                thisObj.RemoveHighlightSquare(o);
              }
            }
          }
          else{
            console.log("going up");
            console.log("gridRef: "+gridRef+" - this.previousGridRef: "+thisObj.previousGridRef);
            for(let j=thisObj.previousGridRef ; j>gridRef ; j-=10){
              thisObj.HighlightSquare(j);
            }
          }
          if(diffY<0){
            for(var t=thisObj.previousGridRef;t>=gridRef;t-=10){
              thisObj.HighlightSquare(t);
              // check if the letters are a word
              checkedLetters.push($("#block"+t).html());
            }
            let checkedWord = checkedLetters.join("");
            let checkedWordBackwards = checkedLetters.reverse().join("");
            console.log("checkedWord: "+checkedWord);
            console.log("checkedwordBackwards: "+checkedWordBackwards);
            // check each word to see if it matches either checkedWord or checkedWordBackwards
            let foundWord = "";
            let found = false;
            let words = thisObj.removeDuplicates(thisObj.originalWords);
            words.forEach((word)=>{
              console.log("now checking: "+word);
              if(word == checkedWord){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else if(word==checkedWordBackwards){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else{
                console.log(word+" not found");
                console.log("found was: "+found);
                console.log(words);
              }
            });
            console.log("found: "+found);
            if(found){
              alert("correct! the word was "+foundWord);
            }else{
              alert("that was not a word");
              for(let o=thisObj.previousGridRef;o>=gridRef;o-=10){
                thisObj.RemoveHighlightSquare(o);
              }
            }
          }
          else{
            console.log("going up");
            console.log("gridRef: "+gridRef+" - this.previousGridRef: "+thisObj.previousGridRef);
            for(let j=thisObj.previousGridRef ; j>gridRef ; j+=10){
              thisObj.HighlightSquare(j);
            }
          }
        }
        if(diffY==0){
          //legal horizontal move
          if(diffX>0){
            for(var t=thisObj.previousGridRef;t<=gridRef;t++){
              thisObj.HighlightSquare(t);
              checkedLetters.push($("#block"+t).html());
              console.log("this.highlighting gridRef: "+t);
            }
            let checkedWord = checkedLetters.join("");
            let checkedWordBackwards = checkedLetters.reverse().join("");
            console.log("checkedWord: "+checkedWord);
            console.log("checkedwordBackwards: "+checkedWordBackwards);
            // check each word to see if it matches either checkedWord or checkedWordBackwards
            let foundWord = "";
            let found = false;
            let words = thisObj.removeDuplicates(thisObj.originalWords);
            words.forEach((word)=>{
              console.log("now checking: "+word);
              if(word == checkedWord){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else if(word==checkedWordBackwards){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else{
                console.log(word+" not found");
                console.log("found was: "+found);
                console.log(words);
              }
            });
            console.log("found: "+found);
            if(found){
              alert("correct! the word was "+foundWord);
            }else{
              alert("that was not a word");
              for(let o=thisObj.previousGridRef;o<=gridRef;o++){
                thisObj.RemoveHighlightSquare(o);
              }
            }
          }
          if(diffX<0){
            for(var t=thisObj.previousGridRef;t>=gridRef;t--){
              thisObj.HighlightSquare(t);
              checkedLetters.push($("#block"+t).html());
              console.log("this.highlighting gridRef: "+t);
            }
            let checkedWord = checkedLetters.join("");
            let checkedWordBackwards = checkedLetters.reverse().join("");
            console.log("checkedWord: "+checkedWord);
            console.log("checkedwordBackwards: "+checkedWordBackwards);
            // check each word to see if it matches either checkedWord or checkedWordBackwards
            let foundWord = "";
            let found = false;
            let words = thisObj.removeDuplicates(thisObj.originalWords);
            words.forEach((word)=>{
              console.log("now checking: "+word);
              if(word == checkedWord){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else if(word==checkedWordBackwards){
                found = true;
                foundWord = word;
                console.log("found "+word+"!");
                console.log("found was: "+found);
              }
              else{
                console.log(word+" not found");
                console.log("found was: "+found);
                console.log(words);
              }
            });
            console.log("found: "+found);
            if(found){
              alert("correct! the word was "+foundWord);
            }else{
              alert("that was not a word");
              for(var o=thisObj.previousGridRef;o>=gridRef;o--){
                thisObj.RemoveHighlightSquare(o);
              }
            }
          }
          else{
            console.log("gridRef: "+gridRef+" - this.previousGridRef: "+thisObj.previousGridRef);
            for(let j=thisObj.previousGridRef ; j>gridRef ; j--){
              thisObj.HighlightSquare(j);
            }
          }
        }
        else if(diffX!=0 && diffY!=0){
          //illegal move
          thisObj.RemoveHighlightSquare(thisObj.previousGridRef);
          thisObj.RemoveHighlightSquare(gridRef);
          console.log("illegal move");
          
        }

        
      }
      thisObj.previousGridRef = gridRef;
      thisObj.previousGridRefX = gridRefX;
      thisObj.previousGridRefY = gridRefY;
      thisObj.highlighting=true;
    });
  }

  ChooseRandomLetter(){
    let index = Math.random()*25;
    let letter = this.letters[Math.round(index)];
    return letter;
  }

  // from https://codehandbook.org/how-to-remove-duplicates-from-javascript-array/
  removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

}


