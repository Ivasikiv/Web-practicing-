<?php
ini_set('display_errors', 0);
class StudentDAO {
    private $connection;                                            // змінна для зберігання з'єднання з базою даних
  
    public function __construct($connection) {                      // конструктор класу, який приймає підключення до бази даних в якості аргументу
      $this->connection = $connection;                              // збереження з'єднання з базою даних
    }

    public function closeConnection(): void {                       // метод для закриття з'єднання з базою даних
        $this->connection->close();                                 // закриття з'єднання з базою даних
    }
  
    // метод для отримання всіх студентів з бази даних
    public function getAllStudents() : array {                       // метод для отримання всіх студентів з бази даних
        $result = $this->connection->query('SELECT * FROM Lab4PVI'); // виконання запиту до бази даних
  
        $students = array();                                        // створення масиву для зберігання студентів
        while ($row = $result->fetch_assoc()) {                     // цикл для перебору всіх рядків, які повернула база даних
            $students[] = new StudentModel(                         // додавання нового студента в масив
                $row['ID'],
                $row['group_name'],
                $row['full_name'],
                $row['gender'],
                $row['birthday']
        );
      }

      return $students;                                             // повернення масиву студентів
    }
  
    // метод для добавлення студента в базу даних
    public function addStudent($ID, $groupName, $fullName, $genderName, $birthday) : bool { // метод для додавання студента в базу даних
        $query = "INSERT INTO Lab4PVI (ID, group_name, full_name, gender, birthday)    
        VALUES ('$ID','$groupName', '$fullName', '$genderName', '$birthday')";              // формування запиту до бази даних

        return mysqli_query($this->connection, $query);                                     // виконання запиту до бази даних
    }

    // метод для видалення студента з бази даних по$ID
    public function deleteStudent($studentId): bool {                                        // метод для видалення студента з бази даних
        $query = "DELETE FROM `Lab4PVI` WHERE `ID` = '$studentId'";                         // формування запиту до бази даних
        return mysqli_query($this->connection, $query);                                     // виконання запиту до бази даних
    }

    // метод для оновлення студента в базі даних по$ID
    public function updateStudent($ID, $groupName, $fullName, $genderName, $birthday): bool { // метод для оновлення студента в базі даних
        $query = "UPDATE Lab4PVI SET group_name = '$groupName', full_name = '$fullName',
        gender = '$genderName', birthday = '$birthday' WHERE ID = '$ID'";                   // формування запиту до бази даних
        return mysqli_query($this->connection, $query);                                     // виконання запиту до бази даних
    }

    // метод для отримання кількості студентів в базі даних
    public function getNumberOfStudents () : int {                                          // метод для отримання кількості студентів в базі даних
        $result = $this->connection->query('SELECT COUNT(*) FROM Lab4PVI');                 // виконання запиту до бази даних
        $row = $result->fetch_assoc();                                                      // отримання рядка з результатом запиту
        return $row['COUNT(*)'];                                                            // повернення кількості студентів в форматі int
    }
  }
