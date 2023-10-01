const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON request bodies

const port = 3000;

// Defining middleware function for fetching blog data
const fetchBlogDataMiddleware = async (req, res, next) => {
    try {
        // Making the CURL request to fetch the blog data from the API
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });

        // Storing the blog data in app.locals for later use
        app.locals.blogData = response.data;
        // console.log('Fetched blogData:', response.data);
        next();
    } catch (error) {
        // Handling errors, e.g., send an error response to the client
        console.error('Error fetching blog data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Creating a route for the '/api/blog-stats' endpoint and use the middleware
app.get('/api/blog-stats', fetchBlogDataMiddleware, async (req, res) => {
    try {
        const { blogData } = app.locals;
        const blogStats = await fetchAndAnalyzeData(blogData);

        // Responding with the calculated statistics
        res.json(blogStats);
    } catch (error) {
        console.error('Error fetching and analyzing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Create a blog search endpoint
app.get('/api/blog-search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        res.status(400).json({ error: 'Query parameter "query" is required.' });
        return;
    }

    const blogData = app.locals.blogData;
    // console.log("Search wala blogData : ", blogData)

    if (!blogData || !blogData.blogs || !Array.isArray(blogData.blogs)) {
        res.status(500).json({ error: 'Invalid blog data structure.' });
        return;
    }

    // Implementing a case-insensitive search functionality
    const searchResults = blogData.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
    );

    res.json(searchResults);
});

// Defining a memoized function for data analysis
const fetchAndAnalyzeData = _.memoize(async (blogData) => {
    // Analyzing data as specified in the problem statement
    const totalBlogs = blogData.blogs.length;
    const longestTitleBlog = _.maxBy(blogData.blogs, 'title.length');
    const privacyBlogs = _.filter(blogData.blogs, (blog) =>
        _.includes(_.toLower(blog.title), 'privacy')
    );
    const uniqueBlogTitles = _.uniqBy(blogData.blogs, 'title').map((blog) => blog.title);

    return {
        totalBlogs,
        longestTitle: longestTitleBlog ? longestTitleBlog.title : '',
        privacyBlogs: privacyBlogs.length,
        uniqueBlogTitles,
    };
}, (args) => JSON.stringify(args));

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
