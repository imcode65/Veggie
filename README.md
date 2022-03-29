# veggieweb

## Environment
Program | version
:---: | :---:
NodeJS | 14.18.*
npm | 6.14.*
</tr>
</table>

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

-----
## How to work on this project
** important ** should use only own branch
1. First, clone the github repository and then change to working branch
```
sudo git clone https://github.com/Veggie-LLC/Web.git
sudo git checkout [branch-name]
```
2. Then can create .env file but it is not necessary in local development.
3. Just test the work status in local then if complete the task, push to own branch then make a PR then notice in veggie-web channel
4. The work result will be reviewed then merge to develop branch
5. Then update the development of heroku will be update by develop branch
6. If one feature is completed enoughly, production will be updated

## How to deploy app in heroku
production heroku link

https://dashboard.heroku.com/apps/veggie-frontend-production/deploy/github
- Production is updating by main branch so do not change main branch directly

development heroku link

https://dashboard.heroku.com/apps/veggie-frontend-production/deploy/github
- Development is updating by develop branch but prefer to work only in local side the just make a PR

## How to deploy on Heroku for production
The same method as development

### If have any issue, please make a question to <a href="https://app.slack.com/client/TU21JCC0L/G01AY886TC7">veggie-web</a> channel


<!---

Stripe substription to firebase 
https://medium.com/@GaryHarrower/working-with-stripe-webhooks-firebase-cloud-functions-5366c206c6c
