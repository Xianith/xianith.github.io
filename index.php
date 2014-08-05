<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">

	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="stylesheet" href="css/main.css" type="text\css" media="all" />
	<script src="js/main.js"></script>
	<title>Ben Paulson</title>
	</head>

	<noscript>
		<style type="text/css">
			#tabs {
				display: none;
			}

			h1 {
				display: block;
			}
		</style>
	</noscript>

	<body onload="init()">

	<div id="header">
		Ben Paulson
	</div>

	<ul id="tabs">
		<li><a href="#about" onclick="showTab()">About</a></li>
		<li><a href="#work" onclick="showTab()">Work</a></li>
		<li><a href="#contact" onclick="showTab()">Contact</a></li>
	</ul>

	<div id="container">
		<div class="tabContent" id="about">
		<h1>About<hr></h1>

			<p>Hi there, I'm Ben, a guy that loves to play video games and develop things. I'm currently working as a Techranger at the Center for Distributed Learning at the University of Central Florida. I was born in South Carolina but was primarily raised in central Florida. As much as I love playing games I also develope maps and websites based on them.</p>

			<h2>Hobbies:</h2>
			I lnove creating things dedciated to video games such as maps, websites, or art assets. I also get invloved as a server hoster and host things either locally on my Windows machine or through my personal Linux (ubuntu) server.

			<h2>Primary Games:</h2>
			I've played well over 200 games in my life, ranging from first person shooters, to strategy, and even massively multiplayer online games. Here are only a few that I've played and developed either a couple maps or a fansite for:

			<ul>
				<li><a href="http://store.steampowered.com/sub/715/">Half Life Series</a></li>
				<li><a href="http://store.steampowered.com/app/4920/">Natural Selection Series</a></li>
				<li><a href="http://store.steampowered.com/app/2780/">Arma Series</a></li>
				<li><a href="http://store.steampowered.com/agecheck/app/221100/">DayZ</a></li>
				<li><a href="http://us.battle.net/en/int?r=wow">World of Warcraft</a></li>
				<li><a href="http://store.steampowered.com/app/304930/">Unturned</a></li>
			</ul>
		</div>

		<div class="tabContent" id="work">
		<h1>Works<hr></h1>

			Here are a few samples of my work:<br />

		<?php
			$images = glob('./images/works/*.{jpg,gif,png}', GLOB_BRACE);

			foreach($images as $img) {
				$key = array_search($img, $images) + 1;
				echo '
					<a class="lightbox" href="#work'. $key .'">
		   				<img src="'. $img .'"/>
					</a>	
				';
			}
		?>
	
		</div>

		<div class="tabContent" id="contact">
		<h1>Contact<hr></h1>
			<form action="" method="post" enctype="text/plan" id="emailForm" onsubmit="validateForm()">
			<input type="text" placeholder="First Name" name="FirstName"><input type="text" placeholder="Last Name" name="LastName"><input type="text" placeholder="Email Address" name="Email"><br/>
			<textarea rows="12" cols="55"></textarea><br/>
			<input type="submit" name="submit" value="Submit" class="button">|<input type="reset" name="reset" value="Reset" class="button">
			</form>		
		</div>
	</div>
	
	<div class="footer"><a href=""><img src="images/gh-icon.png" /></a> <a href=""><img src="images/fb-icon.png" /></a></div>

	<?php
			foreach($images as $img) {
				$key = array_search($img, $images) + 1;
				echo '
					<div class="lightbox-target" id="work'. $key .'"">
						<img src="'. $img .'"/>
						<a class="lightbox-close" href="#"></a>
					</div>
				';
			}
		?>

	</body>
</html>