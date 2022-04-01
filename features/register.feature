@navigation

Scenario: Checking that you can navigate to register page from login page
    Given: I am on the "login" page
    When: I click the "Register" link
    Then: I should see the Register top level heading

Scenario: user enters correct username/password
    Given: I am on the "register" page
    When: I enter <username> into <fieldname> 
        And: I enter <password> into <fieldname>
    Then: I should see the Log In as top level heading
    But: Not see the "Register" top level heading

Scenario: user enters incorrect username/password
    Given: I am on the "register" page
    When: I enter <username> into <fieldname>
        And: I enter <password> into <fieldname>
    Then: I should see the Register top level heading