# Customer-to-Customer Loan Application

## Description
This platform allows customers to request and take loans without central authority. All transactions and negotiations happen between customer to customer.

## Features
- Registration (with documents uploading) and log in.
- Customers can borrow a loan by creating a loan request.
- Listing out requested loans to all customers on this platform.
- Customers can lend loans to the requested customers by accepting the loan.
- Negotiations on tenure and interest rates are done by using the modify option of a loan request.
- Email will be sent to the lender and borrower after a successful transaction and for loan modification requests.

## Tech-stack
- React.js for frontend
- Node.js (Express.js) for backend
- MongoDB database used to store data

## Screenshots
#### Home
![home](https://github.com/partheev/c2c-loan-platform/assets/30794881/c5eb6d90-bc13-403d-b7b1-9d732815a36d)

#### Profile Screen
![profile-screen](https://github.com/partheev/c2c-loan-platform/assets/30794881/7b3a9207-64b9-4657-889d-5f232c553b17)

#### Apply loan
![apply-loan](https://github.com/partheev/c2c-loan-platform/assets/30794881/b550984c-736d-4e44-8e67-e099d44d8c5f)
#### Lending loan
![lending-loans](https://github.com/partheev/c2c-loan-platform/assets/30794881/dd74703c-4eb0-4317-a96c-55be8a222d0b)

#### Loan requests
![loan-requests](https://github.com/partheev/c2c-loan-platform/assets/30794881/d0201051-3f98-4ae0-bf12-05f140c57aef)

#### Modify loan
![modify-loan](https://github.com/partheev/c2c-loan-platform/assets/30794881/89e0d445-2dc5-4274-887a-9934a47c7745)



### Run the following commands to Test the application locally on your device

Clone the project

### `git clone https://github.com/poornesh-chenna/c2c-loan-platform.git`

In the project directory, we have frontend-react and backend-node directories which are frontend and backend applications

## To run frontend 

#### `cd frontend-react`

#### `npm install`

#### `npm start`

It runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## To start the backend :

#### `cd backend-node`

#### `npm install`

#### `npm run dev`

Create a .env file in the backend-node dir and use your own environmental variable to make the application work.
