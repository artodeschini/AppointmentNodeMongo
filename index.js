const mongoose =  require('mongoose');
const ArticleModel = require('./model/Article'); // import model

mongoose.connect('mongodb://localhost:27017/agendamentos');
// mongoose.connect(
//     'mongodb://localhost:27017/agendamentos',
//     {userNewUrlParser: true, useUniedTopology: true
// });

// prepara o Model para utilizar
const Article = mongoose.model("Article", ArticleModel);

// criando documento
let artigo = new Article({
    title: 'Primeiro Artigo',
    author: 'Artur Todeschini Crestani',
    body: 'Insert into MongoDB com Mongoose e Node'
});

// salvando o dado na collection Article
artigo.save().then(() => {
    console.log('Artigo salvo com sucesso');
}).catch(err => {
    console.log('Erro ao tentar salvar Artigo ' + err);
});