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
