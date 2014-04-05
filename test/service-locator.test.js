var serviceLocator = require('..')

describe('service-locator', function() {

	describe('#init', function() {

		it('should return a object with a register function', function() {
			var sl = serviceLocator()
			sl.register.should.be.type('function')
		})

		describe('#register()', function() {

			it('should throw error if no name is given', function() {
				var sl = serviceLocator();
				(function() {
					sl.register()
				}).should.throw('You must provide a valid name for this service.')
			})

			it('should throw error if no service is given', function() {
				var sl = serviceLocator();
				(function() {
					sl.register('Test')
				}).should.throw('You must provide a valid service for \'Test\'')
			})

			it('should throw error if service is already defined', function() {
				var sl = serviceLocator()
				sl.register('Test', {});

				(function() {
					sl.register('Test', {})
				}).should.throw('Service \'Test\' already registered')
			})

			it('should allow function services', function() {
				var sl = serviceLocator()

				sl.register('createDog', function() {
					return {
						name: 'Dog'
					}
				})

				sl.createDog.should.be.type('function')
				sl.createDog().name.should.equal('Dog')
			})

		})

	})

	describe('Registered Services', function() {

		it('should be as defined', function() {
			var sl = serviceLocator()
			var foo = 'bar'
			sl.register('foobar', foo)
			sl.foobar.should.equal('bar')
		})

		it('should throw exception if modification is attempted', function() {
			var sl = serviceLocator()
			var foo = 'bar'
			sl.register('foobar', foo);

			(function() {
				sl.foobar = 'cat'
			}).should.throw('You can not alter a registered service \'foobar\'')

		})

		it('should not allow deletion', function() {
			var sl = serviceLocator()
			var foo = 'bar'
			sl.register('foobar', foo)

			delete sl.foobar
			sl.foobar.should.equal('bar')

		})

	})

})
