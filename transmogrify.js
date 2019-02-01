
  const synonyms = {indexes: [], words: []
  }
  let newSynonyms = Object.create(synonyms);
  let amountOfSynonyms = 5;
  let twitterString = "Look at all of this stuff that I'm putting down in this string"; //dummy twitter string
  const bannedWords = ["in", "the", "at", "I'm", "we're", "this", "your", "these", "not", "of", "anything", "that"];//constantly increasing banned words.
  
  const twitterStrtoArr = function(string) { //Input the string to output an array.
    return string.split(" "); 
  }
  
  const randomize = function (array, num, synonymObject){//takes that twitter array, a number for amount of random words, and newSynonyms
    let chosenIndexes = [];
    let potentialIndex = 0;
    while (chosenIndexes.length < num){//We go through this until we've filled the chosenIndexes to be replaced.
      potentialIndex = Math.floor(Math.random() * Math.floor(array.length));
      /*
        Go through the array at random and choose an index. If that index has already been grabbed, or it's a banned word, skip.
      */
      if(chosenIndexes.includes(array[potentialIndex]) || bannedWords.includes(array[potentialIndex])){  
      } else {
        chosenIndexes.push(array[potentialIndex]);
        console.log(synonymObject.indexes);  
        synonymObject.indexes.push(potentialIndex);//add indexes to synonym object array for later use
      }
    }
    return chosenIndexes;
  }
  
  const indexesToWords = function(chosenIndexes) {//turns the indexes into words.
    let chosenWords = [];
    chosenIndexes.forEach(function (word){
      chosenWords.push(word);
    })
    console.log(chosenWords);
    return chosenWords;
  }
  
  function integrateSynonyms(twitterArray, newSynonyms){//takes new synonyms and forces them into the old array. Returns array (to be turned into a string)
    for(let i = 0; i< 5; i++){
      if(newSynonyms.words[i]!=="undefined"){
        twitterArray[newSynonyms.indexes[i]]=newSynonyms.words[i];
      } 
    }
    const newTwitterString = twitterArray.join(" ");
    return newTwitterString;
  }
  
  async function grabSynonyms(indexesToWords){
    const urls = [];
    const newWords = [];
    indexesToWords.forEach(function(word){
      urls.push(`https://wordsapiv1.p.mashape.com/words/${word}/synonyms`);
    })
    
    const urlPromises = urls.map(url =>$.ajax({
            url: url,
            method: 'GET',
            headers: {
              "X-Mashape-Key": "a4b964e282msh1e623fbe6a9e7a0p1ad416jsn793a80aeda68",
              "Accept": "application/json"
            }
      }));
      Promise.all(urlPromises).then(res => {
        for (const property in res) {
          newWords.push(res[property].synonyms[0]);  
        } 
        addWordsToSynonymObject(newWords, newSynonyms);
        console.log(newSynonyms.words);
        console.log(integrateSynonyms(twitterArray, newSynonyms));
      })
  }
  
  const addWordsToSynonymObject = function(newWords, newSynonyms) {
    newWords.forEach(function (word){
      newSynonyms.words.push(word);
    })
  }
  const arrayToString = function(twitterArray){
    twitterArray.join(" ");
  }
  
  
  let twitterArray = twitterStrtoArr(twitterString); //turn twitter array into variable
  console.log(twitterArray);
  let indexes = randomize(twitterArray, amountOfSynonyms, newSynonyms); //randomizes the indexes
  console.log(indexes);
  let wordstoSynonym = indexesToWords(indexes);
  console.log(grabSynonyms(wordstoSynonym));





// const sortBannedWords = function(array, counter) {
//   array.forEach(function (word){
//     if (bannedWords.includes(word)){
//       counter++;
//     }
//   })
//   return counter;
// }

// // const findSynonym = function(tweet) {
// //   let tweetArray = twitterStrtoArr(tweet);
// //   console.log(tweetArray);
// //   let bannedWords = 0;
// //   bannedWords = sortBannedWords(tweetArray, bannedWords);
// //   randomize(tweetArray, 5, bannedWords)
// // }

// // findSynonym(twitterString);

//end? tweetArray.join(" ")





