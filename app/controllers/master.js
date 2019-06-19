function fillTable() {
    Ti.API.debug("fillTable()");
    
    var rows = [];
    
    for(var i=0;i<10;i++) {
        rows.push(Alloy.createController('row', {
            name: 'Row '+(i+1),
            number: (i+1)*1000
        }).getView());
    }
    
    $.tableTV.setData(rows);
}

var throttledGoToInspectionPanel = _.debounce(goToInspectionPanel, 1000, true);
function goToInspectionPanel(e) {
    Ti.API.debug("e.row = "+JSON.stringify(e.row));
    
    var detailWin = Alloy.createController('detail', e.row).getView();
    if(OS_IOS) {
        Alloy.Globals.rootWin.openWindow(detailWin);
    } else if(OS_ANDROID) {
        detailWin.open();
        detailWin.addEventListener('open',function(evt){
            var activity=detailWin.activity;
            activity.actionBar.displayHomeAsUp=true;
            activity.actionBar.setHomeButtonEnabled(false);
            activity.actionBar.onHomeIconItemSelected=function(){
                evt.source.close();
            };
        });
    }
}

var  goToActionsCompleteUnComplete = function(eOuter) {
 
    var dialog = Ti.UI.createAlertDialog({
        title : 'Select Action',
        message : 'Would you like to do?',
        buttonNames : ['Mark Completed', 'Cancel']
    });
    dialog.addEventListener('click', function(eOuter) {
        if (eOuter.index == 0) {
            console.log('test @@@@@@@@@@');
        }
    });
    dialog.show(); 


};

var longtapEvent = OS_IOS ? 'longpress' : 'longclick';
$.tableTV.addEventListener('longpress', goToActionsCompleteUnComplete);

var throttledGoToActionsCompleteUnComplete =  _.debounce(goToActionsCompleteUnComplete, 1000, true);


/*
$.tableTV.addEventListener('click', function(e){
    Ti.API.debug("$.placesTV.addEventListener()");
    
    Ti.API.debug("e.row = "+JSON.stringify(e.row));
    
    var detailWin = Alloy.createController('detail', e.row).getView();
    if(OS_IOS) {
        Alloy.Globals.rootWin.openWindow(detailWin);
    } else if(OS_ANDROID) {
        detailWin.open();
        detailWin.addEventListener('open',function(evt){
            var activity=detailWin.activity;
            activity.actionBar.displayHomeAsUp=true;
            activity.actionBar.setHomeButtonEnabled(false);
            activity.actionBar.onHomeIconItemSelected=function(){
                evt.source.close();
            };
        });
    }
    
});
*/
if(OS_ANDROID) {
    $.master.open();    
}

fillTable();