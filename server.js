import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const SECRET_KEY = "your_secret_key";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data", "db.json");

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/products", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Маълумотро хонда натавонистем!" });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData.product);
    }
  });
});
app.get("/category", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Маълумотро хонда натавонистем!" });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData.category);
    }
  });
});
app.post("/register", async (req, res) => {
  const { name, email, password, imageUsers } = req.body;
  if (!password) return res.status(400).json({ error: "Парол бояд ворид карда шавад!" });

  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) return res.status(500).json({ error: "Маълумотро хонда натавонистем!" });

    let jsonData = JSON.parse(data);
    let users = jsonData.users || [];

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ error: "Ин email аллакай вуҷуд дорад!" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        imageUsers: imageUsers || "",
        saved: [],
        cart: [],
      };

      users.push(newUser);
      jsonData.users = users;

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Хатогӣ ҳангоми сабти корбар!" });

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Корбар бомуваффақият сабти ном шуд!", token, user: newUser });
      });
    } catch (error) {
      res.status(500).json({ error: "Хатогӣ ҳангоми ҳеш кардани парол!" });
    }
  });
});
app.patch("/users/:id/saved", (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.id;

    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    const userIndex = jsonData.users.findIndex((user) => user.id == userId);
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });

    jsonData.users[userIndex].saved = jsonData.users[userIndex].saved || [];
    let savedProducts = jsonData.users[userIndex].saved;

    const existingIndex = savedProducts.findIndex((p) => p.idProduct == productId);
    if (existingIndex !== -1) {
      savedProducts.splice(existingIndex, 1);
    } else {
      savedProducts.push({ idProduct: productId, id: userId, cnt: 1 });
    }
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    res.status(200).json({ saved: savedProducts });
  } catch (error) {
    res.status(500).json({ message: "Error updating saved products", error });
  }
});
app.get("/users/:id", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    if (!jsonData.users) {
      return res.status(500).json({ message: "Массиви users дар db.json пайдо нашуд" });
    }

    const user = jsonData.users.find(user => user.id == req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Корбар пайдо нашуд!" });
    }

    // Ҳангоми бозгардонидани маълумот, паролро хориҷ мекунем
    const { password,cart,saved, ...userWithoutPassword } = user;  // Ҳар чизро ҷуз парол

    res.status(200).json(userWithoutPassword);  // Маълумот бе парол
  } catch (error) {
    res.status(500).json({ message: "Хатогӣ дар хониши db.json", error });
  }
});
app.get("/users/:id/cart-saved", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    if (!jsonData.users) {
      return res.status(500).json({ message: "Массиви users дар db.json пайдо нашуд" });
    }
    const user = jsonData.users.find(user => user.id == req.params.id);
    const { password, ...userWithoutPassword } = user;
    if (!user) {
      return res.status(404).json({ message: "Корбар пайдо нашуд!" });
    }

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Хатогӣ дар хониши db.json", error });
  }
});
app.get("/product/:id", (req, res) => { 
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    if (!jsonData.product) {
      return res.status(500).json({ message: "Массиви products дар db.json пайдо нашуд" });
    }

    const productbyid = jsonData.product.find((product) => product.id == req.params.id);
    if (!productbyid) {
      return res.status(404).json({ message: "Маҳсулот пайдо нашуд" });
    }

    res.status(200).json(productbyid);
  } catch (error) {
    res.status(500).json({ message: "Хатогӣ дар хониши db.json", error });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await fs.promises.readFile("./data/db.json", "utf8");
    let jsonData = JSON.parse(data);
    let users = jsonData.users;

    const user = users.find((user) => user.email === email);
    if (!user) return res.status(400).json({ error: "Email ё парол нодуруст аст!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Email ё парол нодуруст аст!" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });
    res.json({ message: "Воридшавӣ муваффақона анҷом ёфт!", token, user });
  } catch (error) {
    res.status(500).json({ error: "Хатогӣ дар сервер!" });
  }
});
app.patch("/users/:id/cart", (req, res) => {
  try {
    const { id } = req.params;
    const { cart } = req.body; 
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    let userIndex = jsonData.users.findIndex(user => user.id == id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    jsonData.users[userIndex].cart = cart;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json(jsonData.users[userIndex].cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
});
app.listen(PORT, () => {
  console.log(`Сервер дар порт ${PORT} кор мекунад`);
});
app.get("/product/users/:userId",(req,res)=>
{
  fs.readFile(filePath,"utf8",(err,data)=>
  {
    if(err)
    {
      return res.status(500).json({"eror":"Cant not read data"})
    }
    const jsonData = JSON.parse(data);
    const { userId } = req.params;
    if (!jsonData.product) {
      return res.status(500).json({ message: "Массиви products дар db.json вуҷуд надорад!" });
    }
    const userProducts = jsonData.product.filter(product => product.iduser == userId);
    if (userProducts.length === 0) {
      return res.status(404).json({ message: "Ин корбар ягон маҳсулот надорад!" });
    }
    res.status(200).json(userProducts);
  })
})
app.get("/users/:id/saved-products", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    const user = jsonData.users.find(user => user.id == req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedProducts = user.saved.map(savedItem => {
      const product = jsonData.product.find(p => p.id == savedItem.idProduct);
      return product ? { ...savedItem, ...product } : null;
    }).filter(item => item !== null); 

    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved products", error });
  }
});
