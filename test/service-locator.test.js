var
	ServiceLocator = require('../'),
	assert = require('assert');

describe('service-locator', function() {

	describe('#createServiceLocator()', function() {

		it('should return a object with a register function', function() {
			var serviceLocator = ServiceLocator.createServiceLocator();
			serviceLocator.register.should.be.a('function');
		});

		describe('#register()', function() {

			it('should throw error if no name is given', function() {
				var serviceLocator = ServiceLocator.createServiceLocator();
				(function() {
					serviceLocator.register();
				}).should.throw('You must provide a valid name for this service.');
			});

			it('should throw error if no service is given', function() {
				var serviceLocator = ServiceLocator.createServiceLocator();
				(function() {
					serviceLocator.register('Test');
				}).should.throw('You must provide a valid service for \'Test\'');
			});

			it('should throw error if service is already defined', function() {
				var serviceLocator = ServiceLocator.createServiceLocator();
				serviceLocator.register('Test', {});

				(function() {
					serviceLocator.register('Test', {});
				}).should.throw('Service \'Test\' already registered');
			});

			it('should allow function services', function() {
				var serviceLocator = ServiceLocator.createServiceLocator();
				
				serviceLocator.register('createDog', function() {
					return {
						name: 'Dog'
					};
				});

				serviceLocator.createDog.should.be.a('function');
				serviceLocator.createDog().name.should.equal('Dog');
			});

		});

	});

	describe('Registered Services', function() {

		it('should be as defined', function() {
			var serviceLocator = ServiceLocator.createServiceLocator();
			var foo = 'bar';
			serviceLocator.register('foobar', foo);
			serviceLocator.foobar.should.equal('bar');
		});

		it('should throw exception if modification is attempted', function() {
			var serviceLocator = ServiceLocator.createServiceLocator();
			var foo = 'bar';
			serviceLocator.register('foobar', foo);
			
			(function() {
				serviceLocator.foobar = 'cat';
			}).should.throw('You can not alter a registered service \'foobar\'');
			
		});

		// it('should not allow deletion', function() {
		// 	var serviceLocator = ServiceLocator.createServiceLocator();
		// 	var foo = 'bar';
		// 	serviceLocator.register('foobar', foo);
			
		// 	delete serviceLocator.foobar;
		// 	serviceLocator.foobar.should.equal('bar');
			
		// });

		it('should allow deletion', function() {
			var serviceLocator = ServiceLocator.createServiceLocator();
			var foo = 'bar';
			serviceLocator.register('foobar', foo);
			
			delete serviceLocator.foobar;
			assert.equal(undefined, serviceLocator.foobar);
			
		});

	});

});