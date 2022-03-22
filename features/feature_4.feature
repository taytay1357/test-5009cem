Feature: 4

Scenario: Checking that the user can navigate to the homepage from the cart page
    Given: I am logged into a "user" account
        And: I am on the "cart" page
    When: I click on the "home" page link
    Then: I should see the "Home" top-level heading


Scenario: Checking that the cart page displays the correct data
    Given: I am logged into a "user" account
        And: I am on the cart page
    When: I view the page
    Then: I should see <data_name> for all books added.
        And: I should see the "total cost" inside the cart

    Examples:
        | data_name |
        --------------
        | book_name |
        | thumbnail |
        | unit_price|
        | quantity  |

Scenario: Checking that each book added has a delete button alongside items
    Given: I am logged into a "user" account
        And: I am on the cart screen
    When: I view the page
    Then: I should see a "delete" button next to each record added to the cart

Scenario: Checking that the delete button works
    Given: I am logged into a "user" account
        And: I am on the cart page
    When: I click the "delete" button
    Then: The record should no longer shows

Scenario: Checking that the cancel cart button exists
    Given: I am logged into a "user" account
        And: I am on the cart page
    When: I view the page
    Then: I should see the "Cancel Cart" button


Scenario: Checking that the cancel cart button works
    Given: I am logged into a "user" account
        And: I am on the cart page
    When: I click on the "Cancel Cart" button
    Then: I should see the "Home" top-level heading
        And: The records in the cart should dissapear
        