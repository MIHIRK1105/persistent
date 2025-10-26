Feature: Full CRUD API Integration Test

  Background:
    * url 'http://localhost:3000/api/v1'

  Scenario: Create, Read, Update, Delete a user

    # CREATE
    Given path 'users'
    And request { name: 'User_1000', role: 'Tester' }
    When method post
    Then status 201
    * def createdId = response.id
    * print 'Created User ID:', createdId

    # READ
    Given path 'users', createdId
    When method get
    Then status 200
    And match response == { id: '#(createdId)', name: 'User_1000', role: 'Tester' }

    # UPDATE
    Given path 'users', createdId
    And request { name: 'User_Updated', role: 'Tester' }
    When method put
    Then status 200
    And match response == { id: '#(createdId)', name: 'User_Updated', role: 'Tester' }

    # DELETE
    Given path 'users', createdId
    When method delete
    Then status 200

    # VERIFY DELETE
    Given path 'users', createdId
    When method get
    Then status 404