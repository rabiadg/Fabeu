/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'jquery',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'underscore',
    'escaper',
    'jquery/jquery-storageapi'
], function ($, Component, customerData, _, escaper) {
    'use strict';

    return Component.extend({
        defaults: {
            cookieMessages: [],
            messages: [],
            allowedTags: ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a']
        },

        /**
         * Extends Component object by storage observable messages.
         */
        initialize: function () {
            this._super();

            this.cookieMessages = _.unique($.cookieStorage.get('mage-messages'), 'text');
            this.messages = customerData.get('messages').extend({
                disposableCustomerData: 'messages'
            });

            // Force to clean obsolete messages
            if (!_.isEmpty(this.messages().messages)) {
                customerData.set('messages', {});
            }
            
            /*setTimeout(() => {
                $.mage.cookies.set('mage-messages', '', {
                    samesite: 'strict',
                    domain: ''
                });
            }, 5000 );*/
            (function CookieCleanup(i) {
                setTimeout(function () {

                    if ($.mage.cookies.get('mage-messages') !== '') {
                        // cleanup
                        $.mage.cookies.set('mage-messages', '', {
                            samesite: 'strict',
                            domain: ''
                        });
                        console.info('Debug Cookie cleanup in progress...');
                    }

                    // keep on scrubbin'...
                    if (--i) CookieCleanup(i);

                }, 3000)
            })(3);
            
        },

        /**
         * Prepare the given message to be rendered as HTML
         *
         * @param {String} message
         * @return {String}
         */
        prepareMessageForHtml: function (message) {
            return escaper.escapeHtml(message, this.allowedTags);
        }
    });
});
