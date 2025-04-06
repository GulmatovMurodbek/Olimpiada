import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import e from "express";

let app = express();
let SECRET_KEY = "your_secret_key";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
let filePath = path.join(__dirname, "data", "db.json");
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.json());
let PORT = 5000;

app.get("/products", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Маълумотро хонда натавонистем!" });
    } else {
      let jsonData = JSON.parse(data);
      res.json(jsonData.product);
    }
  });
});
app.get("/category", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Маълумотро хонда натавонистем!" });
    } else {
      let jsonData = JSON.parse(data);
      res.json(jsonData.category);
    }
  });
});
app.post("/register", async (req, res) => {
  let { name, email, password, imageUsers } = req.body;
  if (!password)
    return res.status(400).json({ error: "Парол бояд ворид карда шавад!" });

  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err)
      return res.status(500).json({ error: "Маълумотро хонда натавонистем!" });

    let jsonData = JSON.parse(data);
    let users = jsonData.users || [];

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ error: "Ин email аллакай вуҷуд дорад!" });
    }

    try {
      let hashedPassword = await bcrypt.hash(password, 10);
      let newUser = {
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
        if (err)
          return res
            .status(500)
            .json({ error: "Хатогӣ ҳангоми сабти корбар!" });

        let token = jwt.sign(
          { id: newUser.id, email: newUser.email },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        res.json({
          message: "Корбар бомуваффақият сабти ном шуд!",
          token,
          user: newUser,
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Хатогӣ ҳангоми ҳеш кардани парол!" });
    }
  });
});
app.patch("/users/:id/saved", (req, res) => {
  try {
    let { productId } = req.body;
    let userId = req.params.id;

    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    let userIndex = jsonData.users.findIndex((user) => user.id == userId);
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });

    jsonData.users[userIndex].saved = jsonData.users[userIndex].saved || [];
    let savedProducts = jsonData.users[userIndex].saved;

    let existingIndex = savedProducts.findIndex(
      (p) => p.idProduct == productId
    );
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
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    if (!jsonData.users) {
      return res
        .status(500)
        .json({ message: "Массиви users дар db.json пайдо нашуд" });
    }

    let user = jsonData.users.find((user) => user.id == req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Корбар пайдо нашуд!" });
    }

    let { password, cart, saved, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Хатогӣ дар хониши db.json", error });
  }
});
app.get("/users/:id/cart-saved", (req, res) => {
  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    if (!jsonData.users) {
      return res
        .status(500)
        .json({ message: "Массиви users дар db.json пайдо нашуд" });
    }
    let user = jsonData.users.find((user) => user.id == req.params.id);
    let { password, ...userWithoutPassword } = user;
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
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    if (!jsonData.product) {
      return res
        .status(500)
        .json({ message: "Массиви products дар db.json пайдо нашуд" });
    }

    let productbyid = jsonData.product.find(
      (product) => product.id == req.params.id
    );
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
    let { email, password } = req.body;
    let data = await fs.promises.readFile("./data/db.json", "utf8");
    let jsonData = JSON.parse(data);
    let users = jsonData.users;

    let user = users.find((user) => user.email === email);
    if (!user)
      return res.status(400).json({ error: "Email ё парол нодуруст аст!" });

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Email ё парол нодуруст аст!" });

    let token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });
    res.json({ message: "Воридшавӣ муваффақона анҷом ёфт!", token, user });
  } catch (error) {
    res.status(500).json({ error: "Хатогӣ дар сервер!" });
  }
});
app.patch("/users/:id/cart", (req, res) => {
  try {
    let { id } = req.params;
    let { cart } = req.body;
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    let userIndex = jsonData.users.findIndex((user) => user.id == id);
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
app.get("/product/users/:userId", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ eror: "Cant not read data" });
    }
    let jsonData = JSON.parse(data);
    let { userId } = req.params;
    if (!jsonData.product) {
      return res
        .status(500)
        .json({ message: "Массиви products дар db.json вуҷуд надорад!" });
    }
    let userProducts = jsonData.product.filter(
      (product) => product.iduser == userId
    );
    if (userProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "Ин корбар ягон маҳсулот надорад!" });
    }
    res.status(200).json(userProducts);
  });
});
app.get("/users/:id/saved-products", (req, res) => {
  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    let user = jsonData.users.find((user) => user.id == req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let savedProducts = user.saved
      .map((savedItem) => {
        let product = jsonData.product.find((p) => p.id == savedItem.idProduct);
        return product ? { ...savedItem, ...product } : null;
      })
      .filter((item) => item !== null);

    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved products", error });
  }
});
app.post("/addComment", (req, res) => {
  let data = fs.readFileSync(filePath, "utf8");
  let jsonData = JSON.parse(data);
  try {
    let { idaddcoment, text, nameAddComents, imgAddCommentUser, productId } =
      req.body;
    if (!text || !nameAddComents || !imgAddCommentUser) {
      return res.status(400).json({ message: "Ҳамаи майдонҳо ҳатмист!" });
    }
    let newComment = {
      idaddcoment: idaddcoment.toString(),
      idcoment: Date.now().toString(),
      text,
      nameAddComents,
      imgAddCommentUser,
      replies: [],
    };
    let findProduct = jsonData.product.find((el) => el.id == productId);
    findProduct.camments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    res.status(201).json({ message: "Камент илова шуд!", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Хатогӣ рӯй дод!", error });
  }
});

app.post("/addReplice", (req, res) => {
  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);
    let {
      addrepliesText,
      addrepliesName,
      idrepliceUser,
      productId,
      idcoment,
      avatar,
    } = req.body;
    if (!addrepliesText || !addrepliesName || !avatar) {
      return res.status(400).json({ message: "Ҳамаи майдонҳо ҳатмист!" });
    }
    let newReplice = {
      idaddreplices: Date.now().toString(),
      addrepliesName: addrepliesName,
      addrepliesText: addrepliesText,
      idrepliceUser: idrepliceUser,
      avatar: avatar,
    };
    let findProduct = jsonData.product.find((el) => el.id == productId);
    let findComent = findProduct.camments.find((el) => el.idcoment == idcoment);
    findComent.replies.push(newReplice);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
  } catch (error) {
    console.error(error);
  }
});

app.get("/users/:id/cart-products", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    const user = jsonData.users.find((user) => user.id == req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const CartProducts = user.cart
      .map((savedItem) => {
        const product = jsonData.product.find(
          (p) => p.id == savedItem.idProduct
        );
        return product ? { ...savedItem, ...product } : null;
      })
      .filter((item) => item !== null);
    res.status(200).json(CartProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved products", error });
  }
});

app.post("/product", (req, res) => {
  let data = fs.readFileSync(filePath, "utf8");
  let jsonData = JSON.parse(data);
  try {
    const newProduct = { id: Date.now().toString(), ...req.body };
    jsonData.product.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Хатогӣ ҳангоми илова кардани маҳсулот:", error);
    res.status(500).send("Хатогӣ ҳангоми илова кардани маҳсулот"); // Бо хато ҷавоб диҳед
  }
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;

  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonData = JSON.parse(data);

    const updatedProducts = jsonData.product.filter(
      (product) => product.id !== id
    );

    if (updatedProducts.length === jsonData.product.length) {
      return res.status(404).send("Маҳсулот пайдо нашуд!");
    }

    jsonData.product = updatedProducts;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");

    res.status(200).send({ message: "Маҳсулот бо муваффақият устувор шуд." });
  } catch (error) {
    console.error("Хатогӣ ҳангоми удале кардани маҳсулот:", error);
    res.status(500).send("Хатогӣ ҳангоми удале кардани маҳсулот");
  }
});
