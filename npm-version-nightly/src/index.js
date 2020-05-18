const fs = require("fs");
const core = require("@actions/core");
// const github = require("@actions/github");
// const exec = require("@actions/exec");

async function run() {
  try {
    const package = JSON.parse(fs.readFileSync("package.json"));

    const baseVersion = package.version.match(/(\d)+\.(\d)+\.(\d)+/);

    if (!baseVersion) {
      throw new Error("Could not calculate version");
    }

    const nightlyVersion =
      baseVersion[0] + "-nightly." + Math.floor(Date.now() / 1000);

    fs.writeFileSync(
      "package.json",
      JSON.stringify({ ...package, version: nightlyVersion }, null, 2)
    );

    core.debug("nightly version: " + nightlyVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
