/**
 * @fileoverview Disallow usage of new Date()
 * @author SAP
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/nodate"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("nodate", rule, {

    valid: [
        "var time = moments().now"
    ],

    invalid: [
        {
            code: "var time = new Date()",
            errors: [{
                message: "Direct usage of Date() is prohibited. Use moments library instead or the timewindow module abstraction.",
                type: "NewExpression"
            }]
        }
    ]
});
