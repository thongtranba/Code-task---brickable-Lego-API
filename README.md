# The Rebrickable-LEGO-API

This project is to create an application fetching data from the Rebrickable-LEGO-API that users can select and like their favourite LEGO set (sort by the LEGO theme id). After making their liked list, users can save it to the localstorage or clear the liked list.

## Demo

https://brickable-lego-api.netlify.app/

## Lessons Learned

1.  What did you learn while building this project?

- Firstly, I know how to fetch data API by using async/await.
- Secondly, with complex data, I learned that need a new data Class ( legoSet.js from './src/class'). Because, with a new data class, API data will be clean and I can add a "liked" value which is convenient to develop the "like" function and save to the local storage.

2.  What challenges did you face?

- The challenge is saving the "liked" list to the local storage and loading the list from it. With this challenge, I read a lot about how to set data to local and get them, and how to check the value is "null" before getting data. After many tries, I decided to make a "save your list" button to save the data into the local storage manually.

## Installation

This application is built with React.js

```bash
  npx create-react-app brickable-lego-api
  cd brickable-lego-api
```

Install react-boostrap^5.1, fontawsome^4.7 and bootstrap-social^5.1

## Usage

After all the installation are finished.

- Start the application (front-end):
  - Open preferred terminal
  - Type
  ```
  npm start
  ```
- Now the program should be running!

![image](https://user-images.githubusercontent.com/82447776/150860419-154fb02c-f3cf-4d20-b7f9-276b0f0e3ab2.png)

- On the overview Page, Users can select a LEGO Theme and every Lego theme will show all the LEGO sets using this theme.
  ![image](https://user-images.githubusercontent.com/82447776/150860784-cbda5892-2dce-4b4d-b691-09c020fb4729.png)
- Users can click on a LEGO set and go to the details view.
- in the details view, users can know the information of selected LEGO set (name, set number, number part, picture...) and click "like" the LEGO set.
  ![image](https://user-images.githubusercontent.com/82447776/150860900-adb53c01-cbe5-45c3-b264-4744beef3c3a.png)
- When a LEGO set is liked, it should be visualized a heart icon on the overview page.
  ![image](https://user-images.githubusercontent.com/82447776/150861241-f9cc7263-cc38-425c-9276-0f9c76476e9e.png)
- After "liked" some LEGO sets:
  - users can click "save your list" button to save your liked list
  - Or users can click "clear your list" button to clear your liked list

## Documentation

[Rebrickable-API](https://rebrickable.com/api/v3/docs/)
