const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

router.get('/', ensureAuthenticated, async (req, res) => {
  // Aggregate totals per category for logged in user
  const agg = await Expense.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } }
  ]);
  // Send structured data to template
  const labels = agg.map(x => x._id);
  const data = agg.map(x => x.total);
  res.render('dashboard', { labels: JSON.stringify(labels), data: JSON.stringify(data) });
});

module.exports = router;
