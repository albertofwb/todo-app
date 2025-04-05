const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const todo = await Todo.create(req.body);

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this todo`
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this todo`
      });
    }

    // If task is being marked as completed, set completedAt date
    if (!todo.completed && req.body.completed) {
      req.body.completedAt = Date.now();
    }
    
    // If task is being marked as uncompleted, remove completedAt date
    if (todo.completed && !req.body.completed) {
      req.body.completedAt = null;
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this todo`
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
