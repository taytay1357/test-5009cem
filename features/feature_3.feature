Feature: 3

Scenario: Checking the Home Screen displays the correct data
    Given: I am logged into a "user" account
        And: I am on the "Home" page
    When: I view the page
    Then: I should see <data_name> for each book

    Examples: 
        | data_name |
        -------------
        | thumbnail |
        | book_name |


Scenario: Checking that each book has an add to cart button
    Given: I am logged into a "user" account
        And: I am on the "Home" page
    When: I view each book
    Then: I should see an "add to cart" button

Scenario: Checking that the number of items in the users cart is displayed
    Given: I am logged into the "user" account
        And: I am on the "Home" page
    When: I view the page
    Then: I should see "number of items" in the users cart

Scenario: Checking that the total cost of the users cart is displayed on the homepage
    Given: I am logged into the "user" account
        And: I am on the "home" page
    When: I view the page
    Then: I should see the "total cost" displayed next to the cart icon

Scenario: Checking that there is a cart icon on the homepage
    Given: I am logged into a "user" account
        And: I am on the "Home" page
    When: I view the page
    Then: I should see a cart icon

Scenario: Checking that the add to cart button works
    Given: I have pressed the "add cart" button
        And: I am logged into a "user" account
    When: I navigate to the "Your Cart" screen
    Then: I should see <data_name> for each book added.

    Examples: 
        | data_name |
        -------------
        | book_name |
        | thumbnail |
        | unit_price|
        | quantity  |

Scenario: Checking that the user can navigate to their cart
    Given: I am logged into a "user" account
        And: I am on the homepage
    When: I click on the "Cart Icon"
    Then: I should see the "Your Cart" top-level heading