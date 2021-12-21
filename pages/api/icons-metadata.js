export default (req, res) => {
  fetch("https://fonts.google.com/metadata/icons")
    .then((response) => response.text())
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};
