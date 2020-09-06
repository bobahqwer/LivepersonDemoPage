import * as lpTag from '../../../assets/js/lpChat/lpChat.min';



export default class LPChatService {
    private static myChatObj: any;

    static initChat = (): void => {

        debugger
        LPChatService.myChatObj = new window.lpTag.taglets.ChatOverRestAPI({
            // The api key for this site
            appKey: "76d58cb384b4df9381acd068370e40e4089ff266",
            // The LivePerson site number
            lpNumber: "7245506",

            //**************Here start samples of event binding via the config **************************************

            // Binding an inline function to onLoad
            onLoad: function (data) {
                alert(JSON.stringify(data));
            },
            // Binding a single callback to on init with a specified execution context
            onInit: {
                // The function that will be called back
                // callback: myObj.handleInit,
                // The execution context
                //  context: myObj
            },
            // Binding a function to the onState event
            onState: function (data) {
                alert(JSON.stringify(data));
            },
            // An Array of callbacks bound to this event
            onLine: [
                {
                    // A function that will be called back
                    //   callback: myObj.handleLine,
                    // The execution context for this callback
                    //  context: myObj
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
