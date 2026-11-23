// Pixel-art header scene: dithered sunset, striped sun, palm trees, moving
// grid and a car swerving toward the horizon. Drawn on a low-res canvas that
// is scaled up with hard pixels. Without JS the CSS sunset stays in place.
(function () {
	var hero = document.querySelector('.hero');
	if (!hero || !document.createElement('canvas').getContext) return;

	var canvas = document.createElement('canvas');
	canvas.className = 'scene';
	// Sized here too, so a stale cached stylesheet can't leave it tiny in the corner
	canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;image-rendering:pixelated';
	canvas.setAttribute('aria-hidden', 'true');
	hero.insertBefore(canvas, hero.firstChild);
	hero.classList.add('has-scene');

	var ctx = canvas.getContext('2d');
	var back = document.createElement('canvas');   // sky, sun, palms (static)
	var bctx = back.getContext('2d');
	var W, H, HZ, FH, CX;
	var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

	var SKY = ['#12032b', '#1d0640', '#2d0b5a', '#4a1173', '#6a1680', '#8c1c8a', '#b3247f', '#d42a78'];
	var SUN = ['#fff07a', '#ffe45c', '#ffd319', '#ffb02e', '#ff8c3a', '#ff6a4d'];
	var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

	// Pick a color from a ramp with ordered dithering between neighbors
	function ramp(colors, t, x, y) {
		var f = Math.max(0, Math.min(0.9999, t)) * (colors.length - 1);
		var i = Math.floor(f);
		return colors[(f - i) > (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 ? i + 1 : i];
	}

	function rand(seed) { var x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x); }

	function palm(g, x, base, h, lean) {
		g.fillStyle = '#0d0221';
		var tx = x, ty = base - h, i, s;
		for (i = 0; i <= h; i++) {
			var px = Math.round(x + lean * Math.pow(i / h, 2) * h * 0.3);
			g.fillRect(px, base - i, h > 20 ? 2 : 1, 1);
			if (i === h) tx = px;
		}
		var L = h * 0.62;
		var fronds = [[1, 0.95], [1, 0.5], [1, 0.1], [0.45, 1.15], [-1, 0.95], [-1, 0.5], [-1, 0.1], [-0.45, 1.15]];
		fronds.forEach(function (f) {
			for (s = 0; s <= L; s += 0.5) {
				var fx = Math.round(tx + f[0] * s * 0.85);
				var fy = Math.round(ty - f[1] * s * 0.7 + 0.9 * s * s / L);
				g.fillRect(fx, fy, 1, s < L * 0.55 ? 2 : 1);
				if (Math.floor(s) % 2 === 0 && s > 2) g.fillRect(fx, fy + 1, 1, 2);   // leaflets
			}
		});
		g.fillRect(tx - 1, ty - 1, 4, 3);   // crown
	}

	function buildBack() {
		back.width = W; back.height = H;
		var x, y;
		for (y = 0; y < HZ; y++) for (x = 0; x < W; x++) {
			bctx.fillStyle = ramp(SKY, y / HZ, x, y);
			bctx.fillRect(x, y, 1, 1);
		}
		// Stars
		bctx.fillStyle = '#fff';
		for (var i = 0; i < W / 5; i++) bctx.fillRect(Math.floor(rand(i + 1) * W), Math.floor(rand(i + 99) * HZ * 0.5), 1, 1);

		// Sun: striped lower half, cut off by the horizon
		var R = Math.round(Math.min(W * 0.24, HZ * 0.52));
		var cy = HZ - Math.round(R * 0.4);
		var gaps = [[0.10, 0.15], [0.30, 0.38], [0.52, 0.63], [0.76, 0.90]];
		for (y = cy - R; y < HZ; y++) {
			var dy = y - cy, k = dy / R;
			if (k > 0 && gaps.some(function (gp) { return k >= gp[0] && k < gp[1]; })) continue;
			var half = Math.round(Math.sqrt(R * R - dy * dy));
			for (x = CX - half; x < CX + half; x++) {
				bctx.fillStyle = ramp(SUN, (dy + R) / (2 * R), x, y);
				bctx.fillRect(x, y, 1, 1);
			}
		}

		// Palms along the horizon, clear of the middle
		var spots = W < 180
			? [[0.04, 0.42, 1], [0.17, 0.3, -1], [0.85, 0.34, 1], [0.96, 0.44, -1]]
			: [[0.03, 0.46, 1], [0.09, 0.3, -1], [0.16, 0.4, 1], [0.24, 0.26, -1], [0.3, 0.34, 1],
			   [0.7, 0.32, -1], [0.76, 0.26, 1], [0.84, 0.42, -1], [0.91, 0.3, 1], [0.97, 0.48, -1]];
		spots.forEach(function (s) { palm(bctx, Math.round(s[0] * W), HZ, Math.round(s[1] * HZ), s[2]); });
	}

	// Rear view of the car. k outline, s body, d body shade, w/W glass,
	// T tail lights, t bright lamps, g bumper, e exhaust
	var CAR = [
		'.........kkkkkkkkkk.........',
		'........kWWwwwwwwwwk........',
		'.......kWwwwwwwwwwwwk.......',
		'..kkkkkkkkkkkkkkkkkkkkkkkk..',
		'.kssssssssssssssssssssssssk.',
		'kssssssssssssssssssssssssssk',
		'kTTTTTTTTTTTTTTTTTTTTTTTTTTk',
		'kTttTTTTTTTTTTTTTTTTTTTTttTk',
		'kddddddddddddddddddddddddddk',
		'.kggggggggggggggggggggggggk.',
		'.kkkkk..e..........e..kkkkk.',
		'..kkk..................kkk..'
	];
	var INK = { k: '#0d0221', s: '#f3e9ff', d: '#b9a6e0', w: '#1b3f7a', W: '#7fe9ff', T: '#ff2a6d', t: '#ffe45c', y: '#ffd319', g: '#3a2a5c', e: '#01cdfe' };

	var PLATE = 'XANIT';
	var FONT = {
		X: ['x.x', '.x.', 'x.x'],
		A: ['.x.', 'xxx', 'x.x'],
		N: ['xx.', 'x.x', 'x.x'],
		I: ['xxx', '.x.', 'xxx'],
		T: ['xxx', '.x.', '.x.']
	};

	function drawCar(x, y, lean, flick) {
		for (var r = 0; r < CAR.length; r++) {
			var shift = r < 3 ? lean : 0;   // the cabin leans into the turn
			for (var c = 0; c < 28; c++) {
				var ch = CAR[r].charAt(c);
				if (ch === '.') continue;
				ctx.fillStyle = (ch === 'e' && flick) ? '#ff71ce' : INK[ch];
				ctx.fillRect(x + c + shift, y + r, 1, 1);
			}
		}
		// License plate: 3x3 pixel letters, the smallest that still read
		var px = x + 4, py = y + 6, i, gr, gc;
		ctx.fillStyle = '#ffd319';
		ctx.fillRect(px, py, PLATE.length * 4 + 1, 5);
		ctx.fillStyle = '#0d0221';
		for (i = 0; i < PLATE.length; i++) for (gr = 0; gr < 3; gr++) for (gc = 0; gc < 3; gc++) {
			if (FONT[PLATE.charAt(i)][gr].charAt(gc) === 'x') ctx.fillRect(px + 1 + i * 4 + gc, py + 1 + gr, 1, 1);
		}
	}

	function frame(now) {
		var t = now / 1000, x, y, i, r;
		ctx.drawImage(back, 0, 0);

		// Ground
		for (y = HZ; y < H; y++) {
			ctx.fillStyle = (y - HZ) < FH * 0.35 ? '#2a0645' : (y - HZ) < FH * 0.7 ? '#220540' : '#1a0636';
			ctx.fillRect(0, y, W, 1);
		}

		// Where the car is, and how hard it is turning
		var amp = Math.max(0, Math.min(W * 0.3, W / 2 - 18));
		var sw = Math.sin(t * 0.8) * 0.8 + Math.sin(t * 1.9 + 1) * 0.2;
		var vel = Math.cos(t * 0.8) * 0.64 + Math.cos(t * 1.9 + 1) * 0.38;

		// Grid lines running to the vanishing point; they slide sideways as the car swerves
		var S = W * 0.11, slide = -sw * 1.6;
		for (r = 1; r <= FH; r++) {
			var gap = S * r / FH;
			if (gap < 6) continue;
			y = HZ + r;
			ctx.fillStyle = r < FH * 0.3 ? '#0a6f9c' : '#0aa3d6';
			var next = S * (r + 1) / FH;
			var k0 = Math.ceil(-CX / gap - slide), k1 = Math.floor((W - CX) / gap - slide);
			for (i = k0; i <= k1; i++) {
				// each row draws the run to the next row, so shallow lines stay solid
				var xa = Math.round(CX + (i + slide) * gap), xb = Math.round(CX + (i + slide) * next);
				ctx.fillRect(Math.min(xa, xb), y, Math.max(1, Math.abs(xb - xa)), 1);
			}
		}

		// Cross lines rushing toward the viewer
		var phase = (t * 1.6) % 1;
		for (i = 1; i <= 5; i++) {
			r = Math.round(FH / (i + 1 - phase));
			if (r < 5 || r > FH) continue;
			ctx.fillStyle = r < FH * 0.25 ? '#a8438f' : '#ff71ce';
			ctx.fillRect(0, HZ + r, W, 1);
		}

		// Horizon
		ctx.fillStyle = '#ff71ce';
		ctx.fillRect(0, HZ, W, 1);

		// Car, with a little underglow
		var cx = Math.round(CX + sw * amp) - 14;
		var cyTop = H - 14;
		var lean = vel > 0.35 ? 1 : vel < -0.35 ? -1 : 0;
		ctx.fillStyle = '#b967ff';
		for (x = 2; x < 26; x += 2) ctx.fillRect(cx + x + (Math.floor(t * 10) & 1), cyTop + 12, 1, 1);
		drawCar(cx, cyTop, lean, Math.floor(t * 12) & 1);
	}

	function resize() {
		var box = hero.getBoundingClientRect();
		var px = box.width < 600 ? 3 : 4;
		W = Math.ceil(box.width / px); H = Math.ceil(box.height / px);
		canvas.width = W; canvas.height = H;
		HZ = Math.round(H * 0.7); FH = H - HZ - 1; CX = Math.round(W / 2);
		hero.style.setProperty('--hz', (HZ / H * 100) + '%');   // keeps the title split on the horizon
		buildBack();
		if (still) frame(2000);
	}

	var last = 0;
	function loop(now) {
		requestAnimationFrame(loop);
		if (now - last < 33) return;   // ~30 fps is plenty for pixel art
		if (hero.getBoundingClientRect().bottom < 0) return;
		last = now;
		frame(now);
	}

	window.addEventListener('resize', resize);
	resize();
	if (!still) requestAnimationFrame(loop);
})();
