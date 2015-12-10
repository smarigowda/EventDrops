const configurable = require('./util/configurable');
const d3 = require('d3');

import defaultConfig from './config';
import configure from './configure';
import zoom from './zoom';

function eventDrops(config = {}) {
    const finalConfiguration = configure(config, defaultConfig);

    const yScale = (data) => {
        const scale = d3.scale.ordinal();

        return scale
            .domain(data.map((d) => d.name))
            .range(data.map((d, i) => i * 40));
    };

    const xScale = (width, timeBounds) => {
        return d3.time.scale()
            .range([0, width])
            .domain(timeBounds);
    };

    function eventDropGraph(selection) {
        selection.each(function (data) {
            const height = data.length * 40;
            const dimensions = {
                width: finalConfiguration.width - finalConfiguration.margin.right - finalConfiguration.margin.left,
                height,
                outer_height: height + finalConfiguration.margin.top + finalConfiguration.margin.bottom,
            };

            const scales = {
                x: xScale(dimensions.width, [finalConfiguration.start, finalConfiguration.end]),
                y: yScale(data),
            };

            const svg = d3.select(this).append('svg').attr({
                width: dimensions.width,
                height: dimensions.outer_height
            });

            const draw = require('./drawer')(svg, dimensions, scales, finalConfiguration).bind(selection);
            draw(data);

            zoom(d3.select('.drops-container'), dimensions, scales, finalConfiguration, data, draw);
        });
    }

    configurable(eventDropGraph, finalConfiguration);

    return eventDropGraph;
}

d3.chart = d3.chart || {};
d3.chart.eventDrops = eventDrops;

module.exports = eventDrops;
