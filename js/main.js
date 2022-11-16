var $formSearch = document.querySelector('.char-name-submit');
var $charInput = document.querySelector('.char-name-input');

$formSearch.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  characterName($charInput.value);
  $formSearch.reset();
}

function characterName(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character?name=' + data);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send();
}
