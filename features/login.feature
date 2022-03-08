@navigation

Scenario: Checking that you can navigate to login page from homepage
    Given: I am on the "homepage"
    When: I click the "Login"
    Then: I should see the Log In top level heading

Scenario: user logs in with correct username/password
    Given: I am on the "Login" page
    When: I enter <username> into <fieldname> 
        And: I enter <password> into <fieldname>
    Then: I should see the Foo Bar as top level heading
    But: Not see the login page

Scenario: user logs in with incorrect username/password
    Given: I am on the "Login" page
    When: I enter <username> into <fieldname>
        And: I enter <password> into <fieldname>
    Then: I should see the Log In top level heading