const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nlpAnalyzer = require("./nlp_analyzer.js")
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();

const app = express();
const db = pgp('postgres://dng2:dng2@localhost:5433/db2');
app.use(bodyParser.json());
app.use(cors());

const saltRounds = 10; //bcrypt value


getAllSavedItems = async function getAllSavedItems(user_id) {
  const saved_items = await db.result('SELECT * FROM saved_items WHERE user_id = $1 ORDER BY created_at', [user_id], r => r.rows);
  return saved_items;
}


/*{
  email: "",
  password: ""
}*/
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  let data, user;
  // Verify email
  try {
    data = await db.one('SELECT * FROM login WHERE email = $1', [email]);
  }
  catch (error) {
    res.status(400).json('wrong credentials');
    return;
  }
  // Verify password
  const isValid = bcrypt.compareSync(password, data.hash);
  if (isValid) {
    // Get user
    try {
      user = await db.one('SELECT * FROM users WHERE email = $1', [email]);
    }
    catch (error) {
      res.status(400).json('unable to get user');
      return;
    }
    // Get saved items of user
    const saved_items = await getAllSavedItems(user.id);
    const full_user = Object.assign(user, {'saved_items': saved_items});
    res.json(full_user);
  }
  else {
    res.status(400).json('wrong credentials');
    return;
  }
});


/*{
  name: "",
  email: "",
  password: ""
}*/
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, saltRounds).then(hash => {
    db.tx(t => {
          // Create hash in DB
          return t.one('INSERT INTO login(email, hash) VALUES($1, $2) RETURNING *', [email, hash])
              .then(login => {
                // Create user in DB
                return t.one('INSERT INTO users(email, name, joined) VALUES($1, $2, $3) RETURNING *', [login.email, name, new Date()]);
              });
      })
      .then(user => {
          res.json(user);
      })
      .catch(error => {
          res.status(400).json('unable to sign up');
      });
  })
});


app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.one('SELECT * FROM users WHERE id = $1', [id])
      .then(user => {
          res.json(user);
        })
      .catch(error => {
        res.status(400).json('unable to sign up');
      })
    })


/*{
  user_id: "",
  text: "",
  img_url: ""
}*/
app.post('/save', (req, res) => {
  const { user_id, text, img_url } = req.body;
  db.one("INSERT INTO saved_items(user_id, name, post, img_url, created_at, updated_at) VALUES ($1, 'Draft', $2, $3, $4, $5)  RETURNING *",
        [user_id, text, img_url, new Date(), new Date()])
    .then(saved_item => {
        res.json(saved_item);
    })
    .catch(error => {
        res.status(400).json('unable to save item');
    })});


app.get('/saved_items/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const saved_items = await getAllSavedItems(user_id);
  res.json(saved_items);
});


/*{
  id: "",
  name: ""
}*/
app.put('/saved_items/rename', (req, res) => {
  const { id, name } = req.body;
  db.one('UPDATE saved_items SET name = $1, updated_at = $2 WHERE id = $3 RETURNING *', [name, new Date(), id])
  .then(saved_item => res.json(saved_item.name))
  .catch(error => {
      res.status(400).json('unable to rename saved item');
  })
});


app.delete('/saved_items/:id', (req, res) => {
  const { id } = req.params;
  db.result('DELETE FROM saved_items WHERE id = $1', [id], r => r.rowCount)
    .then(count => {
        if (count > 0){
          res.json(count);
        }
        else {
          res.status(400).json('unable to delete saved item');
        }
    });
})


/*{
  text: ""
}*/
app.post('/keywords', (req, res) => {
  const keywords = nlpAnalyzer.getKeywordsFromParagraph(req.body.text);
  res.json({"keywords": keywords});
})


app.listen(3000, () => {
  console.log("app is running");
})
