# Pasta
Project Pasta is a secret project

# Steps
## Initial Steps:
```bash
mkdir frontend backend
cd backend
echo node_modules > .gitignore
touch .env
touch server.js
npm init -y # Initialise npm
```
Adding into `package.json` file:
```json
"scripts": {
    "error": "echo \"Error: no test specified\" && exit 1",
    "test": "nodemon server.js",
    "start": "node server.js"
  },
```
Back to terminal to install packages:
```bash
npm i reactstrap express mongoose body-parser cookie-parser morgan nodemon dotenv cors express-validator jsonwebtoken express-jwt formidable lodash slugify string-strip-html shortid google-auth-library @sendgrid/mail
```

## Setup Cloud database (NoSQL MongoDB)
On MongoDB Atlas website and create a cluster. 
Make sure IP is included.
Click `Connect` choose `Connect to your application`.
Copy the API line into `.env` file:
```
mongodb+srv://<username>:<password>@<cluster>.hli6fvs.mongodb.net/?retryWrites=true&w=majority
```

## Route Designs
```bash
mkdir controllers helpers models routes validators

```

## Main Page
Landing on page of 10 Latest, 5 New, 5 Popular, 5 Trending, 5 Completed, 5 Picks.
### Main Page Links
1. Read - Popular, Trending, Picks, Latest, New, Completed 
The page will display lists of titles that each filter according to the statistics.
2. Write - Athour's Dashboard
3. Community - Disqus, Discord, Reddit
4. Support - Technical FAQ, Ticket
5. About - Legal and policy statements
6. Donate - Patreon, KoFi, Metamask, include accounting.
7. Search - Title advance search with tags
8. Account - Sign up and login
9. Fictions - The database
```bash
mkdir readpage writepage community support about donate search account fictions
```
Inside each folder, there will be a `.js` file that will be called by the main `server.js`.


# Frontend
Color Palatte  
- Orange Pink: #DE5542  
- Dark Blue: #3F53&1  
- Dark Green: #62673B  
- Gold: #F7A049  


```bash
npm init -y
npm install --save next react react-dom next/dynamic
npm i query-string isomorphic-fetch js-cookie jsonwebtoken moment nprogress prop-types 
query-string react-google-login react-quill reactstrap @zeit/next-css
npm i react-render-html --legacy-peer-deps
npm i with-styled-components with-styled-components-app
```

To run on local: `npm run dev`

26/02/2023
ES6 code updated for backend.
Need to test run by editing the keys.