const fs = require("fs");

const capitilize = (source) => {
  const [head, ...tail] = source;
  return head.toUpperCase() + tail.join("").toLowerCase();
};

const createFile = (sourcePath, distPath, fileModifier) => {
  fs.readFile(sourcePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const file = fileModifier(data);
    fs.writeFile(distPath, file, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

const createRepository = (resourceName) => {
  const sourcePath = "./scripts/templates/repository";
  const disPath = `./src/data/${resourceName}Repository.ts`;
  const fileModifier = (source) => source.replace(/<resource_name>/g, resourceName);
  createFile(sourcePath, disPath, fileModifier);
  fs.appendFileSync("./src/data/index.ts", `export * as ${resourceName}Repository from './${resourceName}Repository';\n`);
};

const createController = (resourceName) => {
  const sourcePath = "./scripts/templates/controller";
  const disPath = `./src/controllers/${resourceName}Controller.ts`;
  const fileModifier = (source) => source.replace(/<resource_name>/g, resourceName);
  createFile(sourcePath, disPath, fileModifier);
  fs.appendFileSync("./src/controllers/index.ts", `export * as ${resourceName}Controller from './${resourceName}Controller';\n`);
};

const createRouter = (resourceName) => {
  const sourcePath = "./scripts/templates/router";
  const disPath = `./src/routers/${resourceName}Router.ts`;
  const fileModifier = (source) => source.replace(/<resource_name>/g, resourceName);
  createFile(sourcePath, disPath, fileModifier);
  fs.appendFileSync("./src/routers/index.ts", `export * as ${resourceName}Router from './${resourceName}Router';\n`);
};

(() => {
  const unparsedResourceName = process.argv[2];
  const camelCasePattern = [...unparsedResourceName].some((char, index) => char.match(/[A-Z]/) && index !== 0);
  const kebabCasePattern = unparsedResourceName.includes("-");

  if (camelCasePattern && !kebabCasePattern) {
    console.warn("WARN: use kebab-case instead of camelCase to create resources");
    return;
  }

  let resourceName = "";

  if (!kebabCasePattern) {
    resourceName = capitilize(unparsedResourceName);
  } else {
    resourceName = unparsedResourceName
      .split("-")
      ?.map((source) => capitilize(source))
      ?.join("");
  }

  createRepository(resourceName);
  createController(resourceName);
  createRouter(resourceName);

  console.log("Resource created: Controller, Repository, Router");
})();
