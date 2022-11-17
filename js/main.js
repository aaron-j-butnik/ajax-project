var $formSearch = document.querySelector('.char-name-submit');
var $charInput = document.querySelector('.char-name-input');
var $welcomeBox = document.querySelector('.container-welcome-box');
var $resultsPage = document.querySelector('.results-container');
var $ul = document.querySelector('.results-list');
var $body = document.querySelector('body');
var $viewElements = document.querySelectorAll('.view');

$formSearch.addEventListener('submit', handleSubmit);
window.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  if (event.target.matches('.btn-search')) {
    for (var i = 0; i < $viewElements.length; i++) {
      if ($welcomeBox.getAttribute('data-view') === $viewElements[i].getAttribute('data-view')) {
        $viewElements[i].classList.add('hidden');
        $body.classList.remove('homepage-bg');
        $body.classList.add('results-bg');
      } else {
        $viewElements[i].classList.remove('hidden');
      }
    }
    data.view = 'results-page';
  }
  if (event.target.matches('.link-home')) {
    for (var j = 0; j < $viewElements.length; j++) {
      if ($resultsPage.getAttribute('data-view') === $viewElements[j].getAttribute('data-view')) {
        $viewElements[j].classList.add('hidden');
        $body.classList.add('homepage-bg');
        $body.classList.remove('results-bg');
      } else {
        $viewElements[j].classList.remove('hidden');
      }
    }
    data.view = 'home-page';
  }
}

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

  var img = document.createElement('img');
  img.setAttribute('src', response.image);
  img.setAttribute('class', 'image');

  var p1 = document.createElement('p');
  p1.textContent = 'Name: ' + response.name;
  p1.setAttribute('class', 'name');

  var p2 = document.createElement('p');
  p2.textContent = 'Status: ' + response.status;
  p2.setAttribute('class', 'status');

  li.appendChild(img);
  li.appendChild(p1);
  li.appendChild(p2);

  return li;
}
