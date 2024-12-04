## AdTech News Search Engine with React, Next.js, and Material-UI

This project is a dynamic ad technology news search engine built with React, Next.js, and Material-UI. 

### Features

* **Search Functionality:** Users can search for relevant ad tech news articles using a search bar.
* **News API Integration:** The application leverages the GNews API ([https://gnews.io/](https://gnews.io/)) to fetch and display search results specifically focused on ad tech news. 
* **User Interface:** The user interface is built with Material-UI components, providing a clean and responsive design.
* **Next.js:** This project utilizes Next.js for server-side rendering (SSR) and static site generation (SSG) capabilities, enhancing performance and SEO.
* **Ky API:** Includes Ky API, a newer, cleaner and faster API, better than fetch and axios ([Ky](https://www.npmjs.com/package/ky)) 

### Technologies Used

* Frontend: React, Next.js, Material-UI
* Data Source: GNews API ([https://gnews.io/](https://gnews.io/)) (**Free for Development with limitations**)
* State Management: Consider using a state management library like Redux or Context API for complex applications. (Optional)

### Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/fin-dashboard.git
   ```

2. **Install Dependencies:**

   ```bash
   cd fin-dashboard
   npm install
   ```

3. **Get a News API Key:**

   - Visit the GNews API ([https://gnews.io/](https://gnews.io/)) and create an account.
   - Navigate to your account dashboard and generate an API key.

4. **Configure API Key:**

   - Create a `.env.local` file in the project root directory.
   - Add the following line to the `.env.local` file, replacing `<YOUR_API_KEY>` with your actual API key:

     ```
     REACT_APP_API_KEY=<YOUR_API_KEY>
     ```

   - **Important:** Never commit the `.env.local` file to version control.

5. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   This will start the development server and open the application in your default web browser at http://localhost:3000 by default.

### Deployment

You can deploy this application to a static hosting platform like Vercel, Netlify, or Firebase. Refer to the documentation of your chosen platform for specific deployment instructions.

## Demo
([https://adtechnews.rodneysolomonjr.net/](https://adtechnews.rodneysolomonjr.net))

### Contributing

We welcome contributions to this project! Please see the CONTRIBUTING.md file for guidelines on how to contribute.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
