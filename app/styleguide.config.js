const path = require('path')
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  },
  styles: {
    Preview: {
      preview: {
        display: "none"
      }
    }
  }
};