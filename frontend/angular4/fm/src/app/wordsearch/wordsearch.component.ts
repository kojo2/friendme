import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.css'],
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

  letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  usedWords = [];

  usedGridRefs = [];

  currentWordIndex = 0;

  wordsToTryAgain = [];

  counter=0;

  constructor() { }

  ngOnInit() {
    this.CreateBlocks();
    this.MainLoop();
  }

  CreateBlocks() {
    var i=0;
    document.write("<br>");
    for(var y=0; y<10; y++){
      for(var x=0;x<10;x++){
        document.write("<div class='block' id='block"+i+"'>"+"+"+"</div>");
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
              $("#block"+gridRef).css({"background-color":"pink"});
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
                $("#block"+gridRef).html("-");
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
              $("#block"+gridRef).css({"background-color":"green"});
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
                $("#block"+gridRef).html("-");
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
          /*$("#block"+gridRef).css({"background-color":"red"});
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
              $("#block"+gridRef).css({"background-color":"red"});
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
                $("#block"+gridRef).html("-");
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
              $("#block"+gridRef).css({"background-color":"orange"});
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
                $("#block"+gridRef).html("-");
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

  // $(".block").click(function(){
  //   console.log("FIRING AGAIN");
  //     let gridRef = parseInt($(this).attr("id").split("block")[1]);
  //     HighlightSquare(gridRef);
  //     let gridRefX = (gridRef%10)+1;
  //     let gridRefY = Math.ceil(gridRef/10);
  //     console.log("gridRef: "+gridRef+" - gridRefX: "+gridRefX+" - gridRefY: "+gridRefY);
  //     if(endpoint==1){
  //       previousGridRef = 0;
  //       color="yellow";
  //       endpoint=2;
  //     }
  //     else if(endpoint==2){
  //       color="yellow";
  //       endpoint=1;
  //     }
  //     if(previousGridRef>0){
  //       let diff = gridRef - previousGridRef;
  //       let diffX = gridRefX - previousGridRefX;
  //       let diffY = gridRefY - previousGridRefY;
  //       console.log("diffX: "+diffX+" - diffY: "+diffY);
  //       if(diffX==0){
  //         //legal vertical move
  //         if(diffY>0){
  //           for(var t=previousGridRef;t<gridRef;t+=10){
  //             HighlightSquare(t);
  //             console.log("HIGHLIGHTING gridRef: "+t);
  //           }
  //         }
  //         else{
  //           console.log("going up");
  //           console.log("gridRef: "+gridRef+" - previousGridRef: "+previousGridRef);
  //           for(let j=previousGridRef ; j>gridRef ; j-=10){
  //             HighlightSquare(j);
  //           }
  //         }
  //       }
  //       if(diffY==0){
  //         //legal horizontal move
  //         if(diffX>0){
  //           for(var t=previousGridRef;t<gridRef;t++){
  //             HighlightSquare(t);
  //             console.log("HIGHLIGHTING gridRef: "+t);
  //           }
  //         }
  //         else{
  //           console.log("gridRef: "+gridRef+" - previousGridRef: "+previousGridRef);
  //           for(let j=previousGridRef ; j>gridRef ; j--){
  //             HighlightSquare(j);
  //           }
  //         }
  //       }
  //       else if(diffX!=0 && diffY!=0){
  //         //illegal move
  //         console.log("illegal move");
          
  //       }
  
        
  //     }
  //     previousGridRef = gridRef;
  //     previousGridRefX = gridRefX;
  //     previousGridRefY = gridRefY;
  //     highlighting=true;
    
  // });

  ChooseRandomLetter(){
    let index = Math.random()*25;
    let letter = this.letters[Math.round(index)];
    return letter;
  }

}


