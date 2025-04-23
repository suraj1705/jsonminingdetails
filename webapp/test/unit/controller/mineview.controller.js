/*global QUnit*/

sap.ui.define([
	"app/miningjson/controller/mineview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("mineview Controller");

	QUnit.test("I should test the mineview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
