<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    exit;
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json; charset=UTF-8");

require_once('phpmailer/PHPMailerAutoload.php');


$json = file_get_contents('php://input');

$data = json_decode($json, true);

$form = [
    'ООО',
    'ИП',
    'АО',
];

$system = [
    'УСН 6% (доходы)',
    'УСН 15% (расходы)',
    'ОСНО',
];

$agents = [
    'OZON',
    'WB',
    'Яндекс Маркет',
    'Сбермегамаркет',
    'KazanExpress',
    'Aliexpress',
];

$textEbobani = "";

$contact = $data["contact"];

try {
    if (empty($contact["text"])) {
        if (!($contact["fio"] && $contact["sogl"] && $contact["tel"])) {
            throw new Exception('Заполни все данные, чайник', 418);
        }
    
        $textEbobani = "ФИО: " . $contact["fio"] . 
                        "<br>Телефон: " . $contact["tel"] .
                        "<br><br>";
    }
    else {
        if (!($contact["fio"] && $contact["sogl"] && $contact["tel"] && $contact["text"])) {
            throw new Exception('Заполни все данные, чайник', 418);
        }
    
        $textEbobani = "ФИО: " . $contact["fio"] . 
                        "<br>Телефон: " . $contact["tel"] .
                        "<br>Вопрос: " . $contact["text"] .
                        "<br><br>";
    }
    if (count($data) === 2) {
        $formData = $data["formData"]["value"];
        if (!($contact["fio"] && $contact["sogl"] && $contact["tel"]) && 
            !(
                $formData['form']['value'] !== 0 &&
                $formData['system']['value'] !== 0 &&
                in_array(true, $formData['agents']['value'])
            )
        ) {
            throw new Exception('Заполни все данные, чайник', 418);
        }
        
        // Форма деятельности
        $formCash = 0;
        switch ($formData['form']['value']) {
            case 1:
                // ООО
                $formCash = 6000;
                break;
            case 2:
                // ИП
                $formCash = 4500;
                break;
            case 3:
                // АО
                $formCash = 7500;
                break;
            default:
                break;
        }
        
        // Система НО
        $systemCash = 0;
        switch ($formData['system']['value']) {
            case 1:
                // Доходы
                $systemCash = 2500;
                break;
            case 2:
                // Расхода
                $systemCash = 5000;
                break;
            case 3:
                // ОСНО
                $systemCash = 10000;
                break;
            default:
                break;
        }
        
        // Агенты
        $agentsCash = 0;
        $typeAgent = "";
        foreach ($formData['agents']['value'] as $i => $el) {
            if ($el === true) {
                $skuCash = $formData['form']['value'] === 1 ? 1 + floor($formData['form']['option'] / 50) * 0.05 : 1;
                $typeAgent = $typeAgent . $agents[$i] . ", ";
                switch ($i) {
                    case 0:
                        // OZON
                        $cabs = $formData['agents']['option'];
                        $coef = $cabs >= 2 ? 5000 + ($cabs - 1) * 2500 : $cabs * 5000;
                        if ($formData['form']['value'] === 2 && $formData['system']['value'] === 1) {
                            $agentsCash += $coef;
                        } elseif ($formData['system']['value'] === 3) {
                            $agentsCash += $coef * 2.5 * $skuCash;
                        } else {
                            $agentsCash += $coef * 2 * $skuCash;
                        }
                        break;
                    default:
                        if ($formData['form']['value'] === 2 && $formData['system']['value'] === 1) {
                            $agentsCash += 5000;
                        } elseif ($formData['system']['value'] === 3) {
                            $agentsCash += 5000 * 2.5 * $skuCash;
                        } else {
                            $agentsCash += 5000 * 2 * $skuCash;
                        }
                        break;
                }
            }
        }
        
        $ftsCash = 0;
        if ($formData['fts']['value']) {
            $cabs = $formData['agents']['option'];
            $res = $cabs >= 2 ? 3000 + ($cabs - 1) * 500 : $cabs * 3000;
            if (!$formData['agents']['value'][0]) {
                $res = 0;
            }
            $ftsCash = $res > 5000 ? 5000 : $res;
        }
        
        $employeesCash = 0;
        $sotr = $formData['employees']['value'];
        if ($sotr === 0 && $formData['form']['value'] !== 2) {
            $employeesCash = 3000;
        } else {
            $employeesCash = $sotr * 3000;
        }
        $ftsSend = $formData['fts']['value'] === true ? "Да" : "Нет";
        $skuSend = $formData['form']['value'] - 1 === 0 ? "<br>SKU: " . $formData['form']['option'] : "";
        $agentsSend = $formData['agents']['value'][0] ? "<br>Кабинеты: " . $formData['agents']['option'] : "";
        $textEbobani = $textEbobani . "Форма деятельности: " . $form[$formData['form']['value'] - 1] . 
            $skuSend . 
            "<br>Система налогообложения: " . $system[$formData['system']['value'] - 1] .
            "<br>Агенты, с которыми работаете: " . $typeAgent . 
            $agentsSend . 
            "<br>Требуется ли подача отчетности в ФТС: " . $ftsSend . 
            "<br>Количество сотрудников: " . $formData['employees']['value'] . 
            "<br>Предварительный расчёт: " . $formCash + $systemCash + $agentsCash + $ftsCash + $employeesCash . " ₽";
    
    }     
} catch (Exception $e) {
    http_response_code($e->getCode()); // Set the response code to the exception code
    echo $e->getMessage(); // Output the error message
}



$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru'; // Specify main and backup SMTP servers
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'salers.site@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'GGuTK0w8VgpL8v3ESGp0'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('salers.site@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('makeevip@yandex.ru'); // Кому будет уходить письмо 
$mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body = $textEbobani;
$mail->AltBody = '';
try {
    if (!$mail->send()) {
        throw new Exception('Отправка - ошибка', 418);
    }
} catch (Exception $e) {
    http_response_code($e->getCode()); // Set the response code to the exception code
    echo $e->getMessage(); // Output the error message
}

