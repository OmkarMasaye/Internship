const express = require('express');
const router = express.Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//   router.use(timeLog)
// define the home page route
router.get('/', timeLog, (req, res) => {
    res.send('Blog home page');
});

// define the about route
router.get('/about', (req, res) => {
    res.send('About blog');
});

// define the blogpost route with a dynamic parameter (slug)
router.get('/blogpost/:slug', (req, res) => {
    res.send(`Fetching the blogpost for ${req.params.slug}`);
});

module.exports = router;
