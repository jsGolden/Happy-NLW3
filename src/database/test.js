const Database = require('./db');
const saveOrphanage = require('./saveOrphanage')


Database.then(async db => {
    await saveOrphanage(db,
        {

            lat: "-27.2194621",
            lng: "-49.6552641",
            name: "Lar dos meninos",
            about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
            whatsapp: "985614423",
            images: 
            [
                "https://images.unsplash.com/photo-1583526362016-c3137c71cc3a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    
                "https://images.unsplash.com/photo-1582167410766-a90eea4787ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            ].toString(),
            instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
            opening_hours: "Horário de visitas Das 18h até 8h",
            open_on_weekends: "0"
        }
    );
    

    //query data
    const selectedOrphanages = await db.all("SELECT * FROM orphanages");
    console.log(selectedOrphanages);

    //consultar somente um orfanato pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1"');
    console.log(orphanage);

    //deletar dado da tabela
    console.log(await db.run('DELETE FROM orphanages WHERE id = "5"'));

});