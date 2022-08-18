const mongoose =  require('mongoose');
const ArticleModel = require('./model/Article'); // import model

mongoose.connect('mongodb://localhost:27017/agendamentos');
// mongoose.connect(
//     'mongodb://localhost:27017/agendamentos',
//     {userNewUrlParser: true, useUniedTopology: true
// });

// prepara o Model para utilizar
const Article = mongoose.model("Article", ArticleModel); // collection no plural

// criando documentos
// let artigo = new Article({
//     title: 'Quarto Artigo',
//     author: 'Catia',
//     body: 'blabla bla eu quero uma coisa doce',
//     resume: {
//         content: 'blabla bla',
//         author: 'Catia'
//     }
// });

// // salvando o dado na collection Article
// artigo.save().then(() => {
//     console.log('Artigo salvo com sucesso');
// }).catch(err => {
//     console.log('Erro ao tentar salvar Artigo ' + err);
// });

// retrive aticle com find all
// Article.find({}).then(articles => {
//     console.log(articles);
// }).catch(err => {
//     console.log(err);
// });

// retrive aticle com findOne by _id // encontra só um
// Article.findOne({"_id" : "62fe99d55b28f03728b9ed83"}).then(articles => {
//     console.log(articles);
// }).catch(err => {
//     console.log(err);
// });

// delete by id
// Article.findByIdAndDelete("62feaf0ae8640c58f108b12a").then( () => {
//     console.log("Artigo escluido");
// }).catch(err => {
//     console.log(err);
// });

// update
Article.findByIdAndUpdate('62feaef618443ded26a05149',
{
    'body': 'Alguma coisa mais seria',
    resume: {
                content: 'ALTEREI bla',
                author: 'Catia UPDATE'
            }
}
    ).then( () => {
    console.log("Artigo alterado");
}).catch(err => {
    console.log(err);
});
