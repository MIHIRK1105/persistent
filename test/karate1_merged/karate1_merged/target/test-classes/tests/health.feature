Feature: Test local API

  Scenario: Get users from local API
    Given url 'http://localhost:3000/api/v1/users'
    When method get
    Then status 200
    And match response == [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
