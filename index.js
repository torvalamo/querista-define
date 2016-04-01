const fs = require('fs');
const path = require('path');

require('./lib/def.js');

/**
 * Return the combined Either() of all the blueprints.
 *
 * @param {String} dir The path to blueprint files.
 */

module.exports = (dir) => {
  const blueprint = Either();
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    let branch = require(path.join(dir, file));
    merge(blueprint, branch);
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
    if (elements[0].type != statement[0].type) {
      continue;
    }
    // In Statement. Check first keyword match.
    if (elements[0].name == statement[0].name) {
      // Split it up
      elements.push(Either(Statement(...elements.splice(1)), Statement(statement.slice(1))));
      return;
    }
  }
  
  // Nothing matched, append the branch.
  arr.push(branch);
}