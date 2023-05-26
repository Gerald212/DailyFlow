import * as SQLite from "expo-sqlite"
import { sampleRecordsCategories, sampleRecordsHabits, sampleRecordsDates } from "./sampleData";

const db = SQLite.openDatabase('DayPlannerDB');
//db.closeAsync();

const setupDatabaseAsync = async () => {
    var createCategories = "CREATE TABLE IF NOT EXISTS categories (" +
                            "category_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                            "name TEXT NOT NULL" +
                            ");";
    var createHabits = "CREATE TABLE IF NOT EXISTS habits (" +
                        "habit_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," + 
                        "name TEXT NOT NULL," + 
                        "description TEXT," +
                        "category_id INTEGER NOT NULL," +
                        "hours REAL DEFAULT 0.0," +
                        "times INTEGER DEFAULT 0," +
                        "times_goal INTEGER," +
                        "hours_goal INTEGER," +
                        "days_goal INTEGER," +
                        "completed INTEGER DEFAULT 0," +
                        "FOREIGN KEY (category_id) REFERENCES categories (category_id)" +
                        ");";
    var createDates = "CREATE TABLE IF NOT EXISTS dates (" +
                        "date_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                        "habit_id INTEGER NOT NULL," +
                        "date TEXT NOT NULL," +
                        "FOREIGN KEY (habit_id) REFERENCES habits (habit_id)" +
                        ");";

    db.transaction(tx => {
        tx.executeSql(
            createCategories,   //query
            [],                 //params
            (txObj, result) => {console.log("Stworzono tabele categories ", result)},  //success callback
            (txObj, error) => {console.log("Błąd - tworzenie tabeli categories", error)}         //errorr callback
        ),
        tx.executeSql(
            createHabits,       //query
            [],                 //params
            (txObj, result) => {console.log("Stworzono tabele habits ", result)},       //success callback
            (txObj, error) => {console.log("Błąd - tworzenie tabeli habits", error)}    //errorr callback
        ),
        tx.executeSql(
            createDates,       //query
            [],                 //params
            (txObj, result) => {console.log("Stworzono tabele dates ", result)},        //success callback
            (txObj, error) => {console.log("Błąd - tworzenie tabeli dates", error)}     //errorr callback
        )
    },
    )
}

const dropTableAsync = async (tableName) => {
    db.transaction(tx => {
        tx.executeSql(
            "DROP TABLE IF EXISTS " + tableName,
            [],
            (txObj, result) => {console.log("Usunieto tabele " + tableName, result)},  //success callback
            (txObj, error) => {console.log("Błąd - usuwanie tabeli" + tableName, error)}         //errorr callback
            )
    },
    )
}

const initializeDatabaseAsync = async () => {
    var insertSampleCategory = "INSERT INTO categories (name) values (?)";
    var insertSampleHabit = "INSERT INTO habits (name, description, category_id, times_goal, hours_goal, days_goal, hours, times) values (?, ?, ?, ?, ?, ?, ?, ?)";
    var insertSampleDate = "INSERT INTO dates (habit_id, date) values (?, ?)"

    db.transaction(tx => {
        // tx.executeSql(
        //     insertSampleCategory,
        //     ["Rysowanie"],
        //     (txObj, result) => {console.log("Dodano przykladowa kategorie", result)},          //success callback
        //     (txObj, error) => {console.log("Błąd - dodawanie przykladowej kategorii", error)}  //errorr callback
        // ),
        // tx.executeSql(
        //     insertSampleHabit,
        //     ["Rysuj", "Rysuj costam iles tam opis", 1, 0, 30, 0],
        //     (txObj, result) => {console.log("Dodano przykladowy habit", result)},          //success callback
        //     (txObj, error) => {console.log("Błąd - dodawanie przykladowego habitu", error)}  //errorr callback
        // ),
        // tx.executeSql(
        //     insertSampleDate,
        //     [1, "2023-08-03"],
        //     (txObj, result) => {console.log("Dodano przykladowa date", result)},          //success callback
        //     (txObj, error) => {console.log("Błąd - dodawanie przykladowej daty", error)}  //errorr callback
        // )
        sampleRecordsCategories.forEach(element => {
            tx.executeSql(
                insertSampleCategory,
                element,
                (txObj, result) => {console.log("Dodano przykladowe kategorie", result)},          //success callback
                (txObj, error) => {console.log("Błąd - dodawanie przykladowych kategorii", error)}  //errorr callback
            )
        });

        sampleRecordsHabits.forEach(element => {
            tx.executeSql(
                insertSampleHabit,
                element,
                (txObj, result) => {console.log("Dodano przykladowy habit", result)},          //success callback
                (txObj, error) => {console.log("Błąd - dodawanie przykladowego habitu", error)}  //errorr callback
            )
        });
        
        sampleRecordsDates.forEach(element => {
            tx.executeSql(
                insertSampleDate,
                element,
                (txObj, result) => {console.log("Dodano przykladowa date", result)},          //success callback
                (txObj, error) => {console.log("Błąd - dodawanie przykladowej daty", error)}  //errorr callback
            )
        });
    },
    )
}

const getAllCategories = async (callbackFunction) => {
    var selectAllCategories = "SELECT * FROM categories ";

    db.transaction(tx => {
        tx.executeSql(
            selectAllCategories,
            [],
            //(txObj, result) => {selectResult = result.rows._array},          //nieaktulane, nie dziala zbytnio
            //(txObj, result) => console.log(result.rows._array),          //nieaktulane ale dziala
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie wszystkich danych z tabeli categories", error)}  //errorr callback
        )
    },
    )
}

const getAllHabits = async (callbackFunction) => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM habits ",
            [],
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie wszystkich danych z tabeli habits", error)}  //errorr callback
        )
    },
    )
}

const getAllDates = async (callbackFunction) => {
    var selectAllDates = "SELECT * FROM dates ";

    db.transaction(tx => {
        tx.executeSql(
            selectAllDates,
            [],
            //(txObj, result) => {selectResult = result.rows._array},          //nieaktulane, nie dziala zbytnio
            //(txObj, result) => console.log(result.rows._array),          //nieaktulane ale dziala
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie wszystkich danych z tabeli dates", error)}  //errorr callback
        )
    },
    )
}

const getHabitsByCategory = async (category, callbackFunction) => {
    // var selectHabits = "SELECT h.*, COUNT(d.dates) AS 'days' FROM habits h INNER JOIN dates d USING(habit_id)";
    var selectHabits = "SELECT *, (SELECT COUNT(*) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM habits h GROUP BY habit_id";
    var parameter = [];

    if(category){
        //selectHabits = "SELECT * FROM habits WHERE category_id = ?";
        //selectHabits = "SELECT h.*, COUNT(d.date) AS 'days' FROM habits h INNER JOIN dates d USING(habit_id) WHERE category_id = ?";
        selectHabits = "SELECT *, (SELECT COUNT(*) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM habits h GROUP BY habit_id HAVING category_id = ?";
        //parameter.push(category);
        parameter[0] = category;
    }

    db.transaction(tx => {
        tx.executeSql(
            selectHabits,
            parameter,
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli habits z kategorii: " + category, error)}  //errorr callback
        )
    },
    )
}

const getHabitsByDay = async (day, callbackFunction) => {
    var selectHabits = "SELECT * FROM dates INNER JOIN habits USING(habit_id) WHERE date = ?";

    db.transaction(tx => {
        tx.executeSql(
            selectHabits,
            [day],
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli habits z kategorii: " + category, error)}  //errorr callback
        )
    },
    )
}

const getDatesByHabit = async (id, callbackFunction) => {
    var selectDates = "SELECT * FROM dates WHERE habit_id = ?";

    db.transaction(tx => {
        tx.executeSql(
            selectDates,
            [id],
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli dates o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const getHabitById = async (id, callbackFunction) => {
    //var selectById = "SELECT * FROM habits WHERE habit_id = ?";
    var selectById =   'SELECT h.*, c.name AS "category_name" FROM habits h INNER JOIN categories c USING(category_id) WHERE habit_id = ?';

    db.transaction(tx => {
        tx.executeSql(
            selectById,
            [id],
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array[0])},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli habits o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const deleteCategoryById = async (id) => {
    var deleteById =   'DELETE FROM categories WHERE category_id = ?';

    db.transaction(tx => {
        tx.executeSql(
            deleteById,
            [id],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - usuwanie kategorii o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const deleteHabitById = async (id) => {
    var deleteById =   'DELETE FROM habits WHERE habit_id = ?';

    db.transaction(tx => {
        tx.executeSql(
            deleteById,
            [id],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - usuwanie nawyku o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const closeDatabase = async () => {
    db.closeAsync();
}


export const database = {
    setupDatabaseAsync,
    initializeDatabaseAsync,
    dropTableAsync,
    closeDatabase,
    getAllCategories,
    getAllHabits,
    getHabitsByCategory,
    getHabitById,
    getAllDates,
    getHabitsByDay,
    getDatesByHabit,
    deleteCategoryById,
    deleteHabitById
}