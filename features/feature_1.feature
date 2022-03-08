Feature: 1

Scenario: Checking the "admin account" is created
    Given: I am on the "login" page
    When: I enter the admin login details
        And: I click the login button
    Then: I should see the "Stock Levels" tab on the "Homepage"


Scenario: Checking the "Stock Levels" tab
    Given: I am logged into the "admin" account
        And: I am on the "Home" page
    When: I click the "Stock Levels" tab
    Then: It should take me to a "Stock Levels" page
        And: I should see an "Add Stock" button


Scenario: Checking the "Add Stock" button
    Given: I am logged into the "admin" page
        And: I am on the "Stock Levels" page
    When: I click the "Add Stock" button
    Then: It should take me to a "Add Stock" page
        And: I should see a form with multiple input fields
