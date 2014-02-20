
    
var createStatement = "CREATE TABLE IF NOT EXISTS Images (id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , src VARCHAR, val INTEGER)";

var createStatement2 = "CREATE TABLE IF NOT EXISTS login (user VARCHAR, password VARCHAR)";
                                            
var selectAllStatement = "SELECT * FROM images";

var insertStatement = "INSERT INTO Images (id,src,val) VALUES(?,?,?);";

var dropStatement = "DROP TABLE images";

var db = openDatabase("puzzlematch", "1.0", "puzzle match", 200000);  // Open SQLite Database

var dataset;

var DataType;

function initDatabase()  // Function Call When Page is ready.
{
    try {
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
        {
            alert('Databases are not supported in this browser.');
        }
        else {
            createTable();  // If supported then call Function for create table in SQLite
        }
    }
    catch (e) {
        if (e == 2) {
            // Version number mismatch. 
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}

function createTable()  // Function for Create Table in SQLite.
{
    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], null, errorHandler);
        tx.executeSql(createStatement2, [], null, errorHandler);
    });
}

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
    db.transaction(function (tx) { tx.executeSql(" delete from images ", null, errorHandler); });
    db.transaction(function (tx) { tx.executeSql(insertStatement, [1, 'img/bean.jpg', 1], null, errorHandler); });
    db.transaction(function (tx) { tx.executeSql(insertStatement, [2, 'img/stallone.jpg', 1], null, errorHandler); });
    db.transaction(function (tx) { tx.executeSql(insertStatement, [3, 'img/obama.jpg', 1], null, errorHandler); });
    db.transaction(function (tx) { tx.executeSql(insertStatement, [4, 'img/house.jpg', 1], null, errorHandler); });
}


function checklogin() {
    db.transaction(function (tx) {
        tx.executeSql(" select *  from login ", [], function (tx, result) {
            var res;
            dataset = result.rows;
            if (result.rows.length > 0)
                (
                   
                   res = dataset.item(0).user
                )
                else
                {
                    res=null;
            }
            $('#outgoingChatMessage').val(res);
            return res;
        });
    });
}

function insertlogin(user, pwd)
{
    db.transaction(function (tx) { tx.executeSql(" delete from login ", null, errorHandler); });
    db.transaction(function (tx) { tx.executeSql(" insert into login values ('" + user + "','" + pwd + "' ) ", null, errorHandler); });
}


function showRecords() // Function For Retrive data from Database Display records as list
{
    var res;
    insertRecord();
    i = Math.floor((Math.random() * 4) + 1); //numero casuale da 1 a 4
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            res = dataset.item(i - 1).src;
            $('#img1').attr('src', res);
            puzzle();
            $('#img2').attr('src', res);
            $("#secondo").fadeOut(5000);
            
      });
    });
    
}


function errorHandler(transaction, error) {
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}