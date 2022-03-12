onst db = {
    'SELECT': {
        accounts: [{id: 1, user: "user1", pass: "p455w0rd"}],
        stock: [{book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}]
    },
    'INSERT': {
        accounts: [],
        stock: []
    }

}

export { db }