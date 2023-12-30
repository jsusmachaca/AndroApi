class MemeModel{
    static getAll({ title }) {
        if (title) {
            const filtData = jsonData.find(
                data => data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            )
            return res.json(filtData)
        }    
        return res.json(jsonData)
    }
}