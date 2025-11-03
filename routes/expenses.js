const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

// List expenses
router.get('/', ensureAuthenticated, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.render('expenses/index', { expenses });
});

// New expense form
router.get('/new', ensureAuthenticated, (req, res) => res.render('expenses/new'));

// Create expense
router.post('/', ensureAuthenticated, async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    await Expense.create({
      user: req.user.id,
      amount: parseFloat(amount),
      category,
      description,
      date: date || Date.now()
    });
    req.flash('success_msg', 'Expense added');
    res.redirect('/expenses');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add expense');
    res.redirect('/expenses');
  }
});

// Edit form
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense || expense.user.toString() !== req.user.id) {
    req.flash('error_msg', 'Not authorized');
    return res.redirect('/expenses');
  }
  res.render('expenses/edit', { expense });
});

// Update
router.put('/:id', ensureAuthenticated, async (req, res) => {
  const { amount, category, description, date } = req.body;
  const expense = await Expense.findById(req.params.id);
  if (!expense || expense.user.toString() !== req.user.id) {
    req.flash('error_msg', 'Not authorized');
    return res.redirect('/expenses');
  }
  expense.amount = parseFloat(amount);
  expense.category = category;
  expense.description = description;
  expense.date = date || expense.date;
  await expense.save();
  req.flash('success_msg', 'Expense updated');
  res.redirect('/expenses');
});

// Delete
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense || expense.user.toString() !== req.user.id) {
    req.flash('error_msg', 'Not authorized');
    return res.redirect('/expenses');
  }
  await expense.remove();
  req.flash('success_msg', 'Expense removed');
  res.redirect('/expenses');
});

module.exports = router;
