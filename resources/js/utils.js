import $ from 'jquery';

// added on 2022-12-08 by Tudor
// convert html to text but preserve line breaks
export function htmlToText(html) {
  if (!html) return ('');
  let text = html;
  text = text.replace(/\n/gi, "");
  text = text.replace(/<style([\s\S]*?)<\/style>/gi, "");
  text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
  text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
  text = text.replace(/<\/div>/gi, "\n");
  text = text.replace(/<\/li>/gi, "\n");
  text = text.replace(/<li.*?>/gi, "  *  ");
  text = text.replace(/<\/ul>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n");
  text = text.replace(/<br\s*[\/]?>/gi, "\n");
  text = text.replace(/<[^>]+>/gi, "");
  text = text.replace(/^\s*/gim, "");
  text = text.replace(/ ,/gi, ",");
  text = text.replace(/ +/gi, " ");
  text = text.replace(/\n+/gi, "\n");
  text = text.replaceAll("&nbsp;", " ");
  return text;
};

export function html_substring(str, start, length) {
  var countTags = 0;
  var returnString = "";
  var writeLetters = 0;
  while (!((writeLetters >= length) && (countTags == 0))) {
    var letter = str.charAt(start + writeLetters);
    if (letter == "<") {
      countTags++;
    }
    if (letter == ">") {
      countTags--;
    }
    returnString += letter;
    writeLetters++;
  }
  return returnString;
}



export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

// Transforms key/value pairs to FormData() object
export function toFormData(values = {}, method = 'POST') {
  const formData = new FormData();
  for (const field of Object.keys(values)) {
    formData.append(field, values[field]);
  }

  // NOTE: When working with Laravel PUT/PATCH requests and FormData
  // you SHOULD send POST request and fake the PUT request like this.
  // More info: http://stackoverflow.com/q/50691938
  if (method.toUpperCase() === 'PUT') {
    formData.append('_method', 'PUT');
  }

  return formData;
}


// search for a word when its clicked

const Alphabet = 'a-záàäåăâçèéëìíïĭîòóöșțşţùúüŭ';
const letter = '[' + Alphabet + ']';
const nonLetter = '[^' + Alphabet + ']';
let wwwRoot = getWwwRoot();


function getWwwRoot() {
  var pos = window.location.href.indexOf('/www/');
  if (pos == -1) {
    return '/';
  } else {
    return window.location.href.substr(0, pos + 5);
  }
}

export function searchClickedWord(event) {
  // if ($(event.target).is('abbr')) return false;
  var sel = '';
  // Gets clicked on word (or selected text if text is selected)
  var word = '';
  if (window.getSelection && (sel = window.getSelection()).modify) {
    // Webkit, Gecko
    var s = window.getSelection();
    if (s.isCollapsed) { // Do not redirect when the user is trying to select text
      s.modify('move', 'forward', 'character');
      s.modify('move', 'backward', 'word');
      s.modify('extend', 'forward', 'word');
      word = s.toString();
      s.modify('move', 'forward', 'character'); // clear selection
    }
  } else if ((sel = document.selection) && sel.type != 'Control') {
    // IE 4+
    var textRange = sel.createRange();
    if (!textRange.text) {
      textRange.expand('word');
      while (/\s$/.test(textRange.text)) {
        textRange.moveEnd('character', -1);
      }
      word = textRange.text;
    }
  }

  // Trim trailing dots
  var regex = new RegExp(nonLetter + '$', 'i');
  while (word && regex.test(word)) {
    word = word.substr(0, word.length - 1);
  }

  var source = $('.sourceDropDown').length ? $('.sourceDropDown').val() : '';
  if (source) {
    source = '-' + source;
  }

  if (word) {
    window.location = wwwRoot + '?search=' + encodeURIComponent(word);
  }
}
