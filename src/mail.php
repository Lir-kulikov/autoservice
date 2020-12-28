<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'resources/phpmailer/src/Exception.php';
  require 'resources/phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  $mail->setFrom('info@chipdip33.ru', 'Чип и Дип');
  $mail->addAdress('milan7457@yandex.ru');
  $mail->Subject = 'Привет';

  $body = '<h1>Тело письма</h1>';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Имя</strong> '.$_POST['tel'].'</p>';
  }

  if(!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены';
  }

  $response = ['message' => $message];
  header('Content-type: application.json');
  echo json_encode($response);

  ?>

 