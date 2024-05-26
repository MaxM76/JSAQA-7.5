Feature: Buying tickets

    Scenario: User buys a few tickets
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient date 
    When User chooses convenient time
    When User books available seats
    Then User can see text "Вы выбрали билеты:"

    Scenario: User buys a vip ticket
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient date 
    When User chooses convenient time
    When User books vip seat
    Then User can see text "Вы выбрали билеты:"

    Scenario: User tries to book a taken seat
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient date 
    When User chooses convenient time
    When User books taken seat
    Then Button "Забронировать" is disabled
