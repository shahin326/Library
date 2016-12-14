var app = angular.module('BookLibrary');

app.factory('Book', ['$resource', function($resource) {
  return $resource('/api/books/:id.json', { id: '@id' }, {
    update: { method: 'PUT' },
    search: {
      method: 'GET',
      isArray: true,
      url: '/api/books/search.json',
      params: {
        query: '@query'
      }
    },
    delete: {
      action: 'destroy',
      method: 'DELETE',
      url: '/api/books/:id.json',
      params: {
        id: '@id'
      }
    }
  });
}]);
