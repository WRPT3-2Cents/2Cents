const getTitles = (req, res) => {
  const db = req.app.get("db");
  db.get_titles()
    .then((titles) => {
      res.status(200).send(titles);
    })
    .catch((e) => console.log(e));
};

const addTitle = (req, res) => {
  const db = req.app.get("db");
  const {
    name,
    type,
    summary,
    genre,
    length,
    recommendations,
    non_recommendations,
  } = req.body;
  db.add_titles(
    name,
    type,
    summary,
    genre,
    length,
    recommendations,
    non_recommendations
  )
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(500).send(e));
};

const editTitle = (req, res) => {
  const db = req.app.get("db");
  const {
    title_id,
    name,
    type,
    summary,
    genre,
    length,
    recommendations,
    non_recommendations,
  } = req.body;
  console.log(req.body)
  db.edit_titles(
    title_id,
    name,
    type,
    summary,
    genre,
    length,
    recommendations,
    non_recommendations
  )
    .then((titles) => res.status(200).send(titles))
    .catch((e) => console.log(e));
};

const deleteTitle = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.delete_titles(id)
    .then(() => res.sendStatus(200))
    .catch((e) => console.log(e));
};

module.exports = {
  getTitles,
  addTitle,
  editTitle,
  deleteTitle,
};
