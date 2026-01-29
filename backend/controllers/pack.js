exports.getpackages = (req, res) => {
  res.render('home_packages/pack', { activePage: 'packages' });
};