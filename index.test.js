const postcss = require("postcss");
const fs = require("fs");
const glob = require("glob");

const plugin = require("./index");

function run(input, opt = {}) {
  return postcss([plugin(opt)]).process(input, { from: undefined });
}

async function success(css, opt = {}) {
  await expect(run(css, opt)).resolves.not.toBeNull();
}
async function error(css, opt = {}) {
  await expect(run(css, opt)).rejects.toMatchObject({
    reason: `can NOT use http protocol in css files`
  });
}

it(`should check https`, async () => {
  const files = glob.sync("./css/normal/*.css", { encoding: "utf-8" });
  for (let file of files) {
    const css = fs.readFileSync(file, { encoding: "utf-8" });
    await success(css);
  }
});

it(`should use ignore flag compile success`, async () => {
  const files = glob.sync("./css/ignoreFlag/*.css", { encoding: "utf-8" });
  for (let file of files) {
    const css = fs.readFileSync(file, { encoding: "utf-8" });
    await success(css);
  }
});

it(`should use custom ignore flag compile success`, async () => {
  const files = glob.sync("./css/customIgnoreFlag/*.css", { encoding: "utf-8" });
  for (let file of files) {
    const css = fs.readFileSync(file, { encoding: "utf-8" });
    await success(css, { ignoreFlag: `custom-flag` });
  }
});

it(`should compile error`, async () => {
  const files = glob.sync("./css/error/*.css", { encoding: "utf-8" });
  for (let file of files) {
    const css = fs.readFileSync(file, { encoding: "utf-8" });
    await error(css);
  }
});
