# OMDB Frontend

This project is a personal learning project. OMDB Frontend is a movie and series discovery web application.
The data is provided by [TMDB API](https://developer.themoviedb.org/docs/getting-started)🙌 which has a generous free tier. The goal of the project has been to build a complete frontend using React 19 Server Components, use Shadcn for UI components and to improve understanding TypeScript for React.

Stack:

- Next.js
- Shadcn UI components
- Data from [TMDB API](https://developer.themoviedb.org/docs/getting-started)
- Hosting with Ubuntu VM running docker and Nginx reverse proxy. Shell scripts for VM setup and Makefile with script to deploy to production.

Created by Torkel Aannestad

- [torkelaannestad.com](https://torkelaannestad.com/)
- [Github](https://github.com/Torkel-Aannestad)

## Author takeaways

- I have in this project strived for implementing common React, Next.js and TypeScript patterns. For instance in structuring components such as the MediaDetailsView to create a reusable layout for details screens. A takeaway is that this model is inhearantly complicated and should only be made after the design has matured. Components are never as reusable as one think, and several layers of components makes it more complecated to develop and debug UI.
- Consider seperating "core components" from "specialized components" used by only a few places. Set the bar high for what is allowed as a "core component". This way we maintain fewer high quality core components, and allow for other components to be less developed.
- React has a cost.
  - Rebuilding the API model in the frontend is significant work.
  - Performance cost when pages require many calls to the API. Especially when the UI need to perform sort operation on the returning data.

## Roadmap:

- cast and crew cards. Single column smaller items for better readability
- Better error handling
- Wrap non essentional parts of interface in suspence for better performance.
- Hero current item indicator. Fix bug with carousel api.

- Pages:

  - discover
    - Flexible page with search query paramenters.
    - Connect filters in the UI and add/remove paramenters
    - Remove the category and list pages and link to discover instead.
