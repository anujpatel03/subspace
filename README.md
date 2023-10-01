# Blog Analytics and Search Tool

## Description

This Express.js-based tool provides blog analytics and search functionality using data retrieved from a third-party blog API. The tool analyzes the data and provides insightful statistics to clients, along with a blog search feature. Additionally, it implements error handling and a bonus caching mechanism for improved performance.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Routes](#routes)
   - [Data Retrieval](#data-retrieval)
   - [Data Analysis](#data-analysis)
   - [Response](#response)
   - [Blog Search Endpoint](#blog-search-endpoint)
3. [Error Handling](#error-handling)
4. [Bonus Challenge](#bonus-challenge)

## Getting Started

Follow these instructions to set up and run the Blog Analytics and Search Tool on your local machine:

### Prerequisites

- Node.js and npm installed on your machine.
- Git for cloning the repository (optional).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anujpatel03/subspace.git
   ```
   ```bash
   cd subspace
   ```

To install the project dependencies, run the following command in your terminal:

  ```bash
  npm install
  npm start
```

## Routes

### Data Retrieval

- **Route:** `/api/blog-stats`
- **Method:** GET

This route fetches blog data from a third-party API using the provided CURL request. It then passes the retrieved data to the data analysis middleware.

### Data Analysis

After fetching the data, the tool uses Lodash to perform the following analytics:

- Calculate the total number of blogs fetched.
- Find the blog with the longest title.
- Determine the number of blogs with titles containing the word "privacy."
- Create an array of unique blog titles (no duplicates).

### Response

- **Route:** `/api/blog-stats`
- **Method:** GET

This route responds to the client with a JSON object containing the following statistics:

- Total number of blogs.
- The title of the longest blog.
- Number of blogs with "privacy" in the title.
- An array of unique blog titles.

### Blog Search Endpoint

- **Route:** `/api/blog-search`
- **Method:** GET

This additional route provides a blog search functionality that filters the blogs based on the provided query string (case-insensitive).

To use this endpoint, send a GET request to `/api/blog-search` with a `query` query parameter, like this:

```bash
/api/blog-search?query=privacy
```
This will search for blogs containing the word "privacy" in their content or titles and return the matching results.

### Error Handling

The Blog Analytics and Search Tool includes comprehensive error handling to ensure smooth operation:

- It handles errors that may occur during data retrieval, analysis, or search processes.
- If the third-party API is unavailable or returns an error, it responds with an appropriate error message.

### Bonus Challenge

As a bonus challenge, the tool implements a caching mechanism using Lodash's `memoize` function. This caching mechanism stores the analytics results and search results for a certain period. If the same requests are made within the caching period, the tool returns the cached results instead of re-fetching and re-analyzing the data.

The caching mechanism is an original solution aimed at improving the tool's performance and reducing redundant data processing.
