//NIEKATLANE

// import { createContext, useEffect } from "react";
// import * as SQLite from "expo-sqlite"

// const DatabaseContext = createContext();

// const DatabaseContextProvider = ({children}) => {

//     //moze lepiej cos takiego, nie wiem
//     // console.log("Tu coś w DatabaseContext");
//     const db = SQLite.openDatabase('DayPlannerDB');

//     //a moze cos takiego nie mam pojecia
//     // var db = undefined;
//     // useEffect(() => {
//     //     console.log("Coś w DatabaseContext");
//     //     db = SQLite.openDatabase('DayPlannerDB');
        
//     //     return () => db.closeAsync();
//     // }, []);

    

//     return (
//         <DatabaseContext.Provider value={{db}}>
//             {children}
//         </DatabaseContext.Provider>
//     )
// }

// export {DatabaseContext, DatabaseContextProvider};