import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const updated = req.query.updated === 'true';
    const updatedTitle = req.query.title;
    const updatedContent = req.query.content;

    // Render your view, passing the updated variables if needed
    res.render("index.ejs", { title: title, content: content, updated: updated, updatedTitle: updatedTitle, updatedContent: updatedContent });
});


app.get("/add", (req, res) => {
    let index = req.query.index;
    res.render("form.ejs", { index: index });
});

let title = [];
let content = [];
app.post("/new", (req, res) => {
   title.push(req.body.title);
   content.push(req.body.content);
   res.render("index.ejs", { title: title, content: content });

});

app.get("/delete/:index", (req, res) => {
    const index = req.params.index;
    // Delete the post at the specified index
    title.splice(index, 1);
    content.splice(index, 1);
    // Redirect to the home route after deleting
    res.redirect("/");
});
app.get("/edit/:index", (req, res) => {
    let index = req.params.index;
    // Redirect to the "/add" route with the index as a query parameter
    res.redirect(`/add?index=${index}`);
});


app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    // Update the title and content at the specified index
    title[index] = req.body.title;
    content[index] = req.body.content;

    // Redirect to the home route with updated data as query parameters
    res.redirect(`/?updated=true&title=${encodeURIComponent(req.body.title)}&content=${encodeURIComponent(req.body.content)}`);
});



app.listen(port, (req,res) => {
    console.log(`Listening on port ${port}`)
});