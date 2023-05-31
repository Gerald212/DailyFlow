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
    var dropTriggers = "DROP TRIGGER IF EXISTS habit_completion_trigger;"
    var createTrigger = "CREATE TRIGGER IF NOT EXISTS habit_completion_trigger " +
                        "AFTER UPDATE OF hours, times ON habits " +
                        "WHEN (new.hours_goal != 0 AND (new.hours >= new.hours_goal)) OR " + 
                        "(new.times_goal != 0 AND (new.times >= new.times_goal)) OR " +
                        "(new.days_goal != 0 AND ((SELECT COUNT(DISTINCT date) + 1 FROM dates d WHERE new.habit_id = d.habit_id) >= new.days_goal)) " +
                            "BEGIN " +
                            "UPDATE habits " +
                            "SET completed = 1 " +
                            "WHERE habit_id = new.habit_id;" +
                            "END; ";

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
        ),
        tx.executeSql(
            dropTriggers,       //query
            [],                 //params
            (txObj, result) => {console.log("Usunieto trigger ", result)},        //success callback
            (txObj, error) => {console.log("Błąd - usuwanie triggera", error)}     //errorr callback
        ),
        tx.executeSql(
            createTrigger,       //query
            [],                 //params
            (txObj, result) => {console.log("Stworzono trigger ", result)},        //success callback
            (txObj, error) => {console.log("Błąd - tworzenie triggera", error)}     //errorr callback
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

const checkDatabase = async () => {
    var selectQuery = "SELECT COUNT(*) AS 'dbState' FROM habits";
    db.transaction(tx => {
        tx.executeSql(
            selectQuery,
            [],
            (txObj, result) => {
                console.log("Wynik bazy ", result.rows._array[0].dbState)
                if(!result.rows._array[0].dbState){
                    console.log("Inicjalizacja za pomocą przykladowych danych");
                    initializeDatabaseAsync();
                }
            },  //success callback
            (txObj, error) => {console.log("Błąd - sprawdzanie bazy danych", error)}         //errorr callback
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
    var selectHabits = "SELECT *, (SELECT COUNT(DISTINCT date) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM habits h GROUP BY habit_id";
    var parameter = [];

    if(category){
        //selectHabits = "SELECT * FROM habits WHERE category_id = ?";
        //selectHabits = "SELECT h.*, COUNT(d.date) AS 'days' FROM habits h INNER JOIN dates d USING(habit_id) WHERE category_id = ?";
        selectHabits = "SELECT *, (SELECT COUNT(DISTINCT date) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM habits h GROUP BY habit_id HAVING category_id = ?";
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
    //var selectHabits = "SELECT * FROM dates INNER JOIN habits USING(habit_id) WHERE date = ?";
    //var selectHabits = "SELECT * FROM dates INNER JOIN (SELECT *, (SELECT COUNT(*) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM habits h GROUP BY habit_id) USING(habit_id) WHERE date = ?";
    var selectHabits = "SELECT *, (SELECT COUNT(DISTINCT date) FROM dates d WHERE h.habit_id = d.habit_id) AS 'days' FROM dates INNER JOIN habits h USING(habit_id) WHERE date = ? GROUP BY habit_id";
    db.transaction(tx => {
        tx.executeSql(
            selectHabits,
            [day],
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli habits z dnia: " + day, error)}  //errorr callback
        )
    },
    )
}

const getDates = async (callbackFunction) => {
    var selectDates = "SELECT DISTINCT date FROM dates";
    db.transaction(tx => {
        tx.executeSql(
            selectDates,
            [],
            (txObj, result) => {callbackFunction(result.rows._array)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie danych z tabeli dates", error)}  //errorr callback
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
            (txObj, result) => {() => console.log("usunieto zdanie: " + id, result)},          //success callback
            (txObj, error) => {console.log("Błąd - usuwanie nawyku o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const addHabit = async (name, description, category, days_goal, times_goal, hours_goal) => {
    var insert =   'INSERT INTO habits (name, description, category_id, times_goal, hours_goal, days_goal) values (?, ?, ?, ?, ?, ?)';

    db.transaction(tx => {
        tx.executeSql(
            insert,
            [name, description, category, times_goal, hours_goal, days_goal],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - dodawanie nawyku o nazwie: " + name, error)}  //errorr callback
        )
    },
    )
}

const addCategory = async (name) => {
    var insert =   'INSERT INTO categories (name) values (?)';

    db.transaction(tx => {
        tx.executeSql(
            insert,
            [name],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - dodawanie kategorii o nazwie: " + name, error)}  //errorr callback
        )
    },
    )
}

const updateHabitById = async (id, hours, date) => {
    var updateHabit = "UPDATE habits SET hours = hours + ?, times = times + 1 WHERE habit_id = ?";
    var insertDate = "INSERT INTO dates (habit_id, date) values (?, ?)";

    db.transaction(tx => {
        tx.executeSql(
            updateHabit,
            [hours, id],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - aktualizowanie habitu o id: " + id, error)}  //errorr callback
        ),
        tx.executeSql(
            insertDate,
            [id, date],
            (txObj, result) => {() => console.log(result)},          //success callback
            (txObj, error) => {console.log("Błąd - dodawanie daty do habitu o id: " + id, error)}  //errorr callback
        )
    },
    )
}

const getHabitsCount = async (callbackFunction) => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(habit_id) AS 'count' FROM habits WHERE completed = 0",
            [],
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array[0].count)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie liczby habitow", error)}  //errorr callback
        )
    },
    )
}

const getCompletedCount = async (callbackFunction) => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(habit_id) AS 'count' FROM habits WHERE completed = 1",
            [],
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array[0].count)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie liczby zakonczonyc habitow", error)}  //errorr callback
        )
    },
    )
}

const getAverageCompletion = async (callbackFunction) => {
    // var avgQuery = "SELECT h.name, (h.hours / h.hours_goal) AS 'h_p', (h.times*1.0 / h.times_goal) AS 't_p', ((SELECT COUNT(DISTINCT date) FROM dates d WHERE h.habit_id = d.habit_id))/(h.days_goal * 1.0) AS 'd_p' FROM habits h";
    var avgQuery = "SELECT AVG(avg) AS 'average' FROM (SELECT IFNULL((h.hours / h.hours_goal), 0) + IFNULL((h.times*1.0 / h.times_goal), 0) + IFNULL(((SELECT COUNT(DISTINCT date) FROM dates d WHERE h.habit_id = d.habit_id))/(h.days_goal * 1.0), 0) AS 'avg' FROM habits h WHERE (h.times_goal > 0 | h.days_goal > 0 | h.hours_goal > 0))"; //AND h.completed = 0

    db.transaction(tx => {
        tx.executeSql(
            avgQuery,
            [],
            //(txObj, result) => {selectResult = result.rows._array},
            //(txObj, result) => console.log(result.rows._array),
            (txObj, result) => {callbackFunction(result.rows._array[0].average)},          //success callback
            (txObj, error) => {console.log("Błąd - pobieranie średniej ukończenia", error)}  //errorr callback
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
    deleteHabitById,
    addHabit,
    addCategory,
    updateHabitById,
    getDates,
    checkDatabase,
    getHabitsCount,
    getCompletedCount,
    getAverageCompletion
}