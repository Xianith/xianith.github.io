if (isset($_POST["from"])) {
    $from = $_POST["from"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $message = wordwrap($message, 70);
    mail("xianith@gmail.com",$subject,$message,"From: $from\n");
    echo "Thank you for sending us feedback";