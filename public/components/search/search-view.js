var SearchView = {
  debounce : function (func, wait) {
    var timeout;
    return function () {
      var that = this, args = arguments;
      var later = function () {
        timeout = null;
        func.apply(that, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
  },
  render : function () {
    var that = this;
    AppTemplateCache.getTemplate('/components/search/search.html')
    .then(function (searchTemplate) {
      document.getElementsByTagName('Search')[0]
        .innerHTML = Mustache.render(searchTemplate,{});
      document.getElementsByClassName('search-term')[0].addEventListener(
        'keyup',
        that.debounce(that.change, 400)
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
