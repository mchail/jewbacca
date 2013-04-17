
$(document).ready(function() {
	var $directions = $('.directions');
	var directions = $directions.text();
	$('.numbers').on('mouseleave', function() {
		$directions.text(directions).removeClass('description');
	});
	$('.numbers li').each(function(index, el) {
		var $el = $(el);
		$el.on('mouseenter', function() {
			$directions.text($el.data('description')).addClass('description');
		});
		$el.on('click', function() {
			var pain = parseInt($el.data('pain'));
			feels.push({pain: pain});
			drawGraph();
			$.post('/feels', {pain: pain});
		});
	});

	function fetchFeels() {
		$.get('/feels', function(data) {
			window.feels = data;
			drawGraph();
		});
	}

	function drawGraph() {
		data = [];
		for (var i = 0; i < feels.length; i++) {
			var feel = feels[i];
			data.push([i, feel.pain]);
		};

		var container = $('.graph').get(0);
		Flotr.draw(container, [data], {
			xaxis: {
				tickDecimals: 0
			},
			yaxis: {
				min: 0,
				max: 10,
				tickDecimals: 0
			},
			mouse: {
				track: true,
				relative: true
			},
			grid: {
				outlineWidth: 4,
				labelMargin: 8,
				color: '#555555'
			},
			lines: {
				lineWidth: 6,
				color: '#444444'
			}
		});
	}

	fetchFeels();
});
