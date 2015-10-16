var Search = function(){
  this.searchElement = document.getElementById('search');
  this.outputElement = document.getElementById('searchResults');
};

Search.prototype.setup = function(){
  this.searchElement.addEventListener(
    'change',
    this.doSearch.bind(this,this._getQuery.bind(this),this._handleDoSearch.bind(this))
  );
};

Search.prototype.doSearch = function(getQuery, loadCallBack){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', loadCallBack);
  xhr.open('GET', '/api/search?searchTerm='+encodeURIComponent(getQuery()));
  xhr.send();
};

Search.prototype._handleDoSearch = function(xhrResponse){
  if(xhrResponse !== '404'){
    alert('You fucked up son');
  };
};

Search.prototype._getQuery = function(){
  return this.searchElement.value;
};
