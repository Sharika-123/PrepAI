
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Interview question bank: 15 questions per subject
const questionBank = {
  Python: [
    ["What is Python?", "Python is a high-level programming language known for its simple syntax and readability."],
    ["What are variables?", "Variables are names used to store data values."],
    ["What are Python data types?", "Common data types include int, float, string, boolean, list, tuple, set and dictionary."],
    ["What is a list?", "A list stores multiple items in an ordered and changeable collection."],
    ["What is a tuple?", "A tuple stores multiple items in an ordered collection that cannot be changed."],
    ["What is a dictionary?", "A dictionary stores data in key-value pairs."],
    ["What is a set?", "A set is an unordered collection that stores unique values."],
    ["What is a function?", "A function is a reusable block of code that performs a particular task."],
    ["What is the difference between == and =?", "= assigns a value, while == compares two values."],
    ["What is a loop?", "A loop repeats a block of code. Python provides for and while loops."],
    ["What is indentation?", "Indentation means spaces at the beginning of a line. Python uses it to define code blocks."],
    ["What is OOP?", "Object-Oriented Programming organizes code using classes and objects."],
    ["What is inheritance?", "Inheritance allows one class to use properties and methods of another class."],
    ["What is exception handling?", "Exception handling manages errors using try, except and finally blocks."],
    ["What is a lambda function?", "A lambda is a small anonymous function written using the lambda keyword."]
  ],

  JavaScript: [
    ["What is JavaScript?", "JavaScript is a programming language used to make websites interactive."],
    ["What is a variable?", "A variable stores data that can be used later in a program."],
    ["What is the difference between let, const and var?", "var is function-scoped, let is block-scoped and const is block-scoped and cannot be reassigned."],
    ["What are data types in JavaScript?", "Common types include string, number, boolean, undefined, null, bigint, symbol and object."],
    ["What is an array?", "An array stores multiple values in a single variable."],
    ["What is an object?", "An object stores information in key-value pairs."],
    ["What is a function?", "A function is a reusable block of code that performs a task."],
    ["What is the DOM?", "DOM stands for Document Object Model. It represents a webpage as objects that JavaScript can modify."],
    ["What is an event?", "An event is an action such as a click, key press or page load."],
    ["What is hoisting?", "Hoisting is JavaScript's behavior of processing declarations before executing the code."],
    ["What is a callback function?", "A callback is a function passed to another function to be executed later."],
    ["What is a Promise?", "A Promise represents the future result of an asynchronous operation."],
    ["What is async/await?", "Async and await make asynchronous JavaScript code easier to write and understand."],
    ["What is the difference between == and ===?", "== compares values with type conversion, while === compares values and types."],
    ["What is an arrow function?", "An arrow function is a shorter way to write a function using the => symbol."]
  ],

  React: [
    ["What is React?", "React is a JavaScript library used to build user interfaces."],
    ["What is a component?", "A component is a reusable part of a user interface."],
    ["What is JSX?", "JSX is a syntax that allows us to write HTML-like code inside JavaScript."],
    ["What are props?", "Props are data passed from a parent component to a child component."],
    ["What is state?", "State is data managed inside a component that can change over time."],
    ["What is useState?", "useState is a React Hook used to create and update component state."],
    ["What is useEffect?", "useEffect is a Hook used to perform side effects such as fetching data."],
    ["What is the Virtual DOM?", "The Virtual DOM is a lightweight representation of the real DOM that helps React update the interface efficiently."],
    ["What is conditional rendering?", "Conditional rendering means displaying different content depending on a condition."],
    ["What is an event handler?", "An event handler is a function that runs when an event, such as a click, happens."],
    ["What is a key in React?", "A key helps React identify list items when items are added, removed or changed."],
    ["What is prop drilling?", "Prop drilling means passing data through multiple components to reach a deeply nested component."],
    ["What is useContext?", "useContext allows components to access shared data without passing props through every level."],
    ["What is React Router?", "React Router is a library used to handle navigation between pages in a React application."],
    ["What is a controlled component?", "A controlled component is a form element whose value is managed by React state."]
  ],

  "Node.js": [
    ["What is Node.js?", "Node.js is a JavaScript runtime that allows JavaScript to run outside a browser."],
    ["What is npm?", "npm stands for Node Package Manager. It installs and manages JavaScript packages."],
    ["What is Express.js?", "Express.js is a framework for building web servers and APIs with Node.js."],
    ["What is a module?", "A module is a separate file containing reusable code."],
    ["What is the event loop?", "The event loop helps Node.js handle asynchronous operations without blocking the main thread."],
    ["What is asynchronous programming?", "It allows a program to start an operation and continue other work while waiting for the result."],
    ["What is middleware?", "Middleware is a function that runs during the request and response process."],
    ["What is REST API?", "A REST API allows applications to communicate using HTTP methods and resources."],
    ["What is HTTP?", "HTTP is a protocol used for communication between web browsers and servers."],
    ["What is the difference between GET and POST?", "GET retrieves data, while POST sends data to the server."],
    ["What is package.json?", "package.json stores project information, dependencies and scripts."],
    ["What is require()?", "require() is used in CommonJS to import modules into a JavaScript file."],
    ["What is process.env?", "process.env provides access to environment variables in Node.js."],
    ["What is CORS?", "CORS is a browser security mechanism that controls requests between different origins."],
    ["What is error handling in Express?", "Error handling manages application errors and sends suitable responses to clients."]
  ],

  SQL: [
    ["What is SQL?", "SQL stands for Structured Query Language. It is used to manage relational databases."],
    ["What is a database?", "A database is an organized collection of information stored electronically."],
    ["What is a table?", "A table stores data in rows and columns."],
    ["What is a primary key?", "A primary key uniquely identifies each record in a table."],
    ["What is a foreign key?", "A foreign key connects one table to another table."],
    ["What is SELECT?", "SELECT is used to retrieve data from a database table."],
    ["What is WHERE?", "WHERE filters records based on a given condition."],
    ["What is ORDER BY?", "ORDER BY sorts query results in ascending or descending order."],
    ["What is GROUP BY?", "GROUP BY combines rows that have the same values in specified columns."],
    ["What is JOIN?", "JOIN combines related data from two or more tables."],
    ["What is the difference between DELETE and DROP?", "DELETE removes rows from a table, while DROP removes the entire database object."],
    ["What is NULL?", "NULL represents missing or unknown data in a database."],
    ["What is DISTINCT?", "DISTINCT removes duplicate values from query results."],
    ["What is an aggregate function?", "An aggregate function performs calculations on multiple rows, such as COUNT, SUM, AVG, MIN and MAX."],
    ["What is an index?", "An index helps a database find records faster, although it requires extra storage."]
  ],

  DBMS: [
    ["What is DBMS?", "DBMS stands for Database Management System. It is software used to manage databases."],
    ["What is RDBMS?", "RDBMS is a database system that stores data in related tables."],
    ["What is a primary key?", "A primary key uniquely identifies every record in a table."],
    ["What is a foreign key?", "A foreign key creates a relationship between two tables."],
    ["What is normalization?", "Normalization organizes database tables to reduce duplicate data."],
    ["What is denormalization?", "Denormalization adds some repeated data to improve certain query performance."],
    ["What is a database schema?", "A schema describes the structure of a database, including tables and relationships."],
    ["What is a transaction?", "A transaction is a group of database operations treated as one logical unit."],
    ["What are ACID properties?", "ACID stands for Atomicity, Consistency, Isolation and Durability. These properties help ensure reliable transactions."],
    ["What is data redundancy?", "Data redundancy means storing the same information unnecessarily in multiple places."],
    ["What is a candidate key?", "A candidate key is a minimal set of columns that can uniquely identify a record."],
    ["What is a composite key?", "A composite key uses two or more columns together to identify a record uniquely."],
    ["What is a view?", "A view is a virtual table created using a database query."],
    ["What is a deadlock?", "A deadlock happens when transactions wait for resources held by each other and cannot continue."],
    ["What is the difference between DBMS and RDBMS?", "DBMS manages data, while RDBMS stores data in related tables and supports relationships between them."]
  ],

  OS: [
    ["What is an operating system?", "An operating system manages computer hardware and software resources."],
    ["What are examples of operating systems?", "Examples include Windows, Linux, macOS, Android and iOS."],
    ["What is a process?", "A process is a program that is currently running."],
    ["What is a thread?", "A thread is a smaller unit of execution within a process."],
    ["What is multitasking?", "Multitasking allows an operating system to manage multiple tasks during the same period."],
    ["What is deadlock?", "Deadlock occurs when processes wait for resources held by each other and cannot proceed."],
    ["What is virtual memory?", "Virtual memory uses storage space to extend the memory available to programs."],
    ["What is RAM?", "RAM is temporary memory used by a computer while programs are running."],
    ["What is a kernel?", "The kernel is the core part of an operating system that manages hardware and system resources."],
    ["What is CPU scheduling?", "CPU scheduling decides which process gets to use the CPU next."],
    ["What is a semaphore?", "A semaphore is a synchronization tool used to control access to shared resources."],
    ["What is paging?", "Paging divides memory into fixed-size blocks to manage memory efficiently."],
    ["What is context switching?", "Context switching happens when the CPU changes from executing one process or thread to another."],
    ["What is a system call?", "A system call allows a program to request a service from the operating system."],
    ["What is the difference between a process and a thread?", "A process has its own memory space, while threads within a process share memory."]
  ],

  CN: [
    ["What is a computer network?", "A computer network is a group of connected devices that communicate and share resources."],
    ["What is an IP address?", "An IP address identifies a device on a network."],
    ["What is DNS?", "DNS stands for Domain Name System. It translates domain names into IP addresses."],
    ["What is HTTP?", "HTTP is a protocol used to transfer information between browsers and web servers."],
    ["What is HTTPS?", "HTTPS is the secure version of HTTP. It uses encryption to protect communication."],
    ["What is a router?", "A router connects different networks and forwards data between them."],
    ["What is a switch?", "A switch connects devices within a local network and forwards data to the correct device."],
    ["What is LAN?", "LAN stands for Local Area Network. It connects devices in a limited area such as an office."],
    ["What is WAN?", "WAN stands for Wide Area Network. It connects networks over large geographical areas."],
    ["What is TCP?", "TCP is a transport protocol that provides reliable and ordered data delivery."],
    ["What is UDP?", "UDP is a transport protocol that sends data without guaranteeing delivery or order."],
    ["What is the difference between TCP and UDP?", "TCP is reliable and connection-oriented, while UDP is faster and connectionless but does not guarantee delivery."],
    ["What is a MAC address?", "A MAC address is a hardware address used to identify a network interface."],
    ["What is a firewall?", "A firewall monitors and filters network traffic based on security rules."],
    ["What is the OSI model?", "The OSI model explains network communication through seven layers: Physical, Data Link, Network, Transport, Session, Presentation and Application."]
  ]
};

// Convert question pairs into objects
const subjects = Object.keys(questionBank);

subjects.forEach((subject) => {
  questionBank[subject] = questionBank[subject].map((item, index) => ({
    subject,
    question: item[0],
    answer: item[1],
    difficulty:
      index < 5
        ? 'Beginner'
        : index < 10
        ? 'Intermediate'
        : 'Advanced'
  }));
});

// Home route
app.get('/', (req, res) => {
  res.send('AI Interview Assistant Backend is Running!');
});

// Get all questions
app.get('/api/questions', (req, res) => {
  const allQuestions = Object.values(questionBank).flat();
  res.json(allQuestions);
});

// Get available subjects
app.get('/api/subjects', (req, res) => {
  res.json(subjects);
});

// Get questions for one subject
app.get('/api/questions/:subject', (req, res) => {
  const subject = subjects.find(
    (item) => item.toLowerCase() === req.params.subject.toLowerCase()
  );

  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  res.json(questionBank[subject]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
