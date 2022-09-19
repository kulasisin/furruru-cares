const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document =
  new JSDOM(`<form method="PUT" action="/caretakers/<%= caretaker.id %>">
<button type="submit" class="moreInfo" id= "<%= caretaker.id %>" >更多資訊</button>
</form>`).window.document;
const moreinfo = document.querySelector(".moreInfo");
// const { db } = require("../../models/pet");

function careselect() {
  moreinfo.addEventListener(
    "click",
    function (e) {
      alert("HELLO WORLD!");
      let elementId = e.target.id;
      let caretaker = Caretakers.findById(elementId);
      return caretaker;
    },
    false
  );
  console.log("clicked");
}
module.exports = careselect;
