<!DOCTYPE html>
<html lang="en">

	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="css/main.css" type="text/css" media="all">
	<script src="scripts/main.js"></script>
	<title>Ben Paulson</title>

	<noscript>
		<style type="text/css">
			#tabs {
				display: none;
			}

			#container h2 {
				display: block;
			}
		</style>
	</noscript>

	</head>

	<body onload="init()">

	<div id="header">
		<h1>Ben Paulson</h1>
	</div>

	<ul id="tabs">
		<li><a href="#about" onclick="showTab()">About</a></li>
		<li><a href="#work" onclick="showTab()">Work</a></li>
		<li><a href="#contact" onclick="showTab()">Contact</a></li>
	</ul>

	<div id="container">
		<section class="tabContent" id="about">
		<h2>About</h2>

		<hr>

			<p>Hi there, I'm Ben, a guy that loves to play video games and develop things. I'm currently working as a Techranger at the Center for Distributed Learning at the University of Central Florida. I was born in South Carolina but was primarily raised in central Florida. As much as I love playing games I also develop maps and websites based on them.</p>

			<h3>Hobbies:</h3>
			<p>I love creating things dedciated to video games such as maps, websites, or art assets. I also get invloved as a server hoster and host things either locally on my Windows machine or through my personal Linux (ubuntu) server.</p>

			<h3>Primary Games:</h3>
			<p>I've played well over 200 games in my life, ranging from first person shooters, to strategy, and even massively multiplayer online games. Here are only a few that I've played and developed either a couple maps or a fansite for:</p>

			<ul>
				<li><a href="http://store.steampowered.com/sub/715/">Half Life Series</a></li>
				<li><a href="http://store.steampowered.com/app/4920/">Natural Selection Series</a></li>
				<li><a href="http://store.steampowered.com/app/2780/">Arma Series</a></li>
				<li><a href="http://store.steampowered.com/agecheck/app/221100/">DayZ</a></li>
				<li><a href="http://us.battle.net/en/int?r=wow">World of Warcraft</a></li>
				<li><a href="http://store.steampowered.com/app/304930/">Unturned</a></li>
			</ul>
		</section>

		<section class="tabContent" id="work">
		<h2>Works</h2>

		<hr>

			<p>Here are a few samples of my work:</p><br>

		<?php
			$images = glob('./images/works/*.{jpg,gif,png}', GLOB_BRACE);

			foreach($images as $img) {
				$key = array_search($img, $images) + 1;
				echo '
					<a class="lightbox" href="#work'. $key .'">
		   				<img src="'. $img .'" alt="Thumbnail of work">
					</a>	
				';
			}
		?>
	
		</section>

		<section class="tabContent" id="contact">
		<h2>Contact</h2>

		<hr>

			<form action="#contact" method="post" id="emailForm" onsubmit="return validateForm()" onreset="return errorMsgReset()">
			
			<div class="formBox">
				<label for="formName">Name</label>
				<input type="text" placeholder="Name" name="formName" id="formName">
			</div>
			<div class="formBox">
				<label for="formSubject">Subject</label>
				<input type="text" placeholder="Subject" name="formSubject" id="formSubject">
			</div>
			<div class="formBox">
				<label for="formEmail">E-Mail</label>
				<input type="text" placeholder="E-Mail" name="formEmail" id="formEmail">
			</div><br>
			
			<div class="formBox">
				<label for="formMessage">Message</label>
				<textarea rows="12" cols="55" id="formMessage" name="formMessage"></textarea>
			</div>

			<br>
				<input type="submit" name="submit" value="Submit" class="button">- <input type="reset" name="reset" value="Reset" class="button">
			</form>

			<div id="errorBox">
				<b>Errors</b><p id="errorMsg"></p>
			</div><br>

			<?php include 'scripts/main.php' ?>

		</section>
	</div>
	
	<div class="footer"><a href="https://github.com/Xianith"><img src="images/gh-icon.png" alt="Github Icon"></a></div>

	<?php
			foreach($images as $img) {
				$key = array_search($img, $images) + 1;
				echo '
					<div class="lightbox-target" id="work'. $key .'">
						<img src="'. $img .'" alt="Image of work">
						<a class="lightbox-close" href="#"></a>
					</div>
				';
			}
		?>

	</body>
</html>