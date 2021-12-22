const getOneTitle = async (req, res) => {
  const db= req.app.get('db');

  const { title_id } = req.params;
  

  try {
    const title = await db.get_one_title(title_id);
    
    return res.status(200).send(title[0]);

  } catch(err){
    console.log(`Error retrieving single title: ${err}`);
    return res.status(500).send(err);
  }
}

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
    length
  } = req.body;
  db.add_titles([
    name,
    type,
    summary,
    genre,
    length]
  )
    .then((titles) => res.status(200).send(titles))
    .catch((e) => {
      console.log(`Error adding new title: ${e}`);
      res.status(500).send(e)
    });
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
  
  db.edit_titles([
    title_id,
    name,
    type,
    summary,
    genre,
    length,
    recommendations,
    non_recommendations]
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
  getOneTitle,
  getTitles,
  addTitle,
  editTitle,
  deleteTitle,
};
