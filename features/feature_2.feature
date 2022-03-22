Feature: 2

Scenario: Checking that the "Stock Levels" screen shows correct data
    Given: I am logged into the "admin" account
    When: I navigate to the "Stock Levels" screen
    Then: I should see the "Stock Levels" top-level heading
        And: I should see <data_name> for each book.

    Examples: 
        | data_name |
        -------------
        | thumbnail |
        | book_name |
        | isbn_13   |
        | quantity  |
