<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'resources/phpmailer/src/Exception.php';
  require 'resources/phpmailer/src/PHPMailer.php';
  require 'resources/phpmailer/src/SMTP.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'resources/phpmailer/language/');
  $mail->IsHTML(true);

  $mail->isSMTP();
  $mail->SMTPAuth = true;
  
  $mail->Host = 'smtp.yandex.ru';
  $mail->Port = 587;
  $mail->Username = 'kulikov.lir@yandex.ru';
  $mail->Password = 'Lp8Hu^%y';
  $mail->SMTPSecure = 'tls';

  $mail->setFrom('kulikov.lir@yandex.ru', 'Чип и Дип');
  $mail->addAddress('milan7457@yandex.ru');
  $mail->Subject = 'Заявка в автосервис';

  $name = $_POST['name'];
  $phone = $_POST['tel'];

  $mail->Body = '' .$name . ' оставил заявку, его телефон ' .$phone;

  if(!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены';
  }

  $response = ['message' => $message];
  header('Content-type: application.json');
  echo json_encode($response);

  ?>