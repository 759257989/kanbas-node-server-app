const module = {
    id: 1, 
    course: "intro web dev",
    name: "learn react",
    description: "Create a NodeJS server with ExpressJS",
    
  };
  
  const ModuleObject = (app) => {
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });

    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name)
    });

    app.get("/lab5/module/description", (req, res) => {
      res.json(module.description)
  });

    app.get("/lab5/module/name/:newName", (req, res) => {
      const { newName} = req.params;
      module.name = newName;
      res.json(module);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription} = req.params;
    module.description= newDescription;
    res.json(module);
});
   
  }

  export default ModuleObject;
  