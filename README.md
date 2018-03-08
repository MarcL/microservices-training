# Microservices

*   Aggregate root
*   Gateway
*   Events flying through the system

## Event

*   ID
*   Type
*   Time
*   Payload

## Circuit Breaker
* Start -> Closed
* If fails -> Open
* Ever 5 seconds -> Half Open
* If works -> Closed