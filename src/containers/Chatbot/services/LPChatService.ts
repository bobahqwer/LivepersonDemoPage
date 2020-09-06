import * as lpTag from '../../../assets/js/lpChat/lpChat.min';



export default class LPChatService {
    private static myChatObj: any;

    static InitChat = (): void => {

        let myObj;
        function handleInit(data,data2,data3,data4){
            debugger
            alert(JSON.stringify(data));
        }

        function handleLine(data,data2){
            debugger
        }

        LPChatService.myChatObj = new window.lpTag.taglets.ChatOverRestAPI({ 
            // The api key for this site
            appKey: "76d58cb384b4df9381acd068370e40e4089ff266",
            //appKey: "721c180b09eb463d9f3191c41762bb68",
            // The LivePerson site number
            lpNumber: "7245506",

            //**************Here start samples of event binding via the config **************************************

            // Binding an inline function to onLoad
            onLoad: function (data) {
                //debugger
               // alert(JSON.stringify(data));
            },
            // Binding a single callback to on init with a specified execution context
            onInit: {
                // The function that will be called back
                callback: handleInit,
                // The execution context
                  context: myObj
            },
            // Binding a function to the onState event
            onState: function (data) {
                //debugger
                //alert(JSON.stringify(data));
            },
            // An Array of callbacks bound to this event
            onLine: [
                {
                    // A function that will be called back
                       callback: handleLine,
                    // The execution context for this callback
                      context: myObj
                },
                // An inline callback also bound to onLine
                function (lineData) {
                    debugger
                    alert(JSON.stringify(lineData));
                }
            ]
        });

      
    };
}
