# Pet Finder Web App

The Pet Finder Web App utilizes the [Petfinder API](https://www.petfinder.com/developers/) to help users find adoptable animals. Users can search for animals based on location, type, and breed, and view detailed information on each pet to help with the adoption decision-making process. This app encourages responsible pet ownership by making it easy to connect with adoptable pets nearby.

## Table of Contents

- [Features](#features)
- [Video Walkthrough](#video-walkthrough)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Features

- Search for adoptable pets by location, type, and breed.
- View detailed information, including images, about each animal.
- Interactive user experience with a focus on pet adoption.

## Video Walkthrough

Here's a walkthrough of implemented features:

![Video Walkthrough](/pet_finder.gif)

## Getting Started

Follow these steps to set up the project and start using the app.

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (v6 or higher recommended)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/pet-finder-web-app.git
   cd pet-finder-web-app

2. Create a `.env` file in the root directory and add your Petfinder Credential:
```bash
VITE_APP_API_KEY=<Replace with your app key>
VITE_APP_SECRET=<Replace with your app secret>
```

3. Install  dependencies:
```bash
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```
This will start the frontend server on http://localhost:5173.