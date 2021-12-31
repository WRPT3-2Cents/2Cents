const getOneTitle = async (req, res) => {
  const db= req.app.get('db');

  const { title_id } = req.params;
  

  try {
    const title = await db.get_one_title(title_id);
    
     res.status(200).send(title[0]);

  } catch(err){
    console.log(`Error retrieving single title: ${err}`);
     res.status(500).send(err);
  }
}

const getTitles = async (req, res) => {
  const db = req.app.get("db");
  try {
    const titles = await db.get_titles();
     res.status(200).send(titles);
  } catch(err){
    console.log(`Error retrieving titles: ${err}`);
     res.status(500).send(`Error retrieving titles: ${err}`);
  }
};

const addTitle = async (req, res) => {
  const db = req.app.get("db");
  const {
    name,
    type,
    summary,
    genre,
    length
  } = req.body;

  try {
    const titles = await db.add_titles([name, type, summary, genre, length]);
     res.status(200).send(titles);
  } catch(err){
    console.log(`Error adding new title: ${e}`);
    res.status(500).send(e)

  }
};

const editTitle = async (req, res) => {
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

  try {
    const titles = await db.edit_titles([title_id, name, type, summary, genre, length, recommendations, non_recommendations]);
     res.status(200).send(titles);
  } catch(err){
    console.log(`Error editing Title`);
     res.status(500).send(err);
  }
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
