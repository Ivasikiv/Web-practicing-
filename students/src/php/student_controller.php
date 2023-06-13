<?php
ini_set('display_errors', 0);                                       // встановлення значення параметру display_errors в 0 (відключення відображення помилок)
require_once 'student_model_dao.php';
require_once 'student_model.php';
require_once 'valIDator.php';

class StudentController {
    private StudentDAO $studentDAO;                                 // об'єкт класу StudentDAO для взаємодії з базою даних MySQL 

    public function __construct(mysqli $connection) {               // конструктор класу, який приймає підключення до бази даних в якості аргументу
        $this->studentDAO = new StudentDAO($connection);            // створення об'єкту класу StudentDAO
    }

    public function __destruct() {                                  // деструктор класу
        $this->studentDAO->closeConnection();                       // закриття з'єднання з базою даних
    }

    public function handleRequest($data): voID {                    // метод для обробки запитів
        $action = $data->action ?? '';                              // отримання значення параметру action з JSON-об'єкту (??  '' - якщо значення не вказано, то встановлюється порожній рядок)
        $response = match ($action) {                               // виконання дії в залежності від значення параметру action
            'load' => $this->load(),
            'add' => $this->add($data),
            'edit' => $this->edit($data),
            'delete' => $this->delete($data),
            default => json_encode(array('status' => false, 'errorMessage' => 'InvalID action')),
        };

        echo $response;                                             // відправка відповіді клієнту 
    }

    public function load(): false|string {                          // метод для завантаження даних з бази даних та формування JSON-об'єкту з даними
        $students = $this->studentDAO->getAllStudents();            // отримання всіх студентів з бази даних
        $studentsCount = $this->studentDAO->getNumberOfStudents();             // отримання кількості студентів в базі даних
        $studentsData = array();                                    // масив для зберігання даних про студентів
        if($studentsCount === 0) {                                  // якщо кількість студентів дорівнює 0, то встановлюється помилка
            $dataToSend = array('status' => false, 'errorMessage' => 'Incorrect ID!');
        } else {                                                    // інакше формується JSON-об'єкт з даними про студентів
            foreach ($students as $student) {                       // формування масиву з даними про студентів
                $studentsData[] = array(                            // додавання даних про студента до масиву
                    'ID' => $student->getID(),
                    'group' => $student->getGroup(),
                    'fullName' => $student->getFullName(),
                    'gender' => $student->getGender(),
                    'birthday' => $student->getBirthday()
                );
            }

            $dataToSend = array('status' => true, 'students' => $studentsData, 'count' => $studentsCount);  // формування JSON-об'єкту
        }

        return json_encode($dataToSend);                            // повернення JSON-об'єкту
    }

    public function add($data): false|string {                      // метод для додавання студента до бази даних
        $ID = intval($data->ID) ?? 0;                               // отримання значення параметру ID з JSON-об'єкту (??  0 - якщо значення не вказано, то встановлюється 0)
        $group = $data->group ?? '';
        $fullName = $data->fullName ?? '';
        $gender = $data->gender ?? '';
        $birthday = $data->birthday ?? '';
        // if($ID <= $this->studentDAO->getNumberOfStudents()) {                  // якщо ID менше або дорівнює кількості студентів в базі даних, то встановлюється помилка
        //     $response = array('status' => false, 'errorMessage' => 'Incorrect ID!');
        // } else {
            $v = new Validator();                                   // створення об'єкту класу Validator
            if (!$v->execute($data)) {                              // виконання перевірки на коректність введених даних
                $response = $v->getError();                         // якщо дані не коректні, то встановлюється помилка
            } else {                                                // інакше студент додається до бази даних
                $result = $this->studentDAO->addStudent($ID, $group, $fullName, $gender, $birthday);    // додавання студента до бази даних
                if ($result === false) {                            // якщо додавання не вдалося, то встановлюється помилка
                    $response = array('status' => false, 'errorMessage' => 'Failed to add student to table');
                } else {                                            // інакше встановлюється статус виконання операції
                    $response = array('status' => true);
                }
            }
        //}

        return json_encode($response);                              // повернення JSON-об'єкту з результатом виконання операції
    }

    public function edit($data): false|string {                     // метод для редагування даних про студента
        $ID = intval($data->ID) ?? 0;
        $group = $data->group ?? '';
        $fullName = $data->fullName ?? '';
        $gender = $data->gender ?? '';
        $birthday = $data->birthday ?? '';

        // if($ID > $this->studentDAO->getNumberOfStudents()) {                   // якщо ID більше кількості студентів в базі даних, то встановлюється помилка
        //     $response = array('status' => false, 'errorMessage' => 'No student with this ID in DB!');
        // } else {                                                    // інакше виконується редагування даних про студента
            $v = new Validator();                                   // створення об'єкту класу Validator

            if (!$v->execute($data)) {               // виконання перевірки на коректність введених даних
                $response = $v->getError();                         // якщо дані не коректні, то встановлюється помилка
            } else {                                                // інакше виконується редагування даних про студента
                $result = $this->studentDAO->updateStudent(         // редагування даних про студента
                    $ID,
                    $group,
                    $fullName,
                    $gender,
                    $birthday
                );

                if ($result === false) {                            // якщо редагування не вдалося, то встановлюється помилка
                    $response = array('status' => false, 'errorMessage' => 'Failed to edit student in the table');
                } else {
                    $response = array('status' => true);            // інакше встановлюється статус виконання операції
                }
            }
        //}

        return json_encode($response);
    }

    public function delete($data): false|string {                   // метод для видалення студента з бази даних
        $ID = intval($data->ID) ?? 0;                               // отримання значення параметру ID з JSON-об'єкту (??  0 - якщо значення не вказано, то встановлюється 0)

        $result = $this->studentDAO->deleteStudent($ID);        // видалення студента з бази даних
        if ($result === false) {                                // якщо видалення не вдалося, то встановлюється помилка
            $response = array('status' => false, 'errorMessage' => 'Failed to delete student from table');
        } else {                                                // інакше встановлюється статус виконання операції
            $response = array('status' => true);
        }

        return json_encode($response);                              // повернення JSON-об'єкту з результатом виконання операції
    }
}

