'use strict';

/**
 * hunt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hunt.hunt');
