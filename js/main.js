var $formSearch = document.querySelector('.char-name-submit');
var $charInput = document.querySelector('.char-name-input');
var $homePage = document.querySelector('.container-welcome-box');
var $resultsPage = document.querySelector('.results-container');
var $detailsPage = document.querySelector('.container-details');
var $ul = document.querySelector('.results-unordered-list');
var $body = document.querySelector('body');
var $viewElements = document.querySelectorAll('.view');
var $btnSearch = document.querySelector('.btn-search');
var $linkHome = document.querySelector('.link-home');

$btnSearch.addEventListener('click', handleSearchClick);
function handleSearchClick(event) {
  for (var i = 0; i < $viewElements.length; i++) {
    if ($homePage.getAttribute('data-view') === $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].classList.add('hidden');
      $body.classList.remove('homepage-bg');
      $body.classList.add('results-bg');
    } else {
      $viewElements[i].classList.remove('hidden');
    }
  }
  data.view = 'results-page';
}

$linkHome.addEventListener('click', handleHomeLinkClick);
function handleHomeLinkClick(event) {
  for (var j = 0; j < $viewElements.length; j++) {
    if ($resultsPage.getAttribute('data-view') === $viewElements[j].getAttribute('data-view')) {
      $viewElements[j].classList.add('hidden');
      $body.classList.add('homepage-bg');
      $body.classList.remove('results-bg');
      $detailsPage.classList.add('hidden');
      $databasePage.classList.add('hidden');
    } else {
      $viewElements[j].classList.remove('hidden');
    }
  }
  data.view = 'home-page';
}

$formSearch.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  searchByName($charInput.value);
  $formSearch.reset();
}

function searchByName(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character?name=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var characters = xhr.response.results;
    $ul.textContent = '';
    for (var i = 0; i < characters.length; i++) {
      $ul.appendChild(getCharacterLi(characters[i]));
    }
  });
  xhr.send();
}

function getCharacterLi(character) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-half results-list-items');
  li.setAttribute('data-character-id', character.id);

  var div = document.createElement('div');
  div.setAttribute('class', 'container-list-item');

  var img = document.createElement('img');
  img.setAttribute('src', character.image);
  img.setAttribute('class', 'results-list-image');

  var p1 = document.createElement('p');
  p1.textContent = 'Name: ' + character.name;
  p1.setAttribute('class', 'name');

  var characterData = {};

  characterData.name = character.name;
  characterData.status = character.status;
  characterData.species = character.species;
  characterData.gender = character.gender;
  characterData.origin = character.origin;
  characterData.location = character.location;
  characterData.image = character.image;
  characterData.charID = character.id;

  data.entries.push(characterData);

  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(p1);

  return li;
}

$ul.addEventListener('click', handleLiClick);

function handleLiClick(event) {

  var liCharacter = event.target.closest('[data-character-id]');

  var $nameLi = document.querySelector('.container-details .name');
  var $statusLi = document.querySelector('.container-details .status');
  var $speciesLi = document.querySelector('.container-details .species');
  var $genderLi = document.querySelector('.container-details .gender');
  var $originLi = document.querySelector('.container-details .origin');
  var $locationLi = document.querySelector('.container-details .location');
  var $detailsImg = document.querySelector('.container-details .details-img');
  var $detailsRow = document.querySelector('.container-details .detail-row');

  for (var i = 0; i < data.entries.length; i++) {
    if (Number(liCharacter.getAttribute('data-character-id')) === data.entries[i].charID) {
      $nameLi.textContent = 'Name: ' + data.entries[i].name;
      $statusLi.textContent = 'Status: ' + data.entries[i].status;
      $speciesLi.textContent = 'Species: ' + data.entries[i].species;
      $genderLi.textContent = 'Gender: ' + data.entries[i].gender;
      $originLi.textContent = 'Origin: ' + data.entries[i].origin.name;
      $locationLi.textContent = 'Last Known Location: ' + data.entries[i].location.name;
      $detailsImg.setAttribute('src', data.entries[i].image);
      $detailsRow.setAttribute('data-character-id', data.entries[i].charID);
    }
  }

  $resultsPage.classList.add('hidden');
  $homePage.classList.add('hidden');
  $detailsPage.classList.remove('hidden');
  data.view = 'details-page';
}

var $btnAdd = document.querySelector('.add-to-database');
var $divDatabaseCharImg = document.querySelector('.database-char-img');
var $databasePage = document.querySelector('.container-database-page');

$btnAdd.addEventListener('click', handleAddToDatabase);

function handleAddToDatabase(event) {

  var databaseCharacter = event.target.closest('[data-character-id]');

  for (var i = 0; i < data.entries.length; i++) {
    if (Number(databaseCharacter.getAttribute('data-character-id')) === data.entries[i].charID) {
      data.database = data.entries[i];
    }
  }
  $divDatabaseCharImg.appendChild(getPersonalDatabaseImgLi(data.database));

  $resultsPage.classList.add('hidden');
  $homePage.classList.add('hidden');
  $detailsPage.classList.add('hidden');
  $databasePage.classList.remove('hidden');
  data.view = 'database-page';
}

function getPersonalDatabaseImgLi(dataEntries) {
  var databaseDivCard = document.createElement('div');
  databaseDivCard.setAttribute('class', 'column-half card');

  var databaseDivCardInner = document.createElement('div');
  databaseDivCardInner.setAttribute('class', 'card-inner');
  databaseDivCardInner.setAttribute('data-character-id', dataEntries.charID);

  var databaseDivCardFront = document.createElement('div');
  databaseDivCardFront.setAttribute('class', 'card-face card-front');

  var databaseImg = document.createElement('img');
  databaseImg.setAttribute('src', dataEntries.image);

  var databaseDivCardBack = document.createElement('div');
  databaseDivCardBack.setAttribute('class', 'card-face card-back');

  var databaseDivCardBackContent = document.createElement('div');
  databaseDivCardBackContent.setAttribute('class', 'card-back-content');

  var databaseName = document.createElement('span');
  databaseName.textContent = 'Name: ' + dataEntries.name;
  databaseName.setAttribute('class', 'name');

  var databaseStatus = document.createElement('span');
  databaseStatus.textContent = 'Status: ' + dataEntries.status;
  databaseStatus.setAttribute('class', 'status');

  var databaseSpecies = document.createElement('span');
  databaseSpecies.textContent = 'Species: ' + dataEntries.species;
  databaseSpecies.setAttribute('class', 'species');

  var databaseGender = document.createElement('span');
  databaseGender.textContent = 'Gender: ' + dataEntries.gender;
  databaseGender.setAttribute('class', 'gender');

  var databaseOrigin = document.createElement('span');
  databaseOrigin.textContent = 'Origin: ' + dataEntries.origin.name;
  databaseOrigin.setAttribute('class', 'origin');

  var databaseLocation = document.createElement('span');
  databaseLocation.textContent = 'Last Known Location: ' + dataEntries.location.name;
  databaseLocation.setAttribute('class', 'location');

  databaseDivCard.appendChild(databaseDivCardInner);
  databaseDivCardInner.appendChild(databaseDivCardFront);
  databaseDivCardFront.appendChild(databaseImg);

  databaseDivCardInner.appendChild(databaseDivCardBack);
  databaseDivCardBack.appendChild(databaseDivCardBackContent);
  databaseDivCardBackContent.appendChild(databaseName);
  databaseDivCardBackContent.appendChild(databaseStatus);
  databaseDivCardBackContent.appendChild(databaseSpecies);
  databaseDivCardBackContent.appendChild(databaseGender);
  databaseDivCardBackContent.appendChild(databaseOrigin);
  databaseDivCardBackContent.appendChild(databaseLocation);

  return databaseDivCard;
}
