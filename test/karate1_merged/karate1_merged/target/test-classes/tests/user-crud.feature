Feature: Full User API CRUD Integration

Scenario: Full CRUD flow for User

  # Base URL
  Given url 'http://localhost:3000/api/v1'

  # CREATE
  And path 'users'
  And request { name: 'User_1000', role: 'Tester' }
  When method post
  Then status 201
  * def createdId = response.id
  * print 'Created User ID:', createdId
  And match response.name == 'User_1000'
  And match response.role == 'Tester'

  # READ
  Given path 'users', createdId
  When method get
  Then status 200
  And match response.name == 'User_1000'
  And match response.role == 'Tester'

  # UPDATE
  Given path 'users', createdId
  And request { name: 'User_1000', role: 'Developer' }
  When method put
  Then status 200
  And match response.name == 'User_1000'
  And match response.role == 'Developer'

  # DELETE
  Given path 'users', createdId
  When method delete
  Then status 200

  # VERIFY DELETION
  Given path 'users', createdId
  When method get
  Then status 404