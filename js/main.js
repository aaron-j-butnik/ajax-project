var $formSearch = document.querySelector('.char-name-submit');
var $charInput = document.querySelector('.char-name-input');
var $welcomeBox = document.querySelector('.container-welcome-box');
var $results = document.querySelector('.results-container');
var $ul = document.querySelector('.results-list');
var $body = document.querySelector('body');
var $logoBtn = document.querySelector('.link-home');

$formSearch.addEventListener('submit', handleSubmit);
$logoBtn.addEventListener('click', handleHomePage);

function handleHomePage(event) {
  $welcomeBox.classList.remove('hidden');
  $results.classList.add('hidden');
  $body.classList.add('homepage-bg');
  $body.classList.remove('results-bg');
}

function handleSubmit(event) {
  event.preventDefault();
  characterName($charInput.value);
  $formSearch.reset();
  $welcomeBox.classList.add('hidden');
  $results.classList.remove('hidden');
  $body.classList.remove('homepage-bg');
  $body.classList.add('results-bg');
}

function characterName(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character?name=' + data);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var getResponse = xhr.response.results;
    $ul.textContent = '';
    for (var i = 0; i < getResponse.length; i++) {
      $ul.appendChild(getResults(getResponse[i]));
    }
  });
  xhr.send();
}

function getResults(response) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-half');

  // var div = document.createElement('div');
  // div.setAttribute('class', 'column-full');

  var img = document.createElement('img');
  img.setAttribute('src', response.image);
  img.setAttribute('class', 'image');

  var p1 = document.createElement('p');
  p1.textContent = 'Name: ' + response.name;
  p1.setAttribute('class', 'name');

  var p2 = document.createElement('p');
  p2.textContent = 'Status: ' + response.status;
  p2.setAttribute('class', 'status');

  // li.appendChild(div);
  li.appendChild(img);
  li.appendChild(p1);
  li.appendChild(p2);

  return li;
}

window.addEventListener('DOMContentLoaded', handlePageRefresh);

function handlePageRefresh(event) {

}
