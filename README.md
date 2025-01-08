# Header Bidding Solution

## Overview

This repository contains a simplified header bidding solution using Prebid.js and Google GPT to maximize ad revenue.. The solution is developed and maintained by Ifeanyi Okorie and serves as a basic example for setting up and running a header bidding application.

### Features

- **Dynamic Floor Pricing**: Based on device type.
- **Responsive Ads**: Supports both desktop and mobile sizes.
- **Error Handling**: Logs and handles bid failures.
- **Fallback Ads**: Displays fallback ads if no bids succeed.
- **Lazy Loading**: Optimizes performance with lazy-loaded ads.
- **Analytics**: Tracks bids, win rates, and latency using Google analytics (ga4).
- **CI/CD**: CI/CD pipeline for automated deployment to GitHub Pages.

### Requirements

To run this project locally, you need the following installed on your machine:

Node.js (v16 or later)

npm (comes with Node.js)

### Setup

Follow these steps to set up the project locally:

1. git clone https://github.com/ifymatics/header-bidding.git
2. Navigate to the project directory:
   cd header-bidding
3. Install dependencies:
   npm install

### Running the Application

To start the development server, run :
npm start

This command will start a live server, and the application will be accessible in your default web browser at http://127.0.0.1:8080 (or another port if 8080 is already in use).
