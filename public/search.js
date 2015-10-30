var Search = function(){
  this.searchElement = document.getElementById('search');
  this.outputElement = document.getElementById('searchResults');
};

Search.prototype.setup = function(){
  this.searchElement.addEventListener(
    'change',
    this.doSearch.bind(
      this,
      this._getQuery.bind(this),
      this._handleDoSearch.bind(this),
      this._failDoSearch.bind(this)
    )
  );
};

Search.prototype.doSearch = function(getQuery, loadCallBack, failCallBack){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', loadCallBack);
  xhr.addEventListener('error', failCallBack);
  xhr.open('GET', '/api/search?searchTerm='+encodeURIComponent(getQuery()));
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

Search.prototype._renderer = function(data){
  data.forEach(function(currentValue, index, array){
    var newListElement = document.createElement('li');
    newListElement.innerHTML = currentValue.name;
    this.outputElement.appendChild(newListElement);
  }, this);
};
