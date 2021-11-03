var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path");
app.use(express.urlencoded({ extended: true }))

let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
})

app.post("/addUser", function (req, res) {
    for (i = 0; i < users.length; i++) {
        if (req.body.email == users[i].email) {
            res.send("jest juz taki email")
            return
        }
    }
    users.push({
        nick: req.body.nick,
        email: req.body.email
    })
    res.send(users)
})

app.get("/removeUserBySelect", function (req, res) {
    var result = "<form action='/del' method='POST'><select name='email'>"
    for (i = 0; i < users.length; i++) {
        result = result + "<option value='" + users[i].email + "'>" + users[i].email + "</option>"
    }
    result = result + "</select><br><button type='submit'>USUŃ</button></form>"
    res.send(result)
})

app.get("/removeUserByRadio", function (req, res) {
    var result = "<form action='/del' method='POST'>"
    for (i = 0; i < users.length; i++) {
        result = result + "<input type='radio' name='email' value='" + users[i].email + "'><label>" + users[i].email + "</label><br>"
    }
    result = result + "<br><button type='submit'>USUŃ</button></form>"
    res.send(result)
})

app.get("/removeUserByCheckbox", function (req, res) {
    var result = "<form action='/delCheckBox' method='POST'>"
    for (i = 0; i < users.length; i++) {
        result = result + "<input type='checkbox' name='email' value='" + users[i].email + "'><label>" + users[i].email + "</label><br>"
    }
    result = result + "<br><button type='submit'>USUŃ</button></form>"
    res.send(result)
})

app.post("/del", function (req, res) {
    for (i = 0; i < users.length; i++) {
        if (req.body.email == users[i].email) {
            users.splice(i, 1);
        }
    }
    res.redirect("/")
})

app.post("/delCheckBox", function (req, res) {
    console.log(req.body.email)
    dane = req.body.email
    for (i = 0; i < users.length; i++) {
        for (j = 0; j < dane.length; j++) {
            if (dane[j] == users[i].email) {
                users.splice(i, 1);
            }
        }
    }
    res.redirect("/")
})

app.listen(PORT, function () {
    console.log("start serwera")
})