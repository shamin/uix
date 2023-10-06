const marked = require("marked");
const { gfmHeadingId } = require("marked-gfm-heading-id");
const fs = require("fs");

marked.use(gfmHeadingId({}));

const tmpl = fs.readFileSync("./tmpl.html", "utf8");
const indexTmpl = fs.readFileSync("./index_tmpl.html", "utf8");

const version = await fetch("https://clojars.org/com.pitch/uix.core")
  .then((r) => r.text())
  .then((s) => {
    return `v${s.match(/(\d+\.\d+\.\d+)&quot;]/)[1]}`;
  });

let allFiles = fs.readdirSync("./md_docs/");

allFiles = [
  "what-is-uix.md",
  "components.md",
  "elements.md",
  "hooks.md",
  "state.md",
  "effects.md",
  "interop-with-react.md",
  "interop-with-reagent.md",
  "code-splitting.md",
  "migrating-from-reagent.md",
  "server-side-rendering.md",
  "hot-reloading.md",
  "react-devtools.md",
  "code-linting.md",
  "utilities.md",
  "internals.md",
  "react-native.md",
  "react-three-fiber.md",
];

const mdFiles = [];

function capitalize(file) {
  return file
    .split(".")[0]
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

allFiles.forEach((file, idx) => {
  let out = marked.parse(fs.readFileSync(`./md_docs/${file}`, "utf8"));
  out = tmpl.replace("{{content}}", out).replace("{{version}}", version);
  if (idx > 0) {
    out = out.replace(
      "{{prev}}",
      `<a class="nav-link" href="${allFiles[idx - 1].replace(
        ".md",
        ".html"
      )}">👈 Prev “${capitalize(allFiles[idx - 1])}”</a>`
    );
  }
  if (idx < allFiles.length - 1) {
    out = out.replace(
      "{{next}}",
      `<a class="nav-link" href="${allFiles[idx + 1].replace(
        ".md",
        ".html"
      )}">Next “${capitalize(allFiles[idx + 1])}” 👉</a>`
    );
  }
  out = out
    .replace("{{title}}", "UIx | " + capitalize(file))
    .replace("{{next}}", "<div></div>")
    .replace("{{prev}}", "<div></div>");
  fs.writeFileSync(`./docs/${file.split(".")[0]}.html`, out);
  mdFiles.push(`${file.split(".")[0]}.html`);
});

let out = marked.parse(fs.readFileSync(`./md_docs/index.md`, "utf8"));
out = indexTmpl.replace("{{content}}", out).replace("{{version}}", version);
fs.writeFileSync(`./docs/index.html`, out);
