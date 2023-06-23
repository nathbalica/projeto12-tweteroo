import express from 'express';
import cors from 'cors';
import { validateSignUp, validateTweet } from './validation.js';

const app = express();

app.use(cors())
app.use(express.json())

const users = []
const tweets = []

// Endpoint: Cadastrar um novo usuário
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

// Endpoint: Criar um novo tweet
app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const user = req.headers.user;
    const tweetValidationResult = validateTweet(user, tweet);

    if (tweetValidationResult) {
        res.status(400).send(tweetValidationResult);
        return;
    }

    const tweetsUser = {
        username: user,
        tweet: tweet
    };

    const userExists = users.find(u => u.username === user);

    if (userExists) {
        tweets.push(tweetsUser)
        res.status(201).send('OK');
    } else {
        res.status(401).send('UNAUTHORIZED')
    }
})

// Endpoint: Obter tweets de um usuário específico
app.get("/tweets/:USERNAME", (req, res) => {
    const { USERNAME } = req.params;

    const userTweets = tweets.filter(tweet => tweet.username === USERNAME);
    const user = users.find(user => user.username === USERNAME);

    const userTweetsWithAvatar = userTweets.map(tweet => ({
        username: tweet.username,
        avatar: user ? user.avatar : '',
        tweet: tweet.tweet
    }));

    res.send(userTweetsWithAvatar);
});

// Endpoint: Obter tweets por página
app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page)

    if (page < 1 ) {
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

app.listen(5000, () => console.log("Running server on port 5000"))
