var Search = function(){
  this.searchElement = document.getElementById('search');
  this.searchType = document.getElementById('searchType');
  this.outputElement = document.getElementById('searchResults');
};

Search.prototype.setup = function(){
  this.searchElement.addEventListener(
    'change',
    this.doSearch.bind(
      this,
      this._getQueryType.bind(this),
      this._getQuery.bind(this),
      this._handleDoSearch.bind(this),
      this._failDoSearch.bind(this)
    )
  );
};

Search.prototype.doSearch = function(getQueryType, getQuery, loadCallBack, failCallBack){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', loadCallBack);
  xhr.addEventListener('error', failCallBack);
  xhr.open('GET',
    '/api/search?searchType='+encodeURIComponent(getQueryType())+
    '&searchTerm='+encodeURIComponent(getQuery())
    );
  xhr.send();
};

Search.prototype._handleDoSearch = function(xhrResponse){
  if(xhrResponse.currentTarget.status === 200){
    this._renderer(JSON.parse(arguments[0].currentTarget.response));
  }else {
    alert('You fucked up son');
  };
};

Search.prototype._failDoSearch =  function(){
  alert('IDK WHAT THE FUCK YOU DID');
};

Search.prototype._getQuery = function(){
  return this.searchElement.value;
};

Search.prototype._getQueryType = function(){
  return this.searchType.value;
};

Search.prototype._renderer = function(data){
  //clears past search results
  var outputElement = this.outputElement;
  while (outputElement.firstChild) {
    outputElement.removeChild(outputElement.firstChild);
  };

  if(data !== 'undefined' && data.length > 0) {
  //check to see if any results were returned
    data.forEach(
    //create table elements for each card matching search
      function(currentValue, index, array){
        this._createTableElement(currentValue);
      },
      this
    );
  } else {
    alert('No Matching Results Found. Please Search Again');
  };

};

Search.prototype._createTableElement = function(data){
  var name = data.name;
  var image = data.img;
  var text = data.text;
  var type = data.type;
  var rarity = data.rarity;
  var set = data.cardSet;
  var flavor = data.flavor;

  //create table row
  var newTableRow = document.createElement('tr');

  //create table cell for card image
  var newTableImageCell = document.createElement('td');
  //insert card image html into table cell
  newTableImageCell.innerHTML =
  '<img src='+image+
  ' alt='+name+
  ' title='+name+
  ' >';
  //append the table cell to the table row
  newTableRow.appendChild(newTableImageCell);

  //Create text elements for card data
  var nameElement = document.createElement('h3');
  nameElement.innerHTML = 'Name: '+name;
  var textElement = document.createElement('h4');
  textElement.innerHTML = 'Text: '+text;
  var typeElement = document.createElement('p');
  typeElement.innerHTML = 'Type: '+type;
  var rarityElement = document.createElement('p');
  rarityElement.innerHTML = 'Rarity: '+rarity;
  var setElement = document.createElement('p');
  setElement.innerHTML = 'Set: '+set;
  var flavorElement = document.createElement('p');
  flavorElement.innerHTML = 'Flavor: '+flavor;

  //create table cell for card text
  var newTableTextCell = document.createElement('td');
  //insert card text html into table cell
  newTableTextCell.appendChild(nameElement).appendChild(textElement)
    .appendChild(typeElement).appendChild(rarityElement)
    .appendChild(setElement).appendChild(flavorElement);
  //append the table cell to the table row
  newTableRow.appendChild(newTableTextCell);

  //append tablerow to outputElement
  this.outputElement.appendChild(newTableRow);
};
