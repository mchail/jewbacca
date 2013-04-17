var mongoose = require('mongoose');

var feelSchema = mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
	},
	pain: Number
})
var Feel = mongoose.model('Feel', feelSchema);

exports.record = function(req, res) {
	var pain = req.body.pain;
	var feel = new Feel({pain: pain});
	feel.save();
	res.send("recorded");
};

exports.list = function(req, res) {
	Feel.find({}, function(err, feels) {
		res.send(feels);
	});
};
