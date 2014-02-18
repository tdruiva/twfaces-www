angular.module('facesQuizApp.service').
	factory('PubSub', ['$rootScope', function ($rootScope) {

		var PubSub = function(){
			this.trigger = $rootScope.$new();
			this.listener = this.trigger.$new(true);
		}

		PubSub.prototype.on = function(eventName, callback) {
			this.listener.$on(eventName, function(event, data){
				callback(eventName, data);
			});
		}

		PubSub.prototype.off = function(eventName) {
			this.listener.$$listeners[eventName] = undefined;
		}

		PubSub.prototype.broadcast = function(eventName, args){
			this.trigger.$broadcast(eventName, args)
		}

		return PubSub;
	}]);