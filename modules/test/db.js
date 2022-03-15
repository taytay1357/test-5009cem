const db = {
    'SELECT': {
        accounts: [
            {
                id: 1, user: "user1", pass: "p455w0rd"
            }
        ],
        stock: [
            {
                book_title: "Harry Potter", 
                author: "J.K.Rowling", 
                publication_date: "19/06/1972", 
                isbn: 83974893749, 
                description: "Fantasy Novel", 
                filepath: "./uploads/harry.jpg", 
                trade_price: 21, 
                retail_price: 21, 
                quantity: 10
            }
        ]
    },
    'INSERT': {
        accounts: [
            {
                id: 2, user: "user2", pass: "p455w0rd"
            }
        ] ,
        stock: [
            {
                book_title: "Pride and Prejudice", 
                author: "Jane Austen", 
                publication_date: "19/06/1972", 
                isbn: 5355252525, 
                description: "History", 
                filepath: "./uploads/pride.jpg", 
                trade_price: 11, 
                retail_price: 11, 
                quantity: 10
            }
        ]
    },
    'UPDATE': {
        accounts: [
            {
                id: 5, user: "user7", pass: "chilli"
            }
        ],
        stock: [
            {
             book_title: "Harry Potter", 
                author: "J.K.Rowling", 
                publication_date: "19/06/1972", 
                isbn: 83974893749, 
                description: "Fantasy Novel", 
                filepath: "./uploads/harry.jpg", 
                trade_price: 21, 
                retail_price: 21, 
                quantity: 10
            }
        ]
    }

}

export { db }