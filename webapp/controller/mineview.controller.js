sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Sorter, Filter, FilterOperator) => {
    "use strict";
    

    return BaseController.extend("app.miningjson.controller.mineview", {
        onInit() {
            // var oModel = new JSONModel();
            // this.getView().setModel(oModel, "MiningModel");
        },
        onDetailView: function () {
            // Get the router object
            let oRouter = this.getOwnerComponent().getRouter();
            // Use the navigation method
            oRouter.navTo("RouteDetail");
        },
        onSort: function(){
            if (!this.bDescending) {
                this.bDescending = false;
            }
            var oSorter = new Sorter("ReportOfPossibleMineral", this.bDescending);
            var oList = this.getView().byId("idListCtrl");
            var oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending = !this.bDescending;
        },
        onSearch: function (oEvent) {
            var searchString = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            var oName = new Filter("LocationDescription", FilterOperator.Contains, searchString);
            var oID = new Filter("LocationID", FilterOperator.Contains, searchString);
            var aFilter = [oName, oID];
            var mainFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("idListCtrl");
            var oBinding = oList.getBinding("items");
            oBinding.filter(mainFilter);
        },
        onItemSelect: function (oEvent) {
            // When an item is clicked, navigate to the detail page
            var oList = oEvent.getParameter("listItem");
            let sPath = oList.getBindingContextPath();
            let aItems = sPath.split("/");
            let id = aItems[aItems.length - 1];

            let oRouter = this.getOwnerComponent().getRouter();
            // Use the navigation method
            oRouter.navTo("RouteDetail",{
                index:id
            });
        }
    });
});