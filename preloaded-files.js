const bootstrap = dirname => [
    `${dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`,
    `${dirname}/node_modules/bootstrap/dist/js/bootstrap.min`,
]
const jqueryUI = dirname => [
    `${dirname}/node_modules/jquery-ui-dist/images/ui-icons_ffffff_256x240.png`,
    `${dirname}/node_modules/jquery-ui-dist/jquery-ui.min.css`,
    `${dirname}/node_modules/jquery-ui-dist/jquery-ui.structure.min.css`,
    `${dirname}/node_modules/jquery-ui-dist/jquery-ui.theme.min.css`,
    `${dirname}/node_modules/jquery-ui-dist/jquery-ui.min`
];
const leaflet = dirname => [
    `leaflet`,
    `leaflet-measure`,
    `${dirname}/node_modules/leaflet/dist/leaflet.css`,
    `${dirname}/node_modules/leaflet/dist/images/marker-icon.png`,
    `${dirname}/node_modules/leaflet/dist/images/marker-icon-2x.png`,
    `${dirname}/node_modules/leaflet/dist/images/marker-shadow.png`,
    `${dirname}/node_modules/leaflet-measure/scss/leaflet-measure.scss`
];
module.exports = dirname => {
    const files = [];
    files.push(...bootstrap(dirname));
    files.push(`${dirname}/node_modules/font-awesome/css/font-awesome.min.css`);
    files.push(...jqueryUI(dirname));
    files.push(...leaflet(dirname));
    return files;
}