const fs = require('fs');
const path = require('path');
const vm = require('vm');

const def = require('./lib/define.js');

const ctx = vm.createContext(def({}));

/**
 * Return the combined Either() of all the blueprints.
 *
 * @param {String} dir The path to blueprint files.
 */

module.exports = (dir) => {
  const blueprint = Either();
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    let branch = fs.readFileSync(path.join(dir, file), 'utf8');
    branch = new vm.Script('obj = Statement(' + branch + ');', {
      filename: file,
      displayErrors: true
    });
    let thisCtx = Object.assign({obj: null}, ctx);
    branch.runInContext(thisCtx);
    merge(blueprint, thisCtx.obj);
  });
};

/**
 * Merge the branch into blueprint.
 * After identical first keyword, split them up with an Either().
 */

function merge(blueprint, branch) {
  const arr = blueprint.elements;
  
  // Check each element in the Either for branch match.
  for (var idx = 0, len = arr.length; idx < len; idx++) {
    let elements = arr[idx].elements;
    let statement = branch.elements;
    // In Statement. Check if first type matches.
    if (elements[0].type != statement[0].type) {
      continue;
    } 
    // Check first keyword match.
    if (elements[0].name == statement[0].name) {
      // Split it up.
      elements.push(def.Either(
        def.Statement(...elements.splice(1)), 
        def.Statement(statement.slice(1))));
      return;
    }
  }
  
  // Nothing matched, append the branch.
  arr.push(branch);
}