# REST API project
DATE: 30/12/2022
## Description
This was one of my first introductions to RESTful APIs. I decided to follow a tutorial to further understand the topic. The result of this can be seen in the code,
which is a host that accepts CURD requests to make changes to a file. The context of the idea is a library that needs to keep track of books.
## Accepted commands
The following 'commands' will return a response from the api:
 - A GET to '/books' - This returns a list of all of the saved books
 - A GET to '/books/:id' - This returns a specific book by the 'id'
 - A POST to '/books' - This will add a new book to the system
 - A PUT to '/books/:id' - This will allow the user to update a specific book with id 'id'
 - A DELETE to '/books/:id' - This allows the user to delete the book with 'id'
## Quick information
 - This project was written in JavaScript
 - Node.js was used in conjunction with the express framework
