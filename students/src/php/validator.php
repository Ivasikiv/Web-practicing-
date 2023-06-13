<?php

class Validator {
    private array $error;

    public function __construct() {
        $this->error = array('status' => 'false', 'errorMessage' => '');
    }

    public function execute ($data) : bool { 
        //if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        //     $json = file_get_contents('php://input');
        //    $data = json_decode($json);
            
            if (empty($data->fullName)||empty($data->group)||empty($data->gender)||empty($data->birthday)) {
              $this->error = array('status' => 'false', 'errorMessage' => 'One of the fields is empty!');
              echo json_encode($this->error);
              return false;
            } elseif (!(preg_match('/^[a-zA-Z\s]{1,50}$/', $data->fullName))) {
              $this->error = array('status' => 'false', 'errorMessage' => 'Incorrect name or surname!');
              echo json_encode($this->error);
              return false;
            } elseif ((strtotime(date('Y-m-d')) - strtotime($data->birthday)) < 15*365*24*60*60 || (strtotime(date('Y-m-d')) - strtotime($data->birthday)) > 100*365*24*60*60) {
              $this->error = array('status' => 'false', 'errorMessage' => 'Incorrect birthday!');
              echo json_encode($this->error);
              return false;
            }
        //}
        return true;
    }

    public function getError() {
        return $this->error;
    }
}
  
?>