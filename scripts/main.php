	<?php 
		if (isset($_POST['formMessage'])) { 
		$name = $_POST["formName"];
		$subject = $_POST["formSubject"];
		$email = $_POST["formEmail"];
		$message = $_POST["formMessage"];
		$message = wordwrap($message, 70);

		$error = "";

		if (!preg_match("/^[a-zA-Z ]*$/",$name) or empty($name)) { $error = "<li>You can only place letters in the name field and it must not be empty</li>"; }

		if (!preg_match("/^[a-zA-Z0-9 ]*$/",$subject) or empty($subject)) { $error = $error."<li>You can only place letters and numbers in the subject field and it must not be empty</li>"; }

		if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) { $error = $error."<li>Email must be formatted like so: you@email.com</li>"; }

		if ($error == "") {
		$message = htmlspecialchars($message);

		mail("xianith@gmail.com",$subject,$message,"From: $name\n");
		echo '<div id="errorBox" style="display: block; text-align: center">
			Thank you for contacting me!</ul>
			</div>';
		}

		else {
			echo '<div id="errorBox" style="display: block;">
			<b>Errors</b><br><ul>'. $error .'</ul>
			</div>
			';
			}
		}
		?>