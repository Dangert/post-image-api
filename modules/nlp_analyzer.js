const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));
const stopwords_arr = require('stopwords').english

const regex = /[!"“#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const NUM_HIGHEST_SENTS = 2; // Has to be at least 1

removeStopwords = (tokens => {
  const no_sw_tokens = tokens.filter(t => !stopwords_arr.includes(t));
  return no_sw_tokens;
})

removePunctuation = function removePunctuation(string) {
  return string.replace(regex, '');
}

getKeywordsFromText = (text) => {
  let doc = nlp(text);
  // "Lemmatization" process
  doc.contractions().expand();
  doc.toLowerCase();
  doc.nouns().toSingular();
  doc.verbs().toInfinitive().toPresentTense();
  let tokens = doc.json();
  let keywords = ""
  tokens.forEach(t => {
    keywords += t.text + " ";
  });
  // Remove stopwords and punctuation
  keywords = removePunctuation(keywords).trim();
  keywords = removeStopwords(keywords.split(' '));
  return keywords;
}

getSentencesScores = (sentences) => {
  if (sentences.length <= NUM_HIGHEST_SENTS) {
    return sentences.map((s, i) => {return i;})
  }
  var dict = {}; // token -> number of its occurrences
  var max_value = 1;
  // Populate dict with terms from all sentences
  for (s of sentences) {
    for (token of s) {
      if (token in dict) {
        dict[token]++;
        if (dict[token] > max_value) {
          max_value++;
        }
      }
      else {
        dict[token] = 1;
      }
    }
  }
  // Calculate every sentence's score, based on the dict
  const score_per_sent = sentences.map(s => {
    var s_score = 0;
    s.forEach(token => {
      s_score += dict[token]/max_value;
    })
    return s_score;
  })
  return score_per_sent;
}

// Sort the sentences by their score and return the top NUM_HIGHEST_SENTS
getHighestScoredSents = (sents, scores) => {
  var scored_sents = sents.map((s, i) => {return [s, scores[i]];})
  var sorting_f = (a, b) => {return b[1] - a[1];}
  var sorted_sents = scored_sents.sort(sorting_f);
  const final_sents = sorted_sents.slice(0, NUM_HIGHEST_SENTS);
  return final_sents.map(s => {return s[0]});
}

// Main function - extract search terms/keywords from a text paragraph
getKeywordsFromParagraph = (text) => {
  let doc = nlp(text);
  let sentences = doc.sentences().json();
  let sents_keywords = sentences.map(s => getKeywordsFromText(s.text));
  let sentences_scores = getSentencesScores(sents_keywords);
  let highest_sents_keys = getHighestScoredSents(sents_keywords, sentences_scores)
  return Array.from(new Set(highest_sents_keys.flat())).join(' '); // Array of unique keywords taken from the highest scored sentences
}

module.exports = {
  getKeywordsFromParagraph
}
