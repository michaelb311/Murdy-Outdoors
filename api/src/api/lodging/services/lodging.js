'use strict';

/**
 * lodging service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lodging.lodging');
