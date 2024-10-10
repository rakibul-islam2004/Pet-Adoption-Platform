# Peddy: Pet Adoption Platform

## Project Description

**Peddy** is a user-friendly pet adoption platform that allows users to browse through various pet profiles, sort by price, and adopt their favorite pets. With an intuitive design and seamless functionality, this platform brings families together with their future furry friends. The site is responsive, offering a smooth experience on both desktop and mobile devices.

## Key Features

- **Mobile Responsive Design:** The platform offers a fully responsive design, adapting to different screen sizes for an optimal experience on both mobile and desktop.
- **Sort by Price:** Users can sort the pet profiles by price to easily find pets within their budget.
- **Adoption Confirmation:** After selecting a pet, a beautiful modal confirms the successful adoption with a countdown timer.
- **Pet Profile Details:** Users can view detailed information about each pet, including breed, date of birth, vaccination status, and more.
- **Favorite Pets:** Users can "like" pets, and their photos are saved to a separate section for future reference.

## ES6 Features Used

- **Arrow Functions:** Used for concise function expressions.
- **Template Literals:** Simplified string interpolation, especially for dynamic HTML content generation.
- **const and let:** Block-scoped variables to ensure better code safety and readability.
- **Async/Await:** Used for asynchronous API calls to fetch pet data and categories, ensuring smoother data handling.
- **Array Methods (forEach, sort):** For handling and manipulating pet data dynamically.

## Challenges and Solutions

### 1. **Challenge:** Managing responsive design across various devices

- **Solution:** Implemented Tailwind CSS with DaisyUI to create a fully responsive design, ensuring the layout adapts gracefully to different screen sizes. Tailwind's utility-first approach helped maintain consistency across desktop, tablet, and mobile views.

### 2. **Challenge:** Sorting pet profiles by price in real-time

- **Solution:** Utilized JavaScript's `sort()` array method in combination with `addEventListener` to allow users to sort pets by price. This was achieved by dynamically manipulating the DOM without reloading the page, improving user experience.

### 3. **Challenge:** Displaying adoption confirmation in an interactive way

- **Solution:** Developed a modal with a countdown timer using JavaScript's `setInterval` function. This modal congratulates the user upon adopting a pet and automatically closes after the countdown ends, providing a smooth and engaging user interaction.

### 4. **Challenge:** Efficiently handling and displaying pet profile data

- **Solution:** Used ES6 features like `async/await` to fetch pet data from an API, ensuring smooth asynchronous data handling. This allowed the application to load pet profiles dynamically without interrupting the user experience.

### 5. **Challenge:** Allowing users to "like" pets and saving them for future reference

- **Solution:** Implemented a "favorites" feature using localStorage to persist liked pets even after the page is refreshed. This ensured that users could come back and still find their favorite pets saved.

## Live Demo

Check out the live version of **Peddy** [here](https://pet-adoption-assignment.netlify.app/)
