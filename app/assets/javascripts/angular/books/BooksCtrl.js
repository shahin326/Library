var app = angular.module('BookLibrary');

app.controller('BooksCtrl', ['$scope', 'Book', function($scope, Book) {
  $scope.books = Book.query();

  $scope.editing = {};


$scope.toggleForm = function(book) {
      if (book.id === $scope.editing.id) {
        return 'form';
      }
      else {
        return 'row';
      }
};

$scope.editBook = function(book) {
  $scope.editing = angular.copy(book);
};

$scope.updateBook = function(index) {
  Book.update($scope.editing,
    function(response, _headers) {
      $scope.books[index] = angular.copy($scope.editing);
      $scope.hideForm();
    },
    function(response) {
      alert('Errors: ' + reponse.data.errors.join('. '));
    }
  );
};

$scope.hideForm = function() {
    $scope.editing = {};
};

$scope.addBook = function() {
    if (!valid()) { return false; }

    Book.save($scope.book,
      function(response, _headers) {
        $scope.books.push(response);
      },
      function(response) {
        alert('Errors: ' + response.data.errors.join('. '));
      }
    );

    $scope.book = {};
};

$scope.filterBooks = function() {
  Book.search({query: $scope.search},
    function(response, _headers) {
      $scope.books = response;
    }
  );
};

$scope.destroyBook = function(book, index) {
   Book.delete(book,
     function(response, _headers) {
       $scope.books.splice(index, 1);
     }
   );
 };

 $scope.reservBook = function(book, index) {
   Book.update($scope.book,
     function(response, _headers) {
       $scope.books[index] = book;
       $scope.hideForm();
     },
     function(response) {
       alert('Errors: ' + reponse.data.errors.join('. '));
     }
   );
  };

  // checks if all inputs have been filled, if not it returns false.
    valid = function() {
      return !!$scope.book &&
        !!$scope.book.title && !!$scope.book.author &&
        !!$scope.book.description && !!$scope.book.reserved;
    }

}]);
