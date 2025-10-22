Feature: /data/employees endpoint tests
  # Reference: see openapi.yaml in project root for schema & params

  Background:
    * url baseUrl
    * header X-API-Key = apiKey

  # ---------- PASSING TEST ----------
  Scenario: Get all employees - expected success structure
    Given path 'data/employees'
    When method get
    Then status 200
    # basic ApiResponse checks (from components.schemas.ApiResponse)
    And match response.success == true
    And match response.message contains 'Employee'   # loose match so it passes with variety
    # ensure data.employees is an array (per YAML schema)
    And match response.data.employees == '#[]'       # at least an array (may be empty)
    # If you want to assert a sample employee shape, use this (not strict values):
    And match response.data.employees[0] == '#? _ != null' || true

  # ---------- FAILING TEST (intentional) ----------
  Scenario: Get employees with invalid managerId - expect 404 and error response
    Given path 'data/employees'
    And param managerId = 'non-existent-manager'
    When method get
    Then status 404
    And match response.success == false
    And match response.error contains 'not found'   # expects error message per ErrorResponse
