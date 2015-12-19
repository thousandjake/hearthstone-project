var SearchView = {
  debounce : function (func, wait) {
    var timeout;
    return function () {
      var that = this, args = arguments;
      var later = function () {
        timeout = null;
        func.apply(that, args);
      }
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
  },
  render : function () {
    that = this;
    AppTemplateCache.getTemplate('Search', '/components/search/search.html')
    .catch(function () {
      console.error('failed to get template from server');
    }).then(function (searchTemplate) {
      [].slice.call(document.getElementsByTagName('Search'))
      //cast HTML collection returned by response to an array
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(searchTemplate,{});
        });
        document.getElementsByClassName('search-term')[0].addEventListener(
          'keyup',
          that.debounce(that.change.bind(), 400)
        );
    });
  },
  change : function () {
    if(document.getElementsByClassName('search-term')[0].value !== '') {
      AppDispatcher.dispatch(
        'need-data',
        {searchTerm : document.getElementsByClassName('search-term')[0].value,
          searchType: document.getElementsByClassName('search-type')[0].value});
    };
  }
};

AppDispatcher.register('dom-load', SearchView.render.bind(SearchView));
