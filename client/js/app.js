var app = angular.module('app', ['ngRoute', 'ngStorage'])
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/prompt.html'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/new_question', {
		templateUrl: 'partials/new_question.html'
	})
	.when('/question/:id', {
		templateUrl: 'partials/question.html'
	})
	.when('/question/:id/answer', {
		templateUrl: 'partials/new_answer.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})

app.factory('userFactory', ['$http', '$location', '$route', '$localStorage', function($http, $location, $route, $localStorage) {
	console.log('userFactory loaded!')
	return{

		create: function(user, callback){
				console.log('in userFactory.create', user)
				$http.post('/users', user).then(function(response){
					$localStorage.currentUser = response.data;
					callback($localStorage.currentUser);
				})
				$location.path('/dashboard')
		},
		readUser: function(callback) {
			if($localStorage.hasOwnProperty('currentUser')){
				callback($localStorage.currentUser);
			}else{
				$location.path('/');
			}
		},
		logout: function(callback){
			delete $localStorage.currentUser; 
			callback($localStorage.currentUser);
			$location.path('/');
		}
	}
}])

app.factory('questionFactory', ['$http', '$location', function($http, $location){
	console.log('questionFactory loaded')
	return{
		create: function(question, callback){
			console.log('in questionFactory.create', question)
			$http.post('/questions', question).then(function(response){
				callback(response);
			})
			$location.path('/dashboard')
		},
		index: function(success){
			console.log('in questionFactory.index');
			$http.get('/questions').then(success);
		},
		show: function(id, success){
			console.log('in questionFactory.show')
			$http.get('/questions/' + id).then(success)
		},
		answer: function(answer, id, success){
			console.log('in questionFactory.answer', answer)
			$http.post('/questions/' + id + '/answer', answer).then(success)
			$location.path('/dashboard')
		},
		updateAnswer: function(id, answer, success){
			console.log('in questionFactory.updateAnswer', id, answer)
			$http.put('/answers/' + id, answer).then(success)
		}
	}
}])


app.controller('userController', function($scope, userFactory) {

	function getUser() {
		userFactory.readUser(function(data) {
		$scope.user = data;
		})
	}

	getUser();

	$scope.enter = function(user){
		console.log('enter function fired', user)
		userFactory.create(user, function(response){
			console.log('success!', response)
			getUser();
		})
	}

	$scope.logout = function(){
		console.log('logout fires')
		userFactory.logout(function(response){
			console.log('you logged out');
		})
	}

})

app.controller('questionController', function($scope, questionFactory){
	console.log('questionController loaded')

	function getQuestions(){
    	console.log('getting the questions...')
    	questionFactory.index(function(response){
      		console.log("response from questionFactory.index:", response);
      		$scope.questions = response.data;
    	})
  	}
  
  	getQuestions();

	$scope.createQ = function(question){
		console.log('createQ fires', question)
		questionFactory.create(question, function(response){
			console.log('response from factory:', response)
		})
		$scope.question = {};
	}
})

app.controller('questionDetailsController', function($scope, $routeParams, questionFactory){
	console.log('questionDetailsController loaded...')
	console.log($routeParams)

	function getQuestion(){
		questionFactory.show($routeParams.id, function(response){
			console.log('getting the one question', response)
			$scope.question = response.data;
		})
	}

	getQuestion();

	$scope.answer = function(answer){
		answer.name = $scope.user.name;
		answer.likes = 0;
		console.log('in answer function:', answer)
		questionFactory.answer(answer, $routeParams.id, function(response){
		})
		$scope.newAnswer = {};
	}

	$scope.like = function(id, answer){
		answer.likes++;
		console.log('like function fires...answer id: ', id, answer);
		questionFactory.updateAnswer(id, answer, function(response){
			console.log('response from questionFactory:', response)
		})
	}

})