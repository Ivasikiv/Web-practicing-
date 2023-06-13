<?php

ini_set('display_errors', 0);

class StudentModel {                                                 // клас для зберігання даних про студента
    private int $id;
    private string $groupName;
    private string $fullName;
    private string $gender;
    private string $birthday;
  
    public function __construct($id, $groupName, $fullName, $gender, $birthday) {
      $this->id = $id;
      $this->groupName = $groupName;
      $this->fullName = $fullName;
      $this->gender = $gender;
      $this->birthday = $birthday;
    }
  
    public function getId() {
      return $this->id;
    }

    public function getGroup() {
      return $this->groupName;
    }

    public function getFullName() {
      return $this->fullName;
    }

    public function getGender() {
        return $this->gender;
    }

    public function getBirthday() {
        return $this->birthday;
    }
}