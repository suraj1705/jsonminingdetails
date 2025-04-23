sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController, JSONModel,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.miningjson.controller.Detail", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRoutePatternMatched, this);
        },
        onRoutePatternMatched: function(oEvent) {
            console.log(oEvent);
            let index = oEvent.getParameter("arguments").index;
            let sPath = "miningModel>/miningDatas/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);
        },
        onFilter:function(){
            let aFilter=[]
            let sMineral=this.getView().byId("idMineral").getValue()
            // console.log(sName);
            let sLocation=this.getView().byId("idLocation").getValue()
            if(sMineral){
                let filterName=new Filter("TypeOfMineralFromLocation", FilterOperator.Contains,sMineral)
                aFilter.push(filterName)
            }
            if(sLocation){
                let filterName=new Filter("LocationID", FilterOperator.Contains,sLocation)
                aFilter.push(filterName)
            }
                let oTable=this.getView().byId("idMTable")
                let bindingInfo=oTable.getBinding("items")
                bindingInfo.filter(aFilter);
           
            },
            onConfirmSupp:function(oEvent){
                // confirm the choice
                // we need the value that was selected
                // we need to place it exactly at the same input field where the value was selected
                // We are setting the value on that input field
                let oSelectedItems=oEvent.getParameter("selectedItem")
                let sValue=oSelectedItems.getProperty("info")
                let oInput=sap.ui.getCore().byId(this.inputField)
                oInput.setValue(sValue)
            },
            onListView:function(){
                    let oRouter=this.getOwnerComponent().getRouter()
                    // use the navigation method
                    oRouter.navTo("RouteMiningView")
            },
            onF4Help:function(oEvent){
                // let myInputField where the popup actually popped up
                this.inputField=oEvent.getSource().getId()
                let oModel=this.getView().getModel("miningModel")
                let aData=oModel.getProperty("/miningDatas")
                let deepCopy=JSON.parse(JSON.stringify(aData))
                let oModelFrag=new JSONModel({newSuppSet:deepCopy})
                if(!this.oDialog){
                    this.oDialog=Fragment.load({
                        fragmentName:"app.miningjson.fragment.popUp",
                        controller:this
                    }).then((dialog)=>{
                        this.oDialog=dialog
                        this.getView().addDependent(this.oDialog)
                        this.getView().setModel(oModelFrag,"fragmentModel")
                        this.oDialog.open()
                    })
                }else{
                    this.oDialog.open()
                }
        }
    });
});