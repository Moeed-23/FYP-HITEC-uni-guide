// exports.getDashboardData = async (req, res) => {
//     try {
//       res.json({
//         welcomeMessage: `Welcome back, ${req.user.name}!`,
//         stats: {
//           feedbacks: Math.floor(Math.random() * 10) + 1,
//           lastLogin: new Date()
//         }
//       });
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to load dashboard data' });
//     }
//   };
  


// App/controllers/dashboardController.js
exports.getDashboardData = async (req, res) => {
  try {
    res.json({
      welcomeMessage: `Welcome back, ${req.user.id}!`,
      stats: {
        feedbacks: Math.floor(Math.random() * 10) + 1,
        lastLogin: new Date()
      }
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

