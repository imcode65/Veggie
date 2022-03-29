# veggieweb

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

------------
## Firebase configuration
path: plugins/firebase.js
Firebase configuration is controlled by VEGGIE_MODE env variable.
```
const config = process.env.VEGGIE_MODE === "production" ? ({
  apiKey: "AIzaSyCNBOoZC_2w9rb700MjG4d1IjzriTFbxnE",
  authDomain: "veggielcc-production.firebaseapp.com",
  databaseURL: "https://veggielcc-production.firebaseio.com",
  projectId: "veggielcc-production",
  storageBucket: "veggielcc-production.appspot.com",
  messagingSenderId: "80922187285",
  appId: "1:80922187285:web:435dc6b33233304438e01c",
  measurementId: "G-6VJR0L5VNQ"
}) : ({
  apiKey: "AIzaSyBUfHKOQRvA2ZxlCt-H2TAfZ4cdiKtg3CA",
  authDomain: "veggielcc-development.firebaseapp.com",
  databaseURL: "https://veggielcc-development.firebaseio.com",
  projectId: "veggielcc-development",
  storageBucket: "veggielcc-development.appspot.com",
  messagingSenderId: "921828997889",
  appId: "1:921828997889:web:68d7c9ebd6c6ca73513900",
  measurementId: "G-FX814JZM6C"
})
```
So heroku manager need to add env variable named VEGGIE_MODE as "development" or "production"

When developer is working as local, need to make .env file from .env.example.

? Why use VEGGIE_MODE variable ?
In development heroku, need to test on test database. So need to use variable of development.
In production heroku, need to operate on real databas. So need to use variable of production.
NODE_ENV is set by production by nuxt-ts start

## How to deploy on Heroku for development
1. First, clone the github repository and check if you are on develop branch.
```
sudo git clone https://github.com/Veggie-LLC/Web.git
sudo git checkout develop
```
2. Then login to heroku.
```
heroku login
```
3. Go to <a href="https://dashboard.heroku.com/apps/veggie-frontend-develop/settings">heroku dashboard</a> and add VEGGIE_MODE variable of development
4. Then change the git repository to heroku repository.
```
sudo heroku git:remote -a veggie-frontend-production
```
5. Then pull current code in heroku to prevent conflicts.
```
sudo git pull heroku main
```
6. Then push to develop branch of heroku for development
```
sudo git push heroku develop:main
```
7. Visit the development website

## How to deploy on Heroku for production
The same method as development


Stripe substription to firebase 
https://medium.com/@GaryHarrower/working-with-stripe-webhooks-firebase-cloud-functions-5366c206c6c

<!-- Not necessary info -->
Old pug version for node 14.x
  "pug": ">=3.0.1",
  "pug-loader": "2.4.0",
  "pug-plain-loader": "1.0.0",