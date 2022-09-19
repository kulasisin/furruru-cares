const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewURLparser: true,
});
const Caretakers = require("../models/caretaker");
const Careselect = require("../public/js/moreinfo");
const router = express.Router();
//all pets route
router.get("", async (req, res) => {
  try {
    const caretakers = await Caretakers.find({});

    res.render("caretakers", { caretakers: caretakers });
  } catch {
    res.redirect(``);
  }
});

//每個服務的資訊頁的連結建置
router.get("/:id", async (req, res) => {
  const caretaker = await Caretakers.find({ id: req.params.id });
  console.log(req.params.id);
  console.log(caretaker);
  let newcaretaker = caretaker[0];
  newcaretaker.clicked += 1;
  let currentnum = newcaretaker.clicked;
  console.log(newcaretaker);
  await newcaretaker.save();
  // await db
  //   .collection("caretakers")
  //   .updateOne({ id: req.params.id }, { $set: { newcaretaker } });
  res.render("caretaker-page");
});

// router.post("/:id", async (req, res) => {
//   const caretaker = await Caretakers.find({ id: req.params.id });
//   console.log(req.params.id);
//   console.log(caretaker);
//   let newcaretaker = caretaker[0];
//   newcaretaker.clicked += 1;
//   let currentnum = newcaretaker.clicked;
//   console.log(newcaretaker);
//   await newcaretaker.save();
//   await db
//     .collection("caretakers")
//     .updateOne({ id: req.params.id }, { $set: { newcaretaker } });
//   res.send(req.params.id + "服務資訊頁");
// });
//監聽商品點擊率更多資訊;
// router.post("", async (req, res) => {
//   let caretaker;
//   try {
//     caretaker = await Caretakers.findById(1);
//     console.log(caretaker.clicked);
//     await caretaker.save();
//     console.log("click count");
//     res.redirect(`/caretakers`);
//   } catch {
//     if (caretaker == null) {

//       const newcaretaker = caretaker || {};
//       newcaretaker.clicked = 1;
//       console.log(newcaretaker);
//       res.redirect(`/`);
//       caretaker ={ newcaretaker:cliked};
//       caretaker.save();
//     } else {
//       console.log("error");
//       res.redirect(`/caretakers/${caretaker.id}`);
//     }
//   }
// });
//   Caretakers.findOneAndUpdate(
//     { id: upid },
//     { $set: { clicked: upclicked } },
//     { new: true },
//     (err, data) => {
//       if (data == null) {
//         res.redirect(``);
//       } else {
//         res.send(data);
//       }
//     }
//   );
//     caretaker.clicked = req.params.clicked + 1;
//     await caretaker.save();
//     console.log("add clicked number");
//     res.redirect(`/caretaker/${caretaker.id}`);
//   } catch {
//     if (caretaker == null) {
//       res.redirect(`/`);
//     } else {
//       res.redirect(`/caretaker/${caretaker.id}`);
//     }

// let serviceInput = document.querySelector(".caretaker-list");
// let str = "";
// serviceData.forEach(function (item, index) {
//   let content = ` <li><div class="caretaker">
//       <img src="${item.pic}" al
//   t="照護人員" class="caretaker-pic">        <div class="info">
//         <p class="caretaker_title">${item.name}</p>
//         <span>${item.location}</span>
//         <ul class="service">
//         `;

//   let content2 = `
//    </ul>
//    <div class="review">
//    <p>評價：${item.rating}</p>
//    <img src="#" alt="星">
//    <a href="#" class="review-number">${item.commentNumber}</a>
//    </div>
//   </div>
//   </div>
//   <div class="tag">
//   <ul>
//    <li><p>貓狗皆可</p></li>
//    <li><p>接送服務</p></li>
//    <li><p>專業證照</p></li>
//   </ul>
//   </div>
//   </li>`;
//   //輸入服務項目
//   let perService = "";
//   let perServiceContent = `<li><img src="img/CheckBox.png" alt=""><p>${item.service}</p></li>`;
//   perService += perServiceContent;
//   fullContent = content + perService + content2;
//   str += fullContent;

//   console.log(perService);
// });
// serviceInput.innerHTML = str;
module.exports = router;
