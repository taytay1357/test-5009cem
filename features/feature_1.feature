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
    Then: I should see the "Stock Levels" top-level heading
        And: I should see an "Add Stock" button


Scenario: Checking the "Add Stock" button
    Given: I am logged into the "admin" account
        And: I am on the "Stock Levels" page
    When: I click the "Add Stock" button
    Then: I should see the "Add Stock" top-level heading
        And: I should see a form with multiple input fields

Scenario: Checking the correct input for "Add Stock" form fields
    Given: I am logged into the "admin" account
        And: I am on the "Add Stock" page
    When: I enter <data> into <fieldname>
    Then: I should see the "Stock Levels" top-level heading

    Examples:
    | fieldname | data |
    ---------------------
    | book_name | "Harry Potter and the Philosophers Stone"|
    | author    | "J.K.Rowling" |
    | date      | "19-04-2012"  |
    | isbn_13   | 98097897823   |
    | description| "Fantasy Novel" |
    | thumbnail | "./uploads/harry.jpg" |
    | retail_price | 12 |
    | trade_price  | 12 |
    | quantity     | 3  |

