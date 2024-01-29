# Coding Guidlines
These coding guidelines serve as a foundational resource for developers engaging with AppControls. Whether developed by CAXperts or AppControls purchased by CAXperts from external companies, adherence to these guidelines is mandatory, ensuring a uniform and high-quality standard. Exceptions need to be specified in RFPs. External Companies unafiliated with CAXperts and not working for CAXperts dont need to follow these guidlines. 

## Software
In line with our commitment to producing robust and reliable software, CAXperts adopts TypeScript as the primary language for developing AppControls. TypeScript provides a layer of static typing over JavaScript, enhancing the development process by catching potential errors during compilation rather than at runtime.
While the UniversalApi doesnt follow the Typescript guidelines by having the fields uppercase (Restriction from UPV API). AppControls themself need to follow the Typescript guidelines.

## Framework
The utilization of React as the prescribed framework is paramount to maintain consistency and streamline development practices. React's component-based architecture and declarative syntax provide a powerful foundation for building interactive and responsive user interfaces.
React also allows us to fairly simply create offline AppControls. Where possible use the new [signals](https://preactjs.com/guide/v10/signals/) system for cleaner code.

## Backend
If a backend is required use ASP.NET or ASP.NET Core.