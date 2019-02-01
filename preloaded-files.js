const bootstrap = dirname => [
    `bootstrap/dist/js/bootstrap.min`,
]
const jqueryUI = dirname => [
    `jquery-ui-dist/images/ui-icons_ffffff_256x240.png`,
    `jquery-ui-dist/jquery-ui.min.css`,
    `jquery-ui-dist/jquery-ui.structure.min.css`,
    `jquery-ui-dist/jquery-ui.theme.min.css`,
    `jquery-ui-dist/jquery-ui.min`
];
const leaflet = dirname => [
    `leaflet`,
    `leaflet-measure`,
    `leaflet/dist/leaflet.css`,
    `leaflet/dist/images/marker-icon.png`,
    `leaflet/dist/images/marker-icon-2x.png`,
    `leaflet/dist/images/marker-shadow.png`,
    `leaflet-measure/scss/leaflet-measure.scss`
];
module.exports = dirname => {
    const files = [];
    files.push(...bootstrap(dirname));
    files.push(...jqueryUI(dirname));
    files.push(...leaflet(dirname));
    return files;
}
