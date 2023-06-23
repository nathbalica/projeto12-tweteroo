import express from 'express';
import cors from 'cors';
import { validateSignUp, validateTweet } from './validation.js';

const app = express();

app.use(cors())
app.use(express.json())

const users = [
    {
        username: 'bobesponja', 
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
    }
]

const tweets = [
    
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    }
    
]

app.get("/sign-up", (req, res) => {
    res.send(users)
})

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    console.log(req.headers.user)

    const signUpValidationResult = validateSignUp(username, avatar);

    if (signUpValidationResult) {
        res.status(400).send(signUpValidationResult);
        return;
    }

    const userSignUp = {
        username: username,
        avatar: avatar
    }; 

    users.push(userSignUp)
    res.status(201).send('OK');
});


app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const user = req.headers.user;

    console.log(user)
    const tweetValidationResult = validateTweet(user, tweet);
    if(tweetValidationResult){
        res.status(400).send(tweetValidationResult);
        return;
    }

    const tweetsUser = {
        username: user,
        tweet: tweet
    };
    console.log(tweetsUser)
    const userExists = users.find(u => u.username === user);

    if(userExists){
        tweets.push(tweetsUser)
        res.status(201).send('OK');
    }else{
        res.status(401).send('UNAUTHORIZED')
    }
})

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page); // Obter o valor da página da query string como um número inteiro

    if (!page || page < 1 || isNaN(page)) {
        res.status(400).send('Informe uma página válida!');
        return;
    }

    const tweetsPerPage = 10;

    const startIndex = page ? (page - 1) * tweetsPerPage : tweets.length - tweetsPerPage;
    const endIndex = page ? page * tweetsPerPage : tweets.length;

    const tweetsForPage = tweets.slice(startIndex, endIndex).map(tweet => {
        const user = users.find(user => user.username === tweet.username);

        return {
            username: tweet.username,
            avatar: user ? user.avatar : '',
            tweet: tweet.tweet
        };
    });

    res.send(tweetsForPage);
})


app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    
    const userTweets = tweets.find(tweet => tweet.username === username);
    const user = users.find(user => user.username === username)

    const userTweetsWithAvatar = userTweets.map(tweet => ({
        username: tweet.username,
        avatar: user ? user.avatar : '',
        tweet: tweet.tweet
    }));
    
    res.send(userTweetsWithAvatar);
})

app.listen(5000, () => console.log("Running server on port 5000"))
