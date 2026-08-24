const express = require("express");

const cors = require("cors");
require("dotenv").config();

// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");

const app = express();
const port = process.env.PORT || 5000;

// const serviceAccount = require("./discover-bogura-firebase-adminsdk-fbsvc-0d2420932d.json");

// // Firebase Admin
// const firebaseApp = initializeApp({
//   credential: cert(serviceAccount),
// });

// const auth = getAuth(firebaseApp);

// middleware

app.use(express.json());

app.use(cors());

// const verifyFbToken = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).send({ message: "unAuthorized access" });
//   }

//   try {
//     const tokenId = token.split(" ")[1];

//     const decoded = await auth.verifyIdToken(tokenId);

//     console.log("decoded in the token", decoded);
//   } catch (error) {
//     return res.status(401).send({ message: "unauthorized assess" });
//   }

//   req.decoded_email = decoded.email;

//   next();
// };

const { MongoClient, ServerApiVersion, ObjectId, Admin } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uzupc.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // database
    const db = client.db("discover_bogura");

    // ********* User collection *****************

    const usersCollection = db.collection("users");

    // thana collection

    const thanaCollection = db.collection("thana");

    //  food collection

    const famousFoodCollection = db.collection("famous_food");

    // famous people collection

    const famousPeopleCollection = db.collection("famous_people");

    // tourist Place collection

    const touristPlaceCollection = db.collection("tourist_place");

    // river Collection

    const riversCollection = db.collection("rivers");

    // Popular place

    const popularPlaceCollection = db.collection("popular_place");

    // create user

    app.post("/users", async (req, res) => {
      const user = req.body;
      user.role = "user";
      user.createAt = new Date();
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // thana Collection get

    app.get("/thana", async (req, res) => {
      const result = await thanaCollection.find().toArray();

      res.send(result);
    });
    app.get("/thana/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await thanaCollection.findOne(query);

      res.send(result);
    });

    // tourist place get

    app.get("/tourist_place", async (req, res) => {
      const result = await touristPlaceCollection.find().toArray();
      res.send(result);
    });

    // specific tourist place get

    app.get("/tourist_place/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await touristPlaceCollection.findOne(query);
      res.send(result);
    });

    app.get("/rivers", async (req, res) => {
      const result = await riversCollection.find().toArray();
      res.send(result);
    });

    app.get("/rivers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await riversCollection.findOne(query);
      res.send(result);
    });

    // famous people get

    app.get("/famous_people", async (req, res) => {
      const result = await famousPeopleCollection.find().toArray();
      res.send(result);
    });

    // famous people load by specific id

    app.get("/famous_people/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await famousPeopleCollection.findOne(query);
      res.send(result);
    });

    // rivers get

    //famous food get

    app.get("/famous_food", async (req, res) => {
      const result = await famousFoodCollection.find().toArray();
      res.send(result);
    });

    // load a specific Food

    app.get("/famous_food/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await famousFoodCollection.findOne(query);

      res.send(result);
    });

    // popular place

    app.get("/popular_place", async (req, res) => {
      const result = await popularPlaceCollection.find().toArray();
      res.send(result);
    });

    // load a specific Food

    app.get("/popular_place/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await popularPlaceCollection.findOne(query);

      res.send(result);
    });

    // Test database connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Bogura!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
