const workboxBuild = require('workbox-build');

const buildSW = () => {
  return workboxBuild.injectManifest().then(({ count, size, warnings }) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
};

buildSW();
